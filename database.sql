
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
	"id" serial primary key,
	"username" varchar(20) NOT NULL UNIQUE,
	"password" varchar(255) NOT NULL,
	"website" varchar(255),
	"linkedin" varchar(255),
	"profilepic" varchar(255) DEFAULT "./images/profilepics/default.svg"; 
	"email" varchar(255),
	"admin" BOOLEAN NOT NULL DEFAULT 'false'
);

CREATE TABLE "posts" (
	"id" serial primary key,
	"path" varchar(255),
	"text" varchar(255),
	"loves" int NOT NULL,
	"flagged" BOOLEAN NOT NULL DEFAULT 'false',
	"post_type" varchar(255) NOT NULL,
	"date" DATE NOT NULL
);

CREATE TABLE "users_posts" (
	"id" serial primary key,
	"user_id" int NOT NULL references "user",
	"posts_id" int NOT NULL references "posts",
	"action_type" varchar(255) NOT NULL
);

CREATE TABLE "awards" (
	"id" serial primary key,
	"name" varchar(255) NOT NULL,
	"description" varchar(255) NOT NULL,
	"path" varchar(255) NOT NULL
);

CREATE TABLE "users_awards" (
	"id" serial primary key,
	"user_id" int NOT NULL references "user",
	"awards_id" int NOT NULL references "awards"
);