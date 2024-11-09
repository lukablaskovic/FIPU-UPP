# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (2) Dopunski atributi elemenata modela procesa

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-UPP/refs/heads/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/UPP_2.png" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;">Elementi modela poslovnog procesa imaju svoje prepoznatljive simbole koji se vide na grafičkom prikazu. Simbol svojim oblikom određuje o kakvu je objektu riječ i što je njegova temeljna funkcija. Osim toga, svakom elementu mogu se pridružiti tekstualni, brojčani ili logički podatci koji pobliže opisuju ponašanje određenog objekta u složenome modelu procesa. U ovoj skripti proširit ćemo osnovne objekte koje smo naučili zadnji put i vidjeti koje dodatne informacije možemo definirati unutar njih.</div>
<br>

<div style="float: clear; margin-right:5px;"> </div>
<br>

**🆙 Posljednje ažurirano: 7.11.2024.**

## Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(2) Dopunski atributi elemenata modela procesa](#2-dopunski-atributi-elemenata-modela-procesa)
  - [Sadržaj](#sadržaj)
- [1. Uvod](#1-uvod)
- [2. Nadogradnja poslovnog procesa `PRODATI ROBU`](#2-nadogradnja-poslovnog-procesa-prodati-robu)
- [2.1 Osnovne vrste događaja](#21-osnovne-vrste-događaja)
- [2.2 Osnove vrste aktivnosti](#22-osnove-vrste-aktivnosti)
  - [2.2.1 Radni korak (eng. Task)](#221-radni-korak-eng-task)
  - [2.2.2. Potproces (eng. Subprocess)](#222-potproces-eng-subprocess)
  - [2.2.3 Kako ispravno koristiti `send` i `receive` aktivnosti?](#223-kako-ispravno-koristiti-send-i-receive-aktivnosti)
- [Zadaci za Vježbu 2](#zadaci-za-vježbu-2)
  - [1. Potvrda narudžbe u web trgovini](#1-potvrda-narudžbe-u-web-trgovini)
  - [2. Implementacija softvera](#2-implementacija-softvera)

# 1. Uvod

Modeliranje poslovnih procesa širok je pojam koji obuhvaća izradu različitih vrsta modela za različite namjene. U literaturi ima više klasifikacija modela poslovnih procesa po različitijim kriterijima. U pravilu možemo definirati 3 kriterija za klasifikaciju modela poslovnih procesa:

1. **Razina detaljnosti**: model procesa može biti opisni, analitički ili izvršivi (eng. _executable_)
2. **Faze razvoja**: model se može odnositi na postojeći proces (As is) ili na budući optimizirani proces (To Be) koji tek treba uspostaviti
3. **Pretežiti korisnici**: model može biti namijenjen poslovnim stručnjacima (među kojima je i menadžment), informatičarima ili korisnicima koji su izvan struke

Rekli smo da su objekti toka podataka (eng. _data flow objects_) osnovni elementi modela poslovnog procesa i u pravilu ih možemo podijeliti na **događaje**, **aktivnosti** i **skretnice**. To su osnovni elementi svakog modela poslovnog procesa. Ako neki model nema ta tri elementa, onda ga i ne možemo smatrati modelom procesa u smislu definicije dane u prošloj skripti.

Prema normi BPMN 2.0, formalno je moguće da model procesa nema nijedne skretnice, ali to onda znači da je više aktivnosti (ako ih ima) povezano slijednim tokom, odnosno da aktivnosti slijede, jedna iza druge bez ikakvih uvjeta i zastoja. Tada model nije ništa drugo nego popis poslova koje treba obaviti, redom kako su navedeni u popisu.

Također, moguće je da model procesa nema nacrtan nijedan događaj, ali se tada podrazumijeva da postoji jedan početni i jedan završni događaj.

# 2. Nadogradnja poslovnog procesa `PRODATI ROBU`

Prisjetimo se poslovnog procesa `PRODATI ROBU` koji smo modelirali u prošloj skripti.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_w_lanes.png?raw=true" style="width:70%;">

> Slika 1. Poslovni proces `PRODATI ROBU` koji smo definirali u prošloj skripti

Kroz ovaj proces naučili smo definirati spomenute osnovne elemente. Model smo nadogradili i dodali smo **polje** i dodatne **staze** kojima smo definirali aktore koji sudjeluju u procesu.

Za početak, idemo nadograditi model različitim vrstama **događaja**.

# 2.1 Osnovne vrste događaja

Rekli smo da događaje definiramo **kružnicama** koje su povezane s tokom. Događaji su važni jer označavaju početak ili kraj neke aktivnosti ili procesa. Definirali smo dva osnovna tipa događaja:

- **Početni događaj** (eng. _Start Event_)
- **Završni događaj** (eng. _End Event_)

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/start_end_events.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Kružnica</b> (za početni i završni događaj)</span>
</div>

Početni događaj je **istovjetan početku prve aktivnosti**, dok završni događaj **nastaje kada završi zadnja aktivnost**.

U interpretaciji nekog dijagrama poslovnog procesa, **nastupanje nekog događaja naziva se** **okidanje** jer se pojavom događaja omogućuje izvođenje aktivnosti koja slijedi poslije njega.

Pri određivanju nekog događaja uvijek treba razmotri što je bio **uzrok** njegova nastanka i gdje je nastao te kakva je **posljedica** njegova pojavljivanja i gdje se ona vidi.

Evo nekoliko različitih primjera događaja:

- referent prodaje primio je e-mail sa zahtjevom za ponudu. Događaj je ovdje **trenutak primitka zahtjeva**
- dostignuta je neka vremenska točka u kojoj se mora obaviti aktivnost, npr. **istek roka za dostavu ponude**. Ovdje je događaj **istek roka**
- odzvonilo je 6:30 ujutro, a to je **trenutak početka radnog vremena**. Ovdje je događaj **početak radnog vremena**
- isteklo je neko vrijeme koje smo čekali, npr. postavili smo _timer_ na 60 minuta za pečenje kolača. Ovdje je događaj **istek vremena pečenja**
- **roba** je stigla na skladište. Ovdje je događaj **dostava robe**
- ostvaren je neki uvjet koji smo postavili, npr. **kupac je potvrdio narudžbu** ili **kupac je platio račun**. Ovdje su događaji **potvrda narudžbe** i **plaćanje računa**
- pojavila se pogreška tijekom provedbe neke aktivnosti. Na primjer, otkazao je stroj u proizvodnoj liniji treba se **pojaviti događaj kvara stroja**
- itd.

U BPMN notaciji događaja ima puno, a možemo ih podijeliti na više načina. Mi smo do sad spomenuli samo početne i završne događaje, ali postoje i **međudogađaji** (_eng. Intermediate events_) koji se javljaju tijekom izvođenja aktivnosti. Međudogađaji su važni jer omogućuju da se aktivnost prekine i nastavi kasnije, ili da se aktivnost ponovi, ili pak da se aktivnost prekine i prebaci na neku drugu aktivnost.

**Međudogađaje** (_eng. Intermediate events_) definiramo kružnicom s unutarnjom koncentričnom kružnicom.

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-UPP/refs/heads/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/start_end_intermediate.png" style="width: 20%;">

---

Početne i završne događaje koje smo do sad definirali bili su **neoznačeni**, u literaturi ih još nazivamo i **none** ili **blank** events.

U BPMN notaciji postoji više vrsta početnih i završnih događaja ovisno o njihovoj ulozi u procesu.

Camunda 8 podržava sljedeće vrste događaja:

- **Neoznačeni događaji** (eng. _None Event_)
- **Obavijest** (eng. _Message Event_)
- **Mjerač vremena** (eng. _Timer Event_)
- **Greška** (eng. _Error Event_)
- **Eskalacija** (eng. _Escalation Event_)
- **Ukidanje** ili **opoziv** (eng. _Terminate Event_)
- **Kompenzacija** (eng. _Compensation Event_)
- **Signal** (eng. _Signal Event_)
- **Priključna točka** (eng. _Link Event_)

Međutim, u BPMN notaciji [još vrsta događaja](https://docs.camunda.io/docs/components/modeler/bpmn/bpmn-coverage/#events).

Dva koja ćemo često koristiti su **obavijest** (_eng. Message event_) i **mjerač vremena** (_eng. Timer event_).

  <img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-UPP/refs/heads/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/start_events.png" style="width: 30%;">

Dakle, odabiremo početni događaj i dodajemo mu oznaku (npr. `početak prodaje`) te dodajemo vrstu događaja. _Message_ event je označen pismom unutar kružnice, dok je _Timer_ event označen satom unutar kružnice.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/start_message_timer.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Početni Message i Timer događaji</b></span>
</div>

Završni događaj također možemo označiti **Message eventom** koji onda označava da je proces završio i moramo nekoga obavijestiti o tome, primjerice šaljemo e-mail s potvrdom ili računom. Varijanta završnog **Message** **eventa** izgleda ovako:

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/end_message.png?raw=true" style="width: 4%;">
  <span style="margin-left: 10px;"><b>Završni Message događaj</b></span>
</div>

---

> Kako interpretirati ove događaje?

Početne događaje još nazivamo **prijamnim** (_eng. catch event_), budući da reagiraju na neki vanjski događaj koji se dogodio.

- _primjer_: **primanje e-maila** s narudžbom

Završne događaje još nazivamo **predajnim** (_eng. throw event_) budući da oni indiciraju da se nešto dogodilo i da je potrebno nešto poduzeti.

- _primjer_: **slanje e-maila** s potvrdom

Postoje i **međudogađaji obavijesti** (_eng. Intermediate Message Events_) koji onda mogu biti **catch** ili **throw** ovisno o tome reagiraju li na neki vanjski događaj ili pak generiraju neki vanjski događaj.

Varijanta prijamnog međudogađaja obavijesti izgleda ovako, npr. **primanje e-maila s obavijesti usred procesa**:

<div style="display: flex; align-items: center;">
  <img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-UPP/refs/heads/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/intermediate_catch_message.png" style="width: 5%;">
  <span style="margin-left: 10px;"><b>Prijamni Međudogađaj obavijesti (<i>eng. Intermediate catch message event</i>)</b></span>
</div>

Postoji i varijanta **predajnog** međudogađaja, npr. **slanje poruke usred procesa, najčešće u svrhu pokretanja nekog drugog procesa**:

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/intermediate_throw_message.png?raw=true" style="width: 4.25%;">
  <span style="margin-left: 10px;"><b>Predajni Međudogađaj obavijesti (<i>eng. Intermediate throw message event</i>)</b></span>
</div>

---

Idemo nadograditi naš proces PRODATI ROBU ažuriranjem događaja.

Kako imamo događaj **Prispjela narudžba**, možemo zaključiti da je vjerojatno riječ o **Message eventu** budući da je prispjela ili putem e-maila ili putem nekog drugog sustava koji šalje poruke na određeni komunikacijski kanal (ne mora biti e-mail).

Također, imamo 2 završna događaja, jedan za uspješno **ispunjenu narudžbu**, drugi za **neuspješno ispunjenu narudžbu**. Oba završna događaja možemo označiti **Message eventima** jer će se u oba slučaja poslati e-mail ili obavijestiti klijent na neki drugi način.

  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_prodati_robu_w_message-events.png?raw=true" style="width: 70%;">

> Slika 2. Poslovni proces PRODATI ROBU s dodanim Message eventima

Prije nego se prebacimo na vrste aktivnosti, pogledajmo još jedan primjer korištenja **Timer eventa**.

**Timer eventi** mogu biti korisni za definiranje vremenskih ograničenja ili rokova, zamislimo jednostavni proces **Priprema kolača**. Zamislimo da radimo kolač koji se peče 60 minuta. Nakon tog vremena, moramo ga izvaditi iz pećnice i pustiti da se ohladi u frižideru barem 2 sata. Nakon toga, kolač možemo poslužiti gostima.

Vidimo da u definiciji procesa imamo vremenska ograničenja, a budući da se ona nalaze za vrijeme izvođenja aktivnosti, možemo koristiti **Intermediate Timer evente**.

---

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_kolac.png?raw=true" style="width: 70%;">

> Slika 3. Proces PRIPREMA KOLAČA s dodanim Message eventima

# 2.2 Osnove vrste aktivnosti

Osim različitih vrsta događaja, imamo i različite vrste aktivnosti.

**Aktivnost** je prema normi BPMN opći (generički) pojam koji se koristi za opis svakog rada izvedenog u poslovnom procesu. Osnovni je simbol pravokutnik sa zaobljenim uglovima, unutar kojeg je opisan **naziv posla koji treba obaviti**.

Za izvođenje aktivnosti potrebni su neki **resursi** i **vrijeme**. Resursi se uzimaju iz organizacije ili iz okruženja, a vrijeme se odnosi na izvođenje ili trajanje aktivnosti.

Dakle, svaka **aktivnost** označava neku elementarnu radnju koja se u razmatranom dijagramu poslovnih procesa **ne raščlanjuje** i naziva se često i **radni korak**.

Složene aktivnosti u BPMN notaciji često definiramo kao **potprocese** (_eng. Subprocess_).

### 2.2.1 Radni korak (eng. Task)

Radnih koraka u BPMN notaciji ima više vrsta, mi smo do sada koristili samo opći (_eng. abstract_) radni korak. U BPMN notaciji postoji više vrsta radnih koraka:

- **Opći radni korak** (eng. _abstract_)
- **Servisni radni korak ili servis** (eng. _service_)
- **Prijamni radni korak** (eng. _receive_)
- **Otpremni radni korak** (eng. _send_)
- **Korisnički radni korak** (eng. _user_)
- **Ručni radni korak** (eng. _manual_)
- **Poslovno pravilo ili pravilo** (eng. _business rule_)
- **Naputak** (eng. _script_)

U pravilu ćemo koristiti sve radne korake osim naputka, jer je naputak vrlo specifičan i koristi se samo u određenim situacijama. U nastavku ćemo objasniti svaku vrstu radnog koraka:

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-UPP/refs/heads/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/aktivnosti_first_4.png" style="width: 40%;">

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/aktivnosti_last_4.png?raw=true" style="width: 40%;">

> Ono što vas za sad može zbunjivati je razlika između **događaja obavijesti** (_eng. message events_) i prijamnih i otpremnih radnih koraka (_eng. send and receive tasks_). Razlike mogu biti zbunjujuće i zato ćemo ih izvježbati u sljedećoj skripti detaljno, međutim sada trebate zapamtiti da su događaji tzv. **okidači** koji pokreću neki proces ili vanjski potproces, ili pak završavaju određeni proces. Međudogađaji se često koriste kao pasivni elementi koji čekaju na neki događaj da se dogodi, dok radni koraci definiraju slijed aktivnosti koji se izvršava i često su vidljivi (_eng. trackable_) korisniku ili sustavu.

---

Vrsta radnje obavezno se navodi u analitičkom i izvršivom modelu procesa radi točnog opisa ponašanja aktivnosti u procesnim aplikacijama, gdje će se za svaku vrstu radnoga koraka generirati specifična programska procedura.

Idemo vidjeti kako možemo nadograditi naš proces PRODATI ROBU s različitim vrstama radnih koraka.

Obzirom da poslovni proces PRODATI ROBU započinje **message eventom** **Prispjela narudžba** koji predstavlja okidač našeg procesa, možemo preimenovati aktivnost koja slijedi nakon toga iz **Zaprimiti narudžbu** u **Obrada narudžbe** budući da je to radnja koja nam pobliže opisuje što se događa u toj aktivnosti.

Aktivnost **Obrada narudžbe** možemo definirati kao **korisnički radni korak** budući da je to radnja koju obavlja djelatnik poslovnice ili referent prodajte **na računalu kroz neki informacijski sustav**

Aktivnost **Provjeriti uplatu** možemo također definirati kao **korisnički radni korak** jer se radi o radnji koju obavlja djelatnik poslovnice ili referent prodaje **na računalu kroz neki informacijski sustav**, ali ako je provjera automatska, odnosno ako se uplata provjerava automatski u računovodstvu nakon obrade narudžbe, onda možemo koristiti **servisni radni korak**.

Provjeriti zalihe možemo definirati kao **servisni radni korak** ako se provjera zaliha radi automatski, međutim kako je to neuobičajeno i manje vjerojatno za naš zadatak, možemo ga definirati kao **korisnički radni korak** ako korisnik provjerava zalihe kroz neki informacijski sustav, ili kao **ručni radni korak** ako korisnik provjerava zalihe fizički, npr. odlaskom u skladište.

Otpremiti robu možemo definirati također kao **ručni radni korak** jer se radi o fizičkoj radnji, odnosno odlasku u skladište i pakiranju robe, međutim uskoro ćete vidjeti kako preciznije definirati ovu aktivnost kroz **potproces**.

Pripremiti račun možemo definirati kao **korisnički radni korak** jer se radi o radnji koju obavlja djelatnik iz računovodstva kroz neki IS.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_prodati_robu_w_diff_activities.png?raw=true" style="width:70%;">

> Slika 4. Poslovni proces `PRODATI ROBU` s različitim vrstama radnih koraka

### 2.2.2. Potproces (eng. Subprocess)

Potproces je posebna vrsta složene aktivnosti koju **ne možemo nazvati radnim korakom** budući da on nije elementarna radnja, već je **složenija radnja koja se sastoji od više manjih radnji**. Potproces se koristi za **grupiranje** i **organizaciju** aktivnosti koje se **ponavljaju** u procesu ili su **složene** i **ne mogu se opisati jednostavno**.

Primjer potprocesa iz našeg poslovnog procesa PRODATI ROBU je **Otpremiti**.

Ako usporedimo tu aktivnost, s npr. aktivnošću **Provjeriti uplatu** ili **Pripremiti račun**, vidimo da je **Otpremiti robu** složenija radnja koju trebamo malo preciznije definirati. Za to koristimo **potproces**.

Potproces je doslovno **proces unutar procesa** te može biti **sklopljeni** (_eng. collapsed_) ili **prošireni** (_eng. expanded_).

- **Sklopljeni potproces** je onaj koji je skriven, odnosno ne vidimo unutrašnjost potprocesa, dok je
- **Prošireni potproces** onaj koji je vidljiv i unutar kojeg možemo vidjeti sve aktivnosti (stvarni proces).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/elements/subprocess.png?raw=true" style="width:30%;">

> Prošireni potproces mora ima **početni i završni događaj** koji označavaju početak i kraj potprocesa!

---

Kako ćemo definirati potproces **Otpremiti**?

Proces započinje **primitkom naloga za otpremu** u skladište, nakon čega je **potrebno provjeriti zalihe**. Ako je roba na zalihama, možemo spakirati robu i dogovoriti prijevoz s dostavnom službom. Nakon toga, šaljemo robu i proces završava otpremom robe sa skladišta. Ako roba nije na zalihi, proces završava bez otpreme.

Nakon potprocesa, vraćamo se na glavni proces kroz XOR skretnicu "Otpremljeno?". Ako je otpremljeno, pripremamo račun i završavamo s procesom. Ako nije, narudžba nije ispunjena.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_prodati_robu_w_diff_activities_and_subprocess.png?raw=true" style="width:70%;">

> Slika 5. Poslovni proces PRODATI ROBU s dodanim potprocesom "Otpremiti"

### 2.2.3 Kako ispravno koristiti `send` i `receive` aktivnosti?

Prijamni (_eng. receive_) i otpremni (_eng. send_) radni koraci koriste se za komunikaciju između više procesa, procesa i vanjskog sustava ili procesa i vanjske jedinice. **Česta greška** je koristiti ove aktivnosti unutar jednog procesa između dviju staza (npr. dvaju odjela u tvrtki). U tom slučaju komunikacijske veze potrebno je definirati kroz slijedne tokove.

Recimo da imamo primjer procesa potvrde web trgovine koja nema svoje skladište, već koristi vanjsko skladište za otpremu robe. Recimo da skladište posluje s mnogo trgovina i komunikacija se odvija prvenstveno putem e-maila. U tom slučaju, koristimo **send** i **receive** između ta entiteta.

Međutim, kako se radi o udaljenim entitetima, ne želimo ih definirati unutar istog polja.

Dakle, sljedeće je pogrešno:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_wrong_receive_send_tasks.png?raw=true" style="width:50%;">

Da se radi o nekoj malo trgovini koja ima svoje malo interno skladište, onda bi to mogli ovako prikazati međutim umjesto **send** i **receive** koristili bismo **obične sekvencijalne veze**.

S druge strane, ako se radi o **vanjskom skladištu**, onda je to ispravno **pokazati na sljedeći način**:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP2%20-%20Dopunski%20atributi%20elemenata%20modela%20procesa/screenshots/pp_otprema_2_entiteta_ispravno.png?raw=true" style="width:50%;">

**Zapamti!**

- u pravilu želimo koristiti polje i staze za komunikaciju između entiteta unutar jednog procesa (npr. odjeli unutar iste tvrtke)
- dva ili više polja koristimo kada naši entiteti nisu dio iste cjeline, već su udaljeni i komuniciraju prvenstveno kroz komunikacijske kanale (npr. e-mail) ili nemaju povezani interni informacijski sustav. Npr. tvrtka koja koristi vanjsko skladište za otpremu robe.
- ako definiramo **end message event** u potprocesu isopd, ne smijemo iz njega definirati nikakve vanjske veze. Kako bismo prikazali čekanje na poruku u entitetu web trgovine, koristimo **intermediate message event** koji se okida kada se pošalje poruka iz vanjskog skladišta.

Ove detalje ćemo detaljno obraditi na budućim vježbama.

# Zadaci za Vježbu 2

Temeljem sljedećih opisa poslovnih procesa i do sada obrađene BPMN notacije, **izmodelirajte poslovne procese u alatu po vlastitom izboru**.

Modele exportajte u **png** formatu ili napravite screenshot, zippajte zajedno datoteke (2) i učitajte rješenja na **Merlin**.

Slobodno dodajte napomenu ako želite dobiti povratnu informaciju za vaša rješenja. Komunikacija se odvija putem **Google Chata**.

## 1. Potvrda narudžbe u web trgovini

Proces započinje primitkom automatiziranog e-maila s podacima o naručenoj robi. Narudžbu preuzima referent prodaje koji prvo provjeri u sustavu je li narudžba ispravna. Nakon provjere, zaposlenik u malom skladištu tvrtke provjerava zalihe robe. Ako roba nije na zalihi, referent prodaje šalje e-mail vanjskom skladištu s kojim posluju i traži dostavu robe. Ako roba je na zalihi, zaposlenik u skladištu pakira robu, naručuje pickup dostavne službe, a referent prodaje priprema račun i šalje ga kupcu. Tu proces završava.

Vanjsko skladište zaprima poruku preko e-maila i započinju složeni proces otpreme robe. Složeni proces završava ako robe nema i o tome se obavještava referent prodajte te web trgovine. Ako roba postoji, skladište ju pakira i putem dostavne službe šalje trgovini u interno skladište. Tada zaposlenik u internom skladištu web trgovine prepakira robu u vlastitu ambalažu, naručuje pickup dostavne službe, a referent prodaje priprema račun i šalje ga kupcu. Tu proces završava.

## 2. Implementacija softvera

Tvrtka UPPTech odlučila je implementirati novi softver za upravljanje poslovnim procesima. Tvrtka se sastoji prvenstveno od Management tima koji donosi poslovne odluke i malog internog IT tima koji održava informacijski sustav tvrtke. Proces započinje kad management tim ustanovi potrebu za implementacijom novog softvera. IT tim provjerava dostupne softvere na tržištu i donosi odluku postoji li softver koji zadovoljava potrebe.

Ako postoji, management tim dogovara kupnju softvera, a IT tim instalira softver na server tvrtke i tu proces završava.

Ako ne postoji, IT tim odlučuje outsourcati razvoj novog softvera i kontaktira vanjsku tvrtku CrazyTech. CrazyTech zaprima ponudu putem emaila i procjenjuje troškove razvoja. O tome obavještavaju management tim UPPTecha, a ako je ponuda prihvaćena, ovi im odgovaraju i tu započinje složeni proces razvoja softverskog rješenja. Ako je ponuda odbijena, tu proces završava.

Složeni proces razvoja softverskog rješenja započinje s definiranjem zahtjeva, dizajnom i razvojem softvera. Nakon razvoja, softver se testira i ako testiranje prođe u redu, softver se deploya na server tvrtke UPPTech i tu završava proces. Ako testiranje ne prođe u redu, vraća se na aktivnost razvoja.
