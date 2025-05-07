import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Initialize database schema
async function initDb() {
  try {
    // First, check if the users table exists
    const tableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'users'
      );
    `);

    if (!tableExists.rows[0].exists) {
      // Create the users table if it doesn't exist
      await pool.query(`
        CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
        CREATE TABLE users (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          email VARCHAR(255) UNIQUE NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('entrepreneur', 'investor')),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } else {
      // If table exists, check if user_type column exists
      const columnExists = await pool.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'users' AND column_name = 'user_type'
        );
      `);

      if (!columnExists.rows[0].exists) {
        // Add user_type column if it doesn't exist
        await pool.query(`
          ALTER TABLE users 
          ADD COLUMN user_type VARCHAR(20) NOT NULL DEFAULT 'entrepreneur' 
          CHECK (user_type IN ('entrepreneur', 'investor'));
        `);
      }
    }

    // Check if pitches table exists
    const pitchesTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'pitches'
      );
    `);

    if (!pitchesTableExists.rows[0].exists) {
      // Create pitches table if it doesn't exist
      await pool.query(`
        CREATE TABLE pitches (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          title VARCHAR(255) NOT NULL,
          description TEXT NOT NULL,
          video_url VARCHAR(255) NOT NULL,
          looking_for TEXT NOT NULL,
          views INTEGER DEFAULT 0,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `);
    }

    // Check if pitch_views table exists
    const viewsTableExists = await pool.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'pitch_views'
      );
    `);

    if (!viewsTableExists.rows[0].exists) {
      // Create pitch_views table if it doesn't exist
      await pool.query(`
        CREATE TABLE pitch_views (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          pitch_id UUID REFERENCES pitches(id) ON DELETE CASCADE,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          viewed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
          UNIQUE(pitch_id, user_id)
        );
      `);
    }

    console.log('Database schema initialized');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Only initialize the database if we're in development mode
if (process.env.NODE_ENV === 'development') {
  initDb();
}

export default pool;
