# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (3) Složena grananja

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/UPP_3.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;"></div>
<br>

<div style="float: clear; margin-right:5px;"> Skretnice određuju redoslijed izvođenja aktivnosti u procesu. Do sada smo vidjeli kako jednostavne ekskluzivne skretnice omogućuju odabir između dvije ili više opcija tijekom izvođenja poslovnog procesa. Važno je naglasiti da se pritom uvijek odabire samo jedna opcija — ona koja ispunjava uvjet. U ovom ćemo poglavlju upoznati i druge vrste skretnica, uključujući paralelnu i inkluzivnu. Također, upoznat ćemo se s načinima definiranja „čekanja” na rezultate aktivnosti koje ovise o više uvjeta, koristeći različite oblike spajanja i grananja sljedova aktivnosti.</div>
<br>

**🆙 Posljednje ažurirano: 9.11.2025.**

## Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(3) Složena grananja](#3-složena-grananja)
  - [Sadržaj](#sadržaj)
- [1. Ekskluzivna (eng. Exclusive) skretnica](#1-ekskluzivna-eng-exclusive-skretnica)
  - [1.1. `XOR` skretnica spajanja (eng. XOR merge/join gateway)](#11-xor-skretnica-spajanja-eng-xor-mergejoin-gateway)
- [2. Paralelna (eng. Parallel) skretnica](#2-paralelna-eng-parallel-skretnica)
  - [2.1 `AND` skretnica spajanja (eng. AND merge/join)](#21-and-skretnica-spajanja-eng-and-mergejoin)
- [3. Inkluzivna (eng. Inclusive) skretnica](#3-inkluzivna-eng-inclusive-skretnica)
- [4. Ukratko, kada koristiti koju skretnicu?](#4-ukratko-kada-koristiti-koju-skretnicu)
- [Zadaci za Vježbu 3](#zadaci-za-vježbu-3)
  - [1. Wolt - dostava hrane](#1-wolt---dostava-hrane)

<div style="page-break-after: always; break-after: page;"></div>

# 1. Ekskluzivna (eng. Exclusive) skretnica

**Ekskluzivnu (XOR) skretnicu** (_eng. Exclusive gateway_) već ste upoznali kroz prethodne primjere. Ona se koristi za odabir jedne između više opcija, gdje se uvijek odabire samo maksimalno jedna opcija. Ukoliko je zadovoljen predikat (rezultat poslovne aktivnosti i/ili poslovna odluka) definiran na skretnici, izvršava se **samo jedan slijedni tok** dok se ostali tokovi zanemaruju.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/exclusive_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Ekskluzivna skretnica se definira rombom, s oznakom <code>X</code>
</span>
</div>

_Primjer ekskluzivne skretnice_: Nakon što se korisnik prijavi na sustav, želimo provjeriti je li korisnik administrator ili običan korisnik. Ukoliko je korisnik administrator, želimo mu prikazati dodatne opcije koje običan korisnik nema. Ukoliko je običan korisnik, želimo mu prikazati standardne opcije, poput pregleda profila, postavki i sl.

Samim time, na XOR skretnicu ćemo upisati uvjet `je administrator?` ili `korisnik je administrator?`. Iz skretnice definiramo **dva ili više toka** koristeći sekvencijalne tokove (obične strelice) prema aktivnostima koje želimo izvršiti. **XOR skretnica je u pravilu skretnica uvjetovana podacima koje sa sobom donosi instanca procesa** (npr. korisnička uloga, tip korisnika, itd.). Ali, može biti i složena odluka bazirana na više uvjeta (ovo ćemo modelirati na budućim vježbama kroz DMN notaciju).

Opisani način korištenja skretnice zovemo **grananje** (_eng. splitting/branching_).

**Skretnica grananja** (ili samo grananje) ima jedan ulazni slijedni tok ili ulazni put (grafički uobičajeno usmjeren u lijevi ili gornji kut romba), a više izlaznih sljedova (iz desnog ili donjeg kuta romba).

Grananjem definiramo **više izlaznih tokova**, ali se **izvršava samo jedan tok** - onaj za koji je uvjet zadovoljen.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex1.png?raw=true" style="width:70%">

> Slika 1: Primjer korištenja XOR skretnice za odabir između vrste korisnika

Međutim, što ako je sljedeća aktivnost koja slijedi nakon odabira jednaka za oba korisnika? U tom slučaju, ne želimo ponavljati istu aktivnost za svaku opciju, već želimo samo strelice toka preusmjeriti u ponavljajuću aktivnost.

_Primjer_: Nakon prijave i dohvata podataka o korisniku, želimo poslati korisniku obavijest o uspješnoj prijavi na e-mail.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex2.png?raw=true" style="width:70%">

> Slika 2: Nakon odabrane opcije, jednostavno prosljeđujemo tok prema sljedećoj aktivnosti

Iako ovakva sintaksa nije pogrešna, prema BPMN standardu preporuka je koristiti ekvivalentnu XOR skretnicu spajanja (_eng. XOR merge gateway_) kako bismo naglasili da se svi tokovi ponovno spajaju u jedan tok. Ovo je posebno važno kod složenijih modela procesa gdje se spajaju dolazni tokovi iz više različitih grananja.

Ipak, u jednostavnim slučajevima poput ovog gdje se samo 2 toka "spajaju" u jednu aktivnost, možemo definirati i bez skretnice spajanja.

<div style="page-break-after: always; break-after: page;"></div>

## 1.1. `XOR` skretnica spajanja (eng. XOR merge/join gateway)

Osim grananja, koje smo do sad koristili, skretnice je moguće koristiti i za **spajanje** (_eng. merge/join_). Spajanje se koristi kada se više tokova treba spojiti u jedan, tj. kada se više tokova vraća u jedan tok. Drugim riječima, **skretnica spajanja ima više ulaznih slijednih tokova** (_npr. lijevo, gore, dolje_) i **jedan izlazni slijedni tok** ili izlazni put (_desno_).

Dobra je praksa koristiti XOR skretnicu spajanja **kako bi naglasili da se izlazni tokovi spajaju u jedan tok**, koji se nastavlja čim je zadovoljen uvjet.

Kod XOR skretnice, **čak i kad je moguće da je više uvjeta istinito**, **ona aktivnost koja prva završi će nastaviti tok** (budući da je XOR skretnica ekskluzivna - uvjeti se isključuju). Dakle, iako je moguće definirati inkluzivne aktivnosti pred ovu skretnicu, to nije poželjno.

Ako se vratimo na primjer iznad, XOR merge skretnicu jednostavno postavljamo prije same aktivnosti **i ne dodajemo joj naziv!**

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_xor_user_ex3.png?raw=true" style="width:70%">

> Slika 3: Dodajemo XOR merge skretnicu u koju se "spajaju" svi izlazni tokovi XOR split skretnice

**XOR skretnicu spajanja** interpretirajte kao: "pričekaj ulaz barem jednog toka, a zatim nastavi dalje". U gornjem slučaju:, "pričekaj dohvat podataka o korisniku (bilo da se radi o administratoru ili korisniku), a zatim obavijesti korisnika o uspješnoj prijavi".

<hr>

Rekli smo da se **XOR skretnicom može definirati i više od dva izlazna toka** (recimo kad predikat nije Boolean oblika, ili aktivnost ima više od 2 moguća ishoda). Takva sintaksa je dozvoljena i onda je **vrlo poželjno koristi ekvivalentnu XOR skretnicu spajanja**.

_Primjer_: Vlasnik tvrtke za izvođenje obrtničkih radova dobiva narudžbu. Obrtnik će izračunati vrijednost radova i obavijestiti naručitelja **telefonom**, **mailom** ili **dopisom**, ovisno o vrijednosti, a tek onda izvesti naručeno.

- **XOR skretnica grananja** za odabir načina obavještavanja (**telefon**, **mail**, **dopis**) ovisno o podacima (**vrijednost izvođenja radova**)
- **XOR skretnica spajanja** za spajanje toka nakon obavještavanja naručitelja i nastavak prema potprocesu izvođenja radova

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_obrtnicki_radovi_grananje.png?raw=true" style="width:70%">

> Slika 4: XOR skretnica grananja za odabir načina obavještavanja ovisno o vrijednosti radova. Odabrani tok zatim izvršava pojedinu aktivnost, a rezultat se spaja kroz XOR skretnicu spajanja prije potprocesa "Izvođenje radova".

Definirali smo 3 moguća toka ovisno o iznosu:

- **Slanje dopisa**: za iznose veće od 1500 eura
- **Slanje e-maila**: za iznose veće od 300 eura
- **Obavještavanje telefonom**: za iznose manje od 300 eura

Logičke izraze (`> 1500 eur` i `> 300 eur`) smo zapisali na strelicama, a oznakom (`/`) smo definirali zadani (_defaultni_) tok (za iznose manje od 300 eura).

**Default flow** predstavlja zadani sljed nakon skretnice koji će se izvršiti ukoliko nijedan od definiranih uvjeta nije zadovoljen (niti jedan drugi uvjet se ne evaluira u istinitu vrijednost). Moguće ga je definirati za OR i XOR skretnice.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/xor-default-path-selection.png?raw=true" style="width:30%">

> Slika 5: Odabir zadanog toka (_eng. Default flow_) iz XOR skretnice grananja. Iako je moguće definirati uvjet na zadanom toku (`< 300 €`), preporuka je zadani tok (ako postoji) označiti bez uvjeta radi brže čitljivosti modela procesa.

Nakon obavještavanja, ovisno o uvjetu odabrat će se samo jedna aktivnost, a skretnica spajanja će **pričekati na ulazni tok jedne od aktivnosti i nastaviti dalje**.

<div style="page-break-after: always; break-after: page;"></div>

# 2. Paralelna (eng. Parallel) skretnica

**Paralelna** (AND) skretnica (_eng. Parallel gateway_) koristi se za modeliranje situacija u kojoj se **tok procesa grananja dešava paralelno**, odnosno kada želimo definirati više aktivnosti ili sekvencijalnih tokova koji se izvršavaju “istovremeno“ (paralelno).

**Pri grananju** (_splitting/branching_) AND skretnica aktivira sve izlazne sljedove "istovremeno".

**Pri spajanju** (_merging/joining_) pokreće izlazni slijed tek tek kada su svi ulazni sljedovi završeni. (**VAŽNO!**)

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/and_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Paralelna skretnica se definira rombom, ali s oznakom <code>+</code>
</span>
</div>

> Napomena: Za razliku od XOR skretnice, kod **paralelne skretnice** sve aktivnosti koje slijede nakon nje započinju se izvršavati **paralelno** - ipak, to ne znači da će sve aktivnosti završiti u isto vrijeme, niti će trajati isto dugo, već će se započeti izvršavati u isto vrijeme.

Paralelna skretnica spajanja povezuje se s logičkom konjunkcijom (operator `AND`) na sljedeći način:

- Kod grananja, ponaša se kao _broadcasting_ - svi izlazni tokovi se aktiviraju istovremeno.
- Kod spajanja, ponaša se kao _synchronization_ - izlazni tok paralelne skretnice spajanja se aktivira tek kada su svi ulazni sljedovi završeni.

Međutim, u stvarnim scenarijima, aktivnosti koje slijede nakon paralelne skretnice gotovo nikad nisu istog trajanja. Neke mogu trajati nekoliko minuta, više sati pa i nekoliko dana.

Ono što je ključno, jest da se sve aktivnosti **započinju izvršavati istovremeno**, ali sekvencijalni tok koji nastavlja izvršavanje procesa nastavlja **tek onda kada su sve aktivnosti završene**. Drugim riječima, moramo prikazati **čekanje na izvršavanje svih aktivnosti** koje slijede nakon paralelne (AND) skretnice.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex1.png?raw=true" style="width:70%">

> Slika 6: Paralelna (AND) skretnica za definiranje paralelnog grananja u 2 slijeda aktivnosti

AND skretnice u pravilu **ne želimo imenovati** budući da se sve aktivnosti koje slijede započinju bezuvjetno izvršavati, odnosno nema predikata kojim se uvjetuje izbor između aktivnosti.

Ipak, moguće je dodati naziv ako želimo dodatno pojasniti što se događa (npr. "Pokretanje svih internih procesa", "Paralelna obrada podataka", "Početak sveobuhvatne provjere kvalitete robe",

<hr>

> Napomena: U definiciji AND skretnice navedeno je da se aktivnosti izvršavaju paralelno, odnosno “istovremeno“. Namjerno je napisano pod navodnim znakovima budući da se aktivnosti u stvarnosti ne izvršavaju sinkronizirano istovremeno, već pseudoparalelno, odnosno **konkurentno**. Što to znači? Više zadataka je pokrenuto istovremeno i u tijeku su njihova izvršavanja, ali se izvršavanje svakog zadatka odvija u vlastitom vremenskom okviru i **ne ovisi o izvršavanju drugih zadataka** (nije istovremeno s ostalima).

U nastavku ćemo vidjeti kako definirati čekanje na izvršavanje svih aktivnosti kroz paralelnu skretnicu spajanja.

<div style="page-break-after: always; break-after: page;"></div>

## 2.1 `AND` skretnica spajanja (eng. AND merge/join)

Kako ćemo definirati čekanje na izvršavanje svih aktivnosti?

**Česta pogreška** bila bi jednostavno povezivanje sekvencijalnim tokom sve aktivnosti koje slijede nakon paralelne skretnice. To nije ispravno jer bi na taj način definirali da se aktivnosti izvršavaju sekvencijalno, bez čekanja na izvršavanje svih.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex2_pogresno.png?raw=true" style="width:70%">

> Slika 6: **Pogrešan način** povezivanja sljedova aktivnosti nakon paralelne skretnice grananja

Ono što ustvari moramo je definirati spajanje svih tokova kroz **paralelnu skretnicu spajanja** (_eng. parallel merge gateway_). Preciznije, **želimo prikazati čekanje na izvršavanje svih aktivnosti** kroz ekvivalentnu skretnicu spajanja.

Samim time, kod korištenja paralelnih skretnica za grupiranje dolaznih sljedova u jedan, prema BPMN standardu, **obavezno je definirati ekvivalentnu paralelnu skretnicu spajanja**.

**Ispravno je sljedeće:**

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_ex2_ispravno.png?raw=true" style="width:70%">

> Slika 7: **Ispravan način** povezivanja toka nakon paralelne skretnice koristeći **AND skretnicu spajanja**

<hr>

<div style="page-break-after: always; break-after: page;"></div>

_Primjer korištenja paralelne skretnice kod procesa obrade narudžbe:_

> Imamo web shop i želimo definirati slijed aktivnosti nakon što korisnik napravi narudžbu. Primjerice, jednom kad zaprimimo email s novom narudžbom, želimo poslati korisniku automatsku obavijest o zaprimljenoj narudžbi i paralelno provjeriti uplatu. Odnosno, potvrda se šalje automatski kroz neki servis koji smo integrirali, dok se provjera uplate obavlja kroz IS.

Iskoristit ćemo AND skretnicu kako bi prikazali paralelno slanje obavijesti (potvrde) i provjeru uplate u IT sustavu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_narudzba_ex1.png?raw=true" style="width:70%">

> Slika 8: Primjer korištenja AND skretnice za paralelno slanje obavijesti i provjeru uplate

Ovdje paralelno izvršavamo 2 zadatka (premda ih može biti proizvoljan broj, nije loše ograničiti na najviše 3-4 radi preglednosti modela):

1. **Slanje potvrde o narudžbi korisniku** (_Send Task_)
2. **Provjera uplate** (_User Task_)

Koliko će se izvršavati svaka aktivnost?

- **Slanje potvrde o narudžbi korisniku** - automatski, bez čekanja ako je sustav ispravan, cca. 4-5 sekundi
- **Provjera uplate** - ovisno o načinu plaćanja, može trajati odmah (ako je plaćeno karticom) do nekoliko dana (npr. ako je uplaćeno putem inozemne bankovne transakcije)

Potrebno je **pričekati na izvršavanje svih aktivnosti** prije nastavka potprocesa "Otprema proizvoda" - upravo to prikazujemo AND skretnicom spajanja.

Međutim, što ako uplata nije uspješna? Nema problema, **možemo kombinirati AND skretnicu s XOR skretnicom** kako bismo definirali alternativni tijek aktivnosti.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_and_narudzba_ex2.png?raw=true" style="width:70%">

> Slika 9: Primjer kombiniranja AND i XOR skretnice za definiranje alternativnog slijeda aktivnosti

<hr>

<div style="page-break-after: always; break-after: page;"></div>

> _Primjer korištenja paralelnih skretnica spajanja i grananja_ u procesu **produljenja registracije motornog vozila**. Kako je proces dovoljno poznat i ne treba ga posebno objašnjavati, prikazat ćemo samo dijagram gdje je istaknuto da se **dokumenti za registraciju mogu predati ako je prije toga: (1) uspješno obavljen tehnički pregled** i **(2) uplaćeno osiguranje vozila**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_produljenje_registracije_vozila.png?raw=true" style="width:70%">

> Slika 10: Proces produljenja registracije motornog vozila. Entiteti na sekvencijalnim vezama nisu obavezni, ali pomažu u razumijevanju procesa.

Iako je moguće aktivnosti "Uplatiti osiguranje za vozilo" i "Obaviti tehnički pregled" prikazati kao sekvencijalne, **AND skretnicama želimo naglasiti dvije stvari:**

1. **da se sljedovi aktivnosti izvode paralelno** (bez sekvencijalne ovisnosti između njih), i
2. **da je potrebno izvršiti oba slijeda aktivnosti** prije nego je motorno vozilo moguće registrirati.

Možete još uočiti različite entitete: "Prometna dozvola", "Stara polica osiguranja", "Nova polica osiguranja" i "Potvrda o ispravnosti vozila" koje smo definirali na sekvencijalnim sljedovima.

**Entitete** (_eng. Entities_) je moguće definirati na informacijskim tokovima (_eng. message flow_) kako bi dodatno pojasnili koje se informacije razmjenjuju između sudionika u procesu, ali i na sekvencijalnim tokovima primjerice kako bi prikazali koje se informacije ili resursi koriste (npr. dokumenti, podaci, materijali i sl.) tijekom izvođenja aktivnosti.

**Entiteti nisu obavezni, ali mogu pomoći u boljem razumijevanju procesa.**

> Podsjetnik: Sekvencijalni tokovi (_eng. Sequence flow_) se koriste za povezivanje elemenata unutar jednog procesa i označavaju se punim strelicama, dok se informacijski tokovi (_eng. message flow_) koriste za povezivanje elemenata između različitih sudionika (polja) i označavaju se isprekidanim strelicama.

<hr>

Ima li smisla koristiti AND skretnicu kada nam aktivnosti imaju različita trajanja? Ukratko - DA, ima smisla. Rekli smo da je razlog taj što želimo prikazati da aktivnosti **započinju paralelno - _split_** (nema očite međuovisnosti između njih) i da je potrebno **pričekati na izvršavanje svih aktivnosti - _merge_**, prije nastavka procesa.

> _Primjer:_ U procesu prijave preferencija na studentsku praksu, traži se odabir najmanje 3 ponuđene opcije (zadataka). Nakon odabira, započinje se paralelno izvođenje tri različita slijeda aktivnosti: **1. Obavještavanje poslodavca i evaluacija kandidata kod poslodavca**, **2. Studentska priprema za evaluaciju**, i **3. Pohrana odabira preferencija u bazu podataka i obavještavanje studenta o odabranom zadatku**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_praksa_1.png?raw=true" style="width:70%">

> Slika 11: Proces prijave preferencija na studentsku praksu s paralelnom AND skretnicom grananja i spajanja

U ovom konkretnom primjeru, **sljedovi aktivnosti zasigurno će imati različita trajanja**, ali ono što je ključno je da se sve aktivnosti započinju paralelno i da je potrebno pričekati na završetak svih aktivnosti prije nego se proces prakse može nastaviti.

_Primjer:_

- **Slijed 1:** (Obavještavanje poslodavca i evaluacija kandidata kod poslodavca) može trajati nekoliko dana, npr. 3-4 radna dana
- **Slijed 2:** (Studentska priprema za evaluaciju) može trajati nekoliko sati, npr. 2-3 sata ili pak noć prije!
- **Slijed 3:** (Pohrana odabira preferencija u bazu podataka i obavještavanje studenta o odabranom zadatku) će vjerojatno trajati samo nekoliko sekundi

Ovaj proces možemo detaljnije prikazati raspodjelom u polja i staze:

Definirat ćemo polje PROVOĐENJE STUDENTSKE PRAKSE koje sadrži dvije staze:

- Stazu "Student" budući da nam je student ključni dionik u procesu
- Stazu "Administracija prakse" koja nam predstavlja voditelja, administrativno osoblje i IS kao podlogu.

Poslodavca možemo predstaviti kao vanjskog dionika u procesu kroz zasebno polje POSLODAVAC.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_praksa_2.png?raw=true" style="width:70%">

> Slika 11: Proces prijave preferencija na studentsku praksu s paralelnim grananjem i spajanjem, prikazan kroz polja i staze

Uočite da smo aktivnost "Evaluacija kandidata" premjestili u polje POSLODAVAC. Poslodavac odrađuje svoj interni proces evaluacije kandidata koji mi apstrahiramo - dovoljno je prikazati kako poslodavac prima obavijest o kandidatu, provodi evaluaciju i završava proces evaluacije.

Nakon paralelnog grananja AND skretnicom, sada nemamo više aktivnost "Evaluacija kandidata" gdje je bilo označeno trajanje.

**Kako ćemo sada naglasiti čekanje u Slijedu 1?**

<details>
  <summary>Spoiler alert! Odgovor na pitanje</summary>
  Koristeći <b>prijamni međudogađaj obavijesti</b> (<i>eng. Intermediate Catch Event</i>). Primjerice, možemo ga nazvati "Zaprimanje rezultata evaluacije na mail/telefon". Ovaj međudogađaj označava čekanje na vanjsku obavijest (rezultat evaluacije) prije nego se proces može nastaviti. 
</details>

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_praksa_3.png?raw=true" style="width:70%">

> Slika 12: Proces prijave preferencija na studentsku praksu s paralelnim grananjem i spajanjem, prikazan kroz polja i staze. Uočite prijamni međudogađaj obavijesti koji označava čekanje na rezultat evaluacije poslodavca.

<div style="page-break-after: always; break-after: page;"></div>

# 3. Inkluzivna (eng. Inclusive) skretnica

**Inkluzivna** (OR) skretnica (_eng. Inclusive gateway_) koristi se za modeliranje situacija **baziranih isključivo na podacima** (vrijednostima u procesnoj instanci) gdje se **odabire jedan ili više izlaznih tokova**, odnosno provode se aktivnosti **na svim sljedovima za koji su uvjeti ispunjeni**.

Kao i kod XOR i AND skretnica, i kod inkluzivne (OR) skretnice postoje skretnice **grananja** i **spajanja**.

- Ako inkluzivna skretnica ima više izlaznih tokova, potrebno je definirati **uvjete za svaki izlazni tok**.

- Ako inkluzivna skretnica ima samo jedan tok, onda ne mora imati definiran uvjet.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/elements/inclusive_gateway.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;">Inkluzivna skretnica se definira rombom, s oznakom kruga: <code>○</code>
</span>
</div>

Inkluzivna skretnicu možemo zamisliti kao **logičku disjunkciju** (operator `OR`), odnosno **odabir jednog ili više uvjeta**. Ukoliko je zadovoljen uvjet, izvršava se odgovarajući slijed aktivnosti. Na neki način radi se **mixu** između `XOR` i `AND` skretnice zato što je moguće da se izvrši **samo jedan tok** (kao kod `XOR` skretnice) ili **više tokova** (kao kod `AND` skretnice).

> _Primjer_, imamo Bitcoin mjenjačnicu te želimo definirati slijed aktivnosti nakon što korisnik zatraži prodaju određene količine Bitcoina. Primitkom ponude, djelatnik mora poduzeti različite aktivnosti ovisno o cijeni transakcije (vrijednosti Bitcoina koju korisnik želi prodati u eurima):

> - svakako moramo obraditi narudžbu za svaki iznos koji je veći od 0 eura
> - za iznose veće od 1000 eura, moramo zatražiti verifikaciju osobnih podataka korisnika
> - za iznose veće od 10 000 eura, moramo zatražiti odobrenje nadređenog

Zamislimo da su ishodi procesa uvijek isti: "Priprema računa" i "Isplata na bankovni račun korisnika".

U opisanom procesu barem jedan uvjet će uvijek biti zadovoljen (`iznos > 0 eura`).

- mogu biti zadovoljena 2 uvjeta (`iznos > 0 eura` i `iznos > 1000 eura`)
- mogu biti zadovoljena 3 uvjeta (`iznos > 0 eura`, `iznos > 1000 eura` i `iznos > 10 000 eura`)

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_bitcoin_mjenjacnica.png?raw=true" style="width:70%">

> Slika 11: Proces prodaje Bitcoina u mjenjačnici definiran kroz inkluzivne skretnice grananja i spajanja

<hr>

<div style="page-break-after: always; break-after: page;"></div>

Kod **inkluzivnog grananja**, moramo uzeti nekoliko stvari u obzir:

- Iako se može istovremeno ispuniti više uvjeta, moguće je i da ne bude ispunjen nijedan. Međutim, **moramo definirati barem jedan uvjet koji će uvijek biti zadovoljen kako ne bi došlo do _deadlocka_ procesa**.
- Ako postoji više uvjeta koji su aktivirani i sljedovi će se izvršiti, inkluzivna skretnica spajanja će pričekati na **sve zadovoljene uvjete koji su "aktivirani"** prije nego nastavi dalje s izvođenjem procesa.

**Česta greška**, iako na prvu nije očita, jest **ne definiranje uvjeta za svaki izlazni tok** i **definiranje _defaultnog_ uvjeta**. Defaultni tok je tok koji smo rekli da označavamo oznakom `/` i koji će se izvršiti samo ako nijedan od preostalih uvjeta nije zadovoljen.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_bitcoin_mjenjacnica_neispravno.png?raw=true" style="width:70%">

> Slika 12: Proces prodaje Bitcoina u mjenjačnici s defaultnim tokom (**neispravno zbog _defaultne_ grane**)

Prisjetite se: Zadani (_default flow_) izvršava se onda kada **nijedan od definiranih uvjeta nije zadovoljen**.

**Uočite problem:**

- ako je zadovoljen uvjet `iznos > 1000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost "Obrada narudžbe"
- ako je zadovoljen uvjet `iznos > 10 000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost "Obrada narudžbe"
- ako je zadovoljen uvjet `iznos > 1000 eura` i `iznos > 10 000 eura`, neće se izvršiti _defaultni_ tok i neće se izvršiti aktivnost "Obrada narudžbe".
- u svim drugim slučajevima (`iznosi između 1 i 1000 eura`), izvršit će se samo aktivnost "Obrada narudžbe", što je OK.

**VAŽNO:** **Ista skretnica grananja ne mora "dolaziti u paru" s istom skretnicom spajanja**. Npr. `XOR` → `XOR`, `AND` → `AND`, ili `OR` → `OR`. Moguće je (i vrlo učestalo) kombinirati različite skretnice grananja i spajanja ovisno o potrebama modela procesa.

Što bi se dogodilo kad bi za skretnicu spajanja koristili `AND` skretnicu? Kako onda interpretiramo model?

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/mjepp_bitcoin_mjenjacnica_neispravno_2.png?raw=true" style="width:70%">

> Slika 13: Proces prodaje Bitcoina u mjenjačnici s AND skretnicom spajanja (**neispravno - kriva skretnica spajanja**)

**Problem je sljedeći**: `AND` skretnica spajanja će pričekati na **sve ulazne tokove** prije nego nastavi dalje, a ne samo na one koji su "aktivirani" (zadovoljeni) kao što to čini `OR` skretnica spajanja.

Primjerice, ako je korisnik prodao Bitcoin u iznosu od 750 eura, skretnica spajanja će čekati na izvršenje sve 3 aktivnosti prije nego nastavi dalje, međutim dvije (druga i treća) neće nikada biti izvršene jer uvjeti nisu zadovoljeni - ovdje dolazi do _deadlocka_ procesa.

<hr>

<div style="page-break-after: always; break-after: page;"></div>

> _Primjer posluživanja više vrsta jela u restoranu_: Skupina gostiju dolazi u restoran gdje se poslužuje hrana po prethodnoj rezervaciji za veće skupine gostiju. Nakon što se gosti smjeste, konobar donosi jelovnik i gosti biraju jelo. Radi jednostavnosti, recimo da gosti biraju između mesne, vegetarijanske i riblje plate. Međutim, kako ima puno gostiju za stolom, vjerojatno je da će odabrati više različitih vrsta jela. Odabir hrane možemo modelirati kroz inkluzivnu skretnicu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_odabir_vrsta_jela.png?raw=true" style="width:70%">

> Slika 14: Proces posluživanja više vrsta jela u restoranu kroz inkluzivnu skretnicu grananja i spajanja

**Objasnite kako se ponaša ovaj model?**

<hr>

Na ovom primjeru također možemo kombinirati skretnice grananja i spajanja različitih tipova. Recimo možemo kombinirati skretnicu grananja `OR` sa skretnicom spajanja `XOR`. Kako onda interpretiramo model?

<details>
  <summary>Spoiler alert! Odgovor na pitanje</summary>
  Tada će naš konobar pričekati na <b>prvu pripremljenu platu</b> i poslužit će je gostima čim je spremna. To znači da ako su gosti naručili mesnu i riblju platu, a mesna plata je gotova prva, konobar će poslužiti mesnu platu čim je spremna, bez čekanja na riblju platu. Ipak, tada moramo malo izmijeniti model budući da bi na ovaj način proces završio prvim posluživanjem.
</details>

Ako postavimo `OR` skretnicu grananja za odabir jela, a naši gosti naruče sve 3 vrste jela, a pritom postoji `XOR` skretnica spajanja, tada će, prema trenutnom modelu, **konobar pričekati na prvu pripremljenu platu i poslužit će je gostima čim je spremna** - nakon toga proces završava (što nije ono što želimo), budući da se preostala hrana još uvijek priprema.

Ako se naruče sve 3 vrste jela, `OR` skretnica će osigurati "3 ispaljivanja signala", dakle sve što moramo modelirati je petlju gdje konobar čeka na signale o gotovoj hrani jednom kad dostavi prvu platu.

Kako bi proces bio čitljiviji, podijelit ćemo ga u dvije staze "Konobar" i "Kuhinja".

Ne znamo koliko će jela gosti naručiti, niti ne znamo vrijeme pripreme svakog jela, čekanje ćemo definirati kroz **prijamni međudogađaj obavijesti** (_eng. Message Intermediate Catch Event_) koji će konobar "uhvatiti signal" svaki put kad kuhinja javi da je jelo spremno. Nakon toga, konobar poslužuje jelo, a nakon što su gosti pojeli (prikazujemo predajnim međudogađajem - _milestone_), konobar sakuplja prazne tanjure i pribor te **ukoliko se priprema još hrane** (`XOR` skretnica grananja), ponavlja ciklus čekanja na obavijesti ili završava proces.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP3%20-%20Slo%C5%BEena%20grananja/screenshots/pp_odabir_vrsta_jela_nadopunjeno.png?raw=true" style="width:70%">

> Slika 15: Proces posluživanja više vrsta jela u restoranu, modeliran na način da konobar dostavlja jela čim su spremna. Primjer pokazuje kako je moguće kombinirati različite vrste skretnica grananja i spajanja.

To je to! Sada smo u jednom modelu prikazali inkluzivnu, paralelnu i ekskluzivnu skretnicu te kombinirali uzastopno različite tipove skretnica grananja i spajanja.

Uočite sljedeće skretnice (s lijeva na desno):

- **Prva paralelna `AND` skretnica** je skretnica **grananja** (_split/branching_) budući da konobar paralelno kreće s postavljanjem pribora za jelo, a kuhinja kreće s pripremom hrane.
- **Inkluzivna `OR` skretnica** je skretnica **grananja** budući da su gosti mogli naručiti jednu, dvije ili sve tri vrste jela.
- **Ekskluzivna `XOR` skretnica** je skretnica **spajanja** (_join/merge_) budući da se svaka plata poslužuje čim je spremna (proces nastavlja čim stigne jedan signal - međutim svi pokrenuti će kad tad stići)
- **Druga inkluzivna `OR` skretnica** je skretnica **spajanja** koja služi za implementaciju petlje; ako se dostavlja prvo jelo, skretnica "propušta" odmah jer je 1/1 signal stigao, ali ako se naručilo više jela, te jedno već dostavilo, skretnica će čekati na sljedeći signal (sljedeće jelo koje je spremno) i tako dalje dok se ne dostave sva jela. Potencijalno bi se ovdje mogla koristiti i XOR varijanta, međutim OR je prikladnija.
- **Druga ekskluzivna `XOR` skretnica** je skretnica **grananja** koja odlučuje hoće li se proces ponoviti (ako se priprema još hrane) ili će završiti (ako su svi gosti pojeli sve naručeno).

<div style="page-break-after: always; break-after: page;"></div>

# 4. Ukratko, kada koristiti koju skretnicu?

Do sad smo prošli kroz tri vrste skretnica u BPMN-u (premda ih ima još nekoliko, ove su najčešće korištene):

1. **Ekskluzivna (`XOR`) skretnica**
2. **Paralelna (`AND`) skretnica**
3. **Inkluzivna (`OR`) skretnica**

Kada koristiti koju skretnicu (u jednoj rečenici):

1. **`XOR` skretnica** koristi se za odabir jedne opcije između više opcija, gdje se uvijek **odabire samo jedna opcija** za koju je **predikat/uvjet zadovoljen**.
2. **`AND` skretnica** koristi se za modeliranje situacija u kojima se više aktivnosti izvršava **paralelno**, a zatim se nastavlja dalje tek kada su **sve aktivnosti završene**.
3. **`OR` skretnica** koristi se za odabir jedne ili više opcija između više opcija, gdje se **odabiru sve opcije** za koje je **definirani logički izraz istinit**.

Također, vidjeli smo da za svaku skretnicu možemo definirati skretnicu **grananja** (_eng. split_) i skretnicu **spajanja** (_eng. join/merge_) kako bismo preciznije definirali tokove u procesu.

1. **`XOR` skretnica spajanja**: koristi se kada postoji više od dvije moguće grane toka te **omogućuje nastavak procesa nakon završetka prvog završenog slijeda**. Ako postoje samo dvije opcije, skretnicu nije nužno eksplicitno definirati (ali može se i uobičajeno je).

2. **`AND` skretnica spajanja**: koristi se za **sinkronizaciju svih paralelnih aktivnosti**, odnosno nastavlja proces tek nakon što su svi sljedovi aktivnosti pokrenuti paralelnim grananjem završeni.

3. **`OR` skretnica spajanja**: koristi se kada je potrebno **čekati završetak samo onih aktivnosti koje su zadovoljile određeni uvjet**. Dakle, proces se nastavlja nakon završetka svih relevantnih, ali ne nužno svih, aktivnosti. **Proces neće započeti završetkom prve aktivnosti** (osim ako nije jedina zadovoljila uvjet), već će pričekati na sve aktivnosti koje su "aktivirane" (zadovoljeni uvjeti).

> **Važno je istaknuti da kod skretnica spajanja nije nužno da svi ulazni tokovi potječu iz iste skretnice grananja**. Moguće je da se više skretnica grananja povezuje u jednu skretnicu spajanja, što omogućuje veću fleksibilnost pri modeliranju složenijih procesa. Takav pristup prikazan je u posljednjem primjeru s restoranom, na Slici 13.

# Zadaci za Vježbu 3

## 1. Wolt - dostava hrane

Modelirajte proces naručivanja hrane preko Wolt aplikacije. Proces započinje jednom kad u restoran pristigne narudžba s Wolt aplikacije. Nakon što djelatnik obradi narudžbu, paralelno se kreće u pripremu hrane i obavještavanje dostavljača. Dostavljač, kao vanjski sudionik, sudjeluje samo u procesu dostave hrane. Taj proces započinje jednom kad dostavljaču pristigne obavijest o traženoj dostavi. Dostavljač pregledava obavijest i odlučuje hoće li prihvatiti dostavu. Ako odbije, njegov proces tu završava i o tome obavještava restoran. Ako prihvati, obavještava restoran da će preuzeti dostavu.
Međutim, dostavu je moguće preuzeti tek kad je hrana gotova, što traje određeno vrijeme te nakon što se spakira. U međuvremenu, restoran čeka na potvrdnu informaciju od dostavljača. Ako je potvrda informacija pozitivna (dostavljač prihvaća dostavu unutar 30 minuta) i hrana spakirana, tada se tok može nastaviti. Ako je potvrdna informacija negativna, tada se u sustavu zatraži novi dostavljač. Jednom kad su svi uvjeti zadovoljeni, obavještava se korisnika da je hrana na putu te se potom paralelno izrađuje račun i obavještava dostavljača da je hrana gotova. Dostavljač čeka na tu informaciju, dostavlja robu i tu njegov proces završava, dok proces u restoranu završava izdavanjem računa i obavještavanjem dostavljača da je hrana gotova.
