/**
 * Run this once to create all required tables.
 * Usage: node migrate.js  (requires DATABASE_URL env var)
 */
import sql from "./sql.js";

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS user_profiles (
      id SERIAL PRIMARY KEY,
      user_id TEXT UNIQUE NOT NULL,
      country TEXT NOT NULL,
      country_flag TEXT NOT NULL,
      team TEXT NOT NULL,
      language TEXT NOT NULL DEFAULT 'en',
      notifications_enabled BOOLEAN NOT NULL DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS matches (
      id SERIAL PRIMARY KEY,
      team1 TEXT NOT NULL,
      team1_flag TEXT,
      team2 TEXT NOT NULL,
      team2_flag TEXT,
      match_date TIMESTAMPTZ NOT NULL,
      venue TEXT NOT NULL,
      location TEXT NOT NULL,
      tournament TEXT DEFAULT 'FIFA World Cup 2026',
      team1_score INT,
      team2_score INT
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fan_zones (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT,
      description TEXT,
      country TEXT NOT NULL,
      latitude NUMERIC,
      longitude NUMERIC,
      attendee_count INT DEFAULT 0,
      type TEXT DEFAULT 'community'
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS safety_info (
      id SERIAL PRIMARY KEY,
      country TEXT NOT NULL,
      embassy_name TEXT,
      emergency_phone TEXT,
      general_info TEXT
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS cultural_tips (
      id SERIAL PRIMARY KEY,
      country TEXT NOT NULL,
      title TEXT NOT NULL,
      description TEXT,
      category TEXT
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS fan_events (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      team TEXT,
      city TEXT NOT NULL,
      venue_name TEXT NOT NULL,
      address TEXT,
      date_time TIMESTAMPTZ NOT NULL,
      organizer_name TEXT,
      attendees_count INT DEFAULT 0,
      type TEXT DEFAULT 'Other',
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS forum_posts (
      id SERIAL PRIMARY KEY,
      team TEXT NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      author_name TEXT DEFAULT 'Anonymous',
      replies_count INT DEFAULT 0,
      likes INT DEFAULT 0,
      created_date TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS my_matches (
      id SERIAL PRIMARY KEY,
      user_id TEXT NOT NULL,
      team1 TEXT NOT NULL,
      team2 TEXT NOT NULL,
      date TIMESTAMPTZ NOT NULL,
      venue TEXT NOT NULL,
      city TEXT NOT NULL,
      country TEXT NOT NULL,
      stage TEXT DEFAULT 'Group Stage',
      notes TEXT,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS match_scores (
      match_id TEXT PRIMARY KEY,
      team1_score INT NOT NULL DEFAULT 0,
      team2_score INT NOT NULL DEFAULT 0,
      match_minute INT,
      status_override TEXT,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("All tables created successfully.");
}

migrate().catch(console.error);
