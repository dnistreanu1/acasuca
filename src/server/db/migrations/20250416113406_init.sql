CREATE TYPE "public"."building_type_enum" AS ENUM('apartment', 'house', 'industrial');--> statement-breakpoint
CREATE TYPE "public"."owner_type_enum" AS ENUM('individual', 'agency', 'developer');--> statement-breakpoint
CREATE TYPE "public"."state_enum" AS ENUM('new', 'almost_new', 'needs_repair');--> statement-breakpoint
CREATE TABLE "listing" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar(128) NOT NULL,
	"country" varchar(128) NOT NULL,
	"city" varchar(128) NOT NULL,
	"address" varchar(128) NOT NULL,
	"latitude" numeric(9, 6) NOT NULL,
	"longitude" numeric(9, 6) NOT NULL,
	"floor" integer NOT NULL,
	"max_floor" integer NOT NULL,
	"price" numeric(10, 0) NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"description" text NOT NULL,
	"is_negociable" boolean DEFAULT false,
	"area" numeric NOT NULL,
	"rooms" integer NOT NULL,
	"owner_type" "owner_type_enum" NOT NULL,
	"ownership_type" varchar(128) NOT NULL,
	"building_type" "building_type_enum" NOT NULL,
	"handover_year" numeric NOT NULL,
	"is_closed_kitchen" boolean NOT NULL,
	"availableAfter" timestamp NOT NULL,
	"state" "state_enum" NOT NULL,
	"estimated_rent" numeric NOT NULL,
	"is_active" boolean DEFAULT true,
	"total_views" numeric,
	"total_likes" numeric,
	"is_accepting_mortgage_loan" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_comment" (
	"user_id" integer,
	"listing_id" integer,
	"comment_text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"rating" integer
);
--> statement-breakpoint
CREATE TABLE "user_listing" (
	"user_id" integer,
	"listing_id" integer
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" varchar(128) NOT NULL,
	"email" varchar(128) NOT NULL,
	"password" varchar(128) NOT NULL,
	"first_name" varchar(128) NOT NULL,
	"last_name" varchar(128) NOT NULL,
	"phone" varchar(128) NOT NULL,
	"date_of_birth" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"is_active" boolean DEFAULT true,
	"rating" integer
);
--> statement-breakpoint
ALTER TABLE "user_comment" ADD CONSTRAINT "user_comment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_comment" ADD CONSTRAINT "user_comment_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_listing" ADD CONSTRAINT "user_listing_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_listing" ADD CONSTRAINT "user_listing_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE no action ON UPDATE no action;