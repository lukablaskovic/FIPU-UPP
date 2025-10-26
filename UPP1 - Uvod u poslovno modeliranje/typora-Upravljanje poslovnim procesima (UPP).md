# Upravljanje poslovnim procesima (UPP)

**Nositelj**: izv. prof. dr. sc. Darko Etinger  
**Asistent**: Luka Blašković, mag. inf.

**Ustanova**: Sveučilište Jurja Dobrile u Puli, Fakultet informatike u Puli

<img src="https://raw.githubusercontent.com/lukablaskovic/FIPU-PJS/main/0.%20Template/FIPU_UNIPU.png" style="width:40%; box-shadow: none !important; float:left;"></img>

# (1) Uvod u poslovno modeliranje

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/UPP_1.png?raw=true" style="width:9%; border-radius: 8px; float:right;"></img>

<div style="float: clear; margin-right:5px;">Sva razmatranja o poslovnim procesima polaze od potrebe da se poslovi, bilo da je riječ o proizvodnji, trgovini, uslugama, javnoj upravi, zdravstvu ili obrazovanju, obavljaju na optimalan način: što brže, kvalitetnije i uz minimalan utrošak resursa. Modeliranje poslovnih procesa jedan je od ključnih alata za postizanje tog cilja. Ono je prije svega poslovna, a ne informatička disciplina. Na ovom kolegiju praktično ćemo se upoznati s modeliranjem poslovnih procesa pomoću BPMN 2.0 notacije te istražiti kako se stečena znanja primjenjuju u razvoju softverskih rješenja.</div>

<div style="float: clear; margin-right:5px;"> </div>
<br>

**🆙 Posljednje ažurirano: 19.10.2025.**

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
  - [4. Proces izrade personalizirane web stranice](#4-proces-izrade-personalizirane-web-stranice)
  - [5. Proces doniranja hrane](#5-proces-doniranja-hrane)

# 1. Uvod

Uspješno upravljanje organizacijom, a osobito povećanje njezine učinkovitosti u postizanju postavljenih ciljeva, moguće je jedino uz temeljito poznavanje njezina unutarnjeg ustroja i načina djelovanja. Organizaciju čini niz međusobno povezanih poslovnih procesa koji ovise jedan o drugome, a svaki od njih usmjeren je ostvarivanju određenog cilja.

Pojednostavljeno, **poslovni proces** predstavlja skup povezanih radnih koraka za koje se mogu jasno odrediti trajanje i potrebni resursi.

Učinkovitost organizacije može se poboljšati unapređenjem ili preustrojem poslovnih procesa. No, to je moguće samo ako svi dionici razumiju te procese, što zahtijeva njihovo jednoznačno i razumljivo prikazivanje. Upravo je to svrha **poslovnog modeliranja**.

Primjerice, opis poput: "Kupac naručuje proizvod, prodavač zaprima narudžbu, skladištar priprema proizvod za isporuku, vozač dostavlja proizvod kupcu, a blagajnik izdaje račun."" može poslužiti kao objašnjenje poslovnog procesa, ali je često nedovoljno precizan i podložan različitim tumačenjima.

Zbog toga se danas poslovni procesi prikazuju egzaktno - pomoću skupa grafičkih simbola s jasno definiranom semantikom i pravilima povezivanja, što je propisano međunarodnim standardom, kao što je BPMN (Business Process Modelling and Notation).

# 2. BPMN standard

Da bi se neki proces mogao analizirati i unaprijediti, potrebna je ne samo općeprihvaćena definicija, već je jednako tako potrebno jednoznačno opisati sva njegova relevantna svojstva. Prikladan je način opisivanje procesa kroz njegov grafički prikaz, osobito ako je dopunjen formalnim opisom pojedinih značajki. Poslovni ljudi, menadžeri i projektanti informacijskih sustava već odavna primjenjuju različite načine grafičkog prikazivanja poslovnih procesa.

Danas najšire primjenjivana norma naziva se <a href="https://www.bpmn.org/" target="_blank">**BPMN (Business Process Modelling and Notation)**</a>. BPMN je standard za modeliranje poslovnih procesa koji pruža grafičku notaciju za modeliranje poslovnih procesa, ali i tehničku notaciju za izvođenje tih modela u informacijskim sustavima. BPMN je razvijen od strane **Object Management Group** **(OMG)** grupe i prvi put je objavljen 2004. godine. Trenutno je najnovija verzija BPMN 2.0.2, objavljena 2014. godine. OMG grupa je tijekom godina definirala mnoge standarde u području objektno-orijentiranog modeliranja i razvoja softvera, osim BPMN-a, neki od poznatijih su:

- **UML** (Unified Modelling Language) - vjerojatno najpoznatiji OMG-ov standard. To je grafički jezik za vizualizaciju, specifikaciju i dokumentiranje softverskih sustava, od strukture, ponašanja i interakcije između različitih elemenata.
- **MDA** (Model Driven Architecture) - standard za razvoj softvera koji naglašava važnost modela u cijelom životnom ciklusu razvoja softvera.
- **CORBA** (Common Object Request Broker Architecture) - nešto stariji standard koji je definirao arhitekturu za distribuiranu objektno-orijentiranu komunikaciju. Standard je imao značajan doprinos u razvoju distribuiranih sustava.
- **SysML** (Systems Modelling Language) - standard za modeliranje složenih sustava, koji je proizašao iz UML-a, ali je prilagođen za potrebe modeliranja složenih inženjerskih sustava, uključujući i hardverske komponente.

Treba naglasiti da je BPMN standard ratificiran kao <a href="https://www.iso.org/standard/62652.html" target="_blank"> ISO/IEC 19510:2013</a> norma, što dodatno potvrđuje njegovu važnost i prihvaćenost u industriji. ISO norme predstavljaju međunarodno priznate standarde koji osiguravaju kvalitetnu, sigurnu i učinkovitu poslovnu praksu u širokom području djelatnosti.

<img src="https://www.bpmn.org/cc2ec853e298b7606554.png" style="width:10%; float">

Mi ćemo se na ovom kolegiju **baviti isključivo BPMN 2.0 notacijom**, a u nastavku ćemo se upoznati s osnovnim elementima modeliranja procesa kroz jednostavni primjer procesa obrade narudžbi kupaca i izdavanje naručene robe.

## 2.1 Softver

Za modeliranje poslovnih procesa u BPMN notaciji možete koristiti veliki broj alata, a neki od popularnijih su:

- Camunda Modeler: besplatno, open-source rješenje koje podržava BPMN 2.0 i DMN notaciju. Preuzmite Desktop verziju [ovdje](https://camunda.com/download/modeler/)
- bpmn.io: open-source rješenje koje se može direktno koristiti u web pregledniku. Isprobajte [ovdje](https://demo.bpmn.io/)
- Flowable: open-source community rješenje koje nudi podršku za modeliranje u web pregledniku. Morate se registrirati da biste koristili alat, a možete ga isprobati [ovdje](https://www.flowable.com/)

Preporučuje se instalacija alata **Camunda Modeler**, koji ćemo aktivno koristiti za razvoj procesno-orijentiranih aplikacija. Za njegov rad potrebno je imati instaliran Java JDK 8 ili noviju verziju.

```bash
java -version
```

Ako nemate instaliran Java JDK, možete preuzeti i open-source verziju [Open JDK](https://openjdk.org/).

<div style="page-break-after: always; break-after: page;"></div>

# 3. Osnove modeliranja procesa

Definiran je sljedeći opis poslovnog procesa:

> Zamislimo prodajni centar kao dio neke proizvodne organizacije s pomoću kojeg ona prodaje svoju robu široke potrošnje, primjerice hladnjake, perilice rublja i sl. Takav se proces izvodi u svakom od područnih veleprodajnih centara, kojim proizvodna organizacija robe šrioke potrošnje opskrbljuje svoje velike kupce (npr. distributere, hotele ili restorane). Zamislimo da je poslovnim poslovnom politikom prodajnog centra propisano da se naručena roba može izdati kupcu samo ako je već plaćena po predračunu.
> Poslovni proces **PRODATI ROBU** tada se provodi tako da prodajni centar zaprimi narudžbu od kupca, provjeri je li naručena roba plaćena po predračunu, otpremi robu kupcu i pripremi konačni izlazni račun. Takav slijed poslova ili radnih koraka (pri kojem se upotrebljavaju i podaci o zalihama, kupcima, narudžbama itd.) nazivamo **poslovnim procesom**.

Uočavamo da ovaj poslovni proces ima svoj **početak** i **kraj**, da se ponavlja svaki put kada neki kupac želi naručiti i preuzeti bilo koju robu te da se sastoji od više povezanih poslova ili radnih koraka koje ćemo općenito nazvati **aktivnostima**.

## 3.1 Osnovni elementi

**Aktivnost (_eng. Task_)** je osnovni element poslovnog procesa koji predstavlja radni korak koji se izvodi u procesu. Aktivnosti se ne obavljaju proizvoljno, već uvijek u određenom slijedu. Tako opisan proces može se prikazati grafički na sljedeći način:

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_01.png?raw=true" style="width:100%;">

> Slika 1. Poslovni proces **PRODATI ROBU** i njegove aktivnosti

Cijeli je proces na _Slici 1_ prikazan kao niz **aktivnosti**, prikazanih pravokutnicima sa zaobljenim rubovima i povezanih **slijednom vezom**.

**Strelice** povezuju aktivnosti procesa i pokazuju slijed izvođenja aktivnosti.

Početak i kraj procesa su **događaji (_eng. events_)**, a oni su prikazani krugovima koji su iscrtani kružnicama:

- **početak** koji je iscrtan tankom i
- **kraj** koji je iscrtan debljom crtom.

Dakle, u modelu su primijenjena tri simbola koja su **obvezna prema BPMN normi za svaki poslovni proces**.

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/start_end_events.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Kružnica</b> (za definiranje događaja)</span>
</div>

<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/task.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Pravokutnik</b> (za definiranje aktivnosti/radnih koraka)</span>
</div>
<div style="display: flex; align-items: center;">
  <img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/arrow.png?raw=true" style="width: 10%;">
  <span style="margin-left: 10px;"><b>Strelica</b> (za definiranje slijeda tj. redoslijeda izvođenja aktivnosti)</span>
</div>

Ovakav temeljni oblik procesa naziva se često i **slijednim dijagramom**.

Ipak, _Slika 1_. prikazuje kako se proces izvodi u idealnom slučaju, odnosno kada je kupac uplatio po predračunu točno onaj iznos koji odgovara vrijednosti naručene robe, a tražena roba je dostupna na skladištu te se odmah poslije primitka narudžbe može otpremiti te izraditi račun za kupca.

## 3.2 Skretnice (eng. Gateway)

Što ako kupac nije prethodno platio po predračunu ili tražene robe nema na skladištu?

- U tom slučaju, posao prodaje robe neće se moći provesti na opisani način. Stoga, naš model procesa treba proširiti kako bi se prikazali uvjeti izvedbe prema dopunjenom scenariju.

U BPMN notaciji za prikaz uvjeta izvedbe koriste se **skretnice (_eng. Gateway_)**. Skretnice su elementi koji omogućuju modeliranje uvjeta izvedbe, odnosno odlučivanje o tome koja će se aktivnost izvršiti sljedeća. Skretnice se označavaju **rombom**.

Gdje ćemo dodati **prvu skretnicu** u naš model procesa?

Odgovor je nakon aktivnosti **Provjeriti uplatu**, jer je to prvi korak u kojem se može dogoditi odstupanje od idealnog slučaja. Naime, ako kupac nije uplatio po predračunu, proces se ne može nastaviti u slijedu definiranom na _Slici 1_.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_02.png?raw=true" style="width:100%;">

> Slika 2. Prošireni model poslovnog procesa **PRODATI ROBU** s prvom skretnicom

Na _Slici 2_. dodana je prva skretnica koja omogućuje modeliranje uvjeta izvedbe. U ovom slučaju, skretnica označava da se proces nastavlja **samo ako je uplata po predračunu primljena**. Ako nije, proces završava u **završnom događaju (_eng. end event_)**.

Ispod skretnice je uobičajeno pisati uvjet izvedbe, to može biti bilo koja upitna jezična konstrukcija koja jasno opisuje uvjet. Primjerice:

- _Uplaćeno?_
- _Uplata po predračunu primljena?_
- _Uplata primljena?_
- _Uplata je izvršena?_

Nakon toga, skretnica se povezuje s aktivnostima koje slijede, a koje će se izvršiti ovisno o ispunjenosti uvjeta:

- **Da** - ako je uvjet ispunjen
- **Ne** - ako uvjet nije ispunjen

Odgovore na ova pitanja označavamo **strelicama** koje izlaze iz skretnice. U ovom slučaju, događa se sljedeće:

- **Da** - ako je uplata po predračunu primljena, proces se nastavlja s aktivnostima **Otpremiti** i **Pripremiti račun**
- **Ne** - ako uplata po predračunu nije primljena, proces završava u **završnom događaju**.

> **Zapamti:** Primijetite da smo dodali **više završnih događaja i nazive događajima** kako bi bilo jasno što se događa u svakom koraku procesa. Model s više završnih događaja u skladu je s BPMN normom i teorijski je ispravan, no uvijek je potrebno provjeriti odražava li njegovo izvođenje u praksi stvarno predviđeni tijek procesa.

### 3.2.1 Ekskluzivna skretnica (eng. Exclusive Gateway)

Primijetite još da unutar romba koji opisuje svaku skretnicu, koristimo simbol **X**. Ovaj simbol označava **ekskluzivnu skretnicu (_eng. Exclusive Gateway_)**. Ekskluzivna skretnica je skretnica koja omogućuje odabir samo jedne od više mogućih putanja. Vrednuje se podatak koji dolazi iz prethodne aktivnosti i na temelju njega **odabire samo jedan mogući slijed** na temelju izračunate vrijednosti ili zadanih uvjeta.

Ova skretnica poznata je i kao **XOR Gateway**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/exclusive_gateway.png?raw=true" style="width:10%; margin:auto; display:block;">

- Ako je riječ o grananju procesa, onda znači da će se poslije skretnice provoditi aktivnosti **samo na jednom izlaznom slijedu**.
- Ako više uvjeta može biti istinito, ova skretnica odabire samo onaj slijed **koji je prvi zadovoljen**.
- Ako niti jedan uvjet nije zadovoljen, proces vraća grešku. Dobra praksa je osigurati da uvjeti budu **potpuni i iscrpni**.

U sljedećem primjeru, dodat ćemo još **jednu ekskluzivnu skretnicu** u naš model procesa kako bismo modelirali uvjet je li tražena roba dostupna na skladištu.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_03.png?raw=true" style="width:100%;">

> Slika 3. Prošireni model poslovnog procesa **PRODATI ROBU** s dvjema ekskluzivnim skretnicama

Dakle, na _Slici 3_. dodana je **druga ekskluzivna skretnica** koja omogućuje modeliranje uvjeta je li tražena roba dostupna na skladištu. Ako je roba dostupna, proces se nastavlja s aktivnostima **Otpremiti** i **Pripremiti račun**. Ako roba nije dostupna, proces završava u **završnom događaju**.

Dodali smo i aktivnost **Provjeriti zalihe** koja prethodi drugoj skretnici. Ova aktivnost odnosi se na samu provjeru zaliha na skladištu. Aktivnost smo dodali budući da nije praksa da se aktivnosti prikazuju kroz skretnice, već da skretnice definiraju uvjete izvedbe aktivnosti.

Slijed je sljedeći: aktivnost -> skretnica -> aktivnost -> skretnica.

1. **Aktivnost**: provjeriti uplatu po predračunu
2. **Skretnica**: je li uplata po predračunu primljena?
3. **Aktivnost**: provjeriti zalihe na skladištu
4. **Skretnica**: je li roba dostupna na skladištu?

Svaka skretnica omogućuje oblikovanje složenog grafa kojim se od početne do završne točke može doći različitim putovima. Drugim riječima, proces se može provesti izvođenjem aktivnosti u različitim redoslijedima. Svaki takav slijed predstavlja poseban način ostvarivanja poslovnog slučaja unutar istog, generičkog modela poslovnog procesa.

> **Zapamti:** Svaki od izvedenih sljedova prikazuje jednu **instancu** generičkog procesa, odnosno svaka je instanca jedan od mogućih načina izvođenja procesa s različitim ishodima ili **poslovni slučaj**.

Već na jednostavnom grafu na _Slici 3_ mogu se prepoznati tri različite mogućnosti (ili tri različita slijeda aktivnosti i događaja) izvođenja poslovnog procesa **PRODATI ROBU**. To su:

> **Instanca (Poslovni slučaj 1):** _Prispjela narudžba_ → 'Zaprimiti narudžbu' → 'Provjeriti uplatu' → **Narudžba nije ispunjena**

> **Instanca (Poslovni slučaj 2):** _Prispjela narudžba_ → 'Zaprimiti narudžbu' → 'Provjeriti uplatu' → 'Provjeriti zalihe' → **Narudžba nije ispunjena**

> **Instanca (Poslovni slučaj 3):** _Prispjela narudžba_ → 'Zaprimiti narudžbu' → 'Provjeriti uplatu' → Provjeriti zalihe → 'Otpremiti' → 'Pripremiti račun' → **Ispunjena narudžba**

## 3.3 Tumačenje skretnica

- Značenje **prve skretnice** treba tumačiti ovako: nakon što je obavljena aktivnost 'Provjeriti uplatu' znat će se je li kupac uplatio naručenu robu. Ako potrebni iznos nije uplaćen (ovaj uvjet zapisan je ispod simbola skretnice oznakom 'Uplaćeno?'), roba neće biti otpremljena kupcu i proces će završiti u završnom događaju s oznakom 'Narudžba nije ispunjena'.

- Ako je potreban iznos uplaćen i roba uspješno otpremljena kupcu, onda se proces nastavlja provjerom može li se otpremiti naručena roba s obzirom na trenutno stanje zaliha. Taj se uvjet ispituje u **drugoj skretnici** s oznakom 'Na zalihi?' koja imenom podsjeća na uvjet koji se ispituje.

- Ako su oba uvjeta ispunjena, poslovni će proces završiti onako kako se očekuje, odnosno poslovni će slučaj završiti događajem koji je nazvan 'Ispunjena narudžba'.

> **Zapamti:** Skretnica pri modeliranju procesa i selekcija kao programski konstrukt (odnosno "grananje" programa) **nipošto se ne mogu izjednačiti**. Skretnica u modeliranju procesa ima mnogo šire značenje od odluke ili grananja u programiranju, odnosno odluka je samo jedna posebna vrsta skretnice. To će biti detaljno objašnjeno u nastavku kolegija.
>
> Poslovne odluke često se donose na temelju više determinističkih, ali i stohastičkih rezultata, uključujući i one koji proizlaze iz emocija i subjektivnih procjena. U ovom ćemo se kontekstu fokusirati na determinističke odluke, koje proizlaze iz jasno definiranih uvjeta i pravila.
>
> Za modeliranje složenijih determinističkih odluka koristi se **DMN** (_Decision Model and Notation_), standardizirani pristup koji omogućuje formalno i transparentno prikazivanje logike odlučivanja unutar poslovnih procesa, a predstavlja podskup BPMN standarda.

## Vježba 1: Izdavanje kredita

Na temelju sljedećeg opisa poslovnog procesa i do sada obrađene BPMN notacije, definirajte model poslovnog procesa koji je opisan u sljedećem tekstu. Za vježbu možete koristiti alat za modeliranje po vlastitom izboru.

> Banka je ustanova koja pruža razne financijske usluge svojim klijentima, uključujući i izdavanje kredita. Banka je definirala poslovni proces IZDATI KREDIT koji se provodi svaki put kada klijent zatraži kredit. Jednom kada klijent zatraži kredit, banka prvo provjerava je li predani zahtjev kompletan, ako nije, klijenta se ponovo šalje na popunjavanje zahtjeva. Inače banka provjerava kreditnu sposobnost klijenta te prekida proces ako utvrdi da klijent nije kreditno sposoban. Ako je klijent kreditno sposoban, banka potpisuje ugovor s klijentom što u konačnici rezultira isplatom kredita na račun klijenta.

## Vježba 2: Proces obrade natječaja

Na temelju sljedećeg opisa poslovnog procesa i do sada obrađene BPMN notacije, definirajte model poslovnog procesa koji je opisan u sljedećem tekstu. Za vježbu možete koristiti alat za modeliranje po vlastitom izboru.

> Tvrtka koja se bavi proizvodnjom i prodajom proizvoda na tržištu odlučila je proširiti svoj tim te je definirala poslovni proces ODABIR KANDIDATA. Tvrtka je već provela javni natječaj na koji su se mogli javiti zainteresirani kandidati. Proces započinje jednom kad javni natječaj završava, odnosno kada istekne rok za predaju potrebne dokumentacije. Voditelj odsjeka za upravljanje ljudskim resursima (HR) prikuplja natječaje i provjerava je li barem jedan kandidat dostavio svu potrebnu dokumentaciju. Ako nije, natječaj se poništava. Međutim ako postoji barem jedan kandidat koji je dostavio svu potrebnu dokumentaciju, voditelj HR-a provjerava kvalifikacije kandidata te poništava natječaj ako niti jedan kandidat nema potrebne kvalifikacije. U suprotnom, voditelj HR-a poziva kandidate na razgovor (čak i ako je samo jedan kandidat zadovoljio uvjete natječaja) te na temelju razgovora donosi odluku o zapošljavanju.

<div style="page-break-after: always; break-after: page;"></div>

# 4. Hijerarhija procesa i potprocesa

Vratimo se na proces **PRODATI ROBU**. Ako se proces analizira s poslovnog gledišta, može se uočiti da je njegov model na _Slici 3_ i dalje previše općenit, jer ne uključuje podatke o mjestu i načinu izvođenja procesa i aktivnosti, niti pruža informacije o tehnologiji kojom se te aktivnosti provode.

Ako se vratimo na opis navedenog poslovnog procesa, vidjet ćemo da u njemu postoji nekoliko **aktera** koji sudjeluju u procesu:

- **Kupac** koji naručuje robu
- **Prodavač** koji zaprima narudžbu
- **Knjigovođa** koji vodi evidenciju o uplatama i izdanim računima
- **Skladištar** koji priprema robu za otpremu

Budući da poslovni proces, prema svojoj definiciji i opisu, započinje zaprimanjem narudžbe, kupca nećemo uključiti u granice procesa, već ćemo ga smatrati **vanjskim akterom**.

Dakle, proces se okvirno može podijeliti prema trima akterima, odnosno **organizacijskim jedinicama** koje sudjeluju u njegovom izvođenju:

1. **Prodaja**
2. **Knjigovodstvo**
3. **Skladište**

## 4.1 Staze i polja

U BPMN notaciji, proces se može podijeliti na **staze (_eng. lanes_ ili swim lanes)** i **polja (_eng. pools_)**. U grubo, staze se koriste za prikazivanje različitih organizacijskih jedinica koje sudjeluju u procesu, dok se polja koriste za prikazivanje različitih poslovnih procesa.

> Napomena: Pojmovi **staza** i **polje** nisu doslovni prijevodi engleskih riječi _lane_ (_swim lane_) i _pool_, već izabrane hrvatske riječi koje bolje objašnjavaju značenja u kontekstu modeliranja poslovnih procesa.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/pools_and_lanes.png?raw=true" style="width:70%;">

U sljedećim poglavljima ćemo detaljno vidjeti koje su dobre prakse modeliranja kroz staze i polja, a za sada ćemo **podijeliti naše organizacijske jedinice u staze**, dok će naziv polja biti naziv samog procesa - **PRODATI ROBU**.

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/elements/prodati_robu_lanes.png?raw=true" style="width:70%;">

Bez da previše razbijamo glavu kako koristiti staze i polja, možemo se držati sljedećeg pravila:

- **BPMN polja** (_eng. pools_) najčešće opisuju cijele organizacije ili poslovne procese; sadrže staze
- **BPMN staze** (_eng. swim lanes_) najčešće opisuju **odjeljke organizacije**, odnosno tko je odgovoran za/gdje se obavlja aktivnost u procesu

Sada ćemo pokazati kako bi izgledao model poslovnog procesa **PRODATI ROBU** s dodanim stazama i poljem.

No, idemo prvo definirati tko obavlja koje aktivnosti u procesu:

- **Prodaja**:
  - Prodavač zaprima narudžbu i obrađuje je
- **Knjigovodstvo**:

  - Knjigovođa provjerava uplatu po predračunu i izdaje račun

- **Skladište**:
  - Skladištar priprema robu za otpremu

<img src="https://github.com/lukablaskovic/FIPU-UPP/blob/main/UPP1%20-%20Uvod%20u%20poslovno%20modeliranje/screenshots/pp_prodati_robu_w_lanes.png?raw=true" style="width:100%;">

> Slika 4. Prošireni model poslovnog procesa **PRODATI ROBU** s dodanim stazama i poljem

**Radno mjesto i staza:**

Sve aktivnosti u procesu ne izvode se na istom radnom mjestu: narudžbu od kupca zaprima **PRODAJA**, robu otprema **SKLADIŠTE**, a **KNJIGOVODSTVO** će provjeriti uplatu i pripremiti račun za kupca.

Radna mjesta koja sudjeluju u procesu prikazuju se izduženim pravokutnikom koji prostiremo horizontalno - **desno**. Na početku pravokutnika (lijevo) upisujemo naziv radnog mjesta (organizacijske jedinice) koje sudjeluje u procesu.

Prema BPMN konvenciji, za sve aktivnosti koje se izvode unutar određene organizacijske jedinice, koristi se ista staza, a sljedovima među stazama prikazuje se **prijenos odgovornosti za izvođenje aktivnosti**.

**Potprocesi:**

Posao prikazan na _Slici 4_ aktivnošću 'Otpremiti' nije jednostavan, već se sastoji od niza uzastopnih radnih koraka. Takav se posao definira kao **potproces** (_eng. subprocess_), jer ima vlastiti tijek aktivnosti koji se prikazuje u posebnom modelu.

U taj bi se potproces trebala uključiti i aktivnost 'Provjeriti zalihe', budući da se radi o koraku koji se odvija u skladištu tijekom pripreme robe za otpremu. Aktivnost 'Provjeriti zalihe' stoga čini sastavni dio potprocesa 'Otpremiti'. Dodatno, skretnica 'Na zalihi?'' također bi trebala biti obuhvaćena istim potprocesom.

> Više o potprocesima i njihovom modeliranju naučit ćemo u nastavku vježbi.

<div style="page-break-after: always; break-after: page;"></div>

# Zadaci za Vježbu 1

Na temelju sljedećih opisa poslovnih procesa i do sada obrađene BPMN2.0 notacije, **izradite modele poslovnih procesa u alatu po vlastitom izboru**.
Svaki od poslovnih procesa treba sadržavati **nekoliko aktivnosti**, **ekskluzivne skretnice**, **polje** i **barem dvije staze**.

Modele _exportajte_ u **png** formatu ili napravite screenshot, _zippajte_ zajedno datoteke i učitajte rješenja na **Merlin**.

Slobodno dodajte napomenu ako želite dobiti povratnu informaciju za vaša rješenja.

### 1. Proces obrade reklamacije

Proces započinje kada kupac podnese reklamaciju za proizvod kupljen u trgovini informatičke opreme. Prodavač zaprima reklamaciju i provjerava je li priložen račun. Ako račun nije priložen, reklamacija se automatski odbija. Ako je račun priložen, servisni tim u roku od 30 dana od kupnje procjenjuje opravdanost reklamacije. Ukoliko reklamacija nije opravdana, prodavač o tome obavještava kupca i postupak se zatvara.

Ako je reklamacija opravdana, proizvod se prosljeđuje servisnom timu na daljnju obradu. Servis tada procjenjuje može li se proizvod popraviti; ako popravak nije moguć, kupcu se izdaje novi proizvod, čime se postupak završava; ako je popravak moguć, proizvod se popravlja i vraća kupcu u ispravnom stanju.

### 2. Proces najma vozila

Proces najma vozila započinje kada klijent putem web stranice _rent-a-car_ agencije podnese zahtjev za najam. Klijent ispunjava online obrazac, unosi potrebne podatke i šalje zahtjev na obradu. Administrator pregledava pristigli zahtjev i provjerava točnost unesenih podataka. Ako podaci nisu ispravni, zahtjev se odbija i proces se završava. Ako su podaci ispravni, administrator prosljeđuje zahtjev timu za upravljanje voznim parkom (Fleet Management). Tim provjerava dostupnost traženog vozila za navedeni termin. Ako vozilo nije dostupno, tim stvara ponudu o zamjenskom vozilu, koju klijent može prihvatiti ili odbiti. Ako je vozilo inicijalno dostupno, tim obavještava administratora koji potom finalizira rezervaciju i šalje klijentu predračun. Po zaprimljenoj uplati predračuna, rezervacija postaje službena, a klijent dobiva potvrdu o najmu. Time se proces najma vozila uspješno završava.

### 3. Proces automatizirane korisničke podrške

Kompanija koja pruža SaaS usluge odlučila je unaprijediti korisničku podršku automatizacijom putem AI chatbota. Proces započinje kada klijent podnese zahtjev za podršku. AI chatbot zaprima zahtjev i analizira bazu znanja pomoću naprednih algoritama kako bi pronašao relevantan odgovor. Ako pronađe odgovarajuće rješenje, chatbot ga šalje klijentu, koji zatim procjenjuje je li odgovor bio koristan i riješio njegov problem.

Ako klijent nije zadovoljan odgovorom, chatbot nudi mogućnost povezivanja s agentom podrške. U slučaju da klijent odbije tu opciju, proces se završava. Ako prihvati, razgovor s agentom započinje, a agent pruža dodatnu pomoć u rješavanju problema. Proces završava kada je problem uspješno riješen ili kada klijent ostane nezadovoljan ponuđenim rješenjem.

### 4. Proces izrade personalizirane web stranice

Proces započinje kada klijent pošalje zahtjev za izradu web stranice putem online obrasca. Dizajnerski tim prikuplja zahtjeve i izrađuje inicijalni prijedlog dizajna. Klijent pregledava prijedlog i daje povratne informacije. Ako su izmjene potrebne, tim izrađuje novu verziju. Ovaj ciklus se ponavlja dok klijent ne odobri dizajn ili nakon pet iteracija, nakon čega se proces završava bez odobrenja. U slučaju odobrenja dizajna, razvojni tim implementira funkcionalnosti web stranice prema specifikacijama. Klijent testira funkcionalnosti i daje povratne informacije. Ako su potrebne izmjene, tim ih implementira. Ovaj ciklus se ponavlja dok klijent ne odobri rezultate ili nakon pet iteracija, nakon čega klijent gubi pravo na daljnje izmjene - osim ako ne plati dodatne usluge. Po završetku testiranja, web stranica se stavlja u produkciju, čime proces završava.

### 5. Proces doniranja hrane

Proces započinje kada restoran označi višak hrane u internom IT sustavu za donacije. Lokalna humanitarna organizacija zaprima obavijest i provjerava raspoloživost volontera za preuzimanje hrane. Ako nema dostupnih volontera, organizacija može odgoditi preuzimanje i provesti javni poziv za nove volontere, ili može zatražiti pomoć od partnerskih organizacija. Ako je bilo koji oblik volonterske pomoći dostupan, organizacija koordinira s restoranom za preuzimanje hrane. Volonteri preuzimaju hranu i dostavljaju je u prihvatilište gdje hrana prvo prolazi blagu inspekciju kvalitete. Ako većina hrane ne zadovoljava osnovne standarde, hrana se sigurno zbrinjava i tu se završava proces. Ako hrana zadovoljava standarde, prihvatilište ju sortira i distribuira potrebnim korisnicima, čime proces uspješno završava.
