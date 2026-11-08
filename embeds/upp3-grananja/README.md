# UPP3 · Grananja i spajanja

Samostalni interaktivni HTML na hrvatskom. XOR, AND i OR, kratka pravila grananja i spajanja te ručno završavanje aktivnosti A/B/C. Bez vanjskih biblioteka, fontova, mrežnih zahtjeva i pohrane. Pozadina je prozirna za ugradnju u Merlin.

Otvori `index.html` u pregledniku. Neovisno odaberi skretnicu grananja, skretnicu spajanja i uvjete, pokreni tok pa završi aktivnosti. **Početno stanje** omogućuje novi odabir. Promjena skretnice također resetira primjer.

## Merlin

Učitaj `index.html` kao resurs Datoteka. Za prikaz na naslovnici kolegija, po uzoru na HTTP embed, postavi iframe sa stvarnom adresom učitane HTML datoteke u opis resursa i uključi prikaz opisa na naslovnici. Adresu preuzmi iz spremljenog resursa; nemoj koristiti lokalnu putanju. Dostupnost prikaza ovisi o postavkama Merlina.

```html
<iframe src="REPLACE_WITH_UPLOADED_HTML_URL"
  title="UPP3 — Grananja i spajanja"
  width="100%" height="1050"
  style="width:100%;border:0;background:transparent;"
  loading="lazy"></iframe>
```

Predložak nema stvarnu adresu. Učitavanje i prikaz u Merlinu nisu provjereni.

## Nastavni opseg

Prikazan je jedan prolazak kroz grananje i neovisno odabrano spajanje, bez petlji. Odabiri predstavljaju rezultate uvjeta, a ne korisničke zadatke u stvarnom procesu. OR čeka pokrenute grane u ovom konkretnom modelu. XOR spajanje propušta svaki pristigli tok bez sinkronizacije. Moguće je isprobati svih devet kombinacija: XOR spajanje aktivira izlaz za svaki pristigli tok, AND može ostati u zastoju kada neke grane nisu pokrenute, a OR čeka sve pokrenute grane. Izvor: lokalno poglavlje UPP3 i [BPMN 2.0.2, odjeljak 13.4](https://www.omg.org/spec/BPMN/2.0.2/PDF).

## Provjera

Uz postojeći Playwright iz `script-patcher`, iz korijena repozitorija:

```sh
node embeds/upp3-grananja/test.mjs
```

Provjerava svih devet parova skretnica, sve XOR odabire i neprazne OR kombinacije, AND zastoj i višestruke XOR izlaske, prazan odabir, ponovno pokretanje, reset, tipkovnicu, širine 320/375/768 px i JavaScript pogreške. Snimke: `/tmp/upp3-desktop.png` i `/tmp/upp3-mobile.png`.
