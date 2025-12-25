import pool from '../config/database';

export interface Review {
  id: number;
  user_id: number;
  accommodation_id: number;
  room_type: string;
  child_age_months: number;
  total_people: number;
  rating: number;
  content?: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateReviewDTO {
  userId: number;
  accommodationId: number;
  roomType: string;
  childAgeMonths: number;
  totalPeople: number;
  rating: number;
  content?: string;
  pros?: number[];
  cons?: number[];
}

export interface UpdateReviewDTO {
  roomType?: string;
  childAgeMonths?: number;
  totalPeople?: number;
  rating?: number;
  content?: string;
  pros?: number[];
  cons?: number[];
}

class ReviewModel {
  async create(data: CreateReviewDTO): Promise<Review> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Insert review
      const reviewResult = await client.query(
        `INSERT INTO reviews (user_id, accommodation_id, room_type, child_age_months, total_people, rating, content)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING *`,
        [
          data.userId,
          data.accommodationId,
          data.roomType,
          data.childAgeMonths,
          data.totalPeople,
          data.rating,
          data.content,
        ]
      );

      const review = reviewResult.rows[0];

      // Insert pros
      if (data.pros && data.pros.length > 0) {
        const prosValues = data.pros.map((proId) => `(${review.id}, ${proId})`).join(',');
        await client.query(
          `INSERT INTO review_pros (review_id, pro_id) VALUES ${prosValues}`
        );
      }

      // Insert cons
      if (data.cons && data.cons.length > 0) {
        const consValues = data.cons.map((conId) => `(${review.id}, ${conId})`).join(',');
        await client.query(
          `INSERT INTO review_cons (review_id, con_id) VALUES ${consValues}`
        );
      }

      await client.query('COMMIT');
      return review;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findById(id: number): Promise<any | null> {
    const result = await pool.query(
      `SELECT
        r.*,
        u.name as user_name,
        u.profile_image as user_profile_image,
        a.name as accommodation_name,
        (
          SELECT json_agg(json_build_object('id', rp.pro_id, 'name', p.name))
          FROM review_pros rp
          INNER JOIN pros p ON rp.pro_id = p.id
          WHERE rp.review_id = r.id
        ) as pros,
        (
          SELECT json_agg(json_build_object('id', rc.con_id, 'name', c.name))
          FROM review_cons rc
          INNER JOIN cons c ON rc.con_id = c.id
          WHERE rc.review_id = r.id
        ) as cons,
        (
          SELECT json_agg(json_build_object('id', ri.id, 'imageUrl', ri.image_url, 'sortOrder', ri.sort_order))
          FROM review_images ri
          WHERE ri.review_id = r.id
          ORDER BY ri.sort_order
        ) as images
       FROM reviews r
       INNER JOIN users u ON r.user_id = u.id
       INNER JOIN accommodations a ON r.accommodation_id = a.id
       WHERE r.id = $1`,
      [id]
    );
    return result.rows[0] || null;
  }

  async update(id: number, data: UpdateReviewDTO): Promise<Review | null> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      const updateFields: string[] = [];
      const values: any[] = [];
      let paramCount = 1;

      if (data.roomType !== undefined) {
        updateFields.push(`room_type = $${paramCount}`);
        values.push(data.roomType);
        paramCount++;
      }

      if (data.childAgeMonths !== undefined) {
        updateFields.push(`child_age_months = $${paramCount}`);
        values.push(data.childAgeMonths);
        paramCount++;
      }

      if (data.totalPeople !== undefined) {
        updateFields.push(`total_people = $${paramCount}`);
        values.push(data.totalPeople);
        paramCount++;
      }

      if (data.rating !== undefined) {
        updateFields.push(`rating = $${paramCount}`);
        values.push(data.rating);
        paramCount++;
      }

      if (data.content !== undefined) {
        updateFields.push(`content = $${paramCount}`);
        values.push(data.content);
        paramCount++;
      }

      updateFields.push(`updated_at = NOW()`);
      values.push(id);

      const result = await client.query(
        `UPDATE reviews
         SET ${updateFields.join(', ')}
         WHERE id = $${paramCount}
         RETURNING *`,
        values
      );

      if (result.rows.length === 0) {
        await client.query('ROLLBACK');
        return null;
      }

      const review = result.rows[0];

      // Update pros
      if (data.pros !== undefined) {
        await client.query('DELETE FROM review_pros WHERE review_id = $1', [id]);
        if (data.pros.length > 0) {
          const prosValues = data.pros.map((proId) => `(${id}, ${proId})`).join(',');
          await client.query(
            `INSERT INTO review_pros (review_id, pro_id) VALUES ${prosValues}`
          );
        }
      }

      // Update cons
      if (data.cons !== undefined) {
        await client.query('DELETE FROM review_cons WHERE review_id = $1', [id]);
        if (data.cons.length > 0) {
          const consValues = data.cons.map((conId) => `(${id}, ${conId})`).join(',');
          await client.query(
            `INSERT INTO review_cons (review_id, con_id) VALUES ${consValues}`
          );
        }
      }

      await client.query('COMMIT');
      return review;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async delete(id: number): Promise<boolean> {
    const client = await pool.connect();

    try {
      await client.query('BEGIN');

      // Delete related data first
      await client.query('DELETE FROM review_pros WHERE review_id = $1', [id]);
      await client.query('DELETE FROM review_cons WHERE review_id = $1', [id]);
      await client.query('DELETE FROM review_images WHERE review_id = $1', [id]);

      // Delete review
      const result = await client.query('DELETE FROM reviews WHERE id = $1', [id]);

      await client.query('COMMIT');
      return result.rowCount !== null && result.rowCount > 0;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }

  async findByUserId(userId: number, page = 1, limit = 10): Promise<{ data: any[]; total: number }> {
    const offset = (page - 1) * limit;

    const countResult = await pool.query(
      'SELECT COUNT(*) FROM reviews WHERE user_id = $1',
      [userId]
    );
    const total = parseInt(countResult.rows[0].count);

    const result = await pool.query(
      `SELECT
        r.*,
        a.name as accommodation_name,
        a.thumbnail_image as accommodation_thumbnail,
        (
          SELECT json_agg(json_build_object('id', rp.pro_id, 'name', p.name))
          FROM review_pros rp
          INNER JOIN pros p ON rp.pro_id = p.id
          WHERE rp.review_id = r.id
        ) as pros,
        (
          SELECT json_agg(json_build_object('id', rc.con_id, 'name', c.name))
          FROM review_cons rc
          INNER JOIN cons c ON rc.con_id = c.id
          WHERE rc.review_id = r.id
        ) as cons,
        (
          SELECT json_agg(json_build_object('id', ri.id, 'imageUrl', ri.image_url, 'sortOrder', ri.sort_order))
          FROM review_images ri
          WHERE ri.review_id = r.id
          ORDER BY ri.sort_order
        ) as images
       FROM reviews r
       INNER JOIN accommodations a ON r.accommodation_id = a.id
       WHERE r.user_id = $1
       ORDER BY r.created_at DESC
       LIMIT $2 OFFSET $3`,
      [userId, limit, offset]
    );

    return {
      data: result.rows,
      total,
    };
  }

  async addImage(reviewId: number, imageUrl: string, sortOrder: number): Promise<any> {
    const result = await pool.query(
      `INSERT INTO review_images (review_id, image_url, sort_order)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [reviewId, imageUrl, sortOrder]
    );
    return result.rows[0];
  }

  async deleteImage(imageId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM review_images WHERE id = $1',
      [imageId]
    );
    return result.rowCount !== null && result.rowCount > 0;
  }

  async getImagesByReviewId(reviewId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT * FROM review_images
       WHERE review_id = $1
       ORDER BY sort_order`,
      [reviewId]
    );
    return result.rows;
  }

  async checkOwnership(reviewId: number, userId: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT id FROM reviews WHERE id = $1 AND user_id = $2',
      [reviewId, userId]
    );
    return result.rows.length > 0;
  }
}

export default new ReviewModel();
