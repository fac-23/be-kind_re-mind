BEGIN;

DROP TABLE IF EXISTS users, sessions CASCADE;


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


INSERT INTO sessions (sid, data) VALUES
('12323245556', 'data' ),
('98876352628', 'more-data' );


INSERT INTO users (username, email, phone, password) VALUES
  ('juliettep', 'juliette@juliette.com', '074554535', '123'),
  ('olij', 'oli@oli.com', '076664535','123')
;
COMMIT;