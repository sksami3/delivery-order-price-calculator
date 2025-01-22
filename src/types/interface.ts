export interface VenueLocation {
    lat: number;
    lon: number;
  }
  
  export interface StaticDataResponse {
    venue_raw: {
      location: {
        coordinates: [number, number]; // Latitude and Longitude
      };
      delivery_base_price: number; 
    };
  }
  
  export interface DynamicDataResponse {
    venue_raw: {
      delivery_specs: {
        order_minimum_no_surcharge: number; 
        delivery_pricing: {
          base_price: number; 
          distance_ranges: Array<{
            min: number; 
            max: number; 
            a: number;   
            b: number;   
          }>;
        };
      };
    };
  }
  