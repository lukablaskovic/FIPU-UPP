import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const { SERVICE_ID, TEMPLATE_ID, PUBLIC_KEY, PRIVATE_KEY } = process.env;

const PORT = 3000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Zahtjev primljen!");
  res.status(200).send("Pozdrav iz express-email-server poslužitelja!");
});

app.post("/send-email", async (req, res) => {
  try {
    const { ime, prezime, email, username } = req.body; // dohvaćanje podataka o korisniku
    const response = await axios.post(
      "https://api.emailjs.com/api/v1.0/email/send",
      {
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        accessToken: PRIVATE_KEY,
        // podaci koji se koriste u predlošku e-mail poruke
        template_params: {
          ime: ime,
          prezime: prezime,
          email: email,
          username: username,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    res.status(200).json({
      message: "Email uspješno poslan!",
      data: response.data,
    });
  } catch (error) {
    console.error(
      "Greška prilikom slanja emaila: ",
      (error.response && error.response.data) || error.message
    );
    res.status(500).json({
      error: "Greška prilikom slanja emaila!",
      details: (error.response && error.response.data) || error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Poslužitelj sluša na adresi http://localhost:${PORT}`);
});
