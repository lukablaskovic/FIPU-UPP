# PDF i Google Drive — UPP

Iz korijena repozitorija:

```bash
make setup                  # Jednom: lokalne ovisnosti i hook za datum
make pdf SCRIPT=UPP1        # Samo lokalni PDF
make upload SCRIPT=UPP1     # Markdown i postojeći PDF na Drive
make sync SCRIPT=UPP1       # PDF pa prijenos, samo ako izvoz uspije
```

Odabir: `UPP1`–`UPP7`. Potrebni su Node.js 22+, Python 3 i Pandoc (`brew install pandoc` na macOS-u). `make` prikazuje pomoć. Ručne naredbe ne rade commit/push.

Odredište: [Upravljanje poslovnim procesima](https://drive.google.com/drive/folders/1knc42Kvhoae2Ut7OAzx4283uRp0ct1AL). Odabiru se samo 7 glavnih Markdown/PDF parova. Primjeri aplikacija, ispiti i dodatni zadaci ne prenose se.

GitHub Actions nakon pusha na `main` generira PDF-ove, prenosi ih uz Markdown na Drive i tek nakon uspješnog prijenosa commita PDF-ove. Zahtijeva secret `GOOGLE_DRIVE_TOKEN_JSON`. Botov commit ne pokreće novi krug; prije rada povucite ga s `git pull --ff-only`.

Generiranje koristi Pandoc, Chromium i GitHub stil. Nedostajuće slike prekidaju izvoz. Ručno pokretanje: Actions → Sync course materials to Google Drive → Run workflow. Pogreška u izvozu ili prijenosu sprječava commit. Drive i GitHub nisu jedna transakcija; nakon djelomičnog prijenosa ili odbijenog pusha ponovno pokrenite posao.

Lokalna prijava koristi Git-ignorirane `script-patcher/credentials.json` i `script-patcher/token.json`. Ako prijava nedostaje, uploader ispisuje Google OAuth poveznicu. Pri opozivu pristupa obnovite prijavu i GitHub secret. OAuth ovlast obuhvaća Drive; odabir datoteka ograničen je programom.

Provjere: `python3 script-patcher/test_sync.py`, `python3 .githooks/test_dates.py`, `npm test --prefix script-patcher`. Prikaz odabira: `python3 script-patcher/index.py --list-local`. Plan prijenosa bez pisanja: `script-patcher/.venv/bin/python script-patcher/index.py --script UPP1 --dry-run`.
