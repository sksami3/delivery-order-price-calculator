import request from 'supertest';
import app from '../app'; // Adjust path if necessary
import axios from 'axios';

jest.mock('axios'); // Mock Axios for API calls

const mockStaticData = { data: { location: { lat: 60.1695, lon: 24.9354 } } };
const mockDynamicData = { data: { base_price: 100, distance_ranges: [5000, 10000] } };

(axios.get as jest.Mock).mockImplementation((url: string) => {
  if (url.includes('/static')) return Promise.resolve(mockStaticData);
  if (url.includes('/dynamic')) return Promise.resolve(mockDynamicData);
  return Promise.reject(new Error('Invalid URL'));
});

describe('Delivery Order Price Calculator API', () => {
  it('should return the calculated delivery price', async () => {
    const response = await request(app).get('/api/v1/delivery-order-price')
      .query({
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
    const response = await request(app).get('/api/v1/delivery-order-price')
      .query({
        cart_value: 800,
        user_lat: 60.1695,
        user_lon: 24.9354,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required query parameters.');
  });

  it('should handle internal server errors', async () => {
    jest.spyOn(require('../../src/services/deliveryService'), 'calculatePrice')
      .mockImplementationOnce(() => {
        throw new Error('Mocked service error');
      });

    const response = await request(app).get('/api/v1/delivery-order-price')
      .query({
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
