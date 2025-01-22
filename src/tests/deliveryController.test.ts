import request from 'supertest';
import app from '../app';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockStaticData = {
  data: {
    venue_raw: {
      location: { coordinates: [24.9354, 60.1695] }, // Lon, Lat
    },
  },
};

const mockDynamicData = {
  data: {
    venue_raw: {
      delivery_specs: {
        order_minimum_no_surcharge: 1000,
        delivery_pricing: {
          base_price: 200,
          distance_ranges: [
            { min: 0, max: 5000, a: 50, b: 0.01 },
            { min: 5001, max: 10000, a: 100, b: 0.02 },
          ],
        },
      },
    },
  },
};

mockedAxios.get.mockImplementation((url: string) => {
  if (url.includes('/static')) {
    return Promise.resolve(mockStaticData);
  }
  if (url.includes('/dynamic')) {
    return Promise.resolve(mockDynamicData);
  }
  return Promise.reject(new Error('Invalid URL'));
});

describe('Delivery Order Price Calculator API', () => {
  it('should return the calculated delivery price', async () => {
    const response = await request(app).get('/api/v1/delivery-order-price').query({
      venue_slug: 'test_venue',
      cart_value: 800,
      user_lat: 60.1695,
      user_lon: 24.9354,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total_price');
    expect(response.body).toHaveProperty('cart_value', 800);
    expect(response.body).toHaveProperty('small_order_surcharge');
    expect(response.body.delivery).toHaveProperty('fee');
    expect(response.body.delivery).toHaveProperty('distance');
  });

  it('should return 400 for missing query parameters', async () => {
    const response = await request(app).get('/api/v1/delivery-order-price').query({
      cart_value: 800,
      user_lat: 60.1695,
      user_lon: 24.9354,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', '"venue_slug" is required');
  });

  it('should handle internal server errors', async () => {
    jest
      .spyOn(require('../services/deliveryService'), 'calculatePrice')
      .mockImplementationOnce(() => {
        throw new Error('Mocked service error');
      });

    const response = await request(app).get('/api/v1/delivery-order-price').query({
      venue_slug: 'test_venue',
      cart_value: 800,
      user_lat: 60.1695,
      user_lon: 24.9354,
    });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
    expect(response.body).toHaveProperty('details', 'Mocked service error');
  });
});
