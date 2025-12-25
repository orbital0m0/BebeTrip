import pool from '../config/database';

export interface Wishlist {
  id: number;
  user_id: number;
  accommodation_id: number;
  created_at: Date;
}

class WishlistModel {
  async findByUserId(userId: number): Promise<any[]> {
    const result = await pool.query(
      `SELECT
        w.*,
        a.name,
        a.description,
        a.address,
        a.region,
        a.thumbnail_image,
        COALESCE(AVG(r.rating), 0) as average_rating,
        COUNT(DISTINCT r.id) as review_count,
        MIN(rt.price_per_night) as min_price
       FROM wishlists w
       INNER JOIN accommodations a ON w.accommodation_id = a.id
       LEFT JOIN reviews r ON a.id = r.accommodation_id
       LEFT JOIN room_types rt ON a.id = rt.accommodation_id
       WHERE w.user_id = $1
       GROUP BY w.id, a.id
       ORDER BY w.created_at DESC`,
      [userId]
    );
    return result.rows;
  }

  async findByUserAndAccommodation(userId: number, accommodationId: number): Promise<Wishlist | null> {
    const result = await pool.query(
      'SELECT * FROM wishlists WHERE user_id = $1 AND accommodation_id = $2',
      [userId, accommodationId]
    );
    return result.rows[0] || null;
  }

  async create(userId: number, accommodationId: number): Promise<Wishlist> {
    const result = await pool.query(
      'INSERT INTO wishlists (user_id, accommodation_id) VALUES ($1, $2) RETURNING *',
      [userId, accommodationId]
    );
    return result.rows[0];
  }

  async delete(userId: number, accommodationId: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM wishlists WHERE user_id = $1 AND accommodation_id = $2',
      [userId, accommodationId]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async isWishlisted(userId: number, accommodationId: number): Promise<boolean> {
    const result = await pool.query(
      'SELECT 1 FROM wishlists WHERE user_id = $1 AND accommodation_id = $2',
      [userId, accommodationId]
    );
    return result.rows.length > 0;
  }
}

export default new WishlistModel();
