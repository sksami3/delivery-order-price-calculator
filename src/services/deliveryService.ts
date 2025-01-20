import axios from 'axios';
import { calculateDistance } from '../utils/distance';
import { calculateDeliveryFee } from '../utils/deliveryFee';

interface VenueLocation {
  lat: number;
  lon: number;
}

interface StaticDataResponse {
  location: VenueLocation;
}

interface DynamicDataResponse {
  base_price: number;
  distance_ranges: number[];
}

export const calculatePrice = async (
  venueSlug: string,
  cartValue: number,
  userLat: number,
  userLon: number
) => {
  const staticDataUrl = `${process.env.HOME_ASSIGNMENT_API}/v1/venues/${venueSlug}/static`;
  const dynamicDataUrl = `${process.env.HOME_ASSIGNMENT_API}/v1/venues/${venueSlug}/dynamic`;

  const staticData = (await axios.get<StaticDataResponse>(staticDataUrl)).data;
  const dynamicData = (await axios.get<DynamicDataResponse>(dynamicDataUrl)).data;

  const venueLocation: VenueLocation = staticData.location;
  const deliveryDistance = calculateDistance(venueLocation, { lat: userLat, lon: userLon });

  const deliveryFee = calculateDeliveryFee(deliveryDistance);
  const smallOrderSurcharge = cartValue < 1000 ? 500 : 0; // Example threshold
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
};
