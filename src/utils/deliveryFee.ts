export const calculateDeliveryFee = (distance: number): number => {
    if (distance <= 1000) return 200; // Example: $2 for ≤1km
    if (distance <= 5000) return 500; // Example: $5 for 1-5km
    return 1000; // Example: $10 for >5km
  };
  