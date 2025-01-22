import axios from "axios";
import { calculateDistance } from "../utils/distance";
import { calculateDeliveryFee } from "../utils/deliveryFee";
import { DynamicDataResponse, StaticDataResponse, VenueLocation } from "../types/interface";

export const calculatePrice = async (
  venueSlug: string,
  cartValue: number,
  userLat: number,
  userLon: number
) => {
  if (!process.env.HOME_ASSIGNMENT_BASE_API) {
    throw new Error("Environment variable HOME_ASSIGNMENT_BASE_API is not defined.");
  }

  const staticDataUrl = `${process.env.HOME_ASSIGNMENT_BASE_API}/v1/venues/${venueSlug}/static`;
  const dynamicDataUrl = `${process.env.HOME_ASSIGNMENT_BASE_API}/v1/venues/${venueSlug}/dynamic`;

  try {
    const [staticData, dynamicData] = await Promise.all([
      axios.get<StaticDataResponse>(staticDataUrl),
      axios.get<DynamicDataResponse>(dynamicDataUrl),
    ]);

    const venueLocation: VenueLocation = {
      lat: staticData.data.venue_raw.location.coordinates[1],
      lon: staticData.data.venue_raw.location.coordinates[0],
    };

    const deliveryDistance = Math.round(
      calculateDistance(venueLocation, { lat: userLat, lon: userLon })
    );

    const deliveryPricing = dynamicData.data.venue_raw.delivery_specs.delivery_pricing;

    const deliveryFee = calculateDeliveryFee(deliveryDistance, deliveryPricing);

    const orderMinimum = dynamicData.data.venue_raw.delivery_specs.order_minimum_no_surcharge;
    const smallOrderSurcharge = cartValue < orderMinimum ? 500 : 0;

    // Calculate total price
    const totalPrice = cartValue + deliveryFee + smallOrderSurcharge;

    return {
      total_price: totalPrice,
      cart_value: cartValue,
      small_order_surcharge: smallOrderSurcharge,
      delivery: {
        fee: deliveryFee,
        distance: deliveryDistance,
      },
    };
  } catch (error: any) {
    console.error("Error calculating price:", error.message);
    throw new Error(`Failed to calculate price: ${error.message}`);
  }
};