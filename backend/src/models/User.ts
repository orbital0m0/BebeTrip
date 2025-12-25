import pool from '../config/database';

export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
  profile_image?: string;
  provider: 'kakao' | 'naver';
  provider_id: string;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUserData {
  email: string;
  name: string;
  phone?: string;
  profile_image?: string;
  provider: 'kakao' | 'naver';
  provider_id: string;
}

export interface UpdateUserData {
  name?: string;
  phone?: string;
}

class UserModel {
  async findById(id: number): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0] || null;
  }

  async findByProvider(provider: string, providerId: string): Promise<User | null> {
    const result = await pool.query(
      'SELECT * FROM users WHERE provider = $1 AND provider_id = $2',
      [provider, providerId]
    );
    return result.rows[0] || null;
  }

  async create(userData: CreateUserData): Promise<User> {
    const { email, name, phone, profile_image, provider, provider_id } = userData;

    const result = await pool.query(
      `INSERT INTO users (email, name, phone, profile_image, provider, provider_id)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [email, name, phone, profile_image, provider, provider_id]
    );

    return result.rows[0];
  }

  async update(id: number, userData: UpdateUserData): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    if (userData.name !== undefined) {
      fields.push(`name = $${paramCount}`);
      values.push(userData.name);
      paramCount++;
    }

    if (userData.phone !== undefined) {
      fields.push(`phone = $${paramCount}`);
      values.push(userData.phone);
      paramCount++;
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM users WHERE id = $1',
      [id]
    );
    return result.rowCount ? result.rowCount > 0 : false;
  }
}

export default new UserModel();
