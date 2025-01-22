import { DynamicDataResponse } from "../types/interface";

export const calculateDeliveryFee = (
  deliveryDistance: number,
  deliveryPricing: DynamicDataResponse["venue_raw"]["delivery_specs"]["delivery_pricing"]
): number => {
  const { base_price, distance_ranges } = deliveryPricing;

  let deliveryFee = base_price;
  for (const range of distance_ranges) {
    if (
      deliveryDistance >= range.min &&
      (range.max === 0 || deliveryDistance <= range.max)
    ) {
      deliveryFee += range.a + range.b * deliveryDistance;
      break;
    }
  }

  return deliveryFee;
};
