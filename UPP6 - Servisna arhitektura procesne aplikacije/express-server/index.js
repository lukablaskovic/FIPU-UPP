import express from "express";
import cors from "cors";

const PORT = 8000;

const app = express();
app.use(express.json());
app.use(cors());

let korisnici = [
  {
    ime: "Marko",
    prezime: "Marić",
    username: "marko.maric",
    email: "mmaric@gmail.com",
  },
  {
    ime: "Pero",
    prezime: "Perić",
    username: "ppppp.pero",
    email: "ppero123@gmail.com",
  },
  {
    ime: "Ana",
    prezime: "Anić",
    username: "ana.anic",
    email: "aanic@gmail.com",
  },
];

app.get("/", (req, res) => {
  console.log("Zahtjev primljen!");
  res.status(200).send("Pozdrav iz Express.js poslužitelja!");
});

app.get("/user", (req, res) => {
  console.log("Zahtjev primljen na /user");
  res.status(200).json({
    ime: "Marko",
    prezime: "Marić",
  });
});

app.post("/user", (req, res) => {
  console.log("Zahtjev primljen na /user");
  console.log(req.body);
  let prezime = req.body.prezime;
  let korisnik = korisnici.find((korisnik) => korisnik.prezime === prezime);
  if (!korisnik) {
    return res.status(404).json({ message: "Korisnik nije pronađen." });
  } else {
    return res.status(200).json(korisnik);
  }
});

app.listen(PORT, () => {
  console.log(`Poslužitelj sluša na adresi http://localhost:${PORT}`);
});
