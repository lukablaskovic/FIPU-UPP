# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important;"></img>

# (1) Uvod u poslovno modeliranje

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/UPP_1.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;">Sva razmatranja o poslovnim procesima temelje se na potrebi da svoje poslove (bez obzira na to radi li se o proizvodnji, trgovini, uslugama, javnoj upravi, zdravstvu, obrazovanju, itd.) obavimo optimalno, odnosno što brže i kvalitetnije te uza što manji utrošak resursa. Modeliranje poslovnih procesa je jedan od ključnih alata za postizanje tog cilja, a ona je prije svega poslovna, a ne informatička disciplina. Na ovom kolegiju ćemo se praktično upoznati s modeliranjem poslovnih procesa pomoću BPMN 2.0 notacije i istražiti kako se ta znanja primjenjuju u razvoju softverskih rješenja. </div>
<br>

<div style="float: clear; margin-right:5px;"> </div>
<br>

**🆙 Posljednje ažurirano: 24.10.2024.**

## Sadržaj

- [Upravljanje poslovnim procesima (UPP)](#upravljanje-poslovnim-procesima-upp)
- [(1) Uvod u poslovno modeliranje](#1-uvod-u-poslovno-modeliranje)
  - [Sadržaj](#sadržaj)
- [1. Uvod](#1-uvod)
- [2. BPMN standard](#2-bpmn-standard)
  - [2.1 Softver](#21-softver)
- [3. Osnove modeliranja procesa](#3-osnove-modeliranja-procesa)
  - [3.1 Osnovni elementi](#31-osnovni-elementi)
  - [3.2 Skretnice (eng. Gateway)](#32-skretnice-eng-gateway)
    - [3.2.1 Ekskluzivna skretnica (eng. Exclusive Gateway)](#321-ekskluzivna-skretnica-eng-exclusive-gateway)
  - [3.3 Tumačenje skretnica](#33-tumačenje-skretnica)
  - [Vježba 1: Izdavanje kredita](#vježba-1-izdavanje-kredita)
  - [Vježba 2: Proces obrade natječaja](#vježba-2-proces-obrade-natječaja)
- [4. Hijerarhija procesa i potprocesa](#4-hijerarhija-procesa-i-potprocesa)
  - [4.1 Staze i polja](#41-staze-i-polja)
- [Zadaci za Vježbu 1](#zadaci-za-vježbu-1)
    - [1. Proces obrade reklamacije](#1-proces-obrade-reklamacije)
    - [2. Proces najma vozila](#2-proces-najma-vozila)
    - [3. Proces automatizirane korisničke podrške](#3-proces-automatizirane-korisničke-podrške)

# 1. Uvod

Uspješno upravljanje organizacijom, a osobito povećanje njezine učinkovitosti radi postizanja postavljenih ciljeva, moguće je samo ako se izvrsno poznaje njezin unutarnji ustroj i način djelovanja. Organizacija djeluje nizom poslovnih procesa koji su međusobno povezani i ovise jedan o drugom, a svaki od njih usmjeren je ka ostvarivanju određenog cilja.

Pojednostavljeno se može reći da je **poslovni proces** skup povezanih radnih koraka za koje se mogu odrediti trajanje izvođenja i potrebni resursi.

Učinkovitost djelovanja organizacije može se povećati unapređenjem i preustrojem poslovnih procesa. Međutim, važno je da svi dionici razumiju poslovne procese, a to se može postići ako se oni opišu jednoznačno i svima razumljivo. Upravo je to cilj **poslovnog modeliranja**.

Na primjer, opis govornim jezikom: "Kupac naručuje proizvod, prodavač zaprima narudžbu, skladištar priprema proizvod za isporuku, vozač dostavlja proizvod kupcu, a blagajnik izdaje račun.", svakako je jedan od načina opisa poslovnog procesa, ali on može biti nedovoljno precizan te različito tumačen od strane različitih dionika.

Stoga se danas poslovni procesi egzaktno opisuju skupom grafičkih simbola s točno definiranom semantikom i čvrstim pravilima njihova povezivanja, a sve je to određeno međunarodnom normom.

# 2. BPMN standard

Da bi se neki proces mogao analizirati i unaprijediti, potrebna je ne samo općeprihvaćena definicija već je jednako tako potrebno jednoznačno opisati sva njegova relevantna svojstva. Prikladan je način opisivanje procesa kroz njegov grafički prikaz, osobito ako je dopunjen formalnim opisom pojedinih značajki. Poslovni ljudi, menadžeri i projektanti informacijskih sustava već odavna primjenjuju različite načine grafičkog prikazivanja poslovnih procesa.

Najnovija i danas najšire primjenjivana norma naziva se <a href="https://www.bpmn.org/" target="_blank">**BPMN (Business Process Modelling and Notation)**</a>. BPMN je standard za modeliranje poslovnih procesa koji pruža grafičku notaciju za modeliranje poslovnih procesa, ali i tehničku notaciju za izvođenje tih modela u informacijskim sustavima. BPMN je razvijen od strane **Object Management Group** (OMG) i prvi put je objavljen 2004. godine. Trenutno je najnovija verzija BPMN 2.0, objavljena 2011. godine. OMG grupa je tijekom godina definirala mnoge standarde u području objektno-orijentiranog modeliranja i razvoja softvera, osim BPMN-a, neki od poznatijih su:

- **UML** (Unified Modelling Language) - vjerojatno najpoznatiji OMG-ov standard. To je grafički jezik za vizualizaciju, specifikaciju i dokumentiranje softverskih sustava, od strukture, ponašanja i interakcije između različitih elemenata.
- **MDA** (Model Driven Architecture) - standard za razvoj softvera koji naglašava važnost modela u cijelom životnom ciklusu razvoja softvera.
- **CORBA** (Common Object Request Broker Architecture) - nešto stariji standard koji je definirao arhitekturu za distribuiranu objektno-orijentiranu komunikaciju. Standard je imao značajan doprinos u razvoju distribuiranih sustava.
- **SysML** (Systems Modelling Language) - standard za modeliranje složenih sustava, koji je proizašao iz UML-a, ali je prilagođen za potrebe modeliranja složenih inženjerskih sustava, uključujući i hardverske komponente.

<img src="https://www.bpmn.org/cc2ec853e298b7606554.png" style="width:10%;">

Mi ćemo se na ovom kolegiju baviti isključivo BPMN 2.0 notacijom, a u nastavku ćemo se upoznati s osnovnim elementima modeliranja procesa kroz jednostavni primjer procesa obrade narudžbi kupaca i izdavanje naručene robe.

## 2.1 Softver

Za modeliranje poslovnih procesa u BPMN notaciji možete koristiti veliki broj alata, a neki od popularnijih su:

- Camunda Modeler: besplatno, open-source rješenje koje podržava BPMN 2.0 i DMN notaciju. Preuzmite Desktop verziju [ovdje](https://camunda.com/download/modeler/)
- bpmn.io: open-source rješenje koje se može direktno koristiti u web pregledniku. Isprobajte [ovdje](https://demo.bpmn.io/)
- Flowable: open-source community rješenje koje nudi podršku za modeliranje u web pregledniku. Morate se registrirati da biste koristili alat, a možete ga isprobati [ovdje](https://www.flowable.com/)

Ako ste se odlučili za Camunda Modeler na vašem računalu, morate imati instaliran Java JDK 8 ili noviji. Otvorite terminal i upišite:

```bash
java -version
```

Ako nemate instaliran Java JDK, možete preuzeti i open-source verziju [Open JDK](https://openjdk.org/).

# 3. Osnove modeliranja procesa

Definiran je sljedeći opis poslovnog procesa:

> Zamislimo prodajni centar kao dio neke proizvodne organizacije s pomoću kojeg ona prodaje svoju robu široke potrošnje, primjerice hladnjake, perilice rublja i sl. Takav se proces izvodi u svakom od područnih veleprodajnih centara, kojim proizvodna organizacija robe šrioke potrošnje opskrbljuje svoje velike kupce (npr. distributere, hotele ili restorane). Zamislimo da je poslovnim poslovnom politikom prodajnog centra propisano da se naručena roba može izdati kupcu samo ako je već plaćena po predračunu.
> Poslovni proces **PRODATI ROBU** tada se provodi tako da prodajni centar zaprimi narudžbu od kupca, provjeri je li naručena roba plaćena po predračunu, otpremi robu kupcu i pripremi konačni izlazni račun. Takav slijed poslova ili radnih koraka (pri kojem se upotrebljavaju i podaci o zalihama, kupcima, narudžbama itd.) nazivamo **poslovnim procesom**.

Uočavamo da ovaj poslovni proces ima svoj **početak** i **kraj**, da se ponavlja svaki put kada neki kupac želi naručiti i preuzeti bilo koju robu te da se sastoji od više povezanih poslova ili radnih koraka koje ćemo općenito nazvati **aktivnostima**.

## 3.1 Osnovni elementi

**Aktivnost (_eng. Task_)** je osnovni element poslovnog procesa koji predstavlja radni korak koji se izvodi u procesu. Aktivnosti se ne obavljaju proizvoljno, već uvijek u određenom slijedu. Tako opisan proces može se prikazati grafički na sljedeći način:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_01.png?raw=true" style="width:70%;">

> Slika 1. Poslovni proces **PRODATI ROBU** i njegove aktivnosti

Cijeli je proces na slici 1 prikazan kao niz **aktivnosti**, prikazanih pravokutnicima sa zaobljenim rubovima i povezanih **slijednom vezom**.

**Strelice** povezuju aktivnosti procesa i pokazuju slijed izvođenja aktivnosti.

Početak i kraj procesa su **događaji (_eng. events_)**, a oni su prikazani krugovima koji su iscrtani kružnicama:

- **početak** koji je iscrtan tankom i
- **kraj** koji je iscrtan debljom crtom.

Dakle upotrebljena su tri simbola koja mora imati svaki model poslovnog procesa prema BPMN normi.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/start_end_events.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Kružnica</b> (za početni i završni događaj)</span>
</div>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/task.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Aktivnost</b> (označava se pravokutnikom)</span>
</div>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/arrow.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Strelica</b> (za redoslijed izvođenja aktivnosti)</span>
</div>

<br>

Ovakav temeljni oblik procesa naziva se često i **slijednim dijagramom**.

Međutim, slika 1. prikazuje kako se proces izvodi u idealnom slučaju, odnosno kada je kupac uplatio po predračunu točno onaj iznos koji odgovara vrijednosti naručene robe, a tražena roba je dostupna na skladištu te se odmah poslije primitka narudžbe može otpremiti te izraditi račun za kupca.

## 3.2 Skretnice (eng. Gateway)

Što ako kupac nije prethodno platio po predračunu ili tražene robe nema na skladištu?

U tom slučaju, posao prodaje robe neće se moći provesti na opisani način. Stoga naš model procesa treba proširiti kako bi se prikazali uvjeti izvedbe prema dopunjenom scenariju.

U BPMN notaciji za prikaz uvjeta izvedbe koriste se **skretnice (_eng. Gateway_)**. Skretnice su elementi koji omogućuju modeliranje uvjeta izvedbe, odnosno odlučivanje o tome koja će se aktivnost izvršiti sljedeća. Skretnice se označavaju **rombom**.

Gdje ćemo dodati **prvu skretnicu** u naš model procesa?

Odgovor je nakon aktivnosti **Provjeriti uplatu** jer je to prvi korak u kojem se može dogoditi odstupanje od idealnog slučaja. Naime, ako kupac nije uplatio po predračunu, proces se ne može nastaviti u slijedu definiranom na slici 1.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_02.png?raw=true" style="width:70%;">

> Slika 2. Prošireni model poslovnog procesa **PRODATI ROBU** s prvom skretnicom

Na slici 2. dodana je prva skretnica koja omogućuje modeliranje uvjeta izvedbe. U ovom slučaju, skretnica označava da se proces nastavlja **samo ako je uplata po predračunu primljena**. Ako nije, proces završava u **krajnjem događaju (_eng. end event_)**.

Ispod skretnice je uobičajeno pisati uvjet izvedbe, to može biti bilo koja upitna rečenica koja jasno opisuje uvjet. Primjerice:

- _Uplaćeno?_
- _Uplata po predračunu primljena?_
- _Uplata primljena?_
- _Uplata je izvršena?_

Nakon toga skretnica se povezuje s aktivnostima koje slijede, a koje će se izvršiti ovisno o ispunjenosti uvjeta:

- **Da** - ako je uvjet ispunjen
- **Ne** - ako uvjet nije ispunjen

Odgovore na ova pitanja označavamo **strelicama** koje izlaze iz skretnice. U ovom slučaju, događa se sljedeće:

- **Da** - ako je uplata po predračunu primljena, proces se nastavlja s aktivnostima **Otpremiti** i **Pripremiti račun**
- **Ne** - ako uplata po predračunu nije primljena, proces završava u **krajnjem događaju**.

Primijetite da smo dodali **više krajnjih događaja i nazive događajima** kako bi bilo jasno što se događa u svakom koraku procesa. Model u kojem je više početnih i više završnih događaja u skladu je s BPMN normom i teorijski ispravan, ali uvijek treba provjeriti odgovara li izvođenje procesa u stvarnosti zaista nacrtanom modelu.

### 3.2.1 Ekskluzivna skretnica (eng. Exclusive Gateway)

Primijetite još da unutar romba koji opisuje svaku skretnicu, koristimo simbol **X**. Ovaj simbol označava **ekskluzivnu skretnicu (_eng. Exclusive Gateway_)**. Ekskluzivna skretnica je skretnica koja omogućuje odabir samo jedne od više mogućih putanja. Vrednuje se podatak koji dolazi iz prethodne aktivnosti i na temelju njega **odabire samo jedan mogući slijed** na temelju izračunate vrijednosti ili zadanih uvjeta.

Ova skretnica poznata je i kao **XOR Gateway**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/exclusive_gateway.png?raw=true" style="width:10%;">

- Ako je riječ o grananju procesa, onda znači da će se poslije skretnice provoditi aktivnosti **samo na jednom izlaznom slijedu**.
- Ako više uvjeta može biti istinito, ova skretnica odabire samo onaj slijed **koji je prvi zadovoljen**.
- Ako niti jedan uvjet nije zadovoljen, proces vraća grešku. Dobra praksa je osigurati da uvjeti budu **potpuni i iscrpni**.

U sljedećem primjeru, dodat ćemo još **jednu ekskluzivnu skretnicu** u naš model procesa kako bismo modelirali uvjet je li tražena roba dostupna na skladištu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_03.png?raw=true" style="width:70%;">

> Slika 3. Prošireni model poslovnog procesa **PRODATI ROBU** s dvjema ekskluzivnim skretnicama

Dakle, na slici 3. dodana je **druga ekskluzivna skretnica** koja omogućuje modeliranje uvjeta je li tražena roba dostupna na skladištu. Ako je roba dostupna, proces se nastavlja s aktivnostima **Otpremiti** i **Pripremiti račun**. Ako roba nije dostupna, proces završava u **krajnjem događaju**.

Dodali smo i aktivnost **Provjeriti zalihe** koja prethodi drugoj skretnici. Ova aktivnost odnosi se na samu provjeru zaliha na skladištu. Aktivnost smo dodali budući da nije praksa da se aktivnosti prikazuju kroz skretnice, već da skretnice definiraju uvjete izvedbe aktivnosti.
Dakle slijed je sljedeći: aktivnost -> skretnica -> aktivnost -> skretnica.

1. **Aktivnost**: provjeriti uplatu po predračunu
2. **Skretnica**: je li uplata po predračunu primljena?
3. **Aktivnost**: provjeriti zalihe na skladištu
4. **Skretnica**: je li roba dostupna na skladištu?

Općenito govoreći, svaka skretnica omogućuje stvaranje složenog grafa kojim se, od početne do krajnje točke, može proći putovima, odnosno proces se može ostvariti izvođenjem aktivnosti različitim sljedovima. Svaki od tih sljedova prikazuje pojedinačni i specifični način izvođenja poslovnog slučaja koji pripada istom, generičkom modelu poslovnog procesa.

Svaki od izvedenih sljedova prikazuje jednu **instancu** generičkog procesa, odnosno svaka je instanca jedan od mogućih načina izvođenja procesa s različitim ishodima ili **poslovni slučaj**.

Već na jednostavnom grafu na slici 3 mogu se prepoznati tri različite mogućnosti (ili tri različita slijeda aktivnosti i događaja) izvođenja poslovnog procesa **PRODATI ROBU**. To su:

| _Prispjela narudžba_ | 'Zaprimiti narudžbu' | 'Provjeriti uplatu' | **Narudžba nije ispunjena** |
| _Prispjela narudžba_ | 'Zaprimiti narudžbu' | 'Provjeriti uplatu' | Provjeriti zalihe | **Narudžba nije ispunjena** |
| _Prispjela narudžba_ | 'Zaprimiti narudžbu' | 'Provjeriti uplatu' | Provjeriti zalihe | Otpremiti | Pripremiti račun | **Ispunjena narudžba** |

## 3.3 Tumačenje skretnica

Značenje skretnice u danom primjeru treba tumačiti na sljedeći način:

> Značenje **prve skretnice** treba tumačiti ovako: nakon što je obavljena aktivnost Provjeriti uplatu znat će se je li kupac uplatio naručenu robu.
> Ako potrebni iznos nije uplaćen (ovaj uvjet zapisan je ispod simbola skretnice tekstom 'Uplaćeno?'), roba neće biti otpremljena kupcu i proces će završiti u krajnjoj točki (događaju) s oznakom 'Narudžba nije ispunjena'.
> Ako je potreban iznos uplaćen i roba uspješno otpremljena kupcu, onda se proces nastavlja provjerom može li se otpremiti naručenu robu s obzirom na trenutačno stanje zaliha. Taj se uvjet ispituje u **drugoj skretnici** s oznakom 'Na zalihi?' koja imenom podsjeća na uvjet koji se ispituje.
> Ako su oba uvjeta ispunjena, poslovni će proces završiti onako kako se očekuje, odnosno poslovni će slučaj završiti događajem koji je nazvan 'Ispunjena narudžba'.

**Važna napomena**:

Skretnica pri modeliranju procesa i selekcija kao programski konstrukt (odnosno "grananje" programa) nipošto se ne mogu izjednačiti. Skretnica u modeliranju procesa ima mnogo šire značenje od odluke ili grananja u programiranju, odnosno odluka je samo jedna posebna vrsta skretnice. To će biti detaljno objašnjeno u nastavku kolegija.

## Vježba 1: Izdavanje kredita

Na temelju sljedećeg opisa poslovnog procesa i do sada obrađene BPMN notacije, definirajte model poslovnog procesa koji je opisan u sljedećem tekstu. Za vježbu možete koristiti alat za modeliranje po vlastitom izboru.

> Banka je ustanova koja pruža razne financijske usluge svojim klijentima, uključujući i izdavanje kredita. Banka je definirala poslovni proces **IZDATI KREDIT** koji se provodi svaki put kada klijent zatraži kredit. Jednom kada klijent zatraži kredit, banka prvo provjerava je li predani zahtjev kompletan, ako nije, klijenta se ponovo šalje na popunjavanje zahtjeva. Inače banka provjerava kreditnu sposobnost klijenta te prekida proces ako utvrdi da klijent nije kreditno sposoban. Ako je klijent kreditno sposoban, banka potpisuje ugovor s klijentom što u konačnici rezultira isplatom kredita na račun klijenta.

## Vježba 2: Proces obrade natječaja

Na temelju sljedećeg opisa poslovnog procesa i do sada obrađene BPMN notacije, definirajte model poslovnog procesa koji je opisan u sljedećem tekstu. Za vježbu možete koristiti alat za modeliranje po vlastitom izboru.

> Tvrtka koja se bavi proizvodnjom i prodajom proizvoda na tržištu odlučila je proširiti svoj tim te je definirala poslovni proces **ODABIR KANDIDATA**. Tvrtka je već provela javni natječaj na koji su se mogli javiti zainteresirani kandidati. Proces započinje jednom kad javni natječaj završava, odnosno kada istekne rok za predaju potrebne dokumentacije. Voditelj odsjeka za upravljanje ljudskim resursima (HR) prikuplja natječaje i provjerava je li barem jedan kandidat dostavio svu potrebnu dokumentaciju. Ako nije, natječaj se poništava. Međutim ako postoji barem jedan kandidat koji je dostavio svu potrebnu dokumentaciju, voditelj HR-a provjerava kvalifikacije kandidata te poništava natječaj ako niti jedan kandidat nema potrebne kvalifikacije. U suprotnom, voditelj HR-a poziva kandidate na razgovor (čak i ako je samo jedan kandidat zadovoljio uvjete natječaja) te na temelju razgovora donosi odluku o zapošljavanju.

# 4. Hijerarhija procesa i potprocesa

Vratimo se na proces **PRODATI ROBU**. Ako se proces detaljnije razmotri s poslovnog gledišta, vidjet će se da je njegov model na slici 3 još uvijek suviše općenit jer ne sadržava sve informacije o mjestu i načinu izvođenja procesa i njegovih aktivnosti te ne govori ništa o tehnologiji kojom se te aktivnosti izvode.

Ako se vratimo na opis poslovnog procesa **PRODATI ROBU**, vidjet ćemo da u njemu postoji nekoliko **aktera** koji sudjeluju u procesu:

- **Kupac** koji naručuje robu
- **Prodavač** koji zaprima narudžbu
- **Knjigovođa** koji vodi evidenciju o uplatama i izdanim računima
- **Skladištar** koji priprema robu za otpremu

Kako u definiciji, odnosno opisu poslovnog procesa, ovaj proces započinje prispjelom narudžbom, kupca nećemo uvrstiti u granice procesa već ćemo ga smatrati **vanjskim akterom**.

Dakle, okvirno možemo podijeliti aktere u 3, odnosno **organizacijske jedinice** koje sudjeluju u procesu:

1. **Prodaja**
2. **Knjigovodstvo**
3. **Skladište**

## 4.1 Staze i polja

U BPMN notaciji, proces se može podijeliti na **staze (_eng. lanes_)** i **polja (_eng. pools_)**. U grubo, staze se koriste za prikazivanje različitih organizacijskih jedinica koje sudjeluju u procesu, dok se polja koriste za prikazivanje različitih poslovnih procesa.

> Pojmovi **staza** i **polje** nisu doslovni prijevodi engleskih riječi lane (swim lane) i pool, već izabrane hrvatske riječi koje bolje objašnjavaju značenja u kontekstu modeliranja poslovnih procesa.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/pools_and_lanes.png?raw=true" style="width:70%;">

U nekim sljedećim poglavljima ćemo detaljno vidjeti koje su dobre prakse modeliranja kroz staze i polja, za sada ćemo **podijeliti naše organizacijske jedinice u staze**, dok će naziv polja biti naziv procesa - **PRODATI ROBU**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/prodati_robu_lanes.png?raw=true" style="width:70%;">

Bez da previše razbijamo glavu kako koristiti staze i polja, možemo se držati sljedećeg pravila:

- **BPMN polja** (pools) opisuju cijele organizacije ili poslovne procese, i sadrže staze
- **BPMN staze** (lanes) opisuju odjeljke organizacije, odnosno tko je odgovoran za koje aktivnosti

Sada ćemo pokazati kako bi izgledao model poslovnog procesa **PRODATI ROBU** s dodanim stazama i poljem.

No prije toga idemo definirati tko obavlja koje aktivnosti u procesu:

- **Prodaja**:

  - Prodavač zaprima narudžbu i obrađuje je

- **Knjigovodstvo**:

  - Knjigovođa provjerava uplatu po predračunu i izdaje račun

- **Skladište**:
  - Skladištar priprema robu za otpremu

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_w_lanes.png?raw=true" style="width:70%;">

> Slika 4. Prošireni model poslovnog procesa **PRODATI ROBU** s dodanim stazama i poljem

**Radno mjesto i staza**

Sve se aktivnosti ne izvode na istome mjestu: narudžbu od kupca prima **PRODAJA**, robu otprema **SKLADIŠTE**, a **KNJIGOVODSTVO** će provjeriti uplatu i pripremiti račun za kupca.
Radna se mjesta koja sudjeluju u procesu prikazuju izduljenim pravokutnikom koji uz lijevu stranicu ima naziv radnog mjesta (**staza**), a ucrtavanje simbola za aktivnost unutar simbola za radno mjesto znači, prema konvenciji za BPMN, da se **aktivnost izvodi na onom radnom mjestu na čijoj je površini nacrtana**.

Posao koji je na slici opisan aktivnošću **Otpremiti** nije jednostavan, već se sastoji od više radnih koraka. Takav se posao definira kao **potproces** (_eng. subprocess_). Svaki potproces ima svoju detaljniju strukturu koju se prikazuje na posebnome modelu. Primjerice, u takav potproces bi se trebala uvrstiti i aktivnost **Provjeriti zalihe** budući da je to radni korak koji se izvodi u skladištu prilikom pripreme robe za otpremu. Dodatno, skretnica **Na zalihi?** također bi trebala postati dio tog potprocesa. O tome ćemo detaljnije govoriti u sljedećim poglavljima.

# Zadaci za Vježbu 1

Temeljem sljedećih opisa poslovnih procesa i do sada obrađene BPMN notacije, **izmodelirajte poslovne procese u alatu po vlastitom izboru**.
Svaki od poslovnih procesa treba sadržavati **nekoliko aktivnosti**, **ekskluzivne skretnice**, **polje** i **više staza**.

Modele exportajte u **png** formatu ili napravite screenshot, zippajte zajedno datoteke (3) i učitajte rješenja na **Merlin**.

Slobodno dodajte napomenu ako želite dobiti povratnu informaciju za vaša rješenja. Komunikacija se odvija putem **Google Chata**.

### 1. Proces obrade reklamacije

Proces započinje kada kupac podnese reklamaciju za proizvod kupljen u trgovini informatičke opreme. Prodavač zaprimlja reklamaciju i provjerava je li priložen račun. Ukoliko račun nije priložen, reklamacija se odbija. Ako je račun priložen, servisni tim procjenjuje opravdanost reklamacije unutar 30 dana od kupnje. U slučaju da reklamacija nije opravdana, ona se odbija.

Ako je reklamacija utemeljena, prodavač prosljeđuje proizvod servisnom timu koji potom procjenjuje je li proizvod moguće popraviti. Ako popravak nije moguć, kupcu se izdaje novi proizvod i proces je završen. Ukoliko je popravak izvediv, servisni tim popravlja proizvod i vraća ga kupcu.

### 2. Proces najma vozila

Proces najma vozila započinje kada klijent putem web stranice rent-a-car agencije zatraži uslugu. Ispunjavajući online formu za najam, klijent unosi potrebne podatke i šalje zahtjev na obradu.

Nakon toga, administrator pregledava pristigli zahtjev i provjerava točnost unesenih podataka. Ako podaci nisu ispravni, zahtjev se odbija, čime proces završava. No, ukoliko su svi podaci ispravni, administrator prosljeđuje zahtjev timu zaduženom za upravljanje voznim parkom ("Fleet Management"). Oni provjeravaju dostupnost traženog vozila za navedeni datum.

Ako željeno vozilo nije dostupno, zahtjev se odbija, no u slučaju da vozilo jest na raspolaganju, tim šalje potvrdu administratoru. Administrator potom finalizira rezervaciju i šalje klijentu predračun. Po primitku uplate predračuna, rezervacija postaje službena te klijent prima potvrdu o najmu, čime se proces uspješno završava.

### 3. Proces automatizirane korisničke podrške

Kompanija koja pruža SaaS usluge odlučila je unaprijediti korisničku podršku automatizacijom pomoću AI chatbota. Proces započinje kada klijent podnese novi zahtjev za podršku.

AI chatbot prima zahtjev, a zatim analizira bazu znanja koristeći napredne AI algoritme kako bi pronašao relevantan odgovor. Ukoliko chatbot pronađe prikladan odgovor, šalje ga klijentu, koji potom procjenjuje je li odgovor bio koristan i riješio njegov problem. Ako nije, chatbot nudi klijentu opciju da razgovara s pravim agentom.

Ako klijent odbije tu opciju, proces se završava. U slučaju da prihvati, razgovor s agentom započinje, a agent pruža dodatnu pomoć u rješavanju problema. Proces završava na jedan od dva načina: problem je uspješno riješen ili klijent i dalje nije zadovoljan ponuđenim rješenjem.
