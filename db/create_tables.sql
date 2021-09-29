CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(100) UNIQUE NOT NULL,
  "first_name" varchar(100) NOT NULL,
  "last_name" varchar(100) NOT NULL,
  "pwd_hash" varchar(100),
  "date_joined" timestamp DEFAULT (now()),
  "active" boolean DEFAULT FALSE,
  "user_role" varchar(100)
);

CREATE TABLE "resources" (
  "id" SERIAL PRIMARY KEY,
  "facilities_id" int,
  "name" varchar(100),
  "description" varchar(100)
);

CREATE TABLE "bookings" (
  "id" SERIAL PRIMARY KEY,
  "resources_id" int NOT NULL,
  "organizer_id" int NOT NULL,
  "start_time" timestamptz NOT NULL,
  "end_time" timestamptz NOT NULL
);

CREATE TABLE "facilities" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(100) NOT NULL,
  "description" varchar(1000)
);

CREATE TABLE "users_facilities" (
  "users_id" int,
  "facilities_id" int,
  "is_admin" boolean NOT NULL
);

CREATE TABLE "invitations" (
  "email" varchar(100) NOT NULL,
  "facilities_id" int,
  PRIMARY KEY("email", "facilities_id")
);

CREATE TABLE "reset_tokens" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(255) DEFAULT NULL,
  "token" varchar(255) DEFAULT NULL,
  "expiration" timestamptz DEFAULT NULL,
  "created_at" timestamptz NOT NULL,
  "updated_at" timestamptz NOT NULL,
  "used" int NOT NULL DEFAULT '0'
);

CREATE TABLE "verify_email_tokens" (
  "id" SERIAL PRIMARY KEY,
  "email" varchar(255) UNIQUE DEFAULT NULL,
  "token" varchar(255) DEFAULT NULL,
  "expiration" timestamptz DEFAULT NULL,
  "created_at" timestamptz NOT NULL
);

ALTER TABLE "resources" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("resources_id") REFERENCES "resources" ("id");

ALTER TABLE "bookings" ADD FOREIGN KEY ("organizer_id") REFERENCES "users" ("id");

ALTER TABLE "users_facilities" ADD FOREIGN KEY ("users_id") REFERENCES "users" ("id");

ALTER TABLE "users_facilities" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");

ALTER TABLE "users_facilities" ADD UNIQUE ("users_id", "facilities_id");

ALTER TABLE "invitations" ADD FOREIGN KEY ("facilities_id") REFERENCES "facilities" ("id");

ALTER TABLE "invitations" ADD UNIQUE ("email", "facilities_id");