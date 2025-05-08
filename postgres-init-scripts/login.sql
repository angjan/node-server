BEGIN;
CREATE TABLE IF NOT EXISTS login (
                       id serial PRIMARY KEY,
                       hash varchar(100) NOT NULL,
                       email text UNIQUE NOT NULL
);

INSERT INTO login (hash, email) VALUES
                                    ('hash1', 'hania@gmail.com'),
                                    ('hash2', 'janusz@yahoo.com');

COMMIT;

SELECT * FROM login;
