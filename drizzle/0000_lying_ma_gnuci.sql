CREATE TABLE "Listings" (
	"title" varchar NOT NULL,
	"seller_id" uuid NOT NULL,
	"purchase_type" varchar DEFAULT 'SALE',
	"id" uuid DEFAULT gen_random_uuid(),
	"price" numeric NOT NULL
);
