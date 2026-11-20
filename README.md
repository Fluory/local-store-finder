# LocalStoreFinder

Eine Web-App für das Handy: zeigt Supermärkte und Baumärkte in deiner Nähe auf einer Karte, sagt dir,
welche gerade geöffnet haben, und liest Produkte per Barcode-Scan aus.

**Live:** [local-store-finder.vercel.app](https://local-store-finder.vercel.app) (fragt nach deinem Standort)

> **Status:** Prototyp vom April 2026. Läden, Öffnungszeiten und Produktdaten sind echte offene Daten.
> Das **Sortiment und die Preise je Laden sind erfunden** (`src/utils/mockInventory.js`), weil es dafür keine
> offene Quelle gibt. Die App zeigt also, wie so ein Produkt funktionieren würde. Echte Bestände kennt sie nicht.

## Was die App kann

- **Läden in der Nähe:** Supermärkte (REWE, Edeka, Aldi, Lidl, Kaufland, Penny, Netto) und Baumärkte
  (OBI, Bauhaus, Hornbach, toom, Hellweg) im Umkreis von 100 km, nach Entfernung sortiert
- **„Jetzt geöffnet“:** wertet die Öffnungszeiten aus OpenStreetMap aus, auch deutsche Feiertage, wenn sie dort eingetragen sind
- **Barcode scannen:** Kamera auf ein Produkt halten, die App holt Name, Marke und Bild aus Open Food Facts
  und schlägt vergleichbare Produkte vor
- **Filter:** nur Supermärkte, nur Baumärkte, nur geöffnete Läden

## Woher die Daten kommen

| Daten | Quelle | Echt? |
|---|---|---|
| Läden und Standorte | [OpenStreetMap](https://www.openstreetmap.org/copyright) über die Overpass API (mit Ausweich-Server) | ja |
| Öffnungszeiten | OpenStreetMap, ausgewertet mit [`opening_hours`](https://github.com/opening-hours/opening_hours.js) | ja |
| Produkte zum Barcode | [Open Food Facts](https://world.openfoodfacts.org/) API v2 | ja |
| Sortiment und Preise je Laden | `src/utils/mockInventory.js` | **nein, Beispieldaten** |

Die App braucht keinen eigenen Server und keine API-Keys. Alles läuft im Browser.

## Technik

React 19 und Vite 6, Karte mit Leaflet und react-leaflet, Barcode-Scan mit html5-qrcode,
Entfernungen per Haversine-Formel. Gehostet als statische Seite auf Vercel.

```text
src/
  hooks/        Standort, Läden laden, Öffnungsstatus
  utils/        Overpass-Abfrage, Open Food Facts, Öffnungszeiten, Entfernung, Beispiel-Sortiment
  components/   Karte, Ladenliste, Filter, Suche, Scanner, Produktansicht
```

## Lokal starten

Voraussetzung: Node 20 oder neuer.

```bash
npm ci
npm run dev      # http://localhost:5173
npm run build    # statischer Build nach dist/
```

Standort und Kamera funktionieren im Browser nur über `localhost` oder HTTPS.
`npm run preview` liefert den Build mit denselben Sicherheits-Headern aus wie Vercel (`vercel.json`),
so lässt sich die Content-Security-Policy lokal prüfen. Impressum und Datenschutz liegen unter
`/impressum` und `/datenschutz`.

## Was als Nächstes käme

Ein echtes Produkt bräuchte Bestandsdaten von Händlern oder aus Prospekten. Ohne sie bleibt die App ein
Ladenfinder mit Öffnungszeiten und Barcode-Scanner.

---

Gebaut von [Florian Hein](https://final-portfolio-website-ten.vercel.app/de/) in Heilbronn. Ich baue
Software-Prototypen für Unternehmen: [weitere Projekte](https://github.com/Fluory).
