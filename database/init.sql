BEGIN;

DROP TABLE IF EXISTS users, sessions, medications, record CASCADE;

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
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  FOREIGN KEY(user_id) REFERENCES users(id),
  medicationType TEXT,
  medName TEXT,
  medDose TEXT,
  units TEXT,
  tabCount INTEGER,
  medTime TEXT,
  customTime TEXT,
  notes TEXT
);

CREATE TABLE record (
  id SERIAL PRIMARY KEY,
  date DATE,
  user_id INTEGER, FOREIGN KEY(user_id) REFERENCES users(id),
  med_id INTEGER, FOREIGN KEY(med_id) REFERENCES medications(id) ON DELETE SET NULL,
  taken BOOLEAN
);


INSERT INTO sessions (sid, data) VALUES
('12323245556', 'data' ),
('98876352628', 'more-data' );

INSERT INTO users (username, email, phone, password) VALUES
  ('juliettep', 'juliette@juliette.com', '074554535', '123'),
  ('olij', 'oli@oli.com', '076664535','123');

INSERT INTO medications (user_id, medicationType, medName, medDose, units, tabCount, medTime, customTime, notes) VALUES 
(1,'tablets','Aspirin',200,'mg',28,'13:00','no','with water'),
(1, 'tablets','Paracetemol',500,'mg',28,'15:00','no','for pain'),
(1, 'tablets','Ramipril',300,'mg',28,'18:00','no','no grapefruit');


INSERT INTO record (date, user_id, med_id, taken) VALUES
('2022-03-05 18:00:00',1, 1, true),
('2022-03-05 18:00:00',1, 2, true),
('2022-03-05 18:00:00',1, 3, true),
('2022-03-06 18:00:00',1, 1, true),
('2022-03-06 18:00:00',1, 2, false),
('2022-03-06 18:00:00',1, 3, true),
('2022-03-07 18:00:00',1, 1, true),
('2022-03-07 18:00:00',1, 2, true),
('2022-03-07 18:00:00',1, 3, true), 
('2022-03-08 18:00:00',1, 1, true),
('2022-03-08 18:00:00',1, 2, true),
('2022-03-08 18:00:00',1, 3, true),
('2022-03-09 18:00:00',1, 1, true),
('2022-03-09 18:00:00',1, 2, true),
('2022-03-09 18:00:00',1, 3, true),
('2022-03-10 18:00:00',1, 1, false),
('2022-03-10 18:00:00',1, 2, false),
('2022-03-10 18:00:00',1, 3, false);



COMMIT;