CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(100) UNIQUE NOT NULL,
  "pwd_hash" varchar(100),
  "date_joined" timestamp DEFAULT (now()),
  "active" boolean DEFAULT true,
  "user_role" varchar(100)
);

CREATE TABLE "resources" (
  "id" SERIAL PRIMARY KEY,
  "facilities_id" int,
  "name" varchar(100),
  "description" varchar(100)
);

CREATE TABLE "users_bookings" (
  "users_id" int,
  "bookings_id" int
);

CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "resources_id" int,
  "start_time" timestamp,
  "end_time" timestamp
);

CREATE TABLE "facilities" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "description" varchar(1000)
);

CREATE TABLE "users_facilities_member" (
  "users_id" int,
  "facilities_id" int
);

CREATE TABLE "users_facilities_admin" (
  "users_id" int,
  "facilities_id" int
);

ALTER TABLE "resources" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");

ALTER TABLE "users_bookings" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_bookings" ADD FOREIGN KEY ("bookings_id") REFERENCES "bookings" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("resources_id") REFERENCES "resources" ("id");

ALTER TABLE "users_facilities_member" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_facilities_member" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");

ALTER TABLE "users_facilities_admin" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_facilities_admin" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");
