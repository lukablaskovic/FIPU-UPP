# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (3) Složena grananja

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/UPP_3.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;"></div>
<br>

<div style="float: clear; margin-right:5px;"> Skretnice upravljaj slijedom izvođenja aktivnosti u procesu. Do sad smo vidjeli kako možemo koristi jednostavne ekskluzivne skretnice za odabir između dvije ili više opcija prilikom izvođenja poslovnog procesa. Ključna stvar je što se uvijek odabire samo jedna opcija i to samo ona koje je zadovoljena danim uvjetom. U ovom poglavlju, upoznat ćemo se s drugim oblicima skretnicama te vidjeti kako definirati "čekanje" na rezultat izvođenja aktivnosti uvjetovanih kroz više skretnica.</div>
<br>

**🆙 Posljednje ažurirano: 20.11.2024.**

## Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(3) Složena grananja](#3-složena-grananja)
  - [Sadržaj](#sadržaj)
- [1. Ekskluzivna (eng. Exclusive) skretnica](#1-ekskluzivna-eng-exclusive-skretnica)
  - [1.1. `XOR` skretnica spajanja (eng. XOR merge/join)](#11-xor-skretnica-spajanja-eng-xor-mergejoin)
- [2. Paralelna (eng. Parallel) skretnica](#2-paralelna-eng-parallel-skretnica)
  - [2.1 `AND` skretnica spajanja (eng. AND merge/join)](#21-and-skretnica-spajanja-eng-and-mergejoin)
- [3. Inkluzivna (eng. Inclusive) skretnica](#3-inkluzivna-eng-inclusive-skretnica)
  - [3.1 `OR` skretnica spajanja (eng. OR merge/join)](#31-or-skretnica-spajanja-eng-or-mergejoin)
- [4. Ukratko, kada koristiti koju skretnicu?](#4-ukratko-kada-koristiti-koju-skretnicu)
- [Zadaci za Vježbu 3](#zadaci-za-vježbu-3)
  - [1. Wolt - dostava hrane](#1-wolt---dostava-hrane)

<div style="page-break-after: always; break-after: page;"></div>

# 1. Ekskluzivna (eng. Exclusive) skretnica

**Ekskluzivnu (XOR) skretnicu** (_eng. Exclusive gateway_) već ste upoznali kroz prethodne primjere. Ona se koristi za odabir jedne između više opcija, gdje se uvijek odabire samo maksimalno jedna opcija. Ukoliko je zadovoljen predikat (rezultat poslovne aktivnosti i/ili poslovna odluka) definiran na skretnici, izvršava se **samo jedan slijedni tok** dok se ostali tokovi zanemaruju.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/exclusive_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Ekskluzivna skretnica se definira rombom, s oznakom X
</span>
</div>

_Primjer ekskluzivne skretnice_: Nakon što se korisnik prijavi na sustav, želimo provjeriti je li korisnik administrator ili običan korisnik. Ukoliko je korisnik administrator, želimo mu prikazati dodatne opcije koje običan korisnik nema. Ukoliko je običan korisnik, želimo mu prikazati opcije koje su mu dostupne.

Samim time, na XOR skretnicu ćemo upisati uvjet `je administrator?` ili `korisnik je administrator?`. Iz skretnice definiramo **dva ili više toka** koristeći sekvencijalne tokove (linije) prema aktivnostima koje želimo izvršiti. **XOR skretnica je u pravilu skretnica uvjetovana podacima koje sa sobom donosi instanca procesa** (npr. korisnička uloga, tip korisnika, itd.).

Ovaj način korištenja skretnica zovemo **grananje** (_eng. splitting/branching_).

**Skretnica grananja** (ili samo grananje) ima jedan ulazni slijedni tok ili ulazni put (obično usmjeren u lijevi ili gornji vrh romba), a više izlaznih sljedova (iz desnog ili donjeg vrha romba).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex1.png?raw=true" style="width:70%">

> Slika 1: Primjer korištenja XOR skretnice za odabir između vrste korisnika

Međutim, što ako je sljedeća aktivnost koja slijedi nakon odabira jednaka za oba korisnika? U tom slučaju, ne želimo ponavljati istu aktivnost za svaku opciju, već želimo samo strelice toka preusmjeriti u ponavljajuću aktivnost.

_Primjer_: Nakon prijave i dohvata podataka o korisniku, želimo poslati korisniku obavijest o uspješnoj prijavi na e-mail.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex2.png?raw=true" style="width:70%">

> Slika 2: Nakon odabrane opcije, jednostavno prosljeđujemo tok prema sljedećoj aktivnosti

<div style="page-break-after: always; break-after: page;"></div>

## 1.1. `XOR` skretnica spajanja (eng. XOR merge/join)

Osim grananja, koje smo do sad koristili, skretnice je moguće koristiti i za **spajanje** (_eng. merge/join_). Spajanje se koristi kada se više tokova treba spojiti u jedan, tj. kada se više tokova vraća u jedan tok. Drugim riječima, **skretnica spajanja ima više ulaznih slijednih tokova** (lijevo ili gore) i **jedan izlazni slijedni tok** ili izlazni put (desno ili dolje).

Iako nije potrebno, u svrhu čišćeg i preciznijeg prikaza moguće je koristiti XOR skretnicu spajanja **kako bi naglasili da se izlazni tokovi spajaju u jedan tok**, koji se nastavlja čim je zadovoljen uvjet.

Kod XOR skretnice, čak i kad je moguće da je više uvjeta istinito, **ona aktivnost koja prva završi će nastaviti tok** (budući da je XOR skretnica ekskluzivna - uvjeti se isključuju). Dakle, iako je moguće definirati inkluzivne aktivnosti pred ovu skretnicu, to nije poželjno.

Ako se vratimo na primjer iznad, XOR merge skretnicu jednostavno postavljamo prije same aktivnosti **i ne dodajemo joj naziv**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex3.png?raw=true" style="width:70%">

> Slika 3: Dodajemo XOR merge skretnicu u koju se "spajaju" svi izlazni tokovi XOR split skretnice

**XOR skretnicu spajanja** interpretirajte kao: `"pričekaj ulaz barem jednog toka, a zatim nastavi dalje"`. U gornjem slučaju, pričekaj dohvat podataka o korisniku (bilo da se radi o administratoru ili korisniku) i nastavi dalje slanjem e-maila.

<hr>

Rekli smo da se **XOR skretnicom može definirati i više od dva izlazna toka** (recimo kad predikat nije boolean oblika, odnosno rezultat nije Točno/Netočno). Takva sintaksa je dozvoljena i onda je **poželjno koristi ekvivalentnu XOR skretnicu spajanja**.

- za takve ekskluzivne skretnice (s 2 ili više uvjeta) **kažemo da su uvjetovane podacima**

_Primjer_: Vlasnik tvrtke za izvođenje obrtničkih radova dobiva narudžbu. Obrtnik će izračunati vrijednost radova i obavijestiti naručitelja **telefonom**, **mailom** ili **dopisom**, ovisno o vrijednosti, a tek onda izvesti naručeno.

- **XOR skretnica** za odabir načina obavještavanja (**telefon**, **mail**, **dopis**) ovisno o podacima (**vrijednost izvođenja radova**)
- **XOR merge skretnica** za spajanje toka nakon obavještavanja naručitelja i nastavak prema potprocesu izvođenja radova

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_obrtnicki_radovi_grananje.png?raw=true" style="width:70%">

> Slika 4: XOR skretnica za odabir načina obavještavanja ovisno o vrijednosti radova

Definirali smo 3 moguća toka ovisno o iznosu:

- **Slanje dopisa**: za iznose veće od 1500 eura
- **Slanje e-maila**: za iznose veće od 300 eura
- **Obavještavanje telefonom**: za iznose manje od 300 eura

Logičke izraze (`> 1500 eur` i `> 300 eur`) smo zapisali na strelicama, a oznakom (`/`) smo definirali _defaultni_ tok (za iznose manje od 300 eura).

Nakon obavještavanja, ovisno o uvjetu odabrat će se samo jedna aktivnost, a skretnica spajanja će **pričekati na ulazni tok jedne od aktivnosti i nastaviti dalje**.

<div style="page-break-after: always; break-after: page;"></div>

# 2. Paralelna (eng. Parallel) skretnica

**Paralelna** (AND) skretnica (_eng. Parallel gateway_) koristi se za modeliranje situacija u kojoj se **tok procesa grananja dešava paralelno**, odnosno kada želimo definirati više aktivnosti ili tokova koji se izvršavaju “istovremeno“ (paralelno). Paralelna skretnica omogućuje izvođenje aktivnosti na svim ulaznim i izlaznim putovima.

**Pri grananju** aktivira sve izlazne puteve budući da je provedena aktivnost prije skretnice.

**Pri spajanju** pokreće izlazni put tek kada su svi ulazni putevi završili.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/and_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Paralelna skretnica se definira rombom, ali s oznakom +
</span>
</div>

Međutim, za razliku od XOR skretnice, kod paralelne skretnice **sve aktivnosti koje slijede nakon skretnice se izvršavaju**. Dakle, ova skretnica ekvivalentna je operatoru logičkog `AND`, odnosno **logičkoj konjukciji**.

Međutim, u stvarnim scenarijima, aktivnosti koje slijede nakon paralelne skretnice gotovo nikad nisu istog trajanja. Neke mogu trajati nekoliko minuta, više sati pa i nekoliko dana.

Ono što je ključno, jest da se sve aktivnosti **započinju izvršavati istovremeno**, ali sekvencijalni tok koji nastavlja izvršavanje procesa nastavlja **tek onda kada su sve aktivnosti završene**. Drugim riječima, moramo prikazati **čekanje na izvršavanje svih aktivnosti** koje slijede nakon paralelne (AND) skretnice.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex1.png?raw=true" style="width:70%">

> Slika 5: Paralelna (AND) skretnica za definiranje paralelnog grananja

AND skretnice u pravilu **ne želimo imenovati** budući da se sve aktivnosti koje slijede izvršavaju paralelno, odnosno nema predikata kojim se uvjetuje izbor između aktivnosti.

<hr>

U definiciji AND skretnice navedeno je da se aktivnosti izvršavaju paralelno, odnosno “istovremeno“. Namjerno je napisano pod navodnim znakovima budući da se aktivnosti u stvarnosti ne izvršavaju sinkronizirano istovremeno, već pseudoparalelno, odnosno **konkurentno**. Što to znači? Više zadataka je pokrenuto istovremeno i u tijeku su njihova izvršavanja, ali se izvršavanje svakog zadatka odvija u vlastitom vremenskom okviru i **ne ovisi o izvršavanju drugih zadataka** (nije istovremeno s ostalima).

<div style="page-break-after: always; break-after: page;"></div>

## 2.1 `AND` skretnica spajanja (eng. AND merge/join)

Kako ćemo definirati čekanje na izvršavanje svih aktivnosti?

**Česta pogreška** bila bi jednostavno povezivanje sekvencijalnim tokom sve aktivnosti koje slijede nakon paralelne skretnice. To nije ispravno jer bi na taj način definirali da se aktivnosti izvršavaju sekvencijalno, bez čekanja na izvršavanje svih.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex2_pogresno.png?raw=true" style="width:70%">

> Slika 6: **Pogrešan način** povezivanja toka nakon paralelne skretnice grananja

Ono što ustvari moramo je definirati spajanje svih tokova kroz paralelnu skretnicu spajanja (_eng. parallel merge gateway_). Preciznije, **želimo prikazati čekanje na izvršavanje svih aktivnosti** kroz ekvivalentnu skretnicu spajanja.

Samim time, kod korištenja paralelnih skretnica za grupiranje, prema BPMN standardu, **obavezno je definirati ekvivalentnu paralelnu skretnicu spajanja**.

Ispravno je sljedeće:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex2_ispravno.png?raw=true" style="width:70%">

> Slika 7: **Ispravan način** povezivanja toka nakon paralelne skretnice koristeći **AND merge skretnicu**

<hr>

<div style="page-break-after: always; break-after: page;"></div>

_Primjer korištenja paralelne skretnice:_

> Imamo web shop i želimo definirati slijed aktivnosti nakon što korisnik napravi narudžbu. Primjerice, jednom kad zaprimimo email s novom narudžbom, želimo poslati korisniku automatsku obavijest o zaprimljenoj narudžbi i paralelno provjeriti uplatu. Odnosno, potvrda se šalje automatski kroz neki servis koji smo integrirali, dok se provjera uplate obavlja kroz IS.

Iskoristit ćemo AND skretnicu kako bi prikazali paralelno slanje obavijesti (potvrde) i provjeru uplate u IT sustavu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_narudzba_ex1.png?raw=true" style="width:70%">

> Slika 8: Primjer korištenja AND skretnice za paralelno slanje obavijesti i provjeru uplate

Ovdje paralelno izvršavamo 2 zadatka (premda ih može biti proizvoljan broj, **ne želimo prelaziti brojku od 4-5** radi čitljivosti modela):

1. **Slanje potvrde o narudžbi korisniku** (_Send Task_)
2. **Provjera uplate** (_User Task_)

Koliko će se izvršavati svaka aktivnost?

- **Slanje potvrde o narudžbi korisniku** - automatski, bez čekanja ako je sustav ispravan, prosječno 4-5 sekundi
- **Provjera uplate** - ovisno o načinu plaćanja, može trajati odmah (ako je plaćanje karticom) do nekoliko dana (npr. ako je plaćanje uplatom na račun)

Potrebno je pričekati na izvršavanje svih aktivnosti prije nastavka procesa (otpreme proizvoda) - upravo to prikazujemo AND merge skretnicom.

Međutim, što ako uplata nije uspješna? Nema problema, **možemo kombinirati AND skretnicu s XOR skretnicom** kako bismo definirali alternativni tok.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_narudzba_ex2.png?raw=true" style="width:70%">

> Slika 9: Primjer kombiniranja AND i XOR skretnice za definiranje alternativnog toka

<hr>

<div style="page-break-after: always; break-after: page;"></div>

> _Primjer korištenja paralelne skretnice_ u procesu **produljenja registracije motornog vozila**. Kako je proces dovoljno poznat i ne treba ga posebno objašnjavati, prikazat ćemo samo dijagram gdje je istaknuto da se **dokumenti za registraciju mogu predati ako je prije toga (1) uspješno obavljen tehnički pregled** (koji je prikazan kao potproces jer u njemu treba riješiti postupak kako će izgledati ako prvi pregled nije bio uspješan) i **(2) uplaćeno osiguranje**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_produljenje_registracije_vozila.png?raw=true" style="width:70%">

> Slika 10: Proces produljenja registracije motornog vozila

Iako je moguće prikazati aktivnosti **uplatiti osiguranje za vozilo** i potproces **obaviti tehnički pregled** kao sekvencijalne, **želimo naglasiti da se izvode paralelno i da je potrebno izvršiti oba zadatka** prije nastavka procesa - predaje dokumenata za registraciju.

<div style="page-break-after: always; break-after: page;"></div>

# 3. Inkluzivna (eng. Inclusive) skretnica

**Inkluzivna** (OR) skretnica (_eng. Inclusive gateway_) koristi se za modeliranje situacija **baziranih isključivo na podacima** (vrijednostima u procesnoj instanci) gdje se **odabire jedan ili više izlaznih tokova**, odnosno provode se aktivnosti **na svim putevima za koji su ispunjeni uvjeti**.

Kao i kod XOR i AND skretnica, i kod inkluzivnih skretnica postoji skretnice **grananja** i **spajanja**.

- Ako inkluzivna skretnica ima više izlaznih tokova, potrebno je definirati **uvjete za svaki izlazni tok**.

- Ako inkluzivna skretnica ima samo jedan tok, onda ne mora imati definiran uvjet.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/inclusive_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Inkluzivna skretnica se definira rombom, s oznakom kruga: o
</span>
</div>

Inkluzivna skretnicu možemo zamisliti kao **logičku disjunkciju** (operator `OR`), odnosno **odabir jednog ili više uvjeta**. Ukoliko je zadovoljen uvjet, izvršava se odgovarajući tok. Na neki način radi se **mixu** između XOR i AND skretnice.

_Primjer_, imamo **Bitcoin mjenjačnicu** te želimo definirati slijed aktivnosti nakon što korisnik zatraži prodaju određene količine Bitcoina. Primitkom ponude, djelatnik mora poduzeti različite aktivnosti ovisno o cijeni transakcije (količini Bitcoina koja se prodaje):

- svakako moramo obraditi narudžbu za svaki iznos koji je veći od 0 eura
- za iznose veće od 1000 eura, moramo zatražiti verifikaciju podataka korisnika
- za iznose veće od 10 000 eura, moramo zatražiti odobrenje nadređenog

Ishod je uvijek isti, **isplata na bankovni račun korisnika** i **priprema računa**.

U opisanom procesu barem jedan uvjet će uvijek biti zadovoljen (`iznos > 0 eura`).

- mogu biti zadovoljena 2 uvjeta (`iznos > 0 eura` i `iznos > 1000 eura`)
- mogu biti zadovoljena 3 uvjeta (`iznos > 0 eura`, `iznos > 1000 eura` i `iznos > 10 000 eura`)

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_bitcoin_mjenjacnica.png?raw=true" style="width:70%">

> Slika 11: Proces prodaje Bitcoina u mjenjačnici

<hr>

<div style="page-break-after: always; break-after: page;"></div>

Kod **inkluzivnog grananja**, moramo uzeti nekoliko stvari u obzir:

- ako je jedan uvjet zadovoljen, **ne smijemo ignorirati ostale** (budući da i oni mogu biti zadovoljeni). Pratimo sve zadovoljene uvjete
- iako je moguće da je zadovoljeno više uvjeta, moguće je da nije ni jedan. Međutim, **dobro je definirati barem jedan uvjet koji će uvijek biti zadovoljen**.

**Česta greška**, iako na prvu nije očita, jest **ne definiranje uvjeta za svaki izlazni tok** i **definiranje _defaultnog_ uvjeta**. Defaultni tok je tok koji smo rekli da označavamo oznakom `/` i koji će uvijek biti zadovoljen.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_bitcoin_mjenjacnica_neispravno.png?raw=true" style="width:70%">

> Slika 12: Proces prodaje Bitcoina u mjenjačnici s defaultnim tokom (**neispravno**)

Problem u ovom primjeru je sljedeći:

- ako je zadovoljen uvjet `iznos > 1000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost **Obrada narudžbe**
- ako je zadovoljen uvjet `iznos > 10 000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost **Obrada narudžbe**
- ako je zadovoljen uvjet `iznos > 1000 eura` i `iznos > 10 000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost **Obrada narudžbe**.
- u svim drugim slučajevima (npr. iznos od 500 eura), izvršit će se samo aktivnost **Obrada narudžbe**.

> **VAŽNO**: Poželjno je eksplicitno navesti uvjete za svaki izlazni tok, a _defaultni_ tok koristiti samo ako je to nužno!

<hr>

<div style="page-break-after: always; break-after: page;"></div>

> _Primjer posluživanja više vrsta jela u restoranu_: Skupina gostiju dolazi u restoran gdje se poslužuje hrana po prethodnoj rezervaciji za veće skupine gostiju. Nakon što se gosti smjeste, konobar donosi jelovnik i gosti biraju jelo. Radi jednostavnosti, recimo da gosti biraju između mesne, vegetarijanske i riblje plate. Međutim, kako ima puno gostiju za stolom, vjerojatno je da će odabrati više različitih vrsta jela. Proces možemo modelirati kroz inkluzivnu skretnicu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_odabir_vrsta_jela.png?raw=true" style="width:70%">

> Slika : Proces posluživanja više vrsta jela u restoranu kroz inkluzivnu skretnicu

<div style="page-break-after: always; break-after: page;"></div>

## 3.1 `OR` skretnica spajanja (eng. OR merge/join)

Kao i kod XOR i AND skretnica, i kod inkluzivnih skretnica postoji skretnica **spajanja** (_eng. merge/join_). Skretnica spajanja koristi se za **spajanje više tokova u jedan tok**. U ovom slučaju, **spajamo sve tokove koji su zadovoljili uvjet**.

**Glavno pitanje** koje si možemo postaviti, što ako se zadovolji više od jednog uvjeta, mora li `OR` skretnica spajanja pričekati na sve zadovoljene uvjete prije nastavka ili ne?

Recimo da je korisnik prodao Bitcoin u iznosu od 12 000 eura. U tom slučaju, bit će zadovoljena sva 3 uvjeta. Ako su zadovoljena sva 3 uvjeta, svakako je **potrebno odraditi sve tri aktivnosti** prije nego možemo nastaviti s pripremom računa i isplatom.

- **Obrada narudžbe**
- **Verifikacija podataka**
- **Odobrenje nadređenog**

Dakle odgovor je **DA**, inkluzivna skretnica spajanja mora pričekati na sve **zadovoljene uvjete** prije nastavka. Naglasak je na pridjevu **zadovoljeni**.

Ako uvjet nije zadovoljen, inkluzivna skretnica spajanja neće čekati na izvršavanje te aktivnosti (ili tog niza aktivnosti) i nastavit će dalje. Primjerice, ako je korisnik napravio narudžbu od 1500 eura, bit će zadovoljena 2 uvjeta, ali neće se čekati na odobrenje nadređenog (3. uvjet).

- **Obrada narudžbe**
- **Verifikacija podataka**

Ista situacija je i kod skretnice spajanja kod primjera s restoranom. Ako gosti odaberu više vrsta jela, konobar će pričekati na pripremu svih jela prije nego ih posluži. Međutim, ako su aktivne samo 2 aktivnosti (npr. mesna i vegetarijanska plata), konobar neće čekati na riblju platu.

<div style="page-break-after: always; break-after: page;"></div>

# 4. Ukratko, kada koristiti koju skretnicu?

Do sad smo prošli kroz tri vrste skretnica u BPMN-u (premda ih ima još):

1. **Ekskluzivna (`XOR`) skretnica**
2. **Paralelna (`AND`) skretnica**
3. **Inkluzivna (`OR`) skretnica**

Kada koristiti koju skretnicu (u jednoj rečenici):

1. **`XOR` skretnica** koristi se za odabir jedne opcije između više opcija, gdje se uvijek **odabire samo jedna opcija** za koju je **predikat zadovoljen**.
2. **`AND` skretnica** koristi se za modeliranje situacija u kojima se više aktivnosti izvršava **paralelno**, a zatim se nastavlja dalje tek kada su **sve aktivnosti završene**.
3. **`OR` skretnica** koristi se za odabir jedne ili više opcija između više opcija, gdje se **odabiru sve opcije** za koje je **definirani logički izraz istinit**.

Također, vidjeli smo da za svaku skretnicu možemo definirati skretnicu grananja (_eng. split_) i skretnicu spajanja (_eng. join/merge_) kako bismo preciznije definirali tokove u procesu.

1. **`XOR` skretnica spajanja**: ako imamo dvije opcije nema ju previše smisla definirati (ali možemo), ali ako imamo više od dvije opcije, koristimo je za **čekanje na zadovoljenje jednog od uvjeta za nastavak**.
2. **`AND` skretnica spajanja**: koristimo je za **čekanje na završetak svih aktivnosti** koje su na izlaznom toku **paralelne skretnice grananja**.
3. **`OR` skretnica spajanja**: koristimo je za **čekanje na završetak svih aktivnosti** koje su na izlaznom toku **inkluzivne skretnice grananja**. Ova skretnica čeka na **završetak onih aktivnosti koje su zadovoljile** uvjet (ne moraju biti sve)

Važno je naglasiti da kod skretnica spajanja, nije nužno da su svi ulazni tokovi iz iste skretnice grananja. Možemo imati više skretnica grananja koje se spajaju u jednu skretnicu spajanja i sl.

# Zadaci za Vježbu 3

## 1. Wolt - dostava hrane

Modelirajte proces naručivanja hrane preko Wolt aplikacije. Proces započinje jednom kad u restoran pristigne narudžba s Wolt aplikacije. Nakon što djelatnik obradi narudžbu, paralelno se kreće u pripremu hrane i obavještavanje dostavljača. Dostavljač, kao vanjski sudionik, sudjeluje samo u procesu dostave hrane. Taj proces započinje jednom kad dostavljaču pristigne obavijest o traženoj dostavi. Dostavljač pregledava obavijest i odlučuje hoće li prihvatiti dostavu. Ako odbije, njegov proces tu završava i o tome obavještava restoran. Ako prihvati, obavještava restoran da će preuzeti dostavu.
Međutim, dostavu je moguće preuzeti tek kad je hrana gotova, što traje određeno vrijeme te nakon što se spakira. U međuvremenu, restoran čeka na potvrdnu informaciju od dostavljača. Ako je potvrda informacija pozitivna (dostavljač prihvaća dostavu unutar 30 minuta) i hrana spakirana, tada se tok može nastaviti. Ako je potvrdna informacija negativna, tada se u sustavu zatraži novi dostavljač. Jednom kad su svi uvjeti zadovoljeni, obavještava se korisnika da je hrana na putu te se potom paralelno izrađuje račun i obavještava dostavljača da je hrana gotova. Dostavljač čeka na tu informaciju, dostavlja robu i tu njegov proces završava, dok proces u restoranu završava izdavanjem računa i obavještavanjem dostavljača da je hrana gotova.
