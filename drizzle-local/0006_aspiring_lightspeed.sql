ALTER TABLE "order_service"."checkout" RENAME TO "checkout_session";--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ALTER COLUMN "delivery_address" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ALTER COLUMN "pickup_address" SET DATA TYPE varchar(255);--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "listing_ids" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "customer_info" jsonb;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "subtotal" numeric(10, 2);--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "pickup_time" timestamp;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "order_notes" text DEFAULT '';--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "user_service"."sellers" ADD COLUMN "pickup_address" text;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" DROP COLUMN "delivery_fee";