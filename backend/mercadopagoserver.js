require("dotenv").config();
const express = require("express");
const { MercadoPagoConfig, Preference } = require("mercadopago");
const fetch = require("node-fetch");
const cors = require("cors");
const router = express.Router();




// Configuración Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MP_ACCESS_TOKEN,
});

// Ruta para crear preferencia de pago
router.post("/create_preference", async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Se necesita al menos un producto" });
    }

    const preference = new Preference(client);

    const result = await preference.create({
      body: {
        items: products.map((product) => ({
          title: product.title,
          quantity: Number(product.quantity),
          unit_price: Number(product.unit_price),
        })),
        currency_id: "ARS",
        back_urls: {
          success: `${process.env.FRONTEND_URL}/success`,
          failure: `${process.env.FRONTEND_URL}/failure`,
          pending: `${process.env.FRONTEND_URL}/pending`,
        },
        auto_return: "approved",
        notification_url: `${process.env.TUNNEL_HOST}/webhook`,
      },
    });

    res.json({ init_point: result.init_point });
  } catch (error) {
    console.error("Error al crear preferencia:", error);
    res.status(500).send("No se pudo crear la preferencia de pago");
  }
});

// Ruta para recibir notificaciones webhook de Mercado Pago
router.post("/webhook", async (req, res) => {
  try {
    const queryType = req.query.type;
    const queryId = req.query["data.id"];
    const bodyType = req.body.type;
    const bodyId = req.body?.data?.id;

    const type = queryType || bodyType;
    const id = queryId || bodyId;

    if (type === "payment" && id) {
      const result = await getPaymentDetails(id);

      if (result.status === "approved") {
        console.log("✅ Pago aprobado");
        // Aquí podes agregar lógica extra, ej: actualizar base de datos
      } else if (result.status === "rejected") {
        console.log("❌ Pago rechazado");
      } else if (result.status === "in_process") {
        console.log("⏳ Pago en proceso");
      }
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error al procesar webhook:", error);
    res.status(500).send("Error interno");
  }
});

async function getPaymentDetails(id) {
  const token = process.env.MP_ACCESS_TOKEN;
  const response = await fetch(`https://api.mercadopago.com/v1/payments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
}


module.exports = router;
