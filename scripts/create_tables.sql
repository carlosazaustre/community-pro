-- Drop existing tables if they exist (in reverse order of creation to avoid foreign key conflicts)
DROP TABLE IF EXISTS settings;
DROP TABLE IF EXISTS user_activity;
DROP TABLE IF EXISTS password_reset_tokens;
DROP TABLE IF EXISTS notifications;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS conversations;
DROP TABLE IF EXISTS topics;
DROP TABLE IF EXISTS users;

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_admin BOOLEAN NOT NULL DEFAULT FALSE,
    profile_picture VARCHAR(255),
    bio TEXT,
    email_verified BOOLEAN DEFAULT FALSE,
    verification_token VARCHAR(255),
    verification_token_expires_at TIMESTAMP,
    remember_me_token VARCHAR(255) UNIQUE
);

-- Create topics table
CREATE TABLE topics (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create conversations table
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    topic_id INTEGER REFERENCES topics(id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_pinned BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create comments table
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER NOT NULL REFERENCES conversations(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP,
    is_approved BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create notifications table
CREATE TABLE notifications (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    type VARCHAR(50) NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    conversation_id INTEGER REFERENCES conversations(id),
    comment_id INTEGER REFERENCES comments(id)
);

-- Create password_reset_tokens table
CREATE TABLE password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create user_activity table
CREATE TABLE user_activity (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    activity_type VARCHAR(50) NOT NULL,
    activity_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    conversation_id INTEGER REFERENCES conversations(id),
    comment_id INTEGER REFERENCES comments(id)
);

-- Create settings table
CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) NOT NULL UNIQUE,
    value TEXT NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_topic_id ON conversations(topic_id);
CREATE INDEX idx_comments_conversation_id ON comments(conversation_id);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX idx_users_verification_token ON users(verification_token);
CREATE INDEX idx_comments_is_approved ON comments(is_approved);