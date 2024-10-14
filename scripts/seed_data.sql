-- Insert sample users
INSERT INTO users (username, email, password_hash, is_admin) VALUES
('admin', 'admin@example.com', 'hashed_password', TRUE),
('user1', 'user1@example.com', 'hashed_password', FALSE),
('user2', 'user2@example.com', 'hashed_password', FALSE),
('user3', 'user3@example.com', 'hashed_password', FALSE),
('user4', 'user4@example.com', 'hashed_password', FALSE);

-- Insert sample topics
INSERT INTO topics (name, description) VALUES
('General', 'General discussions'),
('Technology', 'Discussions about technology'),
('Health', 'Health and wellness topics');

-- Insert sample conversations
INSERT INTO conversations (title, content, user_id, topic_id) VALUES
('Welcome to our community', 'This is our first conversation!', 1, 1),
('Latest tech trends', 'What are your thoughts on AI?', 2, 2),
('Healthy eating habits', 'Share your favorite healthy recipes', 3, 3);

-- Insert sample comments for 'Welcome to our community'
INSERT INTO comments (content, user_id, conversation_id) VALUES
('Great to be here!', 2, 1),
('Looking forward to engaging discussions', 3, 1),
('Hello everyone!', 4, 1),
('This community looks promising', 5, 1);

-- Insert sample comments for 'Latest tech trends'
INSERT INTO comments (content, user_id, conversation_id) VALUES
('AI is revolutionizing many industries', 3, 2),
('I think AI has both potential benefits and risks', 1, 2),
('Machine learning is a fascinating subset of AI', 4, 2),
('We need to consider the ethical implications of AI', 5, 2);

-- Insert sample comments for 'Healthy eating habits'
INSERT INTO comments (content, user_id, conversation_id) VALUES
('I love making smoothies for breakfast', 1, 3),
('Meal prepping has been a game-changer for me', 2, 3),
('Any tips for vegetarian protein sources?', 4, 3),
('I have found that eating more whole foods has improved my energy levels', 5, 3);

-- Insert sample notifications
INSERT INTO notifications (user_id, type, message, conversation_id) VALUES
(1, 'new_comment', 'Someone commented on your conversation', 1),
(2, 'new_conversation', 'A new conversation was started in a topic you follow', 2),
(3, 'new_comment', 'Someone replied to your comment', 3),
(4, 'new_comment', 'There is a new comment in a conversation you are following', 1),
(5, 'new_conversation', 'A new conversation was started in your favorite topic', 3);