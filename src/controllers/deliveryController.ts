import { Request, Response } from 'express';
import { calculatePrice } from '../services/deliveryService';

export const calculateDeliveryPrice = async (req: Request, res: Response): Promise<void> => {
  try {
    const { venue_slug, cart_value, user_lat, user_lon } = req.query;

    if (!venue_slug || !cart_value || !user_lat || !user_lon) {
      res.status(400).json({ error: 'Missing required query parameters.' });
      return;
    }

    const result = await calculatePrice(
      venue_slug as string,
      parseInt(cart_value as string, 10),
      parseFloat(user_lat as string),
      parseFloat(user_lon as string)
    );

    res.status(200).json(result);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({
        error: 'Internal Server Error',
        details: error.message,
      });
    } else {
      res.status(500).json({ error: 'Internal Server Error', details: 'Unknown error' });
    }
  }
};
