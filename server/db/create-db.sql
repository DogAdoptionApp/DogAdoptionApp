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
  "name" varchar,
  "username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL, 
  "location" varchar, 
  "size_pref" varchar, 
  "age_pref" varchar,
  "gender_pref" varchar, 
  "breed_pref" varchar, 
  "has_dog" boolean, 
  "has_kid" boolean
);

CREATE TABLE Users_Dogs (
    "_id" SERIAL PRIMARY KEY,
    "dogs_id" integer REFERENCES dogs,
    "users_id" integer REFERENCES users
);

INSERT INTO Users VALUES (DEFAULT, 'Test User', 'testusername', 'testpassword', 'California', 'large', 'adult', 'male', 'pug', true, true);

INSERT INTO Dogs VALUES (DEFAULT, 0, 'test_url', 'dogname', 'dogphoto', 'male', 'large', 'Mixed', 'California');

INSERT INTO Users_Dogs VALUES(DEFAULT, 0, 0)

-- Run this command from the db foler directory to write this data to our ElephantSQL database. (If the db already contains data, you may want to delete it first so you're starting from a blank slate).
-- psql -d postgres://qyazdahc:P95829_oExlImmM-X66pUot7JZIJMFeU@heffalump.db.elephantsql.com/qyazdahc -f create-db.sql