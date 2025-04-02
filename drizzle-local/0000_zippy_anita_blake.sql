CREATE SCHEMA "delivery_service";
--> statement-breakpoint
CREATE SCHEMA "listing_service";
--> statement-breakpoint
CREATE SCHEMA "notification_service";
--> statement-breakpoint
CREATE SCHEMA "order_service";
--> statement-breakpoint
CREATE SCHEMA "payment_service";
--> statement-breakpoint
CREATE SCHEMA "user_service";
--> statement-breakpoint
CREATE TYPE "delivery_service"."category" AS ENUM('BASE', 'XL');--> statement-breakpoint
CREATE TYPE "delivery_service"."status" AS ENUM('AWAITING_PICKUP', 'IN_TRANSIT', 'DELIVERED', 'ORDER_CANCELLED', 'DRIVER_CANCELLED');--> statement-breakpoint
CREATE TYPE "delivery_service"."recommended_category" AS ENUM('BASE', 'XL');--> statement-breakpoint
CREATE TYPE "delivery_service"."recommended_vehicle_size_category" AS ENUM('SMALL', 'MED', 'LARGE');--> statement-breakpoint
CREATE TABLE "delivery_service"."deliveries" (
	"id" uuid PRIMARY KEY NOT NULL,
	"driver_id" uuid,
	"order_id" uuid,
	"status" "delivery_service"."status",
	"cancellation_reason" text,
	"cancelled_at" timestamp,
	"category" "delivery_service"."category",
	"delivery_notes" text,
	"pickup_time" text,
	"travel_distance" integer,
	"travel_time" integer,
	"eta" integer,
	"pickup_address_full" json,
	"dropoff_address_full" json,
	"oversized_assistance_required" boolean,
	"total_fee" numeric,
	"started_at" timestamp,
	"closed_at" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "delivery_service"."pricing_requests" (
	"id" uuid PRIMARY KEY NOT NULL,
	"recommended_category" "delivery_service"."recommended_category",
	"recommended_vehicle_size_category" "delivery_service"."recommended_vehicle_size_category",
	"pickup_address_full" json,
	"dropoff_address_full" json,
	"total_fee" numeric,
	"surcharges" json[],
	"distance_charge" numeric,
	"weight_charge" numeric,
	"travel_distance" integer,
	"travel_time" integer,
	"selected_pickup_time" text,
	"expires_at" timestamp,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "listing_service"."listings" (
	"title" varchar NOT NULL,
	"seller_id" uuid NOT NULL,
	"purchase_type" varchar DEFAULT 'SALE',
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price" numeric NOT NULL,
	"condition" varchar
);
--> statement-breakpoint
CREATE TABLE "notification_service"."notifications" (
	"title" varchar NOT NULL,
	"seller_id" uuid NOT NULL,
	"purchase_type" varchar DEFAULT 'SALE',
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"price" numeric NOT NULL,
	"condition" varchar
);
--> statement-breakpoint
CREATE TABLE "order_service"."checkout" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"line_items" jsonb NOT NULL,
	"subtotal" numeric(10, 2) NOT NULL,
	"tax_amount" numeric(10, 2) NOT NULL,
	"shipping_method" varchar(50),
	"delivery_fee" numeric(10, 2),
	"discount_code" varchar(50),
	"discount_amount" numeric(10, 2),
	"total_amount" numeric(10, 2) NOT NULL,
	"status" varchar(20) DEFAULT 'PENDING' NOT NULL,
	"created_at" timestamp DEFAULT NOW() NOT NULL,
	"expires_at" timestamp DEFAULT NOW() + INTERVAL '1 hour'
);
--> statement-breakpoint
CREATE TABLE "order_service"."orders" (
	"status" varchar,
	"checkout_request_id" uuid,
	"total" numeric
);
--> statement-breakpoint
CREATE TABLE "payment_service"."transactions" (
	"payment_system_transaction_id" varchar,
	"payment_method" varchar,
	"id" uuid DEFAULT gen_random_uuid(),
	"amount" numeric NOT NULL,
	"currency" varchar DEFAULT 'USD',
	"status" varchar,
	"customer_id" varchar,
	"listing_id" varchar
);
--> statement-breakpoint
CREATE TABLE "user_service"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"auth_system_id" varchar
);
--> statement-breakpoint
CREATE TABLE "user_service"."sellers_schedule" (
	"day" integer,
	"start_time" varchar,
	"end_time" varchar
);
--> statement-breakpoint
CREATE TABLE "user_service"."sellers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"page_name" varchar
);
