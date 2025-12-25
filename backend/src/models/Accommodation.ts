import pool from '../config/database';

export interface Accommodation {
  id: number;
  name: string;
  description: string;
  address: string;
  region: string;
  thumbnail_image?: string;
  total_rooms: number;
  created_at: Date;
  updated_at: Date;
}

export interface AccommodationWithStats extends Accommodation {
  average_rating?: number;
  review_count?: number;
  min_price?: number;
}

export interface SearchFilters {
  region?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
  infants?: number;
  ageMonths?: number[];
  amenities?: number[];
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

class AccommodationModel {
  async findAll(filters: SearchFilters = {}): Promise<{ data: AccommodationWithStats[]; total: number }> {
    const {
      region,
      ageMonths = [],
      amenities = [],
      minPrice,
      maxPrice,
      minRating,
      page = 1,
      limit = 12,
      sortBy = 'created_at',
      sortOrder = 'desc',
    } = filters;

    let query = `
      SELECT DISTINCT
        a.*,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(DISTINCT r.id) as review_count,
        MIN(rt.price_per_night) as min_price
      FROM accommodations a
      LEFT JOIN reviews r ON a.id = r.accommodation_id
      LEFT JOIN room_types rt ON a.id = rt.accommodation_id
    `;

    const conditions: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    // Region filter
    if (region) {
      conditions.push(`a.region = $${paramCount}`);
      values.push(region);
      paramCount++;
    }

    // Amenities filter
    if (amenities.length > 0) {
      query += `
        INNER JOIN accommodation_amenities aa ON a.id = aa.accommodation_id
      `;
      conditions.push(`aa.amenity_id = ANY($${paramCount})`);
      conditions.push(`aa.is_available = true`);
      values.push(amenities);
      paramCount++;
    }

    // Age months filter (check if amenities are suitable for age range)
    if (ageMonths.length > 0) {
      const minAge = Math.min(...ageMonths);
      const maxAge = Math.max(...ageMonths);

      query += `
        INNER JOIN accommodation_amenities aa2 ON a.id = aa2.accommodation_id
        INNER JOIN amenities am ON aa2.amenity_id = am.id
      `;
      conditions.push(`(am.age_month_from IS NULL OR am.age_month_from <= $${paramCount})`);
      values.push(maxAge);
      paramCount++;
      conditions.push(`(am.age_month_to IS NULL OR am.age_month_to >= $${paramCount})`);
      values.push(minAge);
      paramCount++;
      conditions.push(`aa2.is_available = true`);
    }

    if (conditions.length > 0) {
      query += ` WHERE ${conditions.join(' AND ')}`;
    }

    query += ` GROUP BY a.id`;

    // HAVING clauses for aggregated filters
    const havingConditions: string[] = [];

    if (minPrice !== undefined) {
      havingConditions.push(`MIN(rt.price_per_night) >= $${paramCount}`);
      values.push(minPrice);
      paramCount++;
    }

    if (maxPrice !== undefined) {
      havingConditions.push(`MIN(rt.price_per_night) <= $${paramCount}`);
      values.push(maxPrice);
      paramCount++;
    }

    if (minRating !== undefined) {
      havingConditions.push(`COALESCE(AVG(r.rating), 0) >= $${paramCount}`);
      values.push(minRating);
      paramCount++;
    }

    if (havingConditions.length > 0) {
      query += ` HAVING ${havingConditions.join(' AND ')}`;
    }

    // Count query
    const countQuery = `SELECT COUNT(*) FROM (${query}) as count_table`;
    const countResult = await pool.query(countQuery, values);
    const total = parseInt(countResult.rows[0].count);

    // Sorting
    const validSortColumns = ['created_at', 'name', 'average_rating', 'min_price'];
    const sortColumn = validSortColumns.includes(sortBy) ? sortBy : 'created_at';
    const order = sortOrder === 'asc' ? 'ASC' : 'DESC';

    query += ` ORDER BY ${sortColumn} ${order}`;

    // Pagination
    const offset = (page - 1) * limit;
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    values.push(limit, offset);

    const result = await pool.query(query, values);

    return {
      data: result.rows,
      total,
    };
  }

  async findById(id: number): Promise<Accommodation | null> {
    const result = await pool.query(
      'SELECT * FROM accommodations WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async getImages(accommodationId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT * FROM accommodation_images
       WHERE accommodation_id = $1
       ORDER BY is_main DESC, sort_order ASC`,
      [accommodationId]
    );
    return result.rows;
  }

  async getRoomTypes(accommodationId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT * FROM room_types
       WHERE accommodation_id = $1
       ORDER BY price_per_night ASC`,
      [accommodationId]
    );
    return result.rows;
  }

  async getAmenities(accommodationId: number, ageMonthFilter?: number): Promise<any[]> {
    let query = `
      SELECT
        aa.*,
        am.name,
        am.icon,
        am.age_month_from,
        am.age_month_to,
        ac.name as category_name
      FROM accommodation_amenities aa
      INNER JOIN amenities am ON aa.amenity_id = am.id
      INNER JOIN amenity_categories ac ON am.category_id = ac.id
      WHERE aa.accommodation_id = $1
    `;

    const values: any[] = [accommodationId];
    let paramCount = 2;

    if (ageMonthFilter !== undefined) {
      query += ` AND (am.age_month_from IS NULL OR am.age_month_from <= $${paramCount})`;
      values.push(ageMonthFilter);
      paramCount++;
      query += ` AND (am.age_month_to IS NULL OR am.age_month_to >= $${paramCount})`;
      values.push(ageMonthFilter);
      paramCount++;
    }

    query += ` ORDER BY ac.id, am.id`;

    const result = await pool.query(query, values);
    return result.rows;
  }

  async getStats(accommodationId: number): Promise<any> {
    const result = await pool.query(
      `SELECT
        COALESCE(AVG(rating), 0) as average_rating,
        COUNT(*) as review_count
       FROM reviews
       WHERE accommodation_id = $1`,
      [accommodationId]
    );
    return result.rows[0];
  }

  async getReviews(accommodationId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT
        r.*,
        u.name as user_name,
        u.profile_image as user_profile_image,
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
       WHERE r.accommodation_id = $1
       ORDER BY r.created_at DESC`,
      [accommodationId]
    );
    return result.rows;
  }
}

export default new AccommodationModel();
