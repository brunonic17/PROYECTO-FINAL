import mercadopago from "mercadopago";

import { TokenMercadoPago } from "../config.js";
// SDK de Mercado Pago
import  MercadoPagoConfig  from "mercadopago";
import  Payment  from "mercadopago";


export const createOrder = async (req, res) => {
  const { TotalCarro, user, cantidadTotal, userEmail } = req.body;
  console.log(user, TotalCarro)
  // try {
  //   // Agrega credenciales
  //   const client = new MercadoPagoConfig({ accessToken: TokenMercadoPago });
  //   const payment = new Payment(client);

  //   const result = await payment.create({
  //     body: {
  //       items: [
  //         {
  //           title: user,
  //           quantity: 1,
  //           unit_price: TotalCarro,
  //           currency_id: "ARS",
  //           // payer: {
  //           //   name: user,
  //           //   email: userEmail,
  //           // },
  //         },
  //       ],
  //       back_urls: {
  //         success: "https://7db8-181-84-147-230.ngrok-free.app/success",
  //         failure: "https://www.youtube.com",
  //         pending: "https://www.youtube.com/watch?v=-VD-l5BQsuE",
  //       },
  //       auto_return: "approved",
  //     },
  //   });
  //   res.send(result.body);
  //   console.log(result.body);
  // } catch (error) {
  //   res.status(500).send("Error creando Orden de Pago");
  //   console.log(error)
  // }

  // console.log(req.body)
    try {
      // const payment =  new Payment(client)
      mercadopago.configure({
        access_token: TokenMercadoPago,
      });

      var preference = {
        items: [
          {
            description: user,
            title: user,
            quantity: 1,
            currency_id: "ARS",
            unit_price: TotalCarro,
          }
        ],
        back_urls: {
          success: "https://www.youtube.com",
          failure: "http://localhost:5050/failure",
          pending: "http://localhost:5050/pending",
        },
        auto_return: "approved",
        // notification_url: "https://7db8-181-84-147-230.ngrok-free.app/webhook",
      };
  //PIDIENDO UNA ORDEN DE CCOMPRA
      const result = await mercadopago.preferences.create(preference);
      console.log(result.body);
      res.send(result.body);
    } catch (error) {
      console.error(error);
      res.status(500).send("Error creando Orden de Pago");
    }
};

export const receiveWebhook = (req, res) => {
  console.log(req.body);
  res.status(200).send("Webhook Received");
};
