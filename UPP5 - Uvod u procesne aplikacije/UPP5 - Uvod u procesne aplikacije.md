# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (5) Uvod u procesne aplikacije

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/upp-icons/UPP_5.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;">
Procesne aplikacije omogućuju automatizaciju poslovnih procesa korištenjem definiranih modela i pravila. Na ovom kolegiju naučili ste kako definirati poslovne procese korištenjem BPMN notacije, a sada ćete se upoznati s alatom Camunda 7 koji omogućuje izvođenje (egzekuciju) tih procesa. Camunda 7 je open-source platforma koja koristi BPMN za vizualno modeliranje procesa te pruža mehanizme za njihovo izvršavanje, nadzor i upravljanje. Primjenom Camunde, organizacije mogu optimizirati svoje poslovne procese i povećati učinkovitost poslovanja kroz automatizaciju zadataka i transparentno praćenje tijeka procesa. 
</div>
<br>

**🆙 Posljednje ažurirano: 13.12.2024.**

# Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(5) Uvod u procesne aplikacije](#5-uvod-u-procesne-aplikacije)
- [Sadržaj](#sadržaj)
- [1. Uvod u procesne aplikacije](#1-uvod-u-procesne-aplikacije)
- [2. Camunda 7](#2-camunda-7)
  - [2.1 Pokretanje preko Dockera](#21-pokretanje-preko-dockera)
- [3. Osnovne komponente Camunda 7 platforme](#3-osnovne-komponente-camunda-7-platforme)
  - [3.1 Camunda Cockpit](#31-camunda-cockpit)
    - [3.1.1 Egzekucija vlastitog procesa](#311-egzekucija-vlastitog-procesa)
    - [3.1.2 `User Task` i forme](#312-user-task-i-forme)
  - [3.2 Camunda Tasklist](#32-camunda-tasklist)
    - [3.2.1 Procesne varijable i dodavanje `XOR` skretnice](#321-procesne-varijable-i-dodavanje-xor-skretnice)
    - [3.2.2 Kako još možemo izraditi instance?](#322-kako-još-možemo-izraditi-instance)
- [4. Obrada vrijednosti procesnih varijabli u procesu](#4-obrada-vrijednosti-procesnih-varijabli-u-procesu)
- [Samostalni zadatak za Vježbu 5](#samostalni-zadatak-za-vježbu-5)

<div style="page-break-after: always; break-after: page;"></div>

# 1. Uvod u procesne aplikacije

Od početka razvoja BPMN-a isticalo se ostvarenje dvaju (prividno) međusobno teško uskladivih ciljeva:

1. **osigurati** da se normom služe poslovni stručnjaci koji ne razvijaju aplikacije i
2. **omogućiti** softverskim inženjerima da procesni model, izveden po toj normi, preslikaju u izvršnu aplikaciju primjerenu potrebama stvarnoga poslovnog procesa.

Drugim riječima, važna namjena BPMN-a jest premošćivanje jaza u sporazumijevanju između poslovnih i informatičkih stručnjaka 🙂

> Too often tension exists between the developer and analyst perpectives, resulting from the lack of a common semantics and heuristics set capable of depicting process activities in a way relevant to both parties.

Promatramo li BPMN 2.0 normu općenito, s odmakom od formalno izrečenih logičkih i tehničkih pojedinosti, možemo zaključiti da ona ima sljedeća svojstva:

- sadržava skup **pravila** i **simbola** za modeliranje poslovnih procesa i omogućuje različite oblike za grafičko predočavanje procesa, primjereno namjeni
- detaljno razrađen **grafički model** poslovnog procesa može se pretvoriti u izvršiv oblik i na temelju toga razviti potrebna softverska rješenja.
- pogodan za **zajednički jezik za sporazumijevanje** između poslovnih stručnjaka, **analitičara procesa** i **softverskih inženjera**.

**Procesna aplikacija (PA)** (_eng. process application_) se temelji na tijeku rada, odnosno može se reći da je svaka PA procesno usmjerena (_eng. workflow-oriented_). To je najšira definicija procesne aplikacije. Za preciziranje te definicije prikladno je reći što PA nije, odnosno po čemu se razlikuje od ostalih, podatkovno usmjerenih aplikacija:

**Klasične aplikacije (ne PA)** imaju sljedeća tipična svojstva:

- Funkcionalnosti, koje se ukratko mogu opisati izrekom **"upiši u bazu, pročitaj iz baze"**, definirane su stanjem podataka nakon što su izvedene određene aktivnosti ili proveden cijeli proces
- **Redoslijed izvođenja aktivnosti (ili tok rada) implicitno je sadržan u aplikaciji**, obično određen programiranim redoslijedom prikaza korisničkih poziva, odnosno poziva programskih sučelja
- **Aktivnosti i procesi ne postoje kao aplikacijski entiteti**
- **Arhitektura klasične aplikacije prilagođena je funkcionalnim CRUD** (_eng. Create, Read, Update, Delete_) potrebama odnosno stvaranju, čitanju, ažuriranju i brisanju podatkovnih zapisa
- Pri izmjeni poslovnih procesa (npr. zbog promjene zakonske regulative), klasične aplikacije treba **temeljito reprogramirati**, napose komponente njihove poslovne logike (_eng. business logic layer_)

S druge strane, **procesne aplikacije (PA)** imaju sljedeća tipična svojstva:

- **Funkcionalnosti su definirane tijekom rada koji aplikacija mora podržavati. Ishodište je za razvoj procesne aplikacije model procesa, dopunjen tako da bude u grupi izvršivih modela**
- Tijekovi rada u aplikaciji eksplicitni su i **neovisni o korisničkim i programskim sučeljima**
- **Aktivnosti i procesi određeni su kao aplikacijski entiteti** čijim se stanjima i definicijom izravno upravlja
- Arhitektura procesne aplikacije prilagođena je reagiranjem na **događaje** (_eng. event-driven_) i poruke (_eng. message-driven_) te **upravljanjem tijekom rada** (_eng. workflow management_)
- Procesne aplikacije mogu sadržavati jednako **korisničke aktivnosti** (_eng. user tasks_) i **automatizirane aktivnosti** (_eng. service tasks_)
- Procesne aplikacije **podržavaju više organizacijskih jedinica u organizaciji** i povezuju ih u cjelovit proces koji kupcu ili korisniku daje traženi proizvod ili uslugu
- **Procesne su aplikacije prilagodljive promjenama poslovnih procesa** jer nakon takvih izmjena ne treba reprogramirati aplikacijske komponente, nego procesnu aplikaciju samo opskrbiti ažuriranom definicijom aktivnosti i/ili procesa.

Razlike između klasičnih i procesnih aplikacija mogu se sažeti u sljedećoj tablici:

| Svojstva aplikacije   | Klasična aplikacija (OLTP ili ERP)         | Procesna aplikacija                                                                                              |
| --------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| Funkcionalnosti       | Definirane stanjem podataka na kraju posla | Definirane stanjem eksplicitno navedenih radnih aktivnosti. Ishodište za razvoj PA je **izvršivi model procesa** |
| Funkcionalna sintagma | "Upiši u bazu, pročitaj iz baze"           | "Slijedni najbolji radni tok."                                                                                   |
| Aktivnosti i procesi  | Ne postoje kao programski entiteti         | **Postoje kao programski entiteti** kojima se izravno upravlja                                                   |
| Arhitektura           | Prilagođena CRUD operacijama               | Prilagođena **reagiranjima na događaje i poruke** (_event-driven & message driven_)                              |

> **Napomena:** U praksi, granica između funkcionalnosti klasične i procesne aplikacije nije uvijek crno-bijela.

**Primjer ove diferencijacije na webshop aplikaciji:**

- **Klasična aplikacija** (zamišljamo u kontekstu kolegija _Programsko Inženjerstvo_ ili _Web aplikacije_):

  - Funkcionalnosti implementiramo _low-level_ programiranjem gdje razmišljamo o CRUD operacijama nad bazom podataka
  - _Primjer 1_: "Korisnik se registrira i pregledava proizvode" → CRUD operacije nad tablicama `users` i `products`, razvoj korisničkog sučelja, razvoj korespondirajućeg backenda za validaciju podataka i sl.
  - _Primjer 2_: "Korisnik dodaje proizvode u košaricu i i obavlja kupnju" → CRUD operacije nad tablicama `cart` i `orders`, razvoj korisničkog sučelja, razvoj odgovarajućih backend komponenti, spajanje na vanjske servise za plaćanje i sl.
  - **Ključno: Aplikacija se organizira oko podataka i operacijama nad njima**
    <br>

- **Procesna aplikacija** (zamišljamo u kontekstu ovog kolegija):
  - Funkcionalnosti implementiramo _high-level_ programiranjem gdje razmišljamo o **tijeku rada i aktivnostima koje korisnik treba obaviti**
  - _Primjer 1_: "Korisnik se registrira i pregledava proizvode" → Procesna aplikacija definira radne korake koje korisnik treba obaviti, npr. "Registracija korisnika", "Pregled proizvoda", "Dodavanje proizvoda u košaricu". Korake definiramo kroz neki **procesni model** (u našem slučaju **BPMN**, ali može biti i drugi)
  - **Aplikacija reagira na vanjske događaje i poruke** (npr. "Korisnik je pokrenuo proces narudžbe", "Plaćanje uspješno", "Proizvod je otpremljen") → _event-driven_ i _message-driven_ programiranje
  - Proces narudžbe zamišljamo kao **jedan entitet** koji se sastoji od više koraka (aktivnosti) koje korisnik treba obaviti, gdje određeni koraci mogu biti različitih tipova (korisničke aktivnosti, automatizirane aktivnosti, itd.).
  - **Ključno: Jedno započinjanje aktivnosti nazivamo pokretanje procesne instance**. Npr. "korisnik Pero Perić započinje proces narudžbe u webshopu". Samim time, svaki korisnik procesne aplikacije koji započne proces ima svoju **instancu procesa**. Stanje instance procesa može se ponovno izgraditi u svakom trenutku koristeći tzv. _event logove_.

Ipak, svim komercijalnim alatima za razvoj procesnih aplikacija, kao što je Camunda, zajedničko je sljedeće svojstvo: **procesne aplikacije izvode se kao web aplikacije**.

U kontekstu ovog kolegija, procesne aplikacije ćemo interpretirati kao web aplikacije koje koriste Camunda 7 platformu za izvođenje poslovnih procesa definiranih BPMN 2.0 normom.

Do sad smo naučili kako ispravno modelirati procese u BPMN notaciji, a sada ćemo se upoznati s alatom Camunda 7 koji omogućuje izvođenje (egzekuciju) tih procesa.

<div style="page-break-after: always; break-after: page;"></div>

# 2. Camunda 7

Camunda 7 je _open-source_ platforma koja koristi BPMN za vizualno modeliranje procesa te pruža mehanizme za njihovo **izvršavanje**, **nadzor** i **upravljanje**. Primjenom Camunde, organizacije mogu optimizirati svoje poslovne procese i povećati učinkovitost poslovanja kroz automatizaciju zadataka i transparentno praćenje tijeka procesa.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/camunda.png?raw=true" style="width:90%; "></img>

Do sad ste koristili [Open Source Desktop Modeler](https://camunda.com/download/modeler/) za modeliranje poslovnih procesa u BPMN notaciji, sada ćemo se upoznati s dodatnim komponentama Camunda platforme:

- **BPMN Workflow Engine**
- **DMN Decision Engine**
- **Tasklist**
- **Cockpit** i **Admin**

Camunda 7 nudi besplatni Community Edition paket koji uključuje sve potrebne komponente za upoznavanje procesnih aplikacija i njihovu egzekuciju lokalno na računalu, dok Enterprise Edition paket nudi dodatne mogućnosti za upravljanje i nadzor poslovnih procesa u velikim organizacijama, optimizacijske tehnike i naprednije sigurnosne mehanizme.

Također treba naglasiti da je Camunda 7 platforma EOL (End of Life) te je zadnje ažuriranje dobila u 10. mjesecu 2024. godine. Međutim, radi se o dobro razrađenom softveru koji se i dalje može koristiti za učenje i razvoj procesnih aplikacija. Camunda aktivno radi na razvoju nove verzije Camunda 8 koja donosi brojne nove mogućnosti.

Radi jednostavnije instalacije, ali i **dostupnosti materijala za učenje**, preporučuje se korištenje **Camunda 7** platforme do daljnjega.

## 2.1 Pokretanje preko Dockera

Camunda 7 platformu možete vrlo jednostavno pokrenuti lokalno preko [gotovog Docker kontejnera](https://hub.docker.com/r/camunda/camunda-bpm-platform/).

**Docker** je besplatna platforma koja omogućuje razvoj, postavljanje i pokretanje aplikacija u kontejnerima (_eng. [Containerization](<https://en.wikipedia.org/wiki/Containerization_(computing)>)\_). Kontejneri omogućuju pakiranje i izvršavanje aplikacija u izoliranom okruženju, što znači da se aplikacija može pokrenuti na bilo kojem računalu koje ima Docker instaliran, bez obzira na okruženje.

Prvi korak je preuzimanje **Docker Desktop** aplikacije sa [službene stranice](https://www.docker.com/).

Ako ste na Windows OS-u, Docker Desktop zahtjeva instalaciju WSL-2 (Windows Subsystem for Linux) koji se može instalirati preko PowerShell naredbe:

```bash
wsl --install
```

Dodatno, moguće je omogućiti **Hyper-V** i **podršku za virtualizaciju** u BIOS-u računala. Ovisno o proizvođaču matične ploče, postupak se razlikuje, ali BIOS-u se obično pristupa pritiskom tipke `F2`, `F10`, `F12` ili `DEL` prilikom pokretanja računala.

Najbolji način je pretražiti na internetu kako pristupiti BIOS-u na vašem računalu te kako omogućiti Hyper-V i virtualizaciju.

> Dakle, na Windowsu, Docker Desktop zahtjeva instalaciju WSL-2 **ili** Hyper-V.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/docker-install-windows.png?raw=true" style="width:70%; "></img>

> Upute za instalaciju Docker Desktop na Windows OS-u, dostupno na: https://docs.docker.com/desktop/setup/install/windows-install/

Docker je moguće koristiti i na **Linux** (dostupno za: Ubuntu, Debian, RHEL, Fedora) i **macOS** (dostupno za: Apple silicon, Intel chip) operacijskim sustavima bez dodatnih postavki. [Na Linuxu možete instalirati Docker i bez grafičkog sučelja preko terminala](https://medium.com/@akshaybengani/setup-docker-on-ubuntu-via-terminal-without-gui-45cdbebb2ce8), međutim za početnike je preporuka instalirati grafičko sučelje - **Docker Desktop**.

Nakon što ste uspješno instalirati **Docker Desktop**, provjerite je li uspješno instaliran preko naredbe:

```bash
docker --version
```

Pokrenite Docker Desktop aplikaciju i prijavite se s vašim Docker računom. Ako nemate Docker račun, možete ga besplatno kreirati na [Docker Hub-u](https://app.docker.com/signup).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/docker-desktop-gui.png?raw=true" style="width:70%; "></img>

> Grafičko sučelje Docker Desktop aplikacije

Grafičko sučelje Docker Desktop aplikacije sastoji se od nekoliko osnovnih elemenata:

1. **Container** - prikaz svih pokrenutih kontejnera (dva stanja: **Running** i **Exited**). **Kontejner** smo rekli da je svaka aplikacija koja se pokreće u izoliranom okruženju. U ovom slučaju, to će biti Camunda 7 platforma.
2. **Images** - prikaz svih preuzetih Docker "slika" (_eng. Docker images_). **Docker image je predložak za pokretanje kontejnera**.
3. **Volumes** - prikaz svih Docker "volumena" (_eng. Docker volumes_). **Docker volume koristi se za trajno pohranjenje podataka, obzirom da se podaci unutar kontejnera brišu prilikom gašenja kontejnera**.
4. **Builds** - prikaz svih provedenih Docker "buildova" (_eng. Docker builds_). Ovdje su pohranjeni svi Docker buildovi, uspješni i neuspješni.
5. **Docker Scout** - napredna analiza docker images, u svrhu pronalaska ranjivosti (_eng. vulnerabilities_). Za početnike, ovo nije bitno.
6. **Extensions** - dodatne ekstenzije za Docker Desktop aplikaciju. Za početnike, ovo nije bitno.

U pravilu, za sada će nam samo biti bitni **Container** i **Images** tabovi.

> **VAŽNO!** Kontejneri se uvijek pokreću preko odgovarajućeg image-a, gdje image predstavlja predložak za pokretanje kontejnera, a kontejner predstavlja realiziranu sliku (instancu) tog predloška.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/docker-images-gui.png?raw=true" style="width:70%; "></img>

> Prikaz svih preuzetih Docker "slika" (_eng. Docker images_)

Docker Desktop aplikacija prikazuje sve definirane Docker images koje izradimo **(1) lokalno putem terminala** ili **(2) koje preuzimamo** s [Docker Hub-a](https://hub.docker.com/).

Docker images lokalno gradimo koristeći **Dockerfile** datoteku, koja definira korake kontejnerizacije naše aplikacije. Ovime ćemo se detaljno baviti na kolegiju Raspodijeljeni sustavi na 1. godini diplomskog studija.

Za sada nas zanima samo dio koji se odnosi na preuzimanje gotove Docker "slike" s Docker Hub-a. **Docker Hub** je centralno mjesto za pronalazak i dijeljenje Docker images, slično kao što je GitHub centralno mjesto za pronalazak i dijeljenje izvornog koda (u obliku repozitorija).

Sliku s Docker Hub-a možemo preuzeti preko naredbe u terminalu (možete bilo gdje otvoriti terminal)

```bash
docker pull <image-name>:<tag>
```

Preuzet ćemo sljedeći [Camunda 7 image](https://hub.docker.com/r/camunda/camunda-bpm-platform/):

```bash
docker pull camunda/camunda-bpm-platform:latest
```

Nakon što preuzmemo sliku, možemo je pokrenuti preko naredbe:

```bash
docker run -d --name camunda -p 8080:8080 camunda/camunda-bpm-platform:latest
```

- `-d` - pokreće kontejner u pozadini (_eng. detached mode_)
- `--name camunda` - dodjeljuje naziv kontejneru
- `-p 8080:8080` - mapira port `8080` na lokalnom računalu (vašem) na port `8080` unutar kontejnera
- `camunda/camunda-bpm-platform:latest` - image koji pokrećemo

Nakon što pokrenemo kontejner, možemo provjeriti je li kontejner uspješno pokrenut preko Docker Desktop aplikacije.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/docker-camunda-container-running.png?raw=true" style="width:80%; "></img>

> Kontejner je uspješno pokrenut i radi na portu 8080

Kontejner je, osim preko terminala, **moguće pokrenuti direktno iz grafičkog sučelja**, međutim onda je ove dodatne postavke potrebno unijeti u grafičkom sučelju.

**Praktičnije je i brže naučiti osnovne Docker naredbe u terminalu**

> CLI Cheat Sheet za Docker možete preuzeti na sljedećoj poveznici: https://docs.docker.com/get-started/docker_cheatsheet.pdf

Nakon što je kontejner uspješno pokrenut, možemo pristupiti Camunda 7 platformi preko web preglednika na adresi: `http://localhost:8080/camunda`

Otvorite u web pregledniku adresu: `http://localhost:8080/camunda-welcome/index.html`. Ako je kontejner uspješno pokrenut, trebali biste vidjeti sljedeći prikaz:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/camunda_platform_web.png?raw=true" style="width:90%; "></img>

> Camunda 7 platforma pokrenuta lokalno preko Docker kontejnera: `camunda/camunda-bpm-platform:latest`

<div style="page-break-after: always; break-after: page;"></div>

# 3. Osnovne komponente Camunda 7 platforme

Camunda 7 platforma koju ste pokrenuli sastoji se nekoliko ključnih komponenti:

- **Workflow Engine**: Pozadinski "motor" koji izvršava poslovne procese definirane BPMN 2.0 normom
- **Cockpit**: Monitoring i nadzor poslovnih procesa i aktivnih instanci
- **Tasklist**: Popis zadataka koje korisnici trebaju obaviti (User Tasks)
- **Admin**: Upravljanje korisnicima (User Management), grupama, ovlastima i sl.

Za samu egzekuciju procesa dovoljan je samo **Workflow Engine**, dok su **Cockpit**, **Tasklist** i **Admin** dodatne komponente koje olakšavaju upravljanje i nadzor poslovnih procesa kroz grafička sučelja.

Kao 5. komponentu ne smijemo izostaviti naš **Camunda Modeler** koji koristimo kao odvojeni alat za **modeliranje**. Međutim, vidjet ćete da modeliranje sad dobiva na još jednoj dimenziji - onoj **podatkovnoj**.

Za učenje, ovdje već imate uključena 2 poslovna procesa:

- _Invoice Receipt_
- _Review Invoice_

## 3.1 Camunda Cockpit

Na početnoj stranici, gdje vidite prikaz svih komponenti, odaberite **Cockpit**.

Tražit će vas da se prijavite. Korisničko ime i lozinka su `demo`.

**Camunda 7 Cockpit** predstavlja centralno mjesto za **nadzor**, **upravljanje** i **analizu poslovnih procesa** koji se izvršavaju. Kao i druge komponente (osim Workflow Enginea), Cockpit je dostupan preko web grafičkog sučelja.

Jednom kad se prijavite, vidjet ćete upravljačku ploču koja prikazuje trenutne **aktivne procese** i **procesne instance**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-dashboard.png?raw=true" style="width:90%; "></img>

> Početna upravljačka ploča Camunda Cockpit komponente

Podsjetimo se: **Procesna instanca odnosi se na jedno pokretanje procesa**.

Svaki korisnik koji pokrene proces ima svoju instancu procesa.

Na ovom prikazu vidimo 2 aktivna procesa:

- _Invoice Receipt_
- _Review Invoice_

Od toga, postoji:

- 6 aktivnih instanci procesa _Invoice Receipt_ i
- 2 aktivne instance procesa _Review Invoice_

Ako pritisnite `Processes` u gornjem izborniku, vidjet ćete popis pokrenutih **procesa**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-active-processes.png?raw=true" style="width:50%; ">

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-active-processes-instances.png?raw=true" style="width:90%; ">

> Pregled **aktivnih procesa** i **procesnih instanci**

Otvorite proces _Review Invoice_ kako biste vidjeli aktivne instance tog procesa i trenutno stanje procesa kroz **dijagram toka**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-instances-diagram.png?raw=true" style="width:90%; ">

Uočite putanju u programu:

> Dashboard → Processes → Review Invoice : Runtime

Sad **pregledavamo aktivne instance procesa** _Review Invoice_. Vidimo da postoje dvije.

U prvom planu vidimo dijagram ovog poslovnog procesa koji se sastoji od samo **2 aktivnosti (eng. Task)**:

- _Assign Reviewer_ (User Task)
- _Review Invoice_ (User Task)

Na dijagramu vidimo brojku `(2)` pored aktivnosti _Assign Reviewer_ što znači da postoje **2 aktivne instance** ovog procesa **koje se trenutno nalazi na ovoj aktivnosti** (radnom koraku).

> Spomenutu oznaku nazivamo **token**.

U izborniku lijevo možemo vidjeti neke općenite informacije o procesu, kao što su:

- **Definition Version** - verzija definicije procesa (u slučaju da se proces mijenjao, što je čest slučaj u praksi)
- **Definition ID** - ID trenutne definicije poslovnog procesa
- **Definition Key** - ključ definicije procesa
- **History Time To Live** - koliko dugo se povijest procesa (pohranjene procesne varijable) čuva u internoj bazi podataka
- **Deployment ID** - ID trenutnog _deploymenta_ poslovnog procesa
- **Instance Running** - koliko je trenutno aktivnih instanci procesa, za trenutnu verziju i sve verzije ukupno

Ako pritisnemo na jednu od dvije instance, otvorit će se još jedan prozor s detaljima o toj instanci. Ovdje su nam najzanimljivije pohranjene **procesne varijable**:

- _amount_
- _creditor_
- _invoiceCategory_
- _invoiceDocument_
- _invoiceNumber_

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-instance-details.png?raw=true" style="width:90%; ">

> Detalji o jednoj instanci procesa _Review Invoice_ (**procesne varijable**)

Vidimo da se svaka varijabla sastoji od:

- **naziva/ključa**
- **tipa podataka** (npr. `Integer`, `Boolean`, `Double`, `String`, `File`, itd.)
- **vrijednosti**
- **opsega procesa gdje je procesna varijabla vidljiva (scope)**

Vrijednosti se ovdje mogu direktno mijenjati, što je korisno **u slučaju da je potrebno ručno intervenirati u procesu**.

U prozoru `Add criteria` moguće je definirati kriterije za filtriranje podataka po **instanci**, **ključu** i **vrijednosti varijable**.

Ako se vratimo na `Dashboard → Processes` i otvorimo drugi proces _Invoice Receipt_, možemo vidjeti i ovaj proces i njegove aktivne instance.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/cockpit-invoice-receipt-instances.png?raw=true" style="width:90%; ">

> Pregled aktivnih instanci procesa _Invoice Receipt_

Vidimo da je proces složeniji od prethodnog, sastoji se od 3 staze (swimlanes) koje predstavljaju različite sudionike u procesu:

- **Team Assistant**
- **Approver**
- **Accountant**

Ovaj proces ima ukupno 6 aktivnih instanci, od kojih su:

- 3 u definiciji procesa V1.0 i
- 3 u definiciji procesa V2.0

Dalje, možemo uočiti nekoliko aktivnosti na svakoj stazi:

- _Assign Approver Group_
- _Approve Invoice_
- _Review Invoice_
- _Prepare Bank Transfer_
- _Archive Invoice_

Uočavate li nešto? _Review Invoice_ je ustvari **potproces** koji se koristi u ovom procesu, međutim on je definiran i _deployan_ kao zasebni proces koji se izvršava u Workflow engineu, a i vidjeli smo ga malo prije.

Dakle, kroz Camunda Cockpit, osim glavnog procesa koji se izvršava, **možemo na jednak način pratiti i potprocese koji se izvršavaju unutar glavnog procesa**.

Ako pogledate ovdje graf, možemo vidjeti ukupno 3 tokena: brojke `(1)` na aktivnostima:

- _Approve Invoice_
- _Prepare Bank Transfer_
- _Review Invoice_

Što to znači? 🤔

---

- **Ukupno 1 instanca** procesa _Invoice Receipt_ je trenutno na aktivnosti **_Approve Invoice_**.
  - Npr. "Za invoice broj 12345, Approver mora odobriti račun".
- **Ukupno 1 instanca** procesa _Invoice Receipt_ je trenutno na aktivnosti **_Prepare Bank Transfer_**.
  - Npr. "Za invoice broj 54321, Accountant mora pripremiti bankovni transfer".
- **Ukupno 1 instanca** procesa _Invoice Receipt_ je trenutno na aktivnosti (potprocesu) **_Review Invoice_**.
  - Npr. "Za invoice broj 67890, Team Assistant mora pregledati račun".

Ako stisnemo na neku od ovih aktivnosti s tokenom, **filtrirat će nam se one instance koje se trenutno nalaze na toj aktivnosti**.

Dodatno, pored potprocesa možemo odabrati opciju `"Show Called Process Definition"` koja će nam otvoriti novi prozor **s detaljima o tom potprocesu i njegovim aktivnim instancama**, dakle klikom na "Review Invoice", otvorit će se `Dashboard -> Processes -> Invoice Receipt -> Review Invoice: Runtime`.

<div style="page-break-after: always; break-after: page;"></div>

### 3.1.1 Egzekucija vlastitog procesa

Prije nego što krenemo pregledavati druge komponente (`Tasklist`, `Admin`), idemo pokušati definirati vlastiti poslovni proces, pokrenuti ga te pratiti njegovo izvođenje unutar Camunda Cockpita.

Otvorite Camunda Modeler i odaberite novi BPMN dijagram za Camunda 7 platformu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/modeler-new-camunda7.png?raw=true" style="width:30%; ">

> Odaberite Camunda Platform 7 -> BPMN diagram

Dijagram pohranite lokalno, na proizvoljnu lokaciju.

Definirat ćemo jednostavan proces koji definira **obradu narudžbe proizvoda u webshopu**. Nazovite ga: _webshop-order.bpmn_

**Krenimo jednostavno**, definirat ćemo proces koji se sastoji od 3 aktivnosti u jednoj stazi:

- _Potvrda narudžbe_
- _Priprema narudžbe_
- _Isporuka narudžbe_

Za sada nećemo definirati dopunske atribute aktivnosti, niti skretnice. Napravite jednostavan linearni proces s 3 aktivnosti i početnim i završnim događajem.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order.png?raw=true" style="width:70%; ">

> Jednostavan proces narudžbe u webshopu

Prije nego možemo _deployati_ ovaj proces, moramo definirati nekoliko stvari:

- **Process name** - ime procesa (npr. _Webshop Order_)
- **Version tag** - verzija procesa (npr. _v1.0_)
- **Time to live** - koliko dugo se povijest procesa čuva u bazi podataka (unesite proizvoljnu vrijednost)
- **Process ID** - jedinstveni identifikator procesa (npr. _narudzba_robe_) (čisto da vidite da ne mora biti isto kao ime procesa, ovaj podatak ćemo kasnije najviše koristiti)

Stisnite na _pool_ gdje je sadržan proces, trebao bi vam se otvoriti s desne strane prozor s postavkama procesa (**Properties panel**).

Ako vam se ovaj prozor ne prikazuje, odaberite `Window -> Toggle Properties Panel`. Jednom kad se otvori, **unesite tražene vrijednosti**:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order-default-props.png?raw=true" style="width:70%; ">

> Postavke procesa u **Properties panelu**

Sada možete deployati diagram pritiskom na ikonu rakete (🚀) u donjem lijevom kutu

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/deploy_diagram.png?raw=true" style="width:70%; ">

> **Provjerite da se PORT REST endpointa poklapa s portom na kojem je pokrenuta Camunda platforma, odnosno PORT na koji je mapiran Docker kontejner.**

Trebali biste dobiti poruku o uspješnom deploymentu definicije procesa. Sada otvorite Camunda Cockpit i pregledajte procese:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order-deployed.png?raw=true" style="width:90%; ">

Ako otvorite proces, vidjet ćete da **nema aktivnih instanci**. To je zato što nismo pokrenuli niti jednu.

U realnom okruženju, proces će se pokrenuti nekim događajem ili korisničkom interakcijom. Međutim, tijekom razvoja procesne aplikacije, možemo ručno pokrenuti proces:

**Vratite se u Modeler**, na dnu odaberite strelicu pored ikone rakete (🚀) i odaberite `Start process instance`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order-start-instance.png?raw=true" style="width:60%; ">

> Pokretanje nove instance procesa direktno unutar **Camunda Modelera**

Trebali biste dobiti obavijest o uspješnom pokretanju instance procesa.

Ako se vratite u Camunda Cockpit i osvježite stranicu očekivali biste novu instancu procesa koja čeka na zadatku `"Potvrda narudžbe"`, međutim to nije slučaj. Zašto?

### 3.1.2 `User Task` i forme

Nećete vidjeti novu instancu procesa, niti će se ona pojaviti u Cockpitu jer je instanca već završila (odnosno započela, odradila zadatke i završila). Naime, proces koji smo definirali je jednostavan linearni proces koji se sastoji od 3 aktivnosti i završnog događaja. Ove 3 aktivnosti koje smo definirali nemaju nikakve dodatne postavke/atribute, odnosno **nismo definirali način na koji korisnik može dati "input" u proces**, npr. **obraditi narudžbu**, **pripremiti narudžbu** i sl.

Ako se prisjetite, rekli smo da za radnje koje obavlja korisnik preko informacijskog sustava (u našem slučaju je to Camunda Cockpit) koristimo **korisnički radni korak/zadatak** (`User task`) kao **opisni atribut aktivnosti**.

Izmijenit ćemo proces tako da aktivnost `"Potvrda narudžbe"` bude `User task`.

Međutim to nije sve, moramo definirati i neki način kako će korisnik potvrditi tu narudžbu, kojom interakcijom? To ćemo definirati preko **formi**. Camunda 7 dozvoljava da definirate 3 vrste formi:

1. `Camunda Forms`
2. `Embedded or External Task Forms`
3. `Generated Task Forms`

Općenito, forme definiraju **način na koji korisnik može unijeti podatke u proces**.

1. `Camunda Forms` su bazirane na JSON zapisu i direktno su integrirane u Camunda Modeler kroz **Form Editor** (`File -> New file -> Form (Camunda platform 7)`). Potrebno je dodati referencu na formu, a one će se automatski prikazati u Cockpitu.
2. `Embedded or External Task Forms` su forme koje se mogu definirati izvan Camunda Modelera, npr. preko HTML/CSS/JS. S njima je moguće komunicirati preko REST API poziva.
3. `Generated Task Forms` su forme koje se generiraju automatski na temelju varijabli koje su definirane u opcijama **Form fields** u Properties panelu za `User Task`.

Mi ćemo za sad odabrati **treću opciju** obzirom da je ujedno i najjednostavnija.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/potvrda_narudzbe_task_form.png?raw=true" style="width:90%; ">

> Unos ID-a i odabir tipa forme: **"Generated Task Forms"**

Svakoj aktivnosti, pa i ovoj, možete dodati ID, npr. `potvrda_narudzbe_task`.

1. Pod `Forms` odaberite `Generated Task Forms`
2. Odaberite `Form Fields` i dodajte jedno polje. Nazovite ga `narudzba_potvrdena` i postavite tip podatka na `Boolean`. Pod `Label` možete unijeti labelu koje će korisnik vidjeti za navedeno polje, npr. `"Želite li potvrditi narudžbu?"`.

> Uočite dodatne opcije (`Constraints`, `Properties`), za sada ćemo ih ignorirati.

Dignite verziju procesa na `v2.0` i _deployajte_ ga.

Nakon toga, startajte novu instancu procesa kroz Modeler.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-narudzba-potvrdena-form.png?raw=true" style="width:90%; ">

> Dodavanje novog polja u formu

Otvorite instance ovog procesa, vidjet ćete **1 aktivnu instancu** koja ima token na aktivnosti `"Potvrda narudžbe"`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/camunda_potvrda_narudzbe_pending.png?raw=true" style="width:90%; ">

> Pregled aktivne instance procesa s tokenom na aktivnosti `"Potvrda narudžbe"`

Kako bi završili ovu aktivnost, moramo potvrditi narudžbu putem nove forme koju smo definirali 😎

<div style="page-break-after: always; break-after: page;"></div>

## 3.2 Camunda Tasklist

**Camunda Tasklist** je web aplikacija unutar Camunde 7 koja omogućuje korisnicima da pregledavaju i obavljaju korisničke zadatke (**User Task**) koji su im dodijeljeni u poslovnim procesima.

Otvorite `Tasklist` preko početne stranice Camunda platforme.

Ako vas traži korisničke podatke, možete ponovo unijeti **demo** kao korisničko ime i lozinku.

Lijevo ćete vidjeti grupirane zadatke po kategorijama. Zadatke je moguće grupirati po korisnicima, po procesima, po prioritetu, po datumu, itd. Možete vidjeti nekoliko predefiniranih grupa, ali i zadatke različitih korisnika koji su uneseni po defaultu u Camunda platformu, radi lakšeg učenja (John, Marry, Peter).

Odaberite `All Tasks` kako biste vidjeli sve zadatke.

Obzirom da ste prijavljeni kao `demo`, koji ima **administratorske ovlasti**, vidjet ćete sve zadatke koji su trenutno aktivni u Camunda platformi.

Dakle, možete se samostalno dodijeliti na zadatak `Potvrda narudžbe`; pritisnite na `Claim` skroz desno.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/tasklist_all_tasks.png?raw=true" style="width:90%; ">

> Pregled svih zadataka (All Tasks) u `Tasklist` aplikaciji

U sadržaju forme možete vidjeti polje `narudzba_potvrdena` kojem ste dodijelili labelu `"Želite li potvrditi narudžbu?"` i tip podatka `Boolean`.

Možete odabrati _checkbox_ i pritisnuti na `Complete` kako biste završili ovaj korisnički zadatak, ali ga i ne morate odabrati jer je polje `narudzba_potvrdena` definirano kao `Boolean` tip podatka, što znači da je moguće unijeti i `true` i `false` vrijednosti.

Što će se dogoditi nakon što završite ovaj zadatak? 🤔

Što ako ga završimo s `true` vrijednošću? A što ako ga završimo s `false` vrijednošću?

> Instanca procesa završava u oba slučaja.

---

### 3.2.1 Procesne varijable i dodavanje `XOR` skretnice

Vidjeli smo u modeliranju, da je uobičajeno da se nakon `User Taska` dodaje **`XOR`** skretnica koja **određuje sljedeći korak** u procesu ovisno o rezultatu korisničkog zadatka, iako to ne mora uvijek biti slučaj.

Nadogradit ćemo proces dodavanjem `XOR` skretnice koja će ovisno o rezultatu zadatka `"Potvrda narudžbe"` podijeliti proces na dva toka:

- ako je narudžba potvrđena, proces ide dalje na korak `"Priprema narudžbe"`
- ako narudžba nije potvrđena, proces završava

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order_xor_added.png?raw=true" style="width:70%; ">

> Dodavanje `XOR` skretnice u definiciju procesa s alternativnim slijedom

Što je ovdje podatak/varijabla? 🤔

U ovom slučaju, podatak je `narudzba_potvrdena` koji je definiran u formi korisničkog zadatka `"Potvrda narudžbe"`. Ovaj podatak je **procesna varijabla** koja se pohranjuje u **procesnu instancu** i može se kasnije koristiti bilo gdje u procesu. Naziv procesne varijable smo definirali prilikom definiranja forme (`ID - Refers to the process variable name`).

Drugim riječima, procesna varijabla je **automatski pohranjena u procesnoj instanci** jednom kad se aktivnost `"Potvrda narudžbe"` završi.

Ono što moramo napraviti je definirati koristeći [Expression Language (EL) ](https://docs.camunda.org/manual/7.22/user-guide/process-engine/expression-language/) **izraze na izlaznim tokovima XOR skretnice**.

Na izlaznim tokovima smo već napisali labele:

- da
- ne

**Međutim to nije dovoljno kod razvijamo procesne aplikacije!**

Osnovna sintaksa za **provjeru vrijednosti procesne varijable** je:

```bash
${varijabla == "vrijednost"}
```

U našem slučaju `"vrijednost"` je `true` ili `false`.

Dakle, na izlaznom toku koji ide prema `"Priprema narudžbe"` napišite izraz:

```bash
${narudzba_potvrdena == true}
```

Na izlaznom toku koji ide prema završnom događaju napišite izraz:

```bash
${narudzba_potvrdena == false}
```

Alternativno, moguće je `Boolean` izraze napisati i skraćeno:

```bash
${narudzba_potvrdena}
```

odnosno ako nije potvrđena:

```bash
${!narudzba_potvrdena}
```

Odaberite strelice i definirajte `Condition Expression` za svaki izlazni tok (2):

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/expression_narudzba_potvrdena.png?raw=true" style="width:90%; ">

> Dodavanje izraza na izlazne tokove XOR skretnice (na izlazni tok "ne" dodan je izraz `${!narudzba_potvrdena}`)

**Ako sad ispunite formu i odaberete** `true`, proces će ići prema aktivnosti `"Priprema narudžbe"`. Ako odaberete `false`, proces će završiti.

Provjerite rezultat u Camunda Cockpitu:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop_order_priprema_narudzbe.png?raw=true" style="width:70%; ">

> Token (1) se nalazi na aktivnosti `"Priprema narudžbe"`, što znači da **jedna aktivna instanca procesa čeka na ovom koraku**

Ako otvorite pregled procesne instance u Cockpitu, vidjet ćete da je procesna varijabla `narudzba_potvrdena` pohranjena u procesnu instancu i ima vrijednost `true`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop_order_priprema_narudzbe_boolean_var.png?raw=true" style="width:70%; ">

> Pregled procesne instance s pohranjenom procesnom varijablom `narudzba_potvrdena`

**Pokrenite još dvije instance** ovog procesa kroz Modeler:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop_3_instances.png?raw=true" style="width:70%; ">

> Prikaz 3 aktivne instance procesa, od kojih 2 čekaju na aktivnosti "Potvrda narudžbe", a jedna na "Priprema narudžbe"

### 3.2.2 Kako još možemo izraditi instance?

Osim ručnog pokretanja procesa preko Modelera, moguće je pokrenuti proces preko **REST API-ja**, ali i direktno iz **Camunda Tasklista**.

Do sad smo direktno izrađivali novu instancu procesa preko Modelera, iako je ovo praktično za testiranje, u stvarnom okruženju korisnici naravno neće imati pristup modeleru.

Problemi su sljedeći:

- Pristigla je narudžba - gdje su podaci o narudžbi? Kako ih unijeti?
- Kako krajnji korisnik može pokrenuti instancu procesa?

Procesne varijable možemo, osim kroz različite aktivnosti, **definirati i na početku**, kod započinjanja procesa. Proces koji modeliramo započinje primitkom narudžbe, logično je da onda i podaci o narudžbi budu procesne varijable.

Konkretno, podaci o narudžbi razlikovat će se u svakoj procesnoj instanci, samim tim je logično da ih ne definiramo unutar procesa (npr. u start eventu), već se unose **prilikom pokretanja procesa**.

**1. Način:** Izrada procesne instance s varijablama preko **Camunda Tasklista**

- otvorite **Tasklist sučelje** i odaberite `Start process` u gornjem desnom kutu

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/tasklist_start_process.png?raw=true" style="width:100%; ">

Odaberite `webshop-order` proces:

- unesite `Business Key` (proizvoljno): predstavlja jedinstveni ključ procesne instance (npr. u stvarnosti može biti ID narudžbe)
- dodajte varijable pritiskom na "Add a variable" i unesite neke podatke o narudžbi u obliku ključ:vrijednost parova

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order-start-process-from-tasklist.png?raw=true" style="width:80%; ">

> Pokretanje procesa s varijablama preko **Tasklista**

Dobit ćete poruku `"Process has been started."`

Provjerite procesne varijable pohranjene u procesnu instancu u **Cockpitu**.

---

**2. Način:** Izrada procesne instance s varijablama preko **REST API-ja**

Jednom kad se Camunda platforma pokrene, automatski se pokreće i REST API koji omogućuje komunikaciju s platformom preko HTTP protokola. REST API je dokumentiran i možete pronaći sve informacije na [sljedećoj poveznici](https://docs.camunda.org/manual/7.15/reference/rest/).

Ako otvorite Modeler, vidjet ćete da je REST endpoint sljedeći:

```bash
http://localhost:8080/engine-rest
```

Otvorite **Postman** ili **Thunder Client**, možete poslati GET zahtjev na `http://localhost:8080/engine-rest/process-definition` kako biste dobili sve definicije procesa:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/HTTP_GET_process-definition.png?raw=true" style="width:80%; ">

> Uočite proces `webshop-order` kao drugu vrijednost u JSON listi

Za pokretanje procesa, koristimo **POST metodu** i **endpoint** `http://localhost:8080/engine-rest/process-definition/key/<ProcessID>/start`, gdje je `<ProcessID>` ključ procesa, npr. `webshop-order` ili `narudzba_robe` - ovisno kako ste ga definirali u Modeleru (pogledati poglavlje 3.1.1).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/ProcessID.png?raw=true" style="width:30%; ">

> Ključ procesa je `narudzba_robe`

**Endpoint za pokretanje procesa je:**

```bash
http://localhost:8080/engine-rest/process-definition/key/narudzba_robe/start
```

Međutim, kako bi pokrenuli proces s varijablama, moramo dodati i varijable u **tijelu HTTP zahtjeva**.

Varijable je potrebno omotati u JSON objekt, unutar ključa `variables`.

Npr. sljedeći JSON objekt započinje instancu procesa `narudzba_robe` s varijablama `proizvod`, `cijena` i `kolicina`:

```json
{
  "variables": {
    "proizvod": {
      // ključ varijable
      "value": "Majica", // vrijednost varijable
      "type": "String" // tip varijable
    },
    "cijena": {
      "value": 70,
      "type": "Double"
    },
    "kolicina": {
      "value": 2,
      "type": "Integer"
    }
  }
}
```

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/instanciranje_procesa_rest_api.png?raw=true" style="width:100%; ">

> Izrada procesne instance s varijablama preko REST API-ja

Provjerite procesnu instancu i pohranjene varijable u **Cockpitu**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order-process-instance-restapi-vars.png?raw=true" style="width:90%; ">

> Pregled procesne instance definirane preko REST API-ja i njezinih pohranjenih varijabli

<div style="page-break-after: always; break-after: page;"></div>

# 4. Obrada vrijednosti procesnih varijabli u procesu

Sad kad smo dodali mogućnost unosa podataka u proces preko **Tasklista** i **REST API-ja**, možemo **iskoristiti te podatke u procesu**.

Procesne varijable možemo dohvaćati na jednak način, bez obzira na način unosa, a to je sintaksom: `${naziv_procesne_varijable}`.

> Nadogradit ćemo proces `narudzba_robe` tako da se na temelju unesenih podataka o narudžbi, izračuna ukupna cijena narudžbe. Slijed procesa se sad paralelno dijeli na `"Priprema narudžbe"` i novi User Task - `"Odobravanje popusta od 10%"`. Korisnik može odobriti ili odbiti popust na narudžbu, a prilikom odobravanja/odbijanja mora unijeti i svoje ime i prezime. Ako korisnik odobri popust, isti se mora izračunati i pohraniti u procesnu varijablu. Ako korisnik odbije popust, proces nastavlja na jednak način ali bez izračuna popusta.

Koje atribute ćemo koristiti za ovaj nadograđeni proces?

- `"Potvrda narudžbe"` - **User Task**
- `"Odobravanje popusta"` - **User Task**
- `"Izračunaj popust od 10%"` - **Service Task**
- `"Priprema narudžbe"` - **Manual Task**
- `"Isporuka narudžbe"` - **User Task** - čisto da nam instanca ne završi odmah, inače bi bio _manual task_ ili _potproces_

Nakon `"Odobravanje popusta"` želimo izračunati ukupnu cijenu narudžbe i pohraniti ju u novu procesnu varijablu `ukupna_cijena`. Ova aktivnost ide u `XOR split` skretnicu `"Popust odobren?"` koja ovisno o rezultatu ide na `"Izračunaj popust od 10%"` ili direktno u `AND merge` skretnicu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-order_nadogradeno.png?raw=true" style="width:90%; ">

Prvo ćemo definirati formu za `Odobravanje popusta`. Odaberite `Generated Task Forms` i dodajte polja:

- `popust_odobren` - tip podatka `Boolean`, labela: `"Želite li odobriti popust od 10%?"`
- `djelatnik_ime` - tip podatka `String`, labela: `"Molimo unesite vaše ime"`
- `djelatnik_prezime` - tip podatka `String`, labela: `"Molimo unesite vaše prezime"`

**Gotovo svaka aktivnost može kao rezultat svog izvršavanja pohraniti neku procesnu varijablu**. Moguće je iskoristiti vrijednosti postojećih varijabli te unutar `Expression` izraza izračunati nove vrijednosti.

**Mi želimo izračunati ukupnu cijenu narudžbe** koristeći procesne varijable `cijena` i `kolicina` te pohraniti rezultat u novu varijablu `ukupna_cijena`.

Odaberite `Outputs` i dodajte novu varijablu `ukupna_cijena`. Odaberite `String or expression` te kao vrijednost pohranite:

```bash
${cijena * kolicina}
```

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/odobravanje_popusta_user_task.png?raw=true" style="width:60%; ">

> Dodavanje 3 polja u Form fields korisničkog zadatka `"Odobravanje popusta"` te dodavanje izračunate procesne varijable `ukupna_cijena` kao izlaznu vrijednost (**Outputs**) ovog zadatka

Na izlaznom toku `Da` dodajte izraz:

```bash
${popust_odobren}
```

Na izlaznom toku `Ne` dodajte izraz:

```bash
${!popust_odobren}
```

Izlazni tok `Da` ide na aktivnost `"Izračunaj popust od 10%"`, a izlazni tok `Ne` ide direktno u `AND merge` skretnicu.

Na `"Izračunaj popust od 10%"` aktivnosti ćemo odabrati **servisni zadatak**. Servisni zadatak je aktivnost koja se izvršava automatski, bez korisničke interakcije, i može izvršiti neki posao, npr. izračunati popust. Odaberite jednostavni izraz:

> `Implementation` -> `Type` -> `Expression`

Sad možemo definirati izraz koji će promijeniti vrijednost procesne varijable `ukupna_cijena`:

```bash
${execution.setVariable("varijabla", vrijednost)}
```

U našem slučaju:

```bash
${execution.setVariable("ukupna_cijena", ukupna_cijena - ukupna_cijena*0.1)}
```

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/service_task_izracun_popusta.png?raw=true" style="width:60%; ">

> Definiranje izraza za izračun popusta od 10% na servisnom zadatku `"Izračunaj popust od 10%"`

To je to! **Redployajte novu verziju procesa** i **pokrenite novu instancu procesa** kroz **REST API** ili **Tasklist**. Dodajte početne procesne varijable: `proizvod`, `cijena`, `kolicina` i pratite tijek procesa kroz **Cockpit**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-upgraded-1.png?raw=true" style="width:90%; ">

> Početno stanje instance procesa s varijablama `proizvod`, `cijena` i `kolicina`, čekanje na aktivnost `"Potvrda narudžbe"`

Nakon potvrde narudžbe, paralelno se izvršavaju aktivnosti `"Priprema narudžbe"` i `"Odobravanje popusta"`. Međutim, proces čeka na egzekuciju `"Odobravanje popusta"` budući da je to `User Task`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-upgraded-2.png?raw=true" style="width:90%; ">

> Prikaz aktivne instance procesa s tokenom na aktivnosti `"Odobravanje popusta"` i `AND merge` skretnici budući da se manualni taskovi preskaču

Otvaramo **Tasklist** i odabiremo zadatak `"Odobravanje popusta"`. Unosimo podatke i odobravamo popust.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-upgraded-3.png?raw=true" style="width:90%; ">

> Generirana forma za `"Odobravanje popusta"` s unesenim podacima za procesne varijable: `popust_odobren`, `djelatnik_ime` i `djelatnik_prezime`

Otvorite **Cockpit** i pogledajte stanje procesne instance i unesenih varijabli. Vidjet ćete da se izračunao popust od 10% i pregazio vrijednost procesne varijable `ukupna_cijena`, koja je bila `100`. Token se sada nalazi na aktivnosti `"Isporuka narudžbe"`, kako se instanca ne bi završila odmah (premda nismo definirali kako dalje).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP5%20-%20Uvod%20u%20procesne%20aplikacije/screenshots/webshop-order/webshop-upgraded-4.png?raw=true" style="width:90%; ">

> Prikaz aktivne instance procesa s tokenom na aktivnosti `"Isporuka narudžbe"` nakon izračuna popusta od 10% i pohranjenih varijabli.

<div style="page-break-after: always; break-after: page;"></div>

# Samostalni zadatak za Vježbu 5

Modelirajte jednostavni proces prijave studentske prakse na Fakultetu informatike u Puli. Postoje 3 sudionika u procesu prakse:

1. Student
2. Poslodavac
3. Profesor

Proces započinje kod studenta odabirom zadataka za praksu. Student ispunjava web formu gdje unosi svoje ime, prezime, JMBAG i šifru zadatka (izmislite podatke). Nakon toga, sljedeći korak je odobravanje prakse od strane profesora. Profesor pregledava podatke studenta i šifru zadatka u web sučelju, a nakon toga odobrava ili odbija prijavu. Ako je prijava prihvaćena, proces se vraća na studenta i njegovu aktivnost ispunjavanja web forme. Ako profesor prihvati prijavu, proces se nastavlja kod poslodavca. Poslodavac provodi intervju sa studentom, a nakon toga odlučuje hoće li ga prihvatiti ili odbiti. Ako ga odbije, proces se ponovno vraća na studenta i njegov unos podataka. Ako ga prihvati, proces ide prema studentu koji sad mora unijeti kratak opis zadatka, datum izvođenja prakse te ime i prezime mentora koji mu je dodijeljen te istovremeno prema profesoru kojeg se samo obavještava. Nakon tih paralelnih aktivnosti, proces se završava.

Nakon što ste modelirali proces, implementirajte procesnu aplikaciju u **Camundi 7**:

- Dodajte definirane korisničke aktivnosti i korespondirajuće forme
- Definirajte procesne varijable i njihove vrijednosti
- Definirajte skretnice i uvjete na izlaznim tokovima
- Obavještavanje sudionika procesa ne implementirate

Predajete isključivo `.bpmn` datoteku procesa i aplikacije definirane u Camunda Modeleru.
