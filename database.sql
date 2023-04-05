
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
-- CREATE TABLE "user" (
--     "id" SERIAL PRIMARY KEY,
--     "username" VARCHAR (80) UNIQUE NOT NULL,
--     "password" VARCHAR (1000) NOT NULL
-- );

-- create user table
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "admin" BOOLEAN
);

-- create property table
CREATE TABLE "property" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (500),
	"address" VARCHAR( 500)
);

-- create booking table
CREATE TABLE "booking" (
	"id" SERIAL PRIMARY KEY,
	"customer_first_name" VARCHAR (200) NOT NULL,
	"customer_last_name" VARCHAR (200) NOT NULL,
	"customer_email" VARCHAR (200),
	"customer_phone" VARCHAR (200),
	"vendor" VARCHAR (200) NOT NULL,
	"check_in_date" DATE NOT NULL,
	"check_out_date" DATE NOT NULL,
	"tax_responsible" BOOLEAN,
	"cleaning_fee" MONEY NOT NULL,
	"pet_fee" MONEY NOT NULL,
	"cost_per_night" MONEY NOT NULL,
	"vendor_commission" MONEY NOT NULL,
	"vendor_fee" MONEY NOT NULL,
	"discount" MONEY NOT NULL,
	"lodging_tax" MONEY NOT NULL,
	"finalized" BOOLEAN,
	"property_id" INT REFERENCES "property"
);

-- create comment table
CREATE TABLE "comment" (
	"id" SERIAL PRIMARY KEY,
	"comment" VARCHAR (1000) NOT NULL,
	"user_id" INT REFERENCES "user",
	"booking_id" INT REFERENCES "booking"
);

-- create vendor table
CREATE TABLE "vendor" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (500) NOT NULL
);



------- for testing only ----------
-- testing tables (money/date)
CREATE TABLE "money" ("money" MONEY );
CREATE TABLE "date" ("date" date);

-- how to insert date
INSERT INTO "date" ("date") VALUES ('2023/03/15'); -- year/month/day
INSERT INTO "date" ("date") values ('10/2/23');    -- month/day/year
INSERT INTO "date" ("date") VALUES ('12-31-2023'); -- month/day/year

-- how to insert money
INSERT INTO "money" ("money") VALUES (500);     -- no quotation marks
INSERT INTO "money" ("money") VALUES ('300');	-- with quotation marks
INSERT INTO "money" ("money") VALUES (1000.50);	-- with decimal


-- testing

--- testing 2