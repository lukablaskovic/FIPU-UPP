# Upravljanje poslovnim procesima

## Monri Payments & FIPU Ugostitelji — Monri Payments

**Zadatak za izvanredne studente · Rok predaje: 15.11.2026. do 23:59.**

Radite **najmanje u paru (dvije osobe)**: jedan student preuzima Monri Payments, drugi ugostitelja. Veća grupa dijeli se u dva tima prema ulogama.

**Najprije pročitajte [zajedničke upute za istraživanje, video i predaju (PDF)](upute.pdf).** Cilj je samostalno istraživanje stvarnog poslovnog procesa (*process discovery*) i njegovo pojednostavnjeno mapiranje u BPMN radi prezentacije.

Drugi dio zadatka: [Ugostitelj (PDF)](monri-02.pdf).

### Priča i tekst zadatka

Sigurno ste svi bar jednom za vrijeme studiranja u Puli odlučili otići na more - zar ne? Nakon što ste se ispržili na suncu, bacili u more, i tako u krug dvaput-triput, shvatili ste da sunce i more umara čovjeka, i da treba otići sjesti u obližnji beach bar, bio on na Hidrobazi, Valkanama, Stoji ili pak negdje na Lungomareu... Kada ste sjeli, naručili ste veliki macchiato (ili kako u Puli kažemo samo "može veliki"), ili pak neko pivce, koktel i sl. Vrlo vjerojatno ste nešto i pojeli jer glad je vrag. E sad, dolazi najteži trenutak poslovnog procesa ispijanja koktela i kave, a to je naplata. Obzirom da ste zaboravili otići na bankomat, zamolili ste plaćanje karticom (ili mobitelom, svejedno je). Tada odlazite do šanka i fino prislanjate karticu na one famozne, tzv. POS (*Point of Sale*) blagajne. U tom trenutku, nesvjesno bez da ste išta primijetili, vrlo vjerojatno ste koristili usluge hrvatske tvrtke Monri Payments d.o.o. 😎. Radi se o etabliranoj *fintech* tvrtki koja razvija sustave za kartična plaćanja i blagajnički softver. Sjedište je u Zagrebu, a vlasnici su Poljaci! Regionalno posluje na 10 tržišta, uključujući Hrvatsku, BiH, Srbiju, Sloveniju, Rumunjsku itd., te broji više od 200 zaposlenih i podržava više od 15.000 trgovaca. Osim velikih klijenata poput Kauflanda, dm-a, Interspara, Emmezete, Santa Domenice i Jyska, tu su dakako i ovi manji, lokalna pulska ekipa poput Pomidora u Gortanovoj, beach bara Valkane, vinskog bara "Ala Šu" na Stoji, Crazy i Blue Monkey na Hidrobazi itd. itd. Gotovo svi ovi ugostitelji koriste *Remaris* blagajne (famozni Monrijev brend), a neki čak i ugostiteljske blagajne *Smart*, pa i najnovije mobilne blagajne *Start*, koje (pazite ovo) imaju ugrađeni pisač koji prima kartice, tako da sada više ne morate niti ići do šanka, već konobar/ica dolazi do vas!!! 

Vaš zadatak je istražiti Monrijeve usluge koje se odnose na fiskalne blagajne koje se koriste primarno u ugostiteljstvu (trgovačke i samoposlužne blagajne vam nisu zanimljive za ovaj zadatak).

Monri također nudi usluge za poklon bonove te sustave za online plaćanja (primjerice za webshopove i aplikacije). To vam također nije zanimljivo. Istražite koje blagajne Monri koristi i nudi svojim klijentima, za svaku definirajte za koga je namijenjena (kako izgleda idealni klijent?), što se može koristiti na pojedinoj blagajni (npr. narudžbe i naplata, android blagajna, prijenosna blagajna...). Jasno proučite različite pojmove, što je to kasa, a što ručni terminal za konobare, jesu li njihove android aplikacije namijenjene za vlasnike ili goste? Podržavaju li svi terminali kartična plaćanja, ako da u kojim bankama? Naravno, i klijentima najvažnije - koliko ih to sve košta? Izvor podataka je web stranica https://monri.hr/, međutim možete slobodno koristiti i druge izvore, te alate umjetne inteligencije za brže pronalaženje i analizu. OPREZ: važno je da podaci koje pronađete iz alternativnih izvora budu točni - provjerite ih.

Glavni dio zadatka odnosi se na modeliranje poslovnog procesa "Uvođenje Monrijeva sustava za ugostitelje". Vaš klijent je budući ugostitelj (ili postojeći ugostitelj) i želi uvesti blagajnički sustav prilagođen svojem ugostiteljskom objektu. Proces počinje primitkom zahtjeva ugostitelja za uvođenje blagajničkog sustava. Obzirom da vaš klijent može biti mali ili veliki ugostitelj, u različitoj banci i sa varijabilnim prihodima, vaš cilj je modelirati poslovni proces dovoljno detaljno da mu možete pomoći u odabiru i uputiti ga kako izgleda poslovni proces uvođenja vaše blagajničke kase, bez obzira na njegove specifičnosti i zahtjeve. Potrebno je modelirati aktivnosti: analize potrebe ugostitelja, koje osnovne informacije morate prikupiti o klijentu; predložiti odgovarajući sustav, te izraditi i poslati ponudu. Zatim se potrebno usuglasiti s tim ugostiteljem oko uvjeta, načina i cijene usluge, vremenskih ograničenja.. (pripazite, ugostitelji su teški klijenti za poslovanje, ovdje ćete morati pokazati pregovaračke sposobnosti!). Kada se usuglasite, morate dogovoriti termin instalacije i postavljanja sustava - koji podaci vam tu trebaju? Što im sve morate konfigurirati na terenu? - istražite, razmislite, prisjetite se što je to sve na šanku kada idete platiti Aperol. Treba li provesti testiranje, ako da u kojem roku i vremenskom razdoblju? Nudite li postprodajne usluge: korisničku podršku, izlazak na teren, otklanjanje poteškoća na daljinu? Još nešto?

Vrlo je važno Jasno definirati kada proces počinje, a kada završava. Koji su to događaji? Koje međudogađaje možete identificirati u procesu? Koje aktivnosti biste dalje modelirali kao potprocese, i zašto? Fokusirajte se na uvođenje sustava (što uključuje analizu, prikupljanje podataka, usuglašavanje, pripremu, konfiguraciju i instalaciju), pripazite da ostanete usredotočeni i modelirate samo ono što je važno - ali opet uz dovoljno važnih detalja.

### Prezentacija i predaja

**Zajednički snimite video od 15–20 minuta uz isključivo BPMN modele, bez PowerPointa ili sličnih slajdova.** Svaka strana postavlja **najmanje 5 pitanja** drugoj strani i odgovara na njezina pitanja. Ugostitelj prvo predstavlja potrebe i budžet, Monri razjašnjava potrebe i predstavlja ponudu, a ugostitelj zatim postavlja dodatna pitanja i pregovara.

**Na Merlin predajte oba BPMN modela (PDF i izvorne datoteke), dokument istraživanja s opisom objekta, budžetom i ponudom (bez PDV-a i s PDV-om), pitanja i odgovore, izvore i AI razgovore ako ste koristili AI te poveznicu na video na Google Driveu ili YouTubeu.** Detaljni zahtjevi nalaze se u [zajedničkim uputama](upute.pdf).

**Rok predaje: 15.11.2026. do 23:59.**

Bodovi: _______/4
