# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (4) Smjernice u modeliranju, boundary eventi i predlošci tokova rada

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/upp-icons/UPP_4.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;"></div>
<br>

<div style="float: clear; margin-right:5px;"> 
Cilj ove skripte pružiti je sveobuhvatan pregled principa i smjernica u modeliranju poslovnih procesa kroz BPMN 2.0 notaciju. Do sad ste naučili osnovnu BPMN notaciju, uključujući osnovne elemente, tokove i događaje. Međutim, osim poznavanja elemenata (sintakse) važno je poslovni proces modelirati na način koji je razumljiv, konzistentan svim dionicima, ali i treba biti precizan s reprezentacijom stvarnog poslovnog procesa. U ovoj skripti ćemo se fokusirati na izvršivost procesa, pravilno imenovanje i upotrebu međudogađaja, modeliranje komunikacije, korištenje boundary eventa te ćemo predstaviti najčešće predloške tokova rada koji se koriste u modeliranju poslovnih procesa BPMN notacijom.
</div>
<br>

**🆙 Posljednje ažurirano: 30.12.2025.**

## Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(4) Smjernice u modeliranju, boundary eventi i predlošci tokova rada](#4-smjernice-u-modeliranju-boundary-eventi-i-predlošci-tokova-rada)
  - [Sadržaj](#sadržaj)
- [1. Smjernice za modeliranje procesa](#1-smjernice-za-modeliranje-procesa)
  - [1.1 Aktivnosti vs Događaji](#11-aktivnosti-vs-događaji)
  - [1.2 Kako odabrati ispravan međudogađaj?](#12-kako-odabrati-ispravan-međudogađaj)
  - [1.3 Entiteti na informacijskim (message) tokovima](#13-entiteti-na-informacijskim-message-tokovima)
- [2. Boundary event (Međudogađaji na aktivnostima)](#2-boundary-event-međudogađaji-na-aktivnostima)
  - [2.1 Vrste interrupting boundary eventa](#21-vrste-interrupting-boundary-eventa)
  - [2.2 Vrste non-interrupting boundary eventa](#22-vrste-non-interrupting-boundary-eventa)
- [3. Predlošci tokova rada](#3-predlošci-tokova-rada)
  - [3.1 Osnovni predlošci za upravljanje slijedom](#31-osnovni-predlošci-za-upravljanje-slijedom)
    - [WCP-1 Slijed (eng. Sequence)](#wcp-1-slijed-eng-sequence)
    - [WCP-2 Paralelno dijeljenje (eng. Parallel Split)](#wcp-2-paralelno-dijeljenje-eng-parallel-split)
    - [WCP-3 Sinkronizacija (eng. Synchronization)](#wcp-3-sinkronizacija-eng-synchronization)
    - [WCP-4 Ekskluzivni izbor (eng. Exclusive Choice)](#wcp-4-ekskluzivni-izbor-eng-exclusive-choice)
    - [WCP-5 Jednostavno spajanje (eng. Simple Merge)](#wcp-5-jednostavno-spajanje-eng-simple-merge)
  - [3.2 Predlošci za grananje, sinkronizaciju i iteraciju](#32-predlošci-za-grananje-sinkronizaciju-i-iteraciju)
    - [WCP-6 Višestruki izbor (eng. Multiple Choice)](#wcp-6-višestruki-izbor-eng-multiple-choice)
    - [WCP-7 Strukturno sinkronizirano spajanje (eng. Structured Synchronizing Merge)](#wcp-7-strukturno-sinkronizirano-spajanje-eng-structured-synchronizing-merge)
    - [WCP-8 Nesimetrično sinkronizirano spajanje (eng. Acyclic Synchronizing Merge)](#wcp-8-nesimetrično-sinkronizirano-spajanje-eng-acyclic-synchronizing-merge)
    - [WCP-9 Proizvoljno ponavljanje (eng. Arbitrary Cycles)](#wcp-9-proizvoljno-ponavljanje-eng-arbitrary-cycles)
  - [3.3 Predlošci za okidače](#33-predlošci-za-okidače)
    - [WCP-10 Prolazni okidač (eng. Transient Trigger)](#wcp-10-prolazni-okidač-eng-transient-trigger)
    - [WCP-11 Stalni okidač (eng. Persistent Trigger)](#wcp-11-stalni-okidač-eng-persistent-trigger)
- [Zadaci za Vježbu 4](#zadaci-za-vježbu-4)
  - [ServisPlus d.o.o. - Popravak kućanskih uređaja](#servisplus-doo---popravak-kućanskih-uređaja)

<div style="page-break-after: always; break-after: page;"></div>

# 1. Smjernice za modeliranje procesa

Do sad ste naučili da postoje 3 glavna objekata toka u BPMN notaciji, to su:

1. **Događaji** (_eng. Events_)
2. **Aktivnosti** (_eng. Activities_)
3. **Skretnice** (_eng. Gateways_)

Premda su razlike između ovih objekata jasne, ponekad je teško odrediti koji objekt koristiti za modeliranje određene radnje u procesu. Ukratko ćemo ponoviti definicije:

- **Događaji** označavaju određene trenutke u procesu koji označavaju promjenu stanja procesa, poput početka (_start event_), završetka (_end event_) ili ključnih točaka između (_intermediate event_) sljedova aktivnosti. Oni su **pasivni elementi** i ne **podrazumijevaju aktivnost**, već **signaliziraju** da se određeni uvjet ispunio ili stanje procesa promijenilo.
- **Aktivnosti** predstavljaju zadatke ili skup poslovnih zadataka koji se trebaju izvršiti kako bi proces "napredovao". Rekli smo da su za izvođenje aktivnosti potrebni neki **resursi** i **vrijeme**. Radi se o **operativnim elementima procesa**.
- **Skretnice** omogućuju donošenje odluka unutar procesa, usmjeravajući tijek rada prema različitim pravcima na temelju definiranih uvjeta. Smjernice su ključne za **razgranavanje** i **kontrolu toka procesa**, a do sad smo naučili nekoliko vrsta skretnica (ekskluzivne, paralelne, inkluzivne) te varijante grananja i spajanja.

## 1.1 Aktivnosti vs Događaji

Iako su definicije aktivnosti i događaja poprilično jasne, ponekad možemo biti u nedoumici koji objekt koristiti za modeliranje određenog dijela procesa. Da bismo to razjasnili, praktično je postaviti si nekoliko pitanja koja nam mogu pomoći u odabiru ispravnog objekta.

Primjerice, ako se pitate _"Što se događa u procesu?"_, tada je vjerojatno da je riječ o aktivnosti. S druge strane, ako se pitate _"Kada se nešto događa ili se dogodilo u procesu?"_, tada je vjerojatno da je riječ o događaju.

Za primjer uzmimo proces NARUČIVANJE PROIZVODA, tada bi se **aktivnosti** mogle odnositi na:

- "Unos podataka o kupcu",
- "Unos podataka o proizvodu",
- "Plaćanje",
- "Pakiranje",
- "Dostava"
- "Izrada računa"

Dok bi se **događaji** mogli odnositi na:

- "Primljen zahtjev za narudžbu",
- "Proizvod poslan",
- "Plaćanje izvršeno"
- "Kupac obaviješten putem e-maila"
- "Proizvod isporučen"

Kako ispravno imenovati **aktivnost**? Prema BPMN2.0 smjernicama, aktivnosti bi trebale biti imenovane na način koji jasno i precizno opisuje radnju koja se obavlja. Evo nekoliko smjernica:

- **Glagolska imenica** koja opisuje radnju, npr. "Unos", "Plaćanje", "Pakiranje", "Dostava", "Obrada"
- Naglašen **objekt** na kojeg se aktivnost odnosi, npr. "Unos podataka", "Pakiranje proizvoda", "Pakiranje robe", "Dostava paketa"
- Može biti i **glagol u infinitivu**, npr. "Obavijestiti kupca", "Poslati proizvod", "Pripremiti račun", "Provjeriti zalihe"
- **Nije uobičajeno navoditi subjekt**, budući da je subjekt implicitno jasan iz konteksta modela (polje/staze), npr. "Kupac unosi podatke", "Dostavljač dostavlja paket"
- **Uobičajeno je** koristiti infinitiv, glagolsku imenicu ili iznimno glagol u 3. licu (nikako u 1. i 2. glagolskom licu)
- **Nije uobičajeno** koristiti imperativ, npr. "Unesi podatke", "Pošalji proizvod", "Pripremi račun"
- Uobičajeno je koristiti **aktivni glagolski oblik**

Kako ispravno imenovati **događaj**?

- **Glagolska imenica** koja opisuje **prošlo** (završeno) stanje aktivnosti ili slijeda aktivnosti, npr. "Primljena narudžba", "Plaćanje primljeno", "Proizvod poslan", "Pristigla narudžba"
- **Poželjno je** da sadržava informacije o subjektu i objektu, npr. "Kupac poslao narudžbu", "Dostavljač preuzeo paket", "Proizvod poslan kupcu", "Pristigao email od klijenta"
- Ako se radi o _timer eventu_, tada se koristi **vremenska oznaka**, npr. "Nakon 3 dana", "Svaki ponedjeljak", "Svaki mjesec", "Prošlo 5 minuta" itd.
- Radnja ne smije biti **u infinitivu** (kao kod aktivnosti), već se radi o **završenoj radnji** koja se dogodila u prošlosti, npr. "Proizvod poslan", "Plaćanje primljeno", "Narudžba zaprimljena"
- **Međudogađaje** je moguće imenovati i u **futuru**, npr. "Po primitku zahtjeva", "Kada stigne odgovor", "Jednom kad se dogodi..."
- Uobičajeno je koristiti **pasivan glagolski oblik**

> Napomena: Važno je držati se ovih smjernica imenovanja budući da će vam to olakšati pri odabiru ispravnog objekta toka (događaj vs aktivnost), ali će i poboljšati čitljivost i razumljivost modela svim dionicima kada se držite konzistentnog pristupa imenovanju prema BPMN smjernicama.

Vrlo često u modeliranju želimo prikazati srodnu aktivnost odmah nakon događaja, tada je **praktično spojiti aktivnost i događaj u jedan objekt**. Tada možemo kombinirati događaj i aktivnost u događaj s dopunskim atributima (npr. _message start event_ ili _timer intermediate catch event_).

_Primjer:_ _start event_ naziva: "Obrada po primitku narudžbe" može zamijeniti _start event_ "Pristigla narudžba" + aktivnost "Obrada narudžbe".

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_1.png?raw=true" style="width:40%; box-shadow: none !important;"></img>

> Slika 1. Ponekad možemo događaj + aktivnost zamijeniti jednim događajem s dopunskim atributima - ali pripazite da ispravno imenujete takav događaj. Kako je novi objekt događaj, nećemo ga imenovati kao aktivnost, već koristimo **pasivan glagolski oblik**.

"Pristigla narudžba" prikazujemo kao _start event_ jer se radi o završenoj radnji koja se dogodila u prošlosti. S druge strane, "Upis narudžbe u ERP sustav" prikazujemo kao _user task_ jer se radi o radnji koju je potrebno poduzeti kako bi proces "napredovao".

<hr>

_Primjer:_ _End event_ naziva: "Proizvod isporučen kupcu" može zamijeniti _manual task_ "Isporuka proizvoda kupcu" + _end event_ "Proizvod isporučen".

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_16.png?raw=true" style="width:40%; box-shadow: none !important;"></img>

> Slika 2. Isto kao kod početnog događaja, možemo i završni događaj + aktivnost zamijeniti jednim završnim događajem s dopunskim atributima - ali pripazite da ispravno imenujete takav događaj. Kako je novi objekt događaj, nećemo ga imenovati kao aktivnost, već koristimo **prošli glagolski oblik**.

<div style="page-break-after: always; break-after: page;"></div>

## 1.2 Kako odabrati ispravan međudogađaj?

**Međudogađaji** (_eng. Intermediate Events_) koriste se za označavanje **ključnih točaka (događaja) između početka i kraja procesa**. Preciznije, koriste se za modeliranje ključnih trenutaka u procesu koji **ne predstavljaju početak ili kraj procesa**, ali svakako mogu promijeniti tijek izvođenja.

Međudogađaje je moguće dodavati na **sekvencijalni tok** između aktivnosti ili unutar aktivnosti kao _boundary event_. Do sad smo ih većinom prikazivali na sekvencijalnom toku između aktivnosti, a u nastavku ćemo pokazati i kako se koriste kao _boundary events_, odnosno događaji vezani uz aktivnost.

**Najčešći međudogađaji na sekvencijalnom toku** su:

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/intermediate_throw_event.png?raw=true" style="width: 7%;">
  <span style="margin-left: 10px;"><code>Intermediate throw event</code> za označavanje <b>ključnih točaka</b> u procesu, tzv. <b>milestone</b></span>
</div>

- ✅ Primjeri **ispravnog** imenovanja: "Tijesto se dignulo", "Vrijeme isteklo", "Paket spreman za slanje", "Hrana spremna", "Vremenska prognoza prikladna", "Proizvod na zalihi", "Dokument odobren", "Račun izdan", "Faktura izrađena", "Knjiga pročitana"...

- ❌ Primjeri **neispravnog** imenovanja: "Spremanje tijesta", "Priprema paketa", "Pakiranje robe", "Pohrana bilješki"...

<hr>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/message_intermediate_catch_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Message Intermediate Catch event</code> - definiranje <b>nespecificiranog čekanja</b> u procesu, odnosno <b>čekanje na primitak vanjskog signala/poruke.</b> Proces nastavlja po primitku signala/poruke.
</div>

- ✅ Primjeri **ispravnog** imenovanja: "Primljen signal", "Primljena odbijenica", "Jednom kad pristigne odgovor", "Jednom kad je gotov", "Pristigao email potvrde", "Kada pristigne poruka klijenta", "Čekanje na primitak obavijesti o...", "Po primitku zahtjeva"...

- ❌ Primjeri **neispravnog** imenovanja: "Slanje odgovora korisniku", "Klijent provjerava email...", "Djelatnik obavještava...", "Račun spreman", "E-mail poslan"..., "Čeka email 3 dana"...

<hr>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/timer_intermediate_catch_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Timer Intermediate Catch event</code> - označavanje <b>specificiranog čekanja</b> u procesu, ili <b>početak određenog vremenskog razdoblja</b></span>
</div>

- ✅ Primjeri **ispravnog** imenovanja: "Nakon 3 dana", "Svaki ponedjeljak", "Svaki mjesec", "Prošlo 5 minuta", "Stigao ponedjeljak", "Prošlo je 2 tjedna", "90 minuta", "4 sata", "Pristizanje na red u koloni", "Narudžba došla na red za obradu nakon X vremena"...
- ❌ Primjeri **neispravnog** imenovanja: "Čekaj timer", "Čekanje na odgovor", "Čekanje na primitak poruke", "Čekaj", "Timer", "Nakon nekog vremena...", "Kad prođe vrijeme..."

<hr>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/message_intermediate_throw_event.png?raw=true" style="width: 7%;">
  <span style="margin-left: 10px;"><code>Message Intermediate throw event</code> - koristi se za <b>signalizaciju drugih aktora</b> u procesu, ili <b>okidanje drugih procesa</b>. 
</div>

- ✅ Primjeri **ispravnog** imenovanja: "Proces X signaliziran", "Klijent obaviješten", "SMS poslan", "Poslan email kupcu", "Inicijaliziran proces narudžbe", "Račun dostavljen klijentu" itd.
- ❌ Primjeri **neispravnog** imenovanja: "Pošalji email", "Slanje računa kupcu", "Obavijesti klijenta", "Pošalji SMS djelatniku" (greška jer je imenovano kao aktivnost, a ne kao događaj)

<hr>

> **Zapamtite**: Međudogađaje nastojite imenovati na način da jasno i precizno opisuju **trenutak** ili **stanje** u procesu koji se dogodio ili koji će se dogoditi (koji se očekuje). Koristite pasivan ton, izbjegavajte infinitiv te koristite pasivan glagolski oblik. **Izbjegavajte nazivati ove događaje kao čiste radnje tj. aktivnosti.**

_Primjer:_ Klijent naručuje hranu iz restorana preko aplikacije, a potom čeka na dovršetak. Međutim, ako prođe preko sat vremena, klijent odustaje od narudžbe.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_3.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 2. Primjer modeliranog procesa sa sekvencijalnim međudogađajima

U ovom primjeru, koristi se paralelna skretnica (AND) te se proces dalje grana po principu: "ono što se prije dogodi".

- ili će se narudžba dovršiti u roku od jednog sata i klijent će ju preuzeti
- ili će proći preko sat vremena i klijent odustaje

**Kako znamo unaprijed vremensko razdoblje**, možemo iskoristiti _Timer Intermediate Catch Event_ za čekanje tih sat vremena ako se narudžba ne dovrši, dakle imamo specificirano vremensko razdoblje čekanja.

"Priprema hrane" je prikazana sklopljenim potprocesom koji traje neko vrijeme, a jednom kad je hrana spremna, ovisno o kontekstu, možemo definirati _milestone_ (ključnu točku) "Hrana spremna" ili "Hrana gotova!" kao _Intermediate Throw Event_. Međutim, u ovom slučaju je moguće istu stvar prikazati i _Timer Intermediate Catch Event_ budući da se radi o vremenskom razdoblju potrebnom za pripremu hrane gdje nam je procijenjeno vrijeme pripreme hrane unaprijed poznato.

> Napomena: _milestone_ i ne mora biti nužno vezan uz vremensko razdoblje, već može označavati **ključnu točku u procesu**, npr. "Vremenska prognoza prikladna" → okini neki drugi proces ili nastavi slijed aktivnosti.

<hr>

Vanjske procese uobičajeno je okinuti pomoću _Send Task_ aktivnosti ili _Message Intermediate Throw Event_ međudogađaja.

**Komunikaciju između događaja** prikazujemo kroz informacijski tok (_Message Flow_) isprekidanom strelicom, koji predstavlja samo **vezu informativnog karaktera** (ne utječe na sekvencijalni tijek procesa već samo pruža informaciju o komunikaciji između dva objekta).

> Napomena: Prema BPMN2.0 specifikaciji, informacijski tok nije nužno navoditi između dva objekta, ali je poželjno radi jasnije komunikacije i razumijevanja modela.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_4.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 3. Primjer modeliranog procesa u dva polja. Paralelnim grananjem se istovremeno signalizira početak procesa PRIPREMA HRANE, te započinje _timer_ od sat vremena nakon čega klijent odustaje od narudžbe.

Na primjeru iznad, prikladno je koristiti _Send Task_ aktivnost za signalizaciju aktivacije međudogađaja "Primanje obavijesti o završetku pripreme" budući da se radi o slanju nekog oblika poruke. Da to nije slučaj, prikladnije bi bilo koristiti generalni _Intermediate Throw Event_ te definirati _milestone_, npr. "Hrana spremna" što opet implicira okidanje drugog procesa.

> Zapamtite: _Send Task_/_Message Intermediate throw event_ implicira slanje poruke (npr. email, SMS, _realtime push_ notifikacija, itd.) dok _Intermediate Throw Event_ može signalizirati i bez slanja poruke (npr. okidanje nekog drugog procesa drugim mehanizmom ili računalnim protokolom, ali i _offline_ komunikacijom poput fizičke dostave dokumenta).

#### Česta nedoumica: Kada koristiti Send/Receive Task, a kada Message Intermediate Throw/Catch Event? <!-- omit in toc -->

Kao što smo već spomenuli, _Send Task_ i _Receive Task_ aktivnosti koriste se za **slanje i primanje poruka** (npr. email, SMS, push notifikacija, itd.) između različitih dionika ili sustava. Ove aktivnosti su **operativne radnje** koje zahtijevaju vrijeme i resurse za izvršenje.

S druge strane, _Message Intermediate Throw Event_ i _Message Intermediate Catch Event_ su **događaji** koji označavaju **trenutke u procesu** kada se poruka šalje ili prima. Ovi događaji su **pasivni elementi** koji ne zahtijevaju vrijeme ili resurse za izvršenje, već samo signaliziraju da se određeni uvjet ispunio ili stanje procesa promijenilo.

Kod modeliranja poslovnih procesa, često ćemo doći u situaciju gdje možemo koristiti oba pristupa za prikazivanje komunikacije između procesa ili dionika. Ipak, prema BPMN smjernicama, postoje određene situacije kada je prikladnije koristiti jedan pristup pored drugog.

U skripti UPP2, smo naveli da želimo koristiti _send/receive_ aktivnosti kod modeliranja komunikacija između dva entiteta odnosno polja, npr. između **Kupca** i **Veleprodaje** ili između **Veleprodaje** i **Skladišta**. Pritom je važno kako ćemo imenovati ove aktivnosti. Ukratko, moramo se pridržavati smjernica za imenovanje aktivnosti koje smo ranije naveli.

_Primjer:_ Komunikacija između polja BANKA i KLIJENT gdje klijent šalje zahtjev za bankovni izvod. Banka priprema izvod i šalje ga klijentu koristeći _send_ aktivnost **što je u redu**, ali pogreška je u imenovanju te aktivnosti: "Priprema bankovnog izvoda za slanje klijentu". Nije naglašeno da se radi o slanju poruke, već o pripremi izvoda. Osim toga, želimo imenovati aktivnosti na način da budu **elementarne radne jedinice** - prisjetite se prve skripte gdje smo rekli da aktivnosti još nazivamo i **radnim koracima**.

Drugim riječima, aktivnost treba jasno opisivati **što se radi** u toj aktivnosti, a ne kombinirati više radnji u jednoj aktivnosti.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_17.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 4. Primjer **neispravnog imenovanja** _Send/Receive Task_ aktivnosti (_send task_ ne naglašava da se radi o slanju izvoda, već o pripremi istog). _Receive task_ naglašava i zaprimanje i pregled sadržaja, što bi bilo bolje podijeliti u dvije aktivnosti.

- ✅ **Dobar dio**: Korištenje _send/receive_ aktivnosti za modeliranje komunikacije između dva polja (BANKA i KLIJENT) je u redu.
- ❌ **Manje dobar dio**: Imenovanje aktivnosti nije u skladu sa smjernicama za imenovanje aktivnosti (aktivnosti nisu elementarne radne jedinice, već kombiniraju više radnji u jednoj aktivnosti). Također, "prihvaćanje bankovnog izvoda" nije baš aktivnost koja zahtijeva vrijeme i resurse, već se radi o trenutku kada klijent zaprima izvod pa je bolje koristiti međudogađaj.

Podijelit ćemo ove složene _send/receive_ aktivnosti u dva elementarnija radna zadatka:

1. "Priprema bankovnog izvoda" (_service task_) → "Slanje bankovnog izvoda" (_send task_)
2. "Prijem bankovnog izvoda" (_receive task_) → "Pregled sadržaja izvoda" (_user task_)

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_18.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 5. Ispravno modeliranje komunikacije između dva entiteta koristeći _Send/Receive_ aktivnosti s ispravnim imenovanjem i podjelom u elementarnije radne zadatke.

- ✅ **Dobar dio**: Ispravno imenovanje _send/receive_ aktivnosti prema smjernicama za imenovanje aktivnosti te podjela na elementarnije radne zadatke.
- ❌ **Manje dobar dio**: Ostaje pitanje da li je prikladno koristiti _receive_ aktivnost u ovom kontekstu? Bolje bi bilo koristiti međudogađaj iz ranije navedenog razloga.

Pitanje: Možemo li ovo modelirati koristeći _Message Intermediate Throw/Catch Event_ umjesto _Send/Receive Task_ aktivnosti? Odgovor je da, i to smo do sada i radili. Međutim, **važno je ispravno imenovati te događaje prema smjernicama za imenovanje događaja** koje smo ranije naveli.

Pretvorit ćemo _send/receive_ aktivnosti u _message intermediate throw/catch event_ događaje, i **izmijeniti njihove nazive prema smjernicama za imenovanje događaja**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_19.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 6. Primjer modeliranja komunikacije između dva entiteta koristeći _Message Intermediate Throw/Catch Event_ međudogađaje s ispravnim imenovanjem.

- ✅ **Dobar dio**: Ispravno imenovanje, podjela na elementarnije radne zadatke te korištenje međudogađaja za zaprimanje poruke.
- ❌ **Manje dobar dio**: "Bankovni izvod poslan" je prikladan kada se radi o automatiziranom sustavu koji šalje izvod bez ljudske intervencije, dok bi _send task_ "Slanje bankovnog izvoda" bio prikladniji kada djelatnik banke ručno šalje izvod klijentu. **Sve ovisi o kontekstu poslovne logike koja se modelira**.

> Dodatno pojašnjenje: Navedeni primjeri su ekvivalentni i oba su ispravna pristupa su sintaksno točna. Međutim, drugi način je prikladniji u ovoj situaciji budući da "Prijem bankovnog izvoda" nije baš aktivnost koja zahtijeva vrijeme i resurse, već se radi o trenutku kada banka zaprima izvod - iz tog razloga bolje je koristiti međudogađaj. S druge strane, međudogađaj "Bankovni izvod poslan" je prikladan kada se radi o automatiziranom sustavu koji šalje izvod bez ljudske intervencije, dok bi _send task_ "Slanje bankovnog izvoda" bio prikladniji kada djelatnik banke ručno šalje izvod klijentu.

Ipak, **u praksi se često kombiniraju oba pristupa** ovisno o kontekstu poslovne logike koja se modelira.

_Primjer_: Klijent predaje zahtjev za mali kredit u banci. Banka obrađuje zahtjev nekoliko dana, a zatim šalje odluku klijentu. Banka prvo šalje klijentu obavijest da je zahtjev zaprimljen, a nakon obrade (složenog potprocesa) šalje konačnu odluku i popratnu dokumentaciju. Navedeno možemo modelirati kombiniranjem _send/receive_ aktivnosti i _message intermediate throw/catch event_ međudogađaja kako bi jasno definirali ključne trenutke u ovom procesu.

Iz ovog primjera najvažnije je uočiti **kako su aktivnosti/događaji imenovani** prema smjernicama za imenovanje aktivnosti i događaja te kako smo odabrali ispravan objekt toka (aktivnost vs događaj) ovisno o kontekstu poslovne logike.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_20.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 7. Primjer modeliranja procesa predaje zahtjeva za kredit koristeći kombinaciju _Send/Receive Task_ aktivnosti i _Message Intermediate Throw/Catch Event_ međudogađaja s ispravnim imenovanjem.

- ✅ **Dobar dio**: Ispravno imenovanje aktivnosti i događaja prema smjernicama za imenovanje aktivnosti i događaja. "Slanje zahtjeva za kredit" je definitivno aktivnost koja zahtijeva vrijeme i resurse pa smo ju modelirali kao _send task_, dok su "Primitak potvrde na email" te "Primitak obavijesti o ishodu predanog zahtjeva" trenuci u procesu koji ne zahtijevaju vrijeme i resurse pa smo ih modelirali kao _message intermediate catch event_. "Zahtjev za kredit obrađen" je generalni intermediate throw event koji predstavlja ključnu točku u procesu (milestone) te ga možemo i ne moramo dodavati - ovisno koliko želimo detaljno modelirati proces.
- ❌ **Manje dobar dio**: "Slanje potvrde o primitku zahtjeva na email" je dosta generalno. Npr, ako modeliramo stazu djelatnika banke - onda ovo može ostati _send task_ jer djelatnik zapravo šalje email nakon što je primio zahtjev. Međutim, ako modeliramo stazu IT sustava banke koji automatski šalje email potvrde te ne želimo naglašavati ljudski faktor, tada bi bilo bolje koristiti _message intermediate throw event_ "Potvrda o primitku zahtjeva poslana" budući da se radi o trenutku u procesu kada sustav šalje email, a ne o aktivnosti koja zahtijeva vrijeme i resurse.

> Napomena: Radi se o nijansama koje ovise o kontekstu poslovne logike koja se modelira, međutim kod izrade _business-process-oriented_ aplikacija, onda ove nijanse postaje puno važnije zbog prirode same implementacije i egzekucije procesa.

#### Komunikacija između dionika u procesu <!-- omit in toc -->

U BPMN modelima često moramo modelirati **komunikaciju između različitih procesa** (npr. jedan proces pokreće/okida drugi) ili inter-procesnu komunikaciju gdje se informacije razmjenjuju **između različitih staza**.

Jedna od najčešćih grešaka u modeliranju procesa odnosi se upravo na neispravno modeliranje komunikacije između dva procesa ili staze.

Za modeliranje bilo kojeg oblika poslovne komunikacije, dovoljni su nam sljedeći BPMN elementi:

- Informacijski tok/slijed (_Message Flow_)
- Sekvencijalni tok/slijed (_Sequence Flow_)
- _Message Intermediate Throw Event_
- _Message Intermediate Catch Event_
- _Send Task_
- _Receive Task_

_Primjer:_ Komunikaciju između dionika ćemo objasniti na primjeru **Veleprodaje** i **Skladišta** na procesima naručivanja i otpreme robe.

Veleprodaju predstavljamo kao zasebni proces u zasebnom polju (VELEPRODAJA - PROCES NARUČIVANJA ROBE). Proces započinje kad veleprodaja zaprimi narudžbu. Evidencijom zaliha zaključuju da nedostaje robe pa moraju kontaktirati skladište kako bi provjerili dostupnosti i naručili što nedostaje. Roba se dostavlja veleprodaji svakog ponedjeljka.

Skladište u ovom kontekstu je _outsourcani_ partner čiji ćemo proces nazvati OTPREMA ROBE.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_5.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 8. Primjer modeliranih procesa naručivanja i otpreme robe s pogrešnom komunikacijom između dva polja/procesa. Drugi proces (SKLADIŠTE - OTPREMA ROBE) nema početni događaj.

Idemo identificirati što je dobro, a što pogrešno u ovom modelu.

- ✅ **Dobar dio**: Budući da se radi o slanju poruke skladištu koristimo _send Task_ aktivnost za slanje poruke o nedostatku robe na zalihama u veleprodajnom skladištu
- ❌ **Pogreška**: Međutim, SKLADIŠTE - OTPREMA ROBE je **proces za sebe**, definiran u **vlastitom polju**, a nema početni događaj. **Svaki proces (definiran u vlastitom polju) ili potproces mora imati početni** (i završni) događaj.

Jednostavno ćemo dodati početni događaj u polje SKLADIŠTE - OTPREMA ROBE.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_6.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 9. Primjer modeliranih procesa naručivanja i otpreme robe s ispravnom komunikacijom između dva polja/procesa. Drugi proces (SKLADIŠTE - OTPREMA ROBE) sada ima početni događaj.

Međutim, što ako se radi o internom skladištu koje je dio iste veleprodaje? U tom slučaju komunikaciju **ne želimo modelirati kao slanje poruke** (prisjetimo se emaila, SMS-a i sl.) Dakle, možemo maknuti _send Task_ aktivnost i samo nastaviti sekvencijalni tok prema sljedećoj aktivnosti.

Zašto? Vjerojatno provjeravamo dostupnost robe u internom skladištu putem istog IT sustava, ERP-a ili jednostavno fizički odlazimo i provjeravamo stanje. U tom slučaju, **_send/receive_ aktivnosti su nam redundantne** i samo **nepotrebno kompliciraju model**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_7.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 10. Primjer modeliranog procesa VELEPRODAJA - PROCES NARUČIVANJA ROBE s redundantnom komunikacijom unutar istog polja - između dvije staze.

- ✅ **Dobar dio**: Obzirom da se radi o internom skladištu, uklanjamo _Timer Intermediate Catch event_ "Svaki ponedjeljak", već na sekvencijalni slijed između pripreme robe i XOR spajanja možemo ubaciti _milestone_ događaj "Roba spremna", iako je to više opcionalno, njime bolje pojašnjavamo trenutak nastavka procesa i **naglašavamo da postoji neko vremensko razdoblje potrebno** za pripremu robe.
- ❌ **Pogreška**: Radi se o internom skladištu, ne modeliramo "slanje maila, SMS-a ili sl. poruke" već samo "provjeravamo" dostupnost robe u tom skladištu putem istog IT sustava, ERP-a ili sl. _Send task_ nam je ovdje reduntantna aktivnost.

Možemo jednostavno ukloniti _Send Task_ aktivnost i samo nastaviti sekvencijalni tok prema sljedećoj aktivnosti "Provjera zaliha robe" u stazi internog skladišta.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_8.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 11. Primjer modeliranog procesa VELEPRODAJA - PROCES NARUČIVANJA ROBE bez redundantne komunikacije unutar istog polja - između dvije staze.

<hr>

Razmotrimo ponovno scenarij s eksternim skladištem. Što se događa ako se, nakon dolaska šlepera s robom, pojavi potreba za dodatnom narudžbom robe?

_Primjer poslovnog slučaja:_ maloprodaja šalje narudžbu veleprodaji. Veleprodaja naručuje robu od eksternog skladišta svakog ponedjeljka te je proces SKLADIŠTE - OTPREMA ROBE instanciran. Međutim, nakon što šleper stigne s robom, maloprodaja šalje dodatnu narudžbu veleprodaji (npr. zbog neočekivane potražnje). Tada se već aktivni proces VELEPRODAJA - PROCES NARUČIVANJA ROBE mora na neki način **ponovno okinuti** kako bi se obradila nova narudžba, a samim time i proces SKLADIŠTE - OTPREMA ROBE ako je potrebno.

Kako bismo cijeli proces učinili jasnijim i preglednijim, možemo ga modelirati **korištenjem međudogađaja** _Message Intermediate Throw Event_ i _Message Intermediate Catch Event_ kako bismo bolje naglasili navedene ključne trenutke u procesu:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_9.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 12. Primjer modeliranog procesa VELEPRODAJA - PROCES NARUČIVANJA ROBE s ispravnom komunikacijom između dva polja/procesa koristeći međudogađaje za signalizaciju potrebe za dodatnom narudžbom robe.

- ✅ **Ispravno**: U ovom slučaju, koristimo _Message Intermediate Throw Event_ za signalizaciju potrebe za dodatnom narudžbom robe. Kada se dogodi taj međudogađaj, ponovno se stvara instanca procesa VELEPRODAJA - PROCES NARUČIVANJA ROBE. Koristimo korespondirajući _Message Intermediate Catch Event_ za hvatanje tog signala i pokretanje procesa SKLADIŠTE - OTPREMA ROBE.
- ✅ **Ispravno**: Definirali smo i _Message Intermediate Catch Event_ "Stigao zahtjev za dodatnom robom usred procesa", kako bi jasno definirali trenutak kad se za vrijeme trajanja procesa VELEPRODAJA - PROCES NARUČIVANJA ROBE pojavila potreba za dodatnom narudžbom robe. Potreba se pojavila usred procesa, dok se čeka na dolazak šlepera s prvotnom narudžbom - XOR merge će nastaviti prvim dolaznim signalom.

#### Nekoliko korisnih smjernica za ispravno modeliranje poslovne komunikacije <!-- omit in toc -->

1. Koristite _Send Task_ za eksplicitno slanje poruka dionicima procesa (npr. email, SMS, itd.) koje zahtijevaju vrijeme i resurse za izvršenje (npr. ljudske intervencije).
2. Koristite _Receive Task_ za obradu poruka koje dolaze od dionika procesa (_Receive Task_ je ustvari ekvivalentna kratica za Message Intermediate Catch event + Task`).
3. Koristite _Message Intermediate Throw Event_ za signalizaciju drugim procesima da nešto učine (okidanje drugih procesa) slanjem poruke/signala/notifikacije.
4. Koristite _Message Intermediate Catch Event_ za hvatanje signala ili poruka od drugih procesa (okidanje procesa ili nastavak procesa) bez potrebe za ljudskom intervencijom.
5. Koristite _Intermediate Throw Event_ za signalizaciju ključnih točaka u procesu (_milestone_) bez eksplicitnog slanja poruka.
6. Koristite _Timer Intermediate Catch Event_ kada proces stagnira na način da čeka specificirano vremensko razdoblje.

_Receive Task_ je nešto rjeđa aktivnost u BPMN modeliranju, međutim ima svoju svrhu. Radi se o kratici (skraćenici) koja kombinira dva BPMN elementa: _Message Intermediate Catch event_ i neku popratnu aktivnost - najčešće obradu dobivenog signala/poruke. Dakle, _Receive Task_ predstavlja aktivnost koja čeka na primitak poruke ili signala od drugog entiteta prije nego nastavi s obradom te poruke/signala.

_Primjer:_ "Obrada zaprimljene narudžbe" može biti modelirana kao `Receive Task` koja čeka na primitak narudžbe od kupca (trenutak) i njenu obradu (aktivnost).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/receive_task.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 12. Ponekad je korisno koristiti `Receive Task` za modeliranje aktivnosti koja uključuje primitak poruke ili signala te popratnu aktivnost obrade iste.

_Intermediate Throw Event_ je korisno koristiti kada želimo **naglasiti ključne točke u procesu**, tzv. _milestone_ (npr. "Roba spremna", "Vrijeme isteklo", "Proizvod na zalihi", "Hrana spremna"). Bez obzira, procesni tijek je moguće definirati i bez njih, ali na ovaj način možemo značajno **poboljšati čitljivost i razumljivost procesa**.

Primjer: Proces pripreme hrane u restoranu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_10.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 13. Primjer modeliranog procesa pripreme hrane u restoranu bez _milestone_ događaja.

Možemo dodati _Intermediate Throw Event_ "Hrana spremna" kako bismo naglasili ključnu točku u ovom procesu. Ovaj događaj ne utječe na sekvencijalni tijek procesa, već samo signalizira da je hrana spremna za posluživanje te na taj način postižemo bolju čitljivost procesa.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_11.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 14. Primjer modeliranog procesa pripreme hrane u restoranu s _milestone_ događajem "Hrana spremna".

_Primjer: Što ako su naši klijenti djeca na nekoj rođendanskoj proslavi? Npr. želimo animirati djecu dok čekaju hranu._
Možemo dodati paralelnu aktivnost gdje zabavljamo djecu dok hrana nije gotova, a samo čekanje na spremanje hrane naglasiti kroz _Timer Intermediate Catch Event_ "Trajanje pripreme hrane". Po završetku vremenskog razdoblja, proces se nastavlja.

> Napomena: U nastavku ćemo pokazati kako ovo modelirati bolje koristeći _boundary event_.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_12.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 15. Primjer modeliranog procesa pripreme hrane u restoranu s paralelnom aktivnošću zabavljanja djece.

_Primjer:_ Zakomplicirat ćemo još malo stvari. Što ako nam hrana izgori i nemamo više ideja kako zabavljati djecu (primjerice prođe preko 2 sata)? U tom slučaju, ćemo naručiti pizzu iz obližnje pizzerije. Komunikaciju prema pizzeriji možemo prikazati kroz _send Task_ aktivnost koja se izvršava jednom kad se okine _Timer Intermediate Catch Event_ - "Djeca izgubila strpljenje nakon 2 sata".

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_13.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 16. Primjer modeliranog procesa pripreme hrane u restoranu s paralelnom aktivnošću zabavljanja djece i narudžbom pizze nakon što djeca izgube strpljenje.

<div style="page-break-after: always; break-after: page;"></div>

## 1.3 Entiteti na informacijskim (message) tokovima

Uobičajeno je dodati entitete na informacijskim tokovima kako bi se dodatno pojasnila komunikacija između objekata. Primjerice, možemo dodati entitet "Narudžba" na informacijskom toku između _send taska_ "Naručivanje pizze preko telefona" i _message start eventa_ "Pristigla narudžba" kako bi naglasili da je poruka koja se šalje upravo **narudžba s detaljima o naručenim pizzama**.

Jednako tako možemo na informacijskom toku između _manual taska_ "Dostavljanje pizze" i _Message Intermediate Catch Event_: "Jednom kad je pizza dostavljena", dodati entitet "Naručene pizze i račun" kako bi naglasili da se informacijskim tokom dostavljaju upravo ti entiteti.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_14.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 17. Primjer modeliranog procesa pripreme hrane u restoranu s paralelnom aktivnošću zabavljanja djece i narudžbom pizze nakon što djeca izgube strpljenje, uz dodatne entitete na informacijskim tokovima.

**Entiteti** na informacijskom toku su korisni jer:

- **pojašnjavaju** što se šalje između objekata
- **jasno definiraju** što se očekuje od poruke/signala
- **poboljšavaju čitljivost** i **razumijevanje** modela procesa

Ilustracija ispod prikazuje komunikaciju između PRODAVATELJA i KUPCA te različite entitete koji se šalju između njih, a koje definiramo na informacijskim tokovima.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_15.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 18. Informacijske tokove možemo dodatno pojasniti definiranjem entiteta koji se šalju između BPMN objekata.

> Napomena: **Entitete možemo dodati i na sekvencijalnim tokovima**, premda je to manje uobičajeno. Entiteti na sekvencijalnim tokovima mogu biti korisni kada želimo naglasiti što se prenosi između aktivnosti, npr. koji su ulazni podaci u određenu aktivnost i/ili koji su izlazni podaci nakon izvršenja aktivnosti. Prisjetite se procesa produljenja registracije motornog vozila iz skripte UPP3 gdje smo dodavali entitete na sekvencijalne tokove kako bismo naglasili koji se dokumenti i/ili podaci prenose između aktivnosti.

<div style="page-break-after: always; break-after: page;"></div>

# 2. Boundary event (Međudogađaji na aktivnostima)

U BPMN modeliranju, _boundary event_ (međudogađaj na aktivnosti) je poseban tip događaja koji je vezan za određenu aktivnost i koristi se za hvatanje (_eng. catch_) određenih eskalacija, signala, poruka ili vremenskih okidača koji se mogu dogoditi tijekom izvođenja te aktivnosti.

U BPMN literaturi na hrvatskom, _boundary event_ se često prevodi kao _međudogađaj na aktivnosti_ ili **rubni događaj**. U nastavku ove skripte, koristit ćemo termin _boundary event_.

_Boundary eventi_ su korisni za modeliranje iznimnih situacija ili uvjeta koji mogu utjecati na tijek procesa, **a ne zahtijevaju prekid same aktivnosti**.

_Boundary eventi_ se prikazuju krugovima s dvostrukim, koncentričnim kružnicama (identično kao međudogađaji), ali su **priključeni na rub aktivnosti** - zato se nazivaju _boundary event_ (međudogađaj na aktivnosti).

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Boundary event</code> (priključen na aktivnost)</span>
</div>

Prema Camunda 8 BPMN specifikaciji, postoje više različitih tipova _boundary eventa_, od kojih se većina koristi prilikom razvoja procesne aplikacije. Međutim, u kontekstu modeliranja poslovnih procesa, koristi se samo nekolicina njih.

Postoje 2 glavna tipa _boundary eventa_:

1. **Interrupting boundary event** (prekidajući _boundary_ međudogađaj) - kada se dogodi ovaj _boundary_ događaj, **aktivnost na koju je vezan se prekida**, a tijek procesa nastavlja se prema izlaznoj putanji definiranoj za taj _boundary_ događaj.
2. **Non-interrupting boundary event** (neprekidajući _boundary_ međudogađaj) - kada se dogodi ovaj _boundary_ događaj, **aktivnost na koju je vezan se ne prekida**, već se paralelno izvršava izlazna putanja definirana za taj _boundary_ događaj, dok se glavna aktivnost normalno nastavlja izvoditi.

Prema BPMN specifikaciji, zadani tip _boundary eventa_ je **interrupting** (prekidajući), a prikazuje se neisprekidanim kružnicama (kao na slici iznad - jednako međudogađaju). Ako želimo definirati **non-interrupting** (neprekidajući) _boundary event_, tada se koristi isprekidana linija za kružnice.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/boundary_interrupting_vs_non_interrupting.png?raw=true" style="width:20%; box-shadow: none !important;"></img>

> Slika 19. Interrupting (prekidajući) _boundary event_ prikazan neisprekidanim kružnicama (jednako kao klasičan međudogađaj). Non-interrupting (neprekidajući) _boundary event_ prikazan isprekidanim kružnicama.

Za početak, pokazat ćemo kada koristiti _boundary event_ na procesu POLAGATI ISPIT koji se sastoji od staza PROFESOR i UČENIK.

_Primjer_: Učenik polaže ispit koji traje određeno vremensko razdoblje (npr. 30 minuta). Slijed aktivnosti u stazi UČENIK uključuje aktivnosti: "Rješavati zadatke" i "Predati završeni ispit" koja završava njegov ispitni proces čak i ako preda zadaću prije isteka vremena. Međutim, ako istekne vrijeme i učenik nije predao zadaću, **aktivnost "Rješavati zadatke" se mora prekinuti**, profesor sakuplja zadaću i ocjenjuje je.

Za boldani dio teksta - prekidanje aktivnosti "Rješavati zadatke" - koristit ćemo _interrupting timer boundary event_ vezan za tu aktivnost.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_21.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 20. Primjer modeliranog procesa POLAGATI ISPIT s _interrupting timer boundary eventom_ vezanim za aktivnost "Rješavati zadatke".

Do sada bismo ovakve situacije modelirali jednostavnim _timer intermediate catch eventom_ koji bismo paralelno granali s aktivnošću "Rješavati zadatke" po principu "što se prije dogodi". Međutim, korištenjem _boundary eventa_ jasno naglašavamo da je vremensko ograničenje **izravno povezano s aktivnošću** "Rješavati zadatke" te da se ta aktivnost mora prekinuti kada istekne vrijeme.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_22.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 21. Primjer modeliranog procesa POLAGATI ISPIT s paralelnim _timer intermediate catch eventom_ koji nije vezan za aktivnost "Rješavati zadatke". Isto ispravno, ali model je teži za čitanje, a i može doći do zabune jer nije jasno da je vremensko ograničenje izravno povezano s aktivnošću "Rješavati zadatke".

<div style="page-break-after: always; break-after: page;"></div>

## 2.1 Vrste interrupting boundary eventa

Slično kao kod standardnih međudogađaja, i _boundary eventi_ dolaze u različitim varijantama ovisno o vrsti okidača koji hvataju. Generalni _interrupting boundary event_ može se koristiti za hvatanje različitih vrsta eskalacija, signala ili poruka **koje mogu prekinuti aktivnost na koju je vezan**.

U nastavku su prikazane najčešće korištene vrste _interrupting boundary eventa_ u kontekstu modeliranja poslovnih procesa:

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/interrupting_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Interrupting Boundary Event</code> <b> (prekidajući boundary događaj)</b>  generalni prekidajući međudogađaj koji se može koristiti za hvatanje različitih vrsta eskalacija, signala ili poruka koje mogu prekinuti aktivnost na koju je vezan. Zamislimo ga kao <i>milestone</i> međudogađaj koji se odnosi na aktivnost i kada se dogodi, aktivnost se prekida.</span>
</div>

_Primjeri imenovanja:_ "Hrana djelomično gotova", "Dio namirnica nedostaje", "Javljanje osobe s većim prioritetom"...

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/interrupting_timer_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Interrupting Timer Boundary Event</code> <b>(prekidajući vremenski boundary događaj)</b>  koristi se za prekidanje aktivnosti nakon određenog vremenskog razdoblja ili u određenom specificiranom vremenskom trenutku. Zamislimo ga kao <b>alarm koji se postavlja na aktivnost</b> i kada istekne vrijeme, aktivnost se prekida.</span>
</div>

_Primjeri imenovanja_: "Isteklo vrijeme za rješavanje zadataka", "Rok za dostavu dokumentacije je prošao", "Prošlo je više od 24 sata"...

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/interrupting_message_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Interrupting Message Boundary Event</code> <b>(prekidajući obavještajni boundary event)</b>  koristi se za hvatanje dolaznih poruka koje mogu prekinuti aktivnost. Zamislimo ga kao <b>signal koji prekida aktivnost</b> kada stigne određena poruka.</span>
</div>

_Primjeri imenovanja_: "Otkaži/storniraj narudžbu", "Hitno zaustavi izvođenje", "Stigao zahtjev za promjenu", "primljeni podaci vanjske analize ..." itd.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/interrupting_escalation_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Interrupting Escalation Boundary Event</code> <b>(prekidajući eskalacijski boundary event)</b>  koristi se za hvatanje eskalacija koje mogu prekinuti aktivnost. Eskalacije se obično koriste za označavanje situacija koje zahtijevaju hitnu pažnju ili intervenciju. Zamislimo ga kao <b>signal upozorenja koji prekida aktivnost</b> kada se dogodi eskalacija. Ovo je podskup generalnog <i>interrupting boundary eventa</i>.</span>
</div>

_Primjeri imenovanja_: "Rizik premašio dopušteni prag", "Kritični resurs nedostupan", "Rezultat nije vjerodostojan", "Projekt kasni"...

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/interrupting_error_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Interrupting Error Boundary Event</code> <b>(prekidajući boundary event greške)</b>  koristi se za hvatanje grešaka koje mogu prekinuti aktivnost. Zamislimo ga kao <b>signal greške koji prekida aktivnost</b> kada se dogodi greška. Ovo je podskup generalnog <i>interrupting boundary eventa</i>.</span>
</div>

_Primjeri imenovanja_: "Greška u sustavu", "Neuspjela validacija podataka", "Pogrešan unos korisnika"

> Napomena: Postoji još vrsta _interrupting boundary eventa_ (npr. _cancel boundary event_, _compensation boundary event_, _signal boundary event_), ali se oni rjeđe koriste u kontekstu modeliranja poslovnih procesa, pa ih nećemo detaljnije razmatrati u ovoj skripti.

_Timer_ i _Message_ varijante interrupting _boundary eventa_ su nam poznatije budući da se ponašaju jednako kao i njihovi ekvivalenti među standardnim međudogađajima na sekvencijalnom slijedu, međutim sada su vezani izravno na aktivnost i mogu je **prekinuti usred njezina izvođenja**.

_Escalation boundary event_ koristi se za hvatanje raznih eskalacija koje mogu prekinuti aktivnosti.

_Primjer:_ Na modeliranom procesu "Organizacija koncerta u Pulskoj Areni" u rješenjima iz vježbi UPP3, upotrijebljen je _escalation boundary event_ vezan za aktivnost "Monitoring prodaje ulaznica" koji hvata eskalaciju "Slaba prodaja!". Međutim, nismo detaljnije razmatrali njegovo značenje. Sada znamo da se radi o _interrupting escalation boundary eventu_ koji bi ustvari prekinuo navedenu aktivnost kada se dogodi eskalacija, pa je u tom slučaju točnije koristiti varijantu _non-interrupting escalation boundary event_. Više u nastavku...

U istom poslovnom procesu korišten je i _interrupting timer boundary event_ na aktivnosti "Prodaja ulaznica preko weba" koji hvata eskalaciju "Sve do dana koncerta ili rasprodanosti ulaznica!". Ovdje je ispravno korišten _interrupting timer boundary event_ jer kada se dogodi eskalacija (pristiže dan koncerta), aktivnost se mora prekinuti. Međutim, za rasprodanost ulaznica je bolje koristiti _interrupting boundary event_.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_23.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 22. Isječak iz procesa "Organizacija koncerta u Pulskoj Areni" s korištenim _boundary eventima_.

- ✅ **Ispravno**: Korišten je _interrupting timer boundary event_ na aktivnosti "Prodaja ulaznica preko weba" koji hvata eskalaciju "Sve do dana koncerta ili rasprodanosti ulaznica!". Kada se dogodi eskalacija (pristiže dan koncerta), aktivnost se mora prekinuti.
- ❌ **Manje ispravno**: Korišten je _interrupting escalation boundary event_ na aktivnosti "Monitoring prodaje ulaznica" koji hvata eskalaciju "Slaba prodaja!". Bolje bi bilo koristiti varijantu _non-interrupting escalation boundary event_ jer se radi o eskalaciji koja ne zahtijeva prekid aktivnosti, već samo dodatnu pažnju.
- ❌ **Manje ispravno**: Za eskalaciju "rasprodanosti ulaznica" bolje je koristiti _interrupting boundary event_ umjesto _interrupting timer boundary event_ jer rasprodanost nije vremensko ograničenje, već stanje koje može nastupiti u bilo kojem trenutku.

Dakle, moguće je dodati i dva ili više _boundary eventa_ na istu aktivnost, ovisno o potrebama modeliranja poslovnog procesa.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_24.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 23. Isječak iz procesa "Organizacija koncerta u Pulskoj Areni" s dva _interrupting boundary eventa_ na aktivnosti "Prodaja ulaznica preko weba".

---

Pogledat ćemo još jedan jednostavni primjer eskalacijskog _boundary eventa_.

> _Primjer:_ Poslovni proces KUPITI POVLAŠTENU PUTNU KARTU modelira proces prodaje povlaštenih putnih karata u obalnom brodskom prijevozu, što je povlastica stanovnika naših otoka. Pravo na povlašten prijevoz ostvaruje se prilikom kupnje putne karte, a dokazuje se pokazom elektroničke otočne iskaznice (eOtls) koju je izdalo ovlašteno tijelo državne uprave. Radi brže kupnje karata putnik daje eOtls službeniku pri ulasku na brod, koji očitava na čitaču beskontaktnih "pametnih" kartica. Očitavanjem se automatski poziva web servis koji na osnovi upita u središnju bazu podataka vraća službeniku podatak možel li se prema toj eOtls izdati povlaštena putna karta. Službenik na ulazu u brod identificira putnika prema slici na eOtls-u pa može uočiti ako je eventualno riječ o zloupotrebi prava (npr. ako kartu kupuje osoba koja nije nedvojbeno slična licu s fotografije na eOtls-u), ali nema vremena za dodatnu verifikaciju. On će putniku izdati povlaštenu putnu kartu (jer nije ovlašten da mu uskrati pravo na putovanje), ali će zadržati eOtls i poslati je kontroloru, koji će provesti dodatnu identifikaciju te eventualno oduzeti povlaštenu putnu kartu ako se utvrdi zloupotreba.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_25.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 24. Primjer modeliranog procesa KUPITI POVLAŠTENU PUTNU KARTU s _non-interrupting escalation boundary eventom_ vezanim za aktivnost "Identificirati putnika prema eOtls-u" kojim se hvata eskalacija "blagajnik izrazio sumnju" i pokreće se slijed aktivnosti kontrolora za dodatnu verifikaciju.

---

Pokazat ćemo još jedan primjera korištenja interrupting message _boundary eventa_ i interrupting error _boundary eventa_ na već poznatom procesu OBRADA NARUDŽBE.

> _Primjer:_ Poslovni proces OBRADA NARUDŽBE je tipičan proces promptnog ispunjavanja narudžbe za isporuku proizvoda iz područnog skladišta. Osnovni je tok procesa vrlo jednostavan: nakon što kupac pošalje narudžbu, skladište je prima, priprema robu za isporuku i šalje je kupcu. Međutim, tijekom procesa mogu se pojaviti različite iznimne situacije koje zahtijevaju posebnu obradu. Na primjer, kupac može poslati zahtjev za otkazivanjem/storniranjem narudžbe prije nego što je roba isporučena. U tom slučaju, skladište mora prekinuti proces obrade narudžbe i izvršiti otkazivanje. Također, može doći do greške u sustavu tijekom zaprimanja narudžbe ili utvrđivanja uplate, što također zahtijeva prekid procesa i pokretanje postupka za rješavanje greške.

U ovom primjeru koristimo tri _interrupting boundary eventa_:

1. **Interrupting Error Boundary Event** vezan za aktivnost "Upisivanje narudžbe u ERP" - hvata grešku "Greška u sustavu prilikom upisa narudžbe" i pokreće slijed aktivnosti za rješavanje greške.
2. **Interrupting Escalation Boundary Event** vezan za aktivnost "Provjeriti zalihe robe" unutar potprocesa skladišta PAKIRANJE I OTPREMA ROBE - hvata eskalaciju "Nema robe!" te završava potproces bez otpremanja robe.
3. **Interrupting Message Boundary Event** vezan za **potproces** skladišta PAKIRANJE I OTPREMA ROBE - hvata poruku koja dolazi od kupca "zahtjev za otkazivanje/storniranje narudžbe" i prekida potproces te pokreće slijed aktivnosti za otkazivanje narudžbe.

> **Važno je napomenuti**: _Boundary evente_ možemo koristiti i na potprocesima budući da su oni ništa drugo nego složene aktivnosti koje sadrže vlastiti tok procesa unutar sebe, a koji ima smisla modelirati za naš poslovni proces. Eskalacijom ovakvog događaja, prekidamo cijeli potproces, što je često korisno u praksi. Dodatno, unutar aktivnosti samog potprocesa možemo koristiti boundary evente na pojedinačnim aktivnostima unutar potprocesa, čime se ne prekida cijeli potproces, već samo pojedinačne aktivnosti unutar njega (npr. nema robe unutar aktivnosti "Provjeriti zalihe robe").

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_26.png?raw=true" style="width:100%; box-shadow: none !important;"></img>

> Slika 25. Primjer modeliranog procesa OBRADA NARUDŽBE s korištenim različitim _interrupting boundary eventima_ na aktivnostima, ali i na potprocesu.

<div style="page-break-after: always; break-after: page;"></div>

## 2.2 Vrste non-interrupting boundary eventa

Slično kao kod interrupting _boundary eventa_, i _non-interrupting boundary eventi_ dolaze u različitim varijantama ovisno o vrsti okidača koji hvataju. Generalni _non-interrupting boundary event_ može se koristiti za hvatanje različitih vrsta eskalacija, signala ili poruka koje **ne prekidaju aktivnost na koju je vezan**.

_Non-interrupting_ varijante **prikazujemo isprekidanim kružnicama**.

Pokazat ćemo samo najčešće korištene vrste _non-interrupting boundary eventa_ u kontekstu modeliranja poslovnih procesa:

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/non-interrupting_message_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Non-Interrupting Message Boundary Event</code> <b>(neprekidajući obavještajni boundary događaj)</b>  koristi se za hvatanje dolaznih poruka koje ne prekidaju aktivnost. Zamislimo ga kao <b>signal koji paralelno pokreće dodatnu obradu</b> kada stigne određena poruka, dok se glavna aktivnost normalno nastavlja izvoditi.</span>
</div>

_Primjeri imenovanja_: "Obavijest o promjeni zahtjeva", "Dodatni podaci primljeni", "Po primitku zahtjeva s izmjenama", "Stigla dopunska dokumentacija", "Primljen upit o stanju narudžbe"...

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/non-interrupting_timer_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Non-Interrupting Timer Boundary Event</code> <b>(neprekidajući vremenski boundary događaj)</b>  koristi se za pokretanje dodatne obrade nakon određenog vremenskog razdoblja ili u određenom specificiranom vremenskom trenutku, bez prekidanja aktivnosti. Zamislimo ga kao <b>alarm koji paralelno pokreće dodatnu obradu</b> kada istekne vrijeme, dok se glavna aktivnost normalno nastavlja izvoditi.</span>
</div>

_Primjeri imenovanja_: "Podsjetnik nakon 24 sata", "Provjera statusa nakon tjedan dana", "Tri dana poslije primitka narudžbe"...

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/elements/non-interrupting_escalation_boundary_event.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><code>Non-Interrupting Escalation Boundary Event</code> <b>(neprekidajući eskalacijski boundary događaj)</b>  koristi se za hvatanje eskalacija koje ne prekidaju aktivnost. Eskalacije se obično koriste za označavanje situacija koje zahtijevaju hitnu pažnju ili intervenciju. Zamislimo ga kao <b>signal upozorenja koji paralelno pokreće dodatnu obradu</b> kada se dogodi eskalacija, dok se glavna aktivnost normalno nastavlja izvoditi.</span>
</div>

_Primjeri imenovanja_: "Utvrđen je određeni rizik", "Sporedni resurs nedostupan", "Dokumentacija kasni", "Projekt kasni", "Evidentirana slaba prodaja ulaznica"...

> Napomena: Postoji još mnogo vrsta _non-interrupting boundary eventa_ (npr. _non-interrupting signal boundary event_), ali se oni rjeđe koriste u kontekstu modeliranja poslovnih procesa, pa ih nećemo detaljnije razmatrati u ovoj skripti.

---

Pogledat ćemo primjer korištenja _non-interrupting escalation boundary eventa_ na već poznatom procesu ORGANIZACIJA KONCERTA U PULSKOJ ARENI. Rekli smo da želimo koristiti ovaj tip _boundary eventa_ na aktivnosti "Monitoring prodaje ulaznica" jer se radi o eskalaciji koja ne zahtijeva prekid aktivnosti, već samo dodatnu pažnju od strane marketinškog tima.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_27.png?raw=true" style="width:70%; box-shadow: none !important;"></img>

> Slika 26. Primjer modeliranog procesa ORGANIZACIJA KONCERTA U PULSKOJ ARENI s korištenim _non-interrupting escalation boundary eventom_ vezanim za aktivnost "Monitoring prodaje ulaznica" kojim se hvata eskalacija "Evidentirana slaba prodaja ulaznica" i pokreće se slijed aktivnosti marketinškog tima za poboljšanje prodaje ulaznica, dok se glavna aktivnost normalno nastavlja izvoditi.

Sve preostale _non-interrupting boundary evente_ možemo koristiti na isti način, samo moramo paziti da ne prekidaju glavnu aktivnost na koju su vezani.

Primjerice, možemo nadograditi proces OBRADA NARUDŽBE s _non-interrupting message boundary eventom_ vezanim za potproces skladišta PAKIRANJE I OTPREMA ROBE koji hvata poruku "upit o statusu narudžbe" od kupca i pokreće slijed aktivnosti za informiranje kupca o statusu narudžbe, dok se glavni potproces normalno nastavlja izvoditi.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/diagram_28.png?raw=true" style="width:90%; box-shadow: none !important;"></img>

> Slika 27. Primjer modeliranog procesa OBRADA NARUDŽBE s korištenim _non-interrupting message boundary eventom_ vezanim za potproces skladišta PAKIRANJE I OTPREMA ROBE kojim se hvata poruka "upit o statusu narudžbe" od kupca i pokreće slijed aktivnosti za informiranje kupca o statusu narudžbe, dok se potproces normalno nastavlja izvoditi.

<div style="page-break-after: always; break-after: page;"></div>

# 3. Predlošci tokova rada

Poslovni procesi s kojima se susrećemo izgledaju nam međusobno vrlo različiti: čini se da svaki od njih ima svoje specifične ciljeve, da se provodi u drugom okruženju i da raspolaže drugim resursima. Premda je to točno, dublja studija ipak otkriva da u logičkoj strukturi modela procesa ima mnogo više sličnosti nego što se to čini u prvom trenutku. Ta se sličnost može utvrditi na dvjema (možemo reći **makro** i **mikro**) razinama.

### Sličnost na razini poslovne domene (tzv. makrorazina) <!-- omit in toc -->

U dosadašnjim primjerima razmatrali smo modele koji bi se mogli primijeniti u više različitih organizacija. Tako se npr. roba široke potrošnje sa svakog veleprodajnog skladišta distribuira prema modelu koji je sličan onom koji smo spomenuli na početku vježbi (narudžba, otprema, dostava). Iako se detalji mogu razlikovati, osnovni tok poslovnog procesa je isti, odnosno aktivnosti se provode prema općoj shemi: PRIHVATITI NARUDŽBU → PROVJERITI MOGUĆNOST ISPORUKE → IZUZETI ROBU SA SKLADIŠTA → OTPREMITI ROBU KUPCU → IZRADITI RAČUN.

Ako prepoznamo tipske procese u više uspješnih organizacija u određenom poslovnom području, moći ćemo izabrati one koji najbolje odgovaraju našem poslovanju (_eng. best practice_) ili ih optimizirati i prilagoditi svojim specifičnim potrebama. Takva tipizacija procesa vodi nas do tzv. **referentnih poslovnih procesa** (obično ih nude proizvođači sustava ERP).

### Sličnost na razini aktivnosti koje čine proces (tzv. mikrorazina) <!-- omit in toc -->

U dosadašnjim smo primjerima vidjeli da se svaki poslovni proces sastoji od niza objekata toka koji su međusobno povezani slijednim (_eng. sequential flow_) ili informacijskim vezama (_eng. message flow_). Već letimična analiza pokazuje da se u različitim procesima često ponavljaju odnosi između objekata toka, kao na primjer:

- **slijed** (AKTIVNOST A → slijedna veza → AKTIVNOST B → slijedna veza → AKTIVNOST C...)
- **izbor** (AKTIVNOST A nakon čega slijedi AKTIVNOST B ili AKTIVNOST C ili AKTIVNOST D...)
- **paralelno izvođenje** dvaju ili više aktivnosti itd.

Za navedene tipične oblike odnosa između objekata toka uobičajen je naziv **predlošci tokova rada** (_eng. workflow patterns_).

Predložaka za upravljanje tokom rada ima jako puno, a moguće ih je podijeliti u nekoliko kategorija. U nastavku će, kroz potpoglavlja, biti prikazani neki od najčešće korištenih predložaka tokova rada.

## 3.1 Osnovni predlošci za upravljanje slijedom

U ovoj grupi je ukupno **pet predložaka o upravljanju slijedom izvođenja aktivnosti**. Gotovo sve ste ih već nesvjesno koristili u dosadašnjim primjerima modeliranja procesa. Ovdje ćemo ih još jednom navesti teorijski i ukratko objasniti.

Koristit ćemo sljedeće oznake za predloške:

- `WCP` (_Workflow Control Pattern_) - kratica za definiranje predloška
- `A` - aktivnost
- `P` - polje
- `O` - entitet na informacijskog vezi
- `S` - skretnica

### WCP-1 Slijed (eng. Sequence)

Neka aktivnost (npr. `A2`) može započeti ako je završena aktivnost koja joj prethodi (npr. `A1`).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-1-1-2.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 28. Primjer predloška WCP-1: Slijed između dvije aktivnosti

Ipak, treba podsjetiti na to kako aktivnosti modelirati kada ih izvode različiti sudionici, u različitim poljima. Koristimo `Message Flow` za komunikaciju između polja te odgovarajuće **međudogađaje**:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-1-2-2.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 29. Primjer predloška WCP-1: Slijed između dvije aktivnosti u različitim poljima

### WCP-2 Paralelno dijeljenje (eng. Parallel Split)

Nakon neke aktivnosti, proces se dijeli u više paralelnih grana. To znači da nakon završetka `A1` mogu započeti aktivnosti `A2` i `A3` i `A4` te se obavljati istodobno, a iza svake od njih može slijediti neka druga aktivnost.

**Mogući početak istovremene aktivnosti ne implicira njihov istovremeni završetak!**

Od jedne značke (_eng. token_) koja ulazi u paralelnu skretnicu `S1`, uvijek se stvara (bez provjere uvjeta) onoliko kopija koliko ima izlaznih grana i svaka od tih kopija značke dalje se kreće po jednoj od paralelnih grana.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-2.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 30. Primjer predloška WCP-2: Paralelno dijeljenje

### WCP-3 Sinkronizacija (eng. Synchronization)

Neka aktivnost može početi ako su prije nje završene aktivnosti na svim paralelnim granama (mogu biti dvije ili više). To znači da aktivnost `A5` može započeti tek nakon što su završene aktivnosti `A2`, `A3` i `A4`. U **paralelnoj skretnici spajanja S2** (_eng. AND Merge_) sve se ulazne značke uvijek spajaju, bez provjere uvjeta, **u jednu izlaznu**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-3.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 31. Primjer predloška WCP-3: Sinkronizacija

### WCP-4 Ekskluzivni izbor (eng. Exclusive Choice)

Nakon neke aktivnosti proces će se nastaviti **samo u jednoj** od više mogućih grana. To znači da će nakon `A1` biti izvedena aktivnost `A2` ili `A3` ili `A4` (odnosno slijed kojem su one na početku). Značka koja ulazi u ekskluzivnu XOR skretnicu `S1` ne dijeli se, već nastavlja jednim od putova koji udovoljava uvjetu što se ispituje prije te skretnice.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-4.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 32. Primjer predloška WCP-4: Ekskluzivni izbor

### WCP-5 Jednostavno spajanje (eng. Simple Merge)

Neka aktivnost može početi čim je izvedena neka od aktivnosti koje su se izvodile u dva ili više paralelnih sljedova. To znači da aktivnost `A5` može započeti kad završe ili `A2` ili `A3` ili `A4` (odnosno slijed kojem su one bile na kraju).. Aktivnost `A5` će pokrenuti ona značka koju je ekskluzivna skretnica `S1` uputila na neki od sljedova, a koje je prošla kroz ekskluzivnu skretnicu spajanja `S2`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-5.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 33. Primjer predloška WCP-5: Jednostavno spajanje

## 3.2 Predlošci za grananje, sinkronizaciju i iteraciju

U ovoj grupi su predlošci koji se koriste za grananje i sinkronizaciju toka izvođenja aktivnosti. Uobičajeno se koriste u situacijama kada je potrebno izvršiti nekoliko aktivnosti istovremeno ili kada se proces nastavlja samo ako su završene sve aktivnosti koje su se izvodile u paralelnim granama.

### WCP-6 Višestruki izbor (eng. Multiple Choice)

Nakon neke aktivnosti proces se može nastaviti u jednoj, dvjema ili u više mogućih grana, **ali najmanje u jednoj**. To znači da poslije `A1` može biti izvedena bilo koja aktivnost, ili bilo koje dvije aktivnosti ili sve tri aktivnosti od mogućih `A2`, `A3` i `A4`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-6.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 34. Primjer predloška WCP-6: Višestruki izbor

### WCP-7 Strukturno sinkronizirano spajanje (eng. Structured Synchronizing Merge)

Neka aktivnost može početi ako su izvedene sve aktivnosti koje su se izvodile u dvama ili u više paralelnih sljedova stvorenih ranije u procesu. To znači da `A5` može započeti kad je završila jedna ili više aktivnosti od mogućih `A2`, `A3` i `A4` koje su pokrenule kopije značaka stvorene u inkluzivnoj skretnici grananja (`S1`). Drugim riječima, u `S2` se sinkroniziraju (ili spajaju) kopije onih značaka koje su prije toga stvorene u `S1`. Bez obzira na to koliko je kopija značaka ušlo u izlaznu skretnicu `S2`, izaći će samo jedna.

U poslovnom smislu to znači da će se procesna instanca, koja je obrađena u `A1`, moći obraditi u `A5` nakon što je provedena barem jedna ili više aktivnosti iz skupa `A2`, `A3` i `A4`.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-7.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 35. Primjer predloška WCP-7: Strukturno sinkronizirano spajanje

### WCP-8 Nesimetrično sinkronizirano spajanje (eng. Acyclic Synchronizing Merge)

Neka aktivnost može početi ako su izvedene sve aktivnosti na dva ili više paralelnih sljedova, stvorenih ranije u procesu na inkluzivnoj skretnici `S1` ali se odluka o tome što treba spajati odnosi na temelju **međudogađaja** koji prethode ekskluzivnoj skretnici spajanja `S2`.

**Nesimetrično spajanje** riješeno je kombinacijom inkluzivne skretnice `S1` (koja će stvoriti jednu, dvije ili tri značke na bilo kojem od tri slijeda) te uvjetovanih događaja na sva tri slijeda ispred konvergentne ekskluzivne skretnice `S2`. Ti će uvjetovani događaji dopustiti izvođenje aktivnosti "Pokrenuti marketinške akcije" kad završe one od prethodnih aktivnosti koje se moraju uskladiti.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-8.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 36. Primjer predloška WCP-8 na primjeru procesa organizacije marketinške kampanje: Nesimetrično sinkronizirano spajanje

Izvođenje aktivnosti u složenom poslovnom procesu slično je izvođenju procedura u složenom programu. Simboli BPMN-a omogućuju prikaz takvih struktura kao što su `GOTO`, `WHILE...DO`, `REPEAT...UNTIL` u programiranju.

Međutim, u poslovnoj praksi česte su i druge strukture, nepoznate u strukturnom programiranju, koje opisuju ponavljanje odnosno **iteracije** pojedinačne aktivnosti ili grupe aktivnosti.

### WCP-9 Proizvoljno ponavljanje (eng. Arbitrary Cycles)

Ovaj predložak opisuje točku u procesu nakon koje se može ponoviti jedna ili više aktivnosti. Općenito, unaprijed se ne zna treba li uopće nešto ponavljati i ako treba - koliko puta, već je to specifično za svaku instancu procesa pa se stoga to naziva još i **nestrukturiranom petljom**.

Tipičan primjer za ovaj predložak može se pronaći u zdravstvu, a prikazan je na sljedećem primjeru:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-9.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 37. Primjer predloška WCP-9: Proizvoljno ponavljanje

Primarna zdravstvena zaštita kod nas funkcionira tako da pacijent najprije odlazi na pregled svom osobnom liječniku. Osobni liječnik nakon pregleda odlučuje koje su dodatne pretrage potrebne te za njih izdaje uputnice. Laboratorij ili specijalist će "Obaviti pretragu i izdati nalaz" te zadržati uputnicu (radi obračuna usluge), a pacijent (ako ima još uputnica) će otići na sljedeću pretragu. Osobni će liječnik "Odrediti način liječenja" na temelju nalaza u provedenim pretragama. Općenito se ne zna koliko laboratorijskih pretraga treba napraviti, već će se napraviti onoliko pretraga koliko je potrebno točno određenom pacijentu i primjerenoj njegovoj bolesti.

Ovo je zanimljiv primjer proizvoljnog ponavljanja gdje XOR skretnica spajanja **prethodi** XOR skretnici grananja.

## 3.3 Predlošci za okidače

U ovom potpoglavlju prikazat ćemo nekoliko predložaka koji se koriste za modeliranje okidača u poslovnim procesima. **Okidači** su događaji koji pokreću izvođenje procesa, a mogu biti izazvani **vremenski**, **porukom** ili **signalom**.

### WCP-10 Prolazni okidač (eng. Transient Trigger)

Predložak opisuje proces u kojem izvođenje jedne aktivnosti ovisi o nekom vanjskom poticaju ili drugom procesu (odnosno, vanjski poticaj "okida" aktivnost).

Okidač koji to omogućuje zovemo prolaznim jer nestaje ako u osnovnom procesu već ne čeka instanca koja bi se mogla pokrenuti. Prolazni okidač zapravo je običan prijamni međudogađaj (npr. `Message Intermediate Catch Event`) koji se koristi za hvatanje signala ili poruka od drugih procesa.

Primjer opisuje rad noćnog čuvara u nadziranom objektu. Čuvar će se poslije dolaska (u 20 sati) smjestiti u kontrolnu sobu i "Uključiti nadzorni sustav" koji se sastoji od kamera i senzora kretanja. Ako senzor registrira pokret u objektu, on će "Poslati signal" u kontrolnu sobu. Ako je čuvar u sobi, on će "Provjeriti ishodište alarma". Ako pak čuvara nema, poslani signal neće biti iskorišten i propast će (zato ga zovemo prolaznim).

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-10.png?raw=true" style="width:50%; box-shadow: none !important;"></img>

> Slika 38. Primjer predloška WCP-10: Prolazni okidač

### WCP-11 Stalni okidač (eng. Persistent Trigger)

Izvođenje aktivnosti u ovom predlošku također ovisi o nekom vanjskom poticaju ili drugom poslovnom procesu (vanjski poticaj okida aktivnost). Okidač djeluje stalno i aktivan je sve dok na njega dolaze instance procesa, a modelira se također kao prijamni događaj (npr. `Message Intermediate Catch Event`) u osnovnom procesu.

Ishodište iz kojeg dolazi poticaj i ovdje se modelira kao predajni međudogađaj (npr. `Message Intermediate Throw Event`) koji šalje ciljanu obavijest određenom okidaču.

Stalni okidač djeluje slično kao prolazni, a **razlika je u tome što se vanjski poticaj ne gubi ako u osnovnom procesu trenutno nema instance koja bi na njega čekala**. Sljedeći primjer pokazuje izradu prozora. Prozor se izrađuje u tri faze: a) prozorski okvir od drva ili profilirane plastike, b) izolacijska kutija od dvije ili tri staklene ploče između kojih je inertni plin, a razmak održavaju letvice s brtvom i c) ugradnja izolacijske kutije u pripremljeni prozorski okvir.

Zbog različitih tehnologija u fazama a) i b) ti se poslovi organiziraju u dvije radionice. Prvi ćemo odjel nazvati IZRADA I MONTAŽA PROIZVODA, a drugi je staklarska radionica IZRADA IZOLACIJSKE KUTIJE. Ovdje smatramo da prvi odjel vodi posao (među kojima su kontakti s kupcima), a drugi da je kooperant (_outsourced_).

Budući da prvi odjel primi narudžbu, on će "Izraditi nacrt proizvoda" i kopiju poslati staklarskoj radionici te nastaviti s aktivnošću "Izraditi prozorski okvir". Staklarska će radionica prema nacrtu "Izraditi izolacijsku kutiju" i poslati je vodećem odjelu koji, nakon primitka gotove izolacijske kutije, može "Ugraditi izo-kutiju u okvir". Dakle, prijamni događaj "Primljena izolacijska kutija" **okidač** je za ovu aktivnosti. Upravo se u ovom detalju vidi bitna razlika između prolaznog i stalnog okidača: vanjski poticaj (ovdje je to tok "Gotova izolacija kutija") neće se izgubiti ako u okidaču "Primljena izolacijska kutija" još nema odgovarajuće instance procesa (odnosno gotovoga prozorskog okvira) već će se iskoristiti (ovdje to znači ugraditi) kad naiđe ta instanca (odnosno kad prozorski okvir bude gotov).

Analizom modela može se utvrditi da su u procesu zapravo **dva stalna okidača**.

Prvi smo već naveli i on je modeliran eksplicitno. Međutim, drugi okidač modeliran je implicitno i određen svojstvom prijamne aktivnosti "Izraditi ukupni račun za prozor". U tu aktivnost ulazi poruka (entitet) - "Račun za staklarske radove" iz emitirajućeg međudogađaja "Poslan račun za staklarske radove" i pokreće se ("okida") njezino izvođenje.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP4%20-%20Smjernice%20u%20modeliranju,%20boundary%20eventi%20i%20predlo%C5%A1ci%20tokova%20rada/screenshots/predlosci/WCP-11.png?raw=true" style="width:60%; box-shadow: none !important;"></img>

> Slika 39. Primjer predloška WCP-11: Stalni okidač

<div style="page-break-after: always; break-after: page;"></div>

# Zadaci za Vježbu 4

## ServisPlus d.o.o. - Popravak kućanskih uređaja

Vlasnik apartmana koji iznajmljuje smještaj turistima koristi usluge servisne tvrtke ServisPlus d.o.o. za održavanje i popravak kućanskih uređaja u apartmanima. Proces započinje u trenutku kada vlasnik apartmana prijavi kvar na uređaju (npr. perilica rublja, hladnjak ili klima-uređaj) putem web obrasca ili telefonskim pozivom.

Nakon zaprimanja prijave, djelatnik servisnog centra evidentira zahtjev i provjerava osnovne informacije o apartmanu, vrsti uređaja i prirodi kvara. Ako su podaci nepotpuni, vlasnik apartmana se kontaktira radi dopune informacija. Jednom kad je zahtjev ispravno evidentiran, dodjeljuje se serviser te se s vlasnikom apartmana dogovara termin dolaska, uzimajući u obzir boravak gostiju u apartmanu.

Na dogovoreni dan serviser dolazi u apartman i započinje popravak uređaja. Tijekom izvođenja popravka moguće je da se utvrdi kako je potreban dodatni rezervni dio koji trenutačno nije dostupan, zbog čega se popravak privremeno obustavlja do nabave rezervnog dijela u suradnji s vanjskim dobavljačem. U međuvremenu, gosti u apartmanu mogu izraziti nezadovoljstvo zbog neispravnog uređaja ili ometanja boravka, što vlasnik apartmana komunicira servisnom centru.

Popravak je planiran da traje određeno vrijeme. Ako se pokaže da će popravak potrajati dulje od predviđenog, vlasnik apartmana mora biti pravovremeno obaviješten kako bi mogao reagirati prema gostima (npr. ponuditi alternativno rješenje ili financijsku kompenzaciju). Gosti ili vlasnik apartmana mogu u bilo kojem trenutku poslati upit o statusu popravka, na koji servisni centar odgovara bez prekidanja samog izvođenja servisa.

U iznimnim situacijama, gosti mogu zahtijevati hitno rješavanje problema ili zaprijetiti negativnom recenzijom, što vlasnik apartmana eskalira servisnom centru radi ubrzavanja postupka ili promjene prioriteta. Također, prije dolaska servisera, vlasnik apartmana može otkazati zahtjev ako se kvar riješi na drugi način ili ako gosti naposlijetku napuste apartman.

Nakon što je popravak uspješno završen, serviser potvrđuje izvršenu uslugu, a vlasniku apartmana se automatski dostavlja račun i potvrda o obavljenom popravku. Time se proces završava.
