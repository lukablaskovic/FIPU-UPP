import express from "express";
import { body, validationResult } from "express-validator";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
let orders = [];

app.post(
  "/orders",
  body("customerName").isString().notEmpty(), // validacija podataka koristeći express-validator middleware funkcije
  body("customerEmail").isEmail(),
  body("items").isArray({ min: 1 }),
  body("items.*.name").isString().notEmpty(),
  body("items.*.quantity").isInt({ min: 1 }),
  body("items.*.price").isFloat({ min: 0 }),
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); // u slučaju greške, vraćamo složeni objekt sa svim validacijskim greškama
    }

    const { customerName, customerEmail, items } = req.body;
    // izračun ukupnog iznosa narudžbe
    const totalAmount = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    const orderId = orders.length + 1;
    const newOrder = {
      id: orderId,
      customerName,
      customerEmail,
      items,
      totalAmount,
      status: "Processed",
    };

    orders.push(newOrder);
    console.log("Nova narudžba obrađena:", newOrder);
    res.status(201).json(newOrder); // vraćamo odgovor s podacima o obrađenoj narudžbi
  },
);

// random slike proizvoda
let product_images = [
  {
    name: "laptop",
    url: "https://png.pngtree.com/png-vector/20250304/ourmid/pngtree-sleek-modern-laptop-with-high-resolution-display-png-image_15711292.png",
  },
  {
    name: "TV",
    url: "https://static.vecteezy.com/system/resources/thumbnails/038/015/883/small/ai-generated-modern-tv-isolated-on-transparent-background-free-png.png",
  },
];

app.post(
  "/order-confirmation-email",
  body("customerEmail").isEmail(),
  body("orderId").isInt({ min: 1 }),
  body("customerName").optional().isString(),
  body("totalAmount").optional().isFloat({ min: 0 }),
  body("status").optional().isString(),
  body("items").isArray({ min: 1 }),
  body("items.*.name").isString().notEmpty(),
  body("items.*.quantity").isInt({ min: 1 }),
  body("items.*.price").isFloat({ min: 0 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { customerEmail, orderId, items } = req.body;

    // Mapiramo slike proizvoda na stavke narudžbe
    const orders = items.map((item) => {
      const product = product_images.find(
        (p) => p.name.toLowerCase() === item.name.toLowerCase(),
      );
      return {
        name: item.name,
        units: item.quantity,
        price: (item.price * item.quantity).toFixed(2),
        image_url: product ? product.url : "",
      };
    });

    // Generiranje HTML sadržaja za narudžbe (ovo se primjenjuje u predložak na {{{orders_html}}} )
    const ordersHtml = orders
      .map(
        (order) => `
      <table style="width: 100%; border-collapse: collapse">
        <tr style="vertical-align: top">
          <td style="padding: 24px 8px 0 4px; display: inline-block; width: max-content">
            <img style="height: 64px" height="64px" src="${order.image_url}" alt="item" />
          </td>
          <td style="padding: 24px 8px 0 8px; width: 100%">
            <div>${order.name}</div>
            <div style="font-size: 14px; color: #888; padding-top: 4px">QTY: ${order.units}</div>
          </td>
          <td style="padding: 24px 4px 0 0; white-space: nowrap">
            <strong>$${order.price}</strong>
          </td>
        </tr>
      </table>
    `,
      )
      .join("");

    // Dummy izračun troškova dostave i poreza
    const subtotal = items.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0,
    );
    const shipping = 10.0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    const emailData = {
      service_id: process.env.SERVICE_ID,
      template_id: process.env.TEMPLATE_ID,
      user_id: process.env.PUBLIC_KEY,
      accessToken: process.env.PRIVATE_KEY,
      template_params: {
        order_id: orderId,
        orders_html: ordersHtml,
        cost_shipping: shipping.toFixed(2),
        cost_tax: tax.toFixed(2),
        cost_total: total.toFixed(2),
        email: customerEmail,
      },
    };

    try {
      const response = await axios.post(
        "https://api.emailjs.com/api/v1.0/email/send",
        emailData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      console.log("Email poslan:", response.data);
      res.status(200).json({ message: "Email poslan uspješno." });
    } catch (error) {
      console.error("Greška pri slanju emaila:", error.response.data);
      res.status(500).json({ error: "Došlo je do greške pri slanju emaila." });
    }
  },
);

app.listen(PORT, () => {
  console.log(`Order Management API sluša na http://localhost:${PORT}`);
});
