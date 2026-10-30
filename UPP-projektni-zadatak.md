# Upute za izradu projektnog zadatka iz kolegija Upravljanje poslovnim procesima (UPP)

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important; display: block; float: none;"></img>

**Akademska godina: 2026./2027.**

**Posljednje ažurirano: 30.10.2026.**

U nastavku su definirane upute za izradu projektnog zadatka iz kolegija Upravljanje poslovnim procesima. Projektni zadatak obuhvaća modeliranje stvarnog poslovnog procesa po izboru prema [BPMN2.0 standardu](https://www.bpmn.org/). **Prvi dio projekta** obuhvaća identifikaciju poslovnog procesa, analizu procesnih aktivnosti i dokumentiranje i modeliranje [trenutnog stanja](https://www.lucidchart.com/blog/as-is-process-analysis) (_As-Is_) i [budućeg stanja](https://www.agilitysystem.net/insight/as-is-to-be-process-mapping/#elementor-toc__heading-anchor-3) (_To-Be_) poslovnog procesa. **Drugi dio projekta** odnosi se na izradu _process-driven_ aplikacije koristeći [Camunda 8 platformu](https://docs.camunda.io/).

Projekt se boduje s **maksimalno 50 bodova**, raspoređenih na sljedeći način:

- **max. 40/50 bodova (80%) iz prvog dijela projekta** (1. Modeliranje _As-Is_, _To-be_ procesa i seminar)
- **dodatnih 10 bodova (20%) iz drugog dijela projekta** (2. Izrada _process-driven_ aplikacije u Camunda 8)

Ocjena iz projekta dodjeljuje se prema sljedećoj skali definiraju UNIPU pravilnikom:

- **Dovoljan (2)**: 50% - 62.9%
- **Dobar (3)**: 63% - 75.9%
- **Vrlo dobar (4)**: 76% - 88.9%
- **Odličan (5)**: 89% - 100%

Ako student/ica odabere način polaganja putem pismenog ispita i projekta, oba **dijela ravnopravno sudjeluju u formiranju konačne ocjene** (50 % pismeni ispit i 50 % projekt).

**Za polaganje kolegija bez usmenog ispita potrebno je ostvariti najmanje 50 % bodova iz svakog dijela pojedinačno, a ne ukupno**.

- To znači da je nužno ostvariti minimalno 50 % od ukupnog broja bodova na pismenom ispitu i minimalno 50 % od ukupnog broja bodova iz projektnog zadatka.

> Ukupan maksimalni broj bodova koji se može ostvariti na kolegiju iznosi **100**.

Isto je moguće realizirati na **različitim ispitnim rokovima**, ali u **istoj akademskoj godini**. Dakle, moguće je projekt obraniti u 1. mjesecu, a pismeni ispit proći u 6. mjesecu iste akademske godine. Međutim, **nije moguće obrnuto**. Potrebno je prvo dobiti pozitivnu ocjenu iz projekta, a zatim pristupiti pismenom ispitu (pa i usmenom ako student/ica nije zadovoljan/a ocjenom iz pismenog ispita/projekta).

**Dodatni bodovi**, ostvareni kontinuiranim praćenjem, mogu se, prema dogovoru s asistentom, prenijeti na bodove pismenog ispita **ili** na bodove iz projekta, ovisno o tome gdje studentu nedostaje bodova za prolaz ili višu ocjenu.

U nastavku slijede detaljne upute za izradu projektnog zadatka.

## 1. Prvi i obavezni dio projekta: Modeliranje As-Is i To-Be procesa BPMN notacijom (max. 40/50 bodova)

Prvi i **obavezni** dio projekta sastoji se 3 glavna dijela:

### 1.1 Identifikacija poslovnog procesa

- **Potrebno je odabrati poslovni proces po želji**, međutim podatke i informacije o izvođenju procesa morate prikupiti iz **stvarnih izvora** (npr. intervju s djelatnicima organizacije, analiza dokumentacije, promatranje procesa u praksi i sl.). Možete odabrati poslovni proces bilo koje privatne ili javne organizacije (bio to obrt, javna uprava, udruga, poduzeće, Vladine, međunarodne, neprofitne organizacije, sportski klubovi i sl.) - **bitno je da je proces stvaran, relevantan i da imate pristup informacijama o njemu**.
- **Podatke možete prikupiti iz različitih izvora i kroz različite metode**: intervjui s dionicima procesa, analizom web dokumenata, pregledom dostupnih izvještaja (npr. godišnjih izvještaja o poslovanju, strategije...), oglasa, promatranjem procesa u praksi, privatni razgovori, kontaktiranjem organizacije putem e-maila, telefona i dr. (AI može pomoći u oblikovanju teksta ili web pretraživanju, ali **bez jasnog dokaza o izvorima podataka/informacija, projektna tema bit će odbijena**).
- Što se tiče složenosti procesa, morate odabrati poslovni proces koji je dovoljno složen da možete raspisati minimalno jednu A4 stranicu teksta (oko 400-500 riječi). Ne postoje strogo definirana pravila ili ograničenja, ali preporuka je odabrati proces:
  - koji uključuje barem 3 dionika (aktera) od kojih je barem jedan vanjski (npr. kupac, dobavljač, partner, građanin i sl.),
  - koji uključuje različite vrste aktivnosti
  - gdje možete definirati višestruka složena grananja i spajanja procesnog toka
  - koji će uključivati višestruke različite događaje čekanja (_timer event_), slanja i primanja poruka (_message events_), eskalacije i sl.
  - koji se sastoji od barem 1 složenije aktivnosti koju možete modelirati kao potproces
  - koji ima jasno definiran početak, kraj i okvirno vrijeme trajanja
  - koji ne možete objasniti u 2-3 rečenice

> Primjer jako složenog procesa i detaljno razrađenog popratnog teksta je "Proces prijave potpore malih vrijednosti Grada Pule" koji smo radili na vježbama.
> Primjer procesnog teksta koji je zadovoljavajući za prijavu projekta je "Proces organizacije koncerta u Pulskoj Areni".

**Primjeri trivijalnih procesa koji ne mogu (u ovakvom obliku) biti projektni zadatak:**

- "Slanje e-maila"
- "Plaćanje računa"
- "Naručivanje kave u kafiću"
- "Rezervacija stola u restoranu"
- "Kupnja autobusne karte"
- "Priprema hrane u restoranu"
- "Registracija na web stranici"
- "Planiranje dnevnih obaveza"
- "Isporuka paketa"
- "Upis u vrtić"
- "Rezervacija hotela, karata za avion ili vlak"
- "Prijava na natječaj za posao"
- i sl.

<br>

Iako nije obavezno, u naslovu projektnog zadatka možete navesti naziv organizacije koju koristite kao studiju slučaja ([case study](https://en.wikipedia.org/wiki/Case_study)). Ako i ne navedete, naslov projekta, tj. procesa koji modelirate, trebate definirati u minimalno 6-7 riječi.

**Primjeri dobrih naslova projekta:**

- "Modeliranje poslovnog procesa zapošljavanja novog djelatnika u poduzeću X"
- "Modeliranje općenitog HRM (Human Resoruce Management)" poslovnog procesa u malom poduzeću"
- "Modeliranje procesa zapošljavanja novog djelatnika na primjeru tvrtke Hrvatski Telekom d.d."
- "Modeliranje procesa obrade narudžbe malog obrtnika od trenutka zaprimanja do isporuke robe"
- "Modeliranje poslovnog procesa obrade narudžbe u web trgovini Zalando"
- "Proces obrade reklamacije kupca na primjeru telekomunikacijske tvrtke Y"
- "Proces razvoja novog IT sustava u velikoj tvrtki koja se bavi softverskim inženjerstvom"
- "Poslovni proces upravljanja sigurnošću kartičnog poslovanja na primjeru Zagrebačke banke"
- "Modeliranje procesa humanitarnog rada udruge XY na primjeru prikupljanja i distribucije humanitarne pomoći"
- itd.

**Napomena**: projekte od prošlih akademskih godina moguće je ponavljati uz odobrenje asistenta; potrebno je jasno specificirati na koji način ćete nadograditi ili izmijeniti iste. Također, potrebno je samostalno prikupiti nove podatke i informacije o procesu.

#### Prijava projektne teme

Prije nego možete započeti s realizacijom projekta, sastavite kratak dokument (ne više od 1 A4 stranice), s prijedlogom projektne teme, koju ćete **poslati asistentu na odobrenje**. U dokumentu je bitno naglasiti sljedeće:

- Primjer naslova projekta (nije konačan, ali treba biti dovoljno egzaktan)
- Organizacija čiji poslovni proces modelirate (obavezno)
- Opis poslovnog procesa koji ćete modelirati
- Kako planirate prikupiti podatke o procesu (jasno specificirati izvore podataka i metode prikupljanja istih)
- Planirate li raditi i drugi dio projekta? (izrada _process-driven_ aplikacije u Camunda 8 platformi) - moguće je izraditi i reduciranu verziju aplikacija ako je proces presložen, više o tome u nastavku...

**Napomena: Nepotpune prijave projekta koje se ne pridržavaju gore navedenih smjernica, bit će odbijene ili će biti vraćene na doradu.**

**Prijave projektnih tema (1 PDF) šaljete asistentu:**

- *luka.blaskovic@unipu.hr* ili
- preko _Google Chata_

### 1.2 Modeliranje poslovnih procesa BPMN notacijom

**BPMN dijagram #1 (_As-Is_ model)**
Prvo modelirate _As-Is_ stanje poslovnog procesa. Ovo je ključni dio projekta za koji dobivate najveći broj bodova obzirom da uključuje identifikaciju poslovnog procesa, prikupljanje podataka i informacija te njihovu analizu i modeliranje.

_As-is_ predstavlja trenutno stanje poslovnog procesa, **kako se on danas izvodi u praksi**, a ne kako bi on trebao izgledati u idealnom slučaju, niti kako bi on mogao izgledati u budućnosti. Stoga je važno da se modeliranje temelji na stvarnim podacima i informacijama prikupljenim iz organizacije.

Ovo ne mora (i vrlo vjerojatno nije) najbolje moguće stanje procesa, **ali bitno je da u stvarnosti funkcionira**. Vaš zadatak je da ga točno i precizno prikažete koristeći BPMN notaciju, a nakon toga ćete morati identificirati potencijalne točke optimizacije, redundancije, uska grla, neefikasnosti i sl. Primjerice: nepotrebna čekanja, duple aktivnosti, redundantne dionike, nejasne odgovornosti dionika, nejasno specificirane uvjete, tokove aktivnosti koji ne vode nikuda i sl.

**Smjernice:**

- Nakon identifikacije procesa, prikupljenih informacija i podataka, identificirajte **početak** i **kraj** te **ključne aktivnosti** procesa.
- Nakon toga, **definirajte složenije aktivnosti** koje je moguće modelirati kao potprocese.
- Definirajte **vrste aktivnosti** i **vrste događaja** koji se pojavljuju te inicijalni **sekvencijalni slijed izvođenja** (npr. bez povratnih petlji i višestrukih grananja), pokušajte modelirati proces tako da jasno prikazuje tijek aktivnosti od početka do kraja.
- **Nastavite dalje razvijati i granati vaš poslovni proces**, vjerojatno ćete uočiti nove aktivnosti, paralelne aktivnosti, vanjske poticaje (okidače) i međudogađaje koji se javljaju za vrijeme izvođenja. Modelirajte takve situacije koristeći ispravne BPMN elemente.
- **Definirajte dionike procesa i njihove uloge koristeći polja i staze**. Važno je naglasiti ako je krajnji korisnik (npr. kupac, građanin, pacijent i sl.) aktivno uključen u procesni tijek, ili je tek inicijator procesa. Razmislite koje staze odabrati, a koja polja te kako ih imenovati. Ako je akter unutar/izvan organizacije, to također treba biti jasno prikazano u modelu. Naglasite tko obavlja koji slijed aktivnosti, gdje se taj slijed odvija te kako on počinje i završava.
- Tamo gdje su grananja procesa presložena ili kompleksna, preporučuje se razmatranje definiranja tih grananja pomoću poslovnih pravila te njihovo povezivanje s DMN (_Decision Model and Notation_) dijagramima.
- Obogatite model artefaktima poput Data objekata, anotacije, komentare, entiteti i drugim pomoćnim elementima kako biste dodatno pojasnili tokove podataka, uvjete i druge detalje koji nisu odmah vidljivi iz samog procesa.

Osim pridržavanja BPMN sintakse, standarda i dobrih praksi, **bodovat će se i grafički izgled te čitljivost završnog modela**. Preporučuje se primjena dobrih praksi modeliranja koje ste radili na vježbama i predavanjima, uz pažnju na logičan raspored elemenata (npr. izbjegavanje preklapanja strelica, ravnomjerno razmještanje elemenata, izbjegavanje nepotrebnih križanja sljedova grananja i sl.).

**Ključno je da model bude pregledan, jasan i lako razumljiv svim dionicima procesa.**

---

**BPMN dijagram #2 (_To-Be_ model)**

**Nakon što ste modelirali _As-Is_ stanje** poslovnog procesa, potrebno je definirati i modelirati _To-Be_ stanje poslovnog procesa. Ovaj model predstavlja **buduće**, **optimizirano stanje** poslovnog procesa **na temelju vaših analiza i preporuka za poboljšanje**. Ovakvo stanje procesa **nemoguće je modelirati bez prethodnog definiranja _As-Is_ stanja**.

**Preporuka**: za vrijeme modeliranje As-is stanja, vodite bilješke o svim potencijalnim točkama optimizacije, neefikasnostima, redundantnim aktivnostima i sl. koje uočite tijekom modeliranja. Te bilješke će vam pomoći pri definiranju _To-Be_ modela.

U _To-Be_ modelu trebate implementirati promjene koje će poboljšati učinkovitost, smanjiti troškove, povećati kvalitetu usluge ili zadovoljstvo korisnika (ili nešto treće?). To može uključivati:

- Uklanjanje nepotrebnih aktivnosti ili koraka u procesu
- Automatizaciju određenih aktivnosti korištenjem tehnologije
- Promjenu redoslijeda aktivnosti za bolje iskorištavanje resursa
- Uvođenje novih tehnologija ili alata za podršku procesu
- Poboljšanje komunikacije i koordinacije među dionicima procesa
- Uvođenje novih kontrolnih mehanizama za praćenje i mjerenje
- Optimizaciju toka podataka i informacija unutar procesa

Prilikom modeliranja _To-Be_ stanja, važno je da se pridržavate istih principa i standarda kao i kod _As-Is_ modela. Također, trebate jasno naznačiti koje su promjene uvedene u odnosu na _As-Is_ model, bilo kroz komentare, anotacije ili dodatne dokumente.

Iznimno, **ukoliko je _As-Is_ vrlo složen, možete izraditi reduciranu verziju _To-Be_ modela** (npr. fokusirati se samo na ključne promjene ili pojednostaviti određene dijelove u odnosu na _As-Is_ model). U tom slučaju, potrebno je jasno naznačiti koje su dijelove procesa reducirane i zašto. U suprotnom, preporučuje se izrada kompletnog _To-Be_ modela kako biste ostvarili maksimalan broj bodova.

### 1.3 Dokumentacija poslovnog procesa (Seminar)

Nakon što završite s modeliranjem oba stanja poslovnog procesa, potrebno je sastaviti dokumentaciju u obliku seminarskog rada od minimalno 15 stranica sadržaja (plus naslovna stranica, zaključak, sažetak i popis literature) gdje ćete detaljno opisati oba modelirana stanja poslovnog procesa, analizu prikupljenih podataka, identificirane probleme i predložene optimizacije. Seminar mora biti napisan u skladu s akademskim standardima pisanja, uključujući pravilno navođenje izvora i literaturnih referenci (APA6 ili APA7 stil citiranja). **Izvori prikupljanja podataka također moraju biti pravilno citirani.**

Navedena poglavlja predavanja potražite na Merlinu u kolegiju Upravljanje poslovnim procesima za akademsku godinu **2026./2027.**

**Seminar treba sadržavati cjeline:**

- **Identifikacija poslovnog procesa**
  - Jasno definirajte koji poslovni proces ste modelirali i zašto ste ga odabrali.
  - Odredite svrhu procesa i njegovu važnost za odabranu organizaciju.
  - Opišite kako ste došli do informacija o procesu.
  - Proučite materijale iz 4. poglavlja predavanja te iskoristite jednu od tehnika utvrđivanja poslovnih procesa (npr. _customer-journey mapping_).
  - **Proučiti 4. poglavlje iz PREDAVANJA**: Identifikacije i otkrivanje poslovnih procesa za dodatne smjernice u pisanju ovog poglavlja.

- **Analiza i modeliranje trenutnog stanja poslovnog procesa (As-Is)**
  - Glavno poglavlje gdje ćete predstaviti modelirani _As-Is_ proces.
  - Pojasnite ključne aktivnosti, kako se granaju i na temelju kojih uvjeta.
  - Navedite sve poslovne slučajeve koji se mogu pojaviti tijekom izvođenja procesa.
  - Dodajte slike onih dijelova modela procesa koje su najrelevantnije i koje želite naglasiti/dodatno objasniti (ne morate slikati svaki djelić modela).
  - Identificirajte potencijalne točke optimizacije (Što ste uočili tijekom modeliranja? Jeste li primijetili neefikasnosti, duple aktivnosti, nepotrebna čekanja, redundantne dionike, nejasne odgovornosti dionika, nejasno specificirane uvjete i sl.?, objasnite ih detaljno u odnosu na vaš konkretni _case-study_).
  - Pojasnite one aktivnosti ili grananja koji mogu biti dvosmisleni, nejasni ili složeni za razumijevanje u trenutnom stanju izvođenja procesa.
  - Za ključne skretnice, ispišite poslovna pravila koja definiraju kako se proces granja (npr. u tabličnom obliku kao poslovni slučajevi).
  - Upotrijebite neke od tehnika analiza kvalitativne i/ili kvantitativne analize procesa (npr. _waste analysis, root-cause analysis, why-why, pareto analiza, flow analysis, queueing theory..._).
  - **Proučiti 8. i 9. poglavlje iz PREDAVANJA**: (8) Kvalitativna analiza procesa i (9) Kvantitativna analiza procesa za dodatne smjernice

- **Analiza i modeliranje budućeg stanja poslovnog procesa (To-Be)**
  - Identificirajte ciljeve (što se želi postići _To-Be_ analizom?) npr. poboljšanje učinkovitosti, smanjenje financijskih troškova, ušteda vremena, bolja usklađenost s zakonskim regulativama, povećanje zadovoljstva korisnika i sl.
  - Kako ste došli do prijedloga optimizacije (npr. analiza _As-Is_ modela, _benchmarking_ s najboljim praksama u industriji, konzultacije s dionicima procesa, korištenje analitičkih alata i sl.)
  - Predložite promjene i poboljšanja u _To-Be_ modelu (ključni pojmovi: Automatizacija aktivnosti, Redizajn procesa, Lean pristupi, Six Sigma pristupi, procesna zrelost i sl.)
  - **Proučiti 10. i 11. poglavlje iz PREDAVANJA**: (10) Unaprjeđivanje i mjerenje poslovnih procesa i procesna zrelost i (11) Lean Six Sigma - DMAIC in R za dodatne smjernice

## 2. Drugi dio projekta: Izrada process-driven aplikacije na Camunda 8 platformi (max. 10 dodatnih bodova)

Drugi (**neobavezni**) dio projekta odnosi se na izradu _process-driven_ aplikacije koristeći [Camunda 8 platformu](https://docs.camunda.io/). Ovaj dio projekta je dodatni i može donijeti do 10 dodatnih bodova i ne može se izraditi samostalno bez prvog dijela projekta. Potrebno je izraditi jednostavnu _process-driven_ aplikaciju koja će automatizirati ili podržavati izvođenje modeliranog poslovnog procesa (bilo _As-Is_, _To-Be_ ili **reducirane verzije jednog od njih**). Camunda 8 predstavlja alat koji omogućuje **egzekuciju, praćenje i upravljanje procesnom instancom** u stvarnom vremenu, za modele definirane BPMN notacijom u Camunda Modeleru.

Krajnji rezultat je egzekutabilna _process-driven_ aplikacija koja se izvodi u **lokalnom okruženju**.

Camunda 8 okruženje potrebno je pokrenuti lokalno na računalo (**_*Self-Managed*_**). Navedeno okruženje besplatno je za razvoj i testiranje.

Potrebno je nadograditi seminar iz prvog dijela projekta s opisom izrade _process-driven_ aplikacije u Camunda 8 platformi (dodatnih 5-10 stranica sadržaja).

**U seminaru je potrebno prikazati sljedeće komponente procesne aplikacije:**

- Snimke zaslone iz **Camunda Operate** grafičkog sučelja (praćenje aktivnih procesnih instanci, tok izvršavanja, incidenti i sl.)
- Snimke zaslone iz **Camunda Tasklist** grafičkog sučelja (rad s korisničkim zadacima, dodjela zadataka, izvršavanje zadataka i sl.)
- Aktivne procesne instance u Camunda Operate sučelju
- Generirane forme za unos podataka korištenjem **Camunda Forms**
- Pokazati barem 1 primjer implementacije vanjskog connectora/Job Workera koji se koristi u servisnim zadacima (npr. poziv REST API-ja, slanje e-maila, integracija s bazom podataka i sl.)

Vanjski Connector (Job Worker) potrebno je samostalno implementirati kao jednostavan poslužitelj s dostupnim REST API-jem s minimalno 1-2 endpointa, koji se poziva iz Camunda 8 procesa putem Service Taska. Razvojni okruženje i tehnologija prema vašem izboru (Express.js, Flask, Spring Boot, Django, .NET, PHP, Rails, Aiohttp i dr.).

Job Worker mora komunicirati s Camunda 8 engineom putem Zeebe **Client API-ja** i obraditi posao koji odgovara definiranom task typeu u BPMN modelu.

**U video prezentaciji morate dodatno prikazati izvođenje barem jedne procesne instance ili izvrtjeti uživo ako prezentirate uživo.**

## Predaja i prezentacija projekta

**Prvo morate definirati "Opis projektnog zadatka" od max. 1 stranice prema uputama iznad u poglavlju: "Prijava projektne teme" te dobiti odobrenje asistenta za daljnju razradu teme.**

Projektni zadatak **moguće je prezentirati na 2 načina**:

- **uživo u dogovorenom terminu vježbi u 1. mjesecu 2027. godine**, npr. ako odlučite izaći na 1. ili 2. ispitni rok u veljači (premda nije obavezno)
- **snimanjem videozapisa u trajanju 20-tak minuta na bilo kojem ispitnom roku** (pa i prvom)
  - +10-15 minuta za prikaz _process-driven_ aplikacije (ako radite drugi dio projekta)

Projekt izrađujete **isključivo samostalno**, a konačnu verziju (spremnu za ocjenjivanje) predajete na Google Forms poveznici koja će biti objavljena na Merlinu.

**Potrebno je predati sljedeće datoteke:**

- `.bpmn` _As-is_ modela kojeg ste izradili (1 datoteka)
- `.bpmn` _To-be_ modela kojeg ste izradili (1 datoteka)
- Seminar u `.pdf` formatu (1 datoteka)

- (neobavezno) Izvorni kod _process-driven_ aplikacije (1 .zip datoteka ili link na GitHub repozitorij)

**Napomena:** Prije konačne predaje projekta, slobodno se možete javiti asistentu za pregled modela ili dokumentacije i dobiti povratne informacije te prijedloge za poboljšanje. Nakon konačne predaje nije moguće vršiti izmjene na predanoj dokumentaciji ili modelima.

Za sva druga pitanja ili nejasnoće vezane uz izradu projektnog zadatka, slobodno se obratite asistentu putem e-maila ili Google Chata.

Sretno! 😊
