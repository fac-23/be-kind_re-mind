BEGIN;

DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data TEXT
);

INSERT INTO sessions (sid, data) VALUES
('12323245556', 'data' );

COMMIT;