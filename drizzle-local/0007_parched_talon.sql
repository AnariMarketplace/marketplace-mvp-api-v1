ALTER TABLE "order_service"."checkout_session" ALTER COLUMN "listing_ids" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ALTER COLUMN "created_at" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "order_service"."checkout_session" ALTER COLUMN "updated_at" DROP NOT NULL;