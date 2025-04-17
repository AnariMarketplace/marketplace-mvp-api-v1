CREATE TABLE "user_service"."driver_realtime_metadata" (
	"user_id" uuid,
	"is_on_shift" boolean,
	"last_active_at" timestamp,
	"last_lat" double precision,
	"last_lng" double precision,
	"location_last_updated_at" timestamp,
	"is_on_delivery" boolean
);
--> statement-breakpoint
CREATE TABLE "user_service"."drivers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"first_name" text,
	"last_name" text,
	"user_id" uuid
);
