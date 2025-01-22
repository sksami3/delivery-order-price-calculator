import { calculateDeliveryFee } from "../utils/deliveryFee";

const deliveryPricingMock = {
  base_price: 190,
  distance_ranges: [
    { min: 0, max: 500, a: 100, b: 0 },
    { min: 500, max: 1000, a: 200, b: 0 },
    { min: 1000, max: 1500, a: 300, b: 0 },
  ],
};

test("should calculate delivery fee correctly", () => {
  const deliveryFee = calculateDeliveryFee(750, deliveryPricingMock);
  expect(deliveryFee).toBe(390); 
});
