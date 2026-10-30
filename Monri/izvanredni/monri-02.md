# Upravljanje poslovnim procesima

## Monri Payments & FIPU Ugostitelji — Ugostitelj

**Zadatak za izvanredne studente · Rok predaje: 15.11.2026. do 23:59.**

Radite **najmanje u paru (dvije osobe)**: jedan student preuzima Monri Payments, drugi ugostitelja. Veća grupa dijeli se u dva tima prema ulogama.

**Najprije pročitajte [zajedničke upute za istraživanje, video i predaju (PDF)](https://github.com/lukablaskovic/FIPU-UPP/blob/main/Monri/izvanredni/upute.pdf).** Cilj je samostalno istraživanje stvarnog poslovnog procesa (*process discovery*) i njegovo pojednostavnjeno mapiranje u BPMN radi prezentacije.

Drugi dio zadatka: [Monri Payments (PDF)](https://github.com/lukablaskovic/FIPU-UPP/blob/main/Monri/izvanredni/monri-01.pdf).

### Priča i tekst zadatka

Sigurno ste svi bar jednom za vrijeme studiranja u Puli odlučili otići na more - zar ne? Nakon što ste se ispržili na suncu, bacili u more, i tako u krug dvaput-triput, shvatili ste da sunce i more umara čovjeka, i da treba otići sjesti u obližnji beach bar, bio on na Hidrobazi, Valkanama, Stoji ili pak negdje na Lungomareu... Kada ste sjeli, naručili ste veliki macchiato (ili kako u Puli kažemo samo "može veliki"), ili pak neko pivce, koktel i sl. Vrlo vjerojatno ste nešto i pojeli jer glad je vrag. E sad, dolazi najteži trenutak poslovnog procesa ispijanja koktela i kave, a to je naplata. Obzirom da ste zaboravili otići na bankomat, zamolili ste plaćanje karticom (ili mobitelom, svejedno je). Tada odlazite do šanka i fino prislanjate karticu na one famozne, tzv. POS (*Point of Sale*) blagajne. U tom trenutku, nesvjesno bez da ste išta primijetili, vrlo vjerojatno ste koristili usluge hrvatske tvrtke Monri Payments d.o.o. 😎. Radi se o etabliranoj *fintech* tvrtki koja razvija sustave za kartična plaćanja i blagajnički softver. Sjedište je u Zagrebu, a vlasnici su Poljaci! Regionalno posluje na 10 tržišta, uključujući Hrvatsku, BiH, Srbiju, Sloveniju, Rumunjsku itd., te broji više od 200 zaposlenih i podržava više od 15.000 trgovaca. Osim velikih klijenata poput Kauflanda, dm-a, Interspara, Emmezete, Santa Domenice i Jyska, tu su dakako i ovi manji, lokalna pulska ekipa poput Pomidora u Gortanovoj, beach bara Valkane, vinskog bara "Ala Šu" na Stoji, Crazy i Blue Monkey na Hidrobazi itd. itd. Gotovo svi ovi ugostitelji koriste *Remaris* blagajne (famozni Monrijev brend), a neki čak i ugostiteljske blagajne *Smart*, pa i najnovije mobilne blagajne *Start*, koje (pazite ovo) imaju ugrađeni pisač koji prima kartice, tako da sada više ne morate niti ići do šanka, već konobar/ica dolazi do vas!!! 

Vaš zadatak je istražiti Monrijeve usluge koje se odnose na fiskalne blagajne koje se koriste primarno u ugostiteljstvu (trgovačke i samoposlužne blagajne vam nisu zanimljive za ovaj zadatak).

Monri također nudi usluge za poklon bonove te sustave za online plaćanja (primjerice za webshopove i aplikacije). To vam također nije zanimljivo. Istražite koje blagajne Monri koristi i nudi svojim klijentima, a klijent ćete biti upravo vi, odnosno vaša strana.

Vaš zadatak je postaviti se u ulogu klijenta koji započinje (ili je postojeći manji/veći ugostitelj) koji želi implementirati Monrijeve usluge prilagođene vašem objektu. Osmislite naziv objekta, koliko imate zaposlenih? Koji je oblik vašeg poslovanja (d.o.o., j.d.o.o., obrt)? Gdje se nalazite i gdje vam je sjedište? U kojoj banci imate poslovni račun gdje očekujete raditi transakcije (u kojem iznosu godišnje?). Radite li samo sezonu ili cijelu godinu? Kada se vjerodostojno postavite u ulogu klijenta, morate razmisliti o odabiru pojedine Monrijeve usluge te modelirati poslovni proces "Ugovaranje Monrijeva sustava iz perspektive ugostitelja". Student ili tim u ulozi Monrija dobio je zadatak detaljno istražiti poslovni proces uvođenja sustava iz perspektive Monrija; dakle morate se pripremiti na dijalog i raspravu s njima. Vi želite uvesti novi blagajnički sustav, i pritom iz perspektive ugostitelja morate modelirati taj dio procesa: osiguravanje sustava za naručivanje, izdavanje računa i naplatu koja odgovara vašim potrebama. Početni događaj samim time nastaje utvrđenom potrebom za novim blagajničkim sustavom (ili pak zamjenom postojećeg ako imate). Trebate utvrditi potrebe vašeg objekta - broj blagajni, zaposlenika i stolova te funkcionalnosti koje vam trebaju. Morate kontaktirati Monri putem nekog kanala i poslati upit, predstaviti potrebe objekta njihovom predstavniku i razmotriti predloženi sustav, opremu i ponudu (naravno zanima vas i cijena - jasno definirajte vaš budget i zatražite promjene ako njihov prijedlog ne odgovara vašem budgetu). Odaberite najbolje rješenje i prihvatite/odbite uslugu. Istražite što je potrebno dalje: potpis ugovora, dogovaranje instalacije? Ako je ugovoreno kartično plaćanje, podržava li njihov sustav rad s vašom bankom (jasno morate naglasiti u kojoj ste banci i koja su ograničenja), koje kreditne kartice primate, ako primate? Što očekujete od instalacijske faze (unos artikla, cijena, korisnička ovlaštenja, sudjelovanje u testiranju, izdavanju računa i sl.).

Morate se što vjerodostojnije staviti u perspektivu ugostitelja (koji se ne razumije puno u sam poslovni proces uvođenja), ali nastoji se informirati putem njihove web stranice https://monri.hr/. Kada završite s istraživanjem i izradom BPMN procesa, pripremite zajedničku videoprezentaciju sa studentom ili timom u ulozi Monrija. Koristite izrađeni BPMN model kao vizualnu pomoć tijekom prezentacije i pregovora. Svi članovi sudjeluju u razgovoru prema zajedničkim uputama.

Vrlo je važno jasno definirati kada proces počinje, a kada završava. Koji su to događaji? Koje međudogađaje možete identificirati u procesu? Koje aktivnosti biste dalje modelirali kao potprocese, i zašto? Fokusirajte se na uvođenje sustava iz perspektive ugostitelja (što uključuje utvrđivanje potreba, kontaktiranje Monrija, predstavljanje potreba djelatniku, odabir ponude, potpis ugovora itd.), pripazite da ostanete usredotočeni i modelirate samo ono što je važno - ali opet uz dovoljno važnih detalja.

### Prezentacija i predaja

**Zajednički snimite video od 15–20 minuta uz isključivo BPMN modele, bez PowerPointa ili sličnih slajdova.** Svaka strana postavlja **najmanje 5 pitanja** drugoj strani i odgovara na njezina pitanja. Ugostitelj prvo predstavlja potrebe i budžet, Monri razjašnjava potrebe i predstavlja ponudu, a ugostitelj zatim postavlja dodatna pitanja i pregovara.

**Na Merlin predajte oba BPMN modela (PDF i izvorne datoteke), dokument istraživanja s opisom objekta, budžetom i ponudom (bez PDV-a i s PDV-om), pitanja i odgovore, izvore i AI razgovore ako ste koristili AI te poveznicu na video na Google Driveu ili YouTubeu.** Detaljni zahtjevi nalaze se u [zajedničkim uputama](https://github.com/lukablaskovic/FIPU-UPP/blob/main/Monri/izvanredni/upute.pdf).

**Rok predaje: 15.11.2026. do 23:59.**

Bodovi: _______/4
