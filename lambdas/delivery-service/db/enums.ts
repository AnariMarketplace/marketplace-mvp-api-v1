import { deliveryServiceSchema } from './schema';

export const recommendedCategoryEnum = deliveryServiceSchema.enum('recommended_category', ['BASE', 'XL']);
export const recommendedVehicleSizeCategoryEnum = deliveryServiceSchema.enum('recommended_vehicle_size_category', [
    'SMALL',
    'MED',
    'LARGE'
]);

export const deliveryStatusEnum = deliveryServiceSchema.enum('status', [
    'AWAITING_PICKUP',
    'IN_TRANSIT',
    'DELIVERED',
    'ORDER_CANCELLED',
    'DRIVER_CANCELLED'
]);
export const deliveryCategoryEnum = deliveryServiceSchema.enum('category', ['BASE', 'XL']);
