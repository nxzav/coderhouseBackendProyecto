import { MercadoPagoConfig, Preference } from 'mercadopago';
import config from '../config/config.js';

const client = new MercadoPagoConfig({ accessToken: config.mpAccessToken });

export const createPreference = async (req, res) => {
  try {
    const body = {
      items: [
        {
          title: req.body.title,
          quantity: Number(req.body.quantity),
          unit_price: Number(req.body.price),
          currency_id: 'MXN',
        },
      ],
      back_urls: {
        success: 'https://www.google.com',
        failure: 'https://www.google.com',
        pending: 'https://www.google.com',
      },
      auto_return: 'approved',
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    console.log(result);
    res.json({ id: result.id });
  } catch (error) {
    logger.error('Create preference error: ', error);
    res.status(500).json({ success: false, msg: 'Internal Server Error' });
  }
};
