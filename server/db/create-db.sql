CREATE TABLE Dogs (
  "_id" SERIAL PRIMARY KEY,
	"petfinder_id" INT,
	"petfinder_url" VARCHAR,
	"name" VARCHAR,
	"photo" VARCHAR,
	"gender" VARCHAR,
	"size" VARCHAR,
	"breed" VARCHAR,
	"location" VARCHAR
);


CREATE TABLE Users (
  "_id" SERIAL PRIMARY KEY,
  "name" VARCHAR,
  "username" VARCHAR NOT NULL UNIQUE,
  "password" VARCHAR NOT NULL, 
  "location" VARCHAR, 
  "size_pref" VARCHAR, 
  "age_pref" VARCHAR,
  "gender_pref" VARCHAR, 
  "breed_pref" VARCHAR, 
  "has_dog" BOOLEAN, 
  "has_kid" BOOLEAN
);

CREATE TABLE Users_Dogs (
    "_id" SERIAL PRIMARY KEY,
    "dogs_id" INTEGER REFERENCES dogs,
    "users_id" INTEGER REFERENCES users
);

-- INSERT INTO Users VALUES (DEFAULT, 'Test User', 'testusername', 'testpassword', 'California', 'large', 'adult', 'male', 'pug', true, true);

-- INSERT INTO Dogs VALUES (DEFAULT, 0, 'test_url', 'dogname', 'dogphoto', 'male', 'large', 'Mixed', 'California');

-- INSERT INTO Users_Dogs VALUES (DEFAULT, 1, 1);


-- Run this command from the db foler directory to write this data to our ElephantSQL database. (If the db already contains data, you may want to delete it first so you're starting from a blank slate).
-- psql -d postgres://qyazdahc:P95829_oExlImmM-X66pUot7JZIJMFeU@heffalump.db.elephantsql.com/qyazdahc -f create-db.sql