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

CREATE TABLE medications (
  medId SERIAL PRIMARY KEY,
  userId INTEGER,
  FOREIGN KEY(userId) REFERENCES users(id),
  medicationInfo JSON
);


INSERT INTO sessions (sid, data) VALUES
('12323245556', 'data' ),
('98876352628', 'more-data' );


INSERT INTO users (username, email, phone, password) VALUES
  ('juliettep', 'juliette@juliette.com', '074554535', '123'),
  ('olij', 'oli@oli.com', '076664535','123');

INSERT INTO medications (userId, medicationInfo) VALUES (
  1,
  '{
  "medicationType":"tablets",
  "medName":"Aspirin",
  "medDose":"200",
  "units":"mg",
  "tabCount":"28",
  "medTime":"13:00",
  "customTime":"",
  "notes":"with water"
  }');

COMMIT;