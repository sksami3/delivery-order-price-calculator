import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

const deliveryPriceSchema = Joi.object({
  venue_slug: Joi.string().required(),
  cart_value: Joi.number().integer().min(0).required(),
  user_lat: Joi.number().required(),
  user_lon: Joi.number().required(),
});

const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const { error } = deliveryPriceSchema.validate(req.query);

  if (error) {
    res.status(400).json({ error: error.details[0].message });
    return; // Stop further execution if validation fails
  }

  next(); // Pass control to the next middleware if validation succeeds
};

export default validateRequest;
