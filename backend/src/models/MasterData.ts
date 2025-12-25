import pool from '../config/database';

class MasterDataModel {
  async getAgeMonths(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM age_months ORDER BY month_from ASC'
    );
    return result.rows;
  }

  async getAmenityCategories(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM amenity_categories ORDER BY id ASC'
    );
    return result.rows;
  }

  async getAmenities(): Promise<any[]> {
    const result = await pool.query(
      `SELECT
        a.*,
        ac.name as category_name
       FROM amenities a
       INNER JOIN amenity_categories ac ON a.category_id = ac.id
       ORDER BY ac.id, a.id`
    );
    return result.rows;
  }

  async getReviewPros(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM review_pros ORDER BY category, id'
    );
    return result.rows;
  }

  async getReviewCons(): Promise<any[]> {
    const result = await pool.query(
      'SELECT * FROM review_cons ORDER BY category, id'
    );
    return result.rows;
  }
}

export default new MasterDataModel();
