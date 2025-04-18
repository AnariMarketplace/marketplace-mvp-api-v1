# ER Diagram for Services Tables

This diagram shows the entity relationships among the **Order Service**, **Listing Service**, **User Service**, and **Delivery Service**.

```mermaid
%%{init: {'theme':'default'}}%%
erDiagram
"order-service:checkout" {
  uuid id PK
  uuid[] listing_ids FK
  json customer_info "{name, email, phone}"
  timestamp created_at
  timestamp updated_at
  text status "ENUM: (PENDING,COMPLETED)"
  text order_notes
  text delivery_address
  text delivery_pricing_request_id FK
  double subtotal
  enum status
}



"listing-service:listings" {
  uuid id PK
  string title
  enum type "ENUM: (SALE, RENT)"
  string sellerId FK
  float price
  text description
  text[] photo_urls
  text condition "ENUM: (NEW, GREAT, GOOD, FAIR)"
  json specs
  int availableQty
  text category
  text subCategory
  bool priceNegotiable
  bool isFragile
}

"user-service:users"{
  uuid id PK
  text email
  text auth_id
}

"user-service:sellers" {
  uuid id PK
  text pageName
  text first_name
  text last_name
  bool acceptingPayments
  bool isVerified
  text photo_url
  timestamp hours_start
  timestamp hours_end
  string pickup_address_city
  string pickup_address_state
  string pickup_address_zip
  string pickup_address_full
  string pickup_address_coords
  uuid user_id FK
}

"payment-service:transactions" {
  uuid id
  text payment_service_charge_id
  text payment_service_intent_id
  text status
}

"order-service:orders"{
  uuid id PK
  uuid[] listingIds FK
  json customerInfo "{name,email,phone}"
  timestamp createdAt
  timestamp updatedAt
  text status "ENUM: (PENDING,COMPLETED)"
  text orderNotes
  text deliveryAddress
  text deliveryPricingRequestId FK
}

"delivery-service:pricing-requests"{
  uuid id PK
  enum recommended_category "ENUM (BASE,XL)"
  enum recommended_vehicle_size_category "ENUM (SMALL,MED,LARGE)"
  json pickup_address_full
  json dropoff_address_full
  double total_fee
  json[] surcharges "{reason,fee}"
  double distance_charge
  double weight_charge
  int travel_distance
  int travel_time
  text selected_pickup_time
  timestamp expires_at
  timestamp createdAt
  timestamp updatedAt
}

"delivery-service:deliveries"{
  uuid id PK
  uuid driver_id FK "** will be null until driver found"
  uuid order_id
  enum status "ENUM (AWAITING_PICKUP, IN_TRANSIT, DELIVERED, ORDER_CANCELLED, DRIVER_CANCELLED)"
  text cancellation_reason
  timestamp cancelled_at
  enum category "ENUM (BASE,XL)"
  text delivery_notes
  text pickup_time
  int travel_distance
  int travel_time
  int eta
  json pickup_address_full
  json dropoff_address_full
  bool oversized_assistance_required
  double total_fee "** the driver's payout amount **"
  timestamp started_at
  timestamp closed_at
  timestamp createdAt
  timestamp updatedAt
}

"user-service:drivers"{
  uuid id PK
  text first_name
  text last_name
  text email
  enum vehicle_category "Enum(SMALL,MID,LARGE)"
  text photo
  json vehicle_metadata "{
    license_plate,
    make,
    model,
    year,
    color
  }"
}

"user-service:drivers_realtime_metadata"{
  uuid driver_id FK
  bool is_active
  timestamp last_active_at
  coords current_lat
  coords current_lng
  bool is_on_delivery
}

"user-service:sellers" ||--|{ "listing-service:listings" : "manages"
"order-service:checkout" ||--|{ "listing-service:listings" : "has"
"order-service:orders" ||--|{ "listing-service:listings" : "has"
"order-service:checkout"||--||checkout-indexes : "uses"
"user-service:sellers" ||--o{ "user-service:users" : "is"
"user-service:drivers" ||--o{ "user-service:users" : "is"
```
