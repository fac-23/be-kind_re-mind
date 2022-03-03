BEGIN;

DROP TABLE IF EXISTS users, sessions, medications CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(20),
  email text UNIQUE NOT NULL,
  phone text NOT NULL,
  password text NOT NULL
);

CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data TEXT
);

CREATE TABLE medications(
  medId SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY(userId) REFERENCES users(id),
  medicationType TEXT,
  medName TEXT,
  medDose TEXT,
  units TEXT,
  tabCount INTEGER,
  medTime TEXT,
  customTime TEXT,
  notes TEXT
);


INSERT INTO sessions (sid, data) VALUES
('12323245556', 'data' ),
('98876352628', 'more-data' );


INSERT INTO users (username, email, phone, password) VALUES
  ('juliettep', 'juliette@juliette.com', '074554535', '123'),
  ('olij', 'oli@oli.com', '076664535','123');

INSERT INTO medications (userId, medicationType, medName, medDose, units, tabCount, medTime, customTime, notes) VALUES (
  1,'tablets','Aspirin',200,'mg',28,'13:00','no','with water');

COMMIT;