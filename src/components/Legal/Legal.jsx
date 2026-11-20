import { OPERATOR as O } from './legalData.js';
import './Legal.css';

const address = [O.name, O.street, O.city, O.country];

function Impressum() {
  return (
    <>
      <h1>Impressum</h1>
      <h2>Angaben gemäß § 5 DDG</h2>
      <p>{address.map((l) => <span key={l}>{l}<br /></span>)}</p>
      <h2>Kontakt</h2>
      <p>E-Mail: <a href={`mailto:${O.email}`}>{O.email}</a></p>
      <h2>Umsatzsteuer</h2>
      <p>Als Kleinunternehmer im Sinne des § 19 UStG wird keine Umsatzsteuer berechnet und in Rechnungen nicht ausgewiesen.</p>
      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>{O.name}, Anschrift wie oben.</p>
      <h2>Hinweis zu den Daten</h2>
      <p>
        Läden, Standorte und Öffnungszeiten stammen aus OpenStreetMap, Produktangaben zum Barcode aus Open Food Facts.
        Das Sortiment und die Preise je Laden sind erfundene Beispieldaten; die App kennt keine echten Bestände.
      </p>
      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält Links zu externen Websites Dritter, auf deren Inhalte ich keinen Einfluss habe. Für diese
        fremden Inhalte kann ich daher keine Gewähr übernehmen; verantwortlich ist stets der jeweilige Anbieter oder Betreiber.
      </p>
      <h2>Verbraucherstreitbeilegung</h2>
      <p>Ich bin nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
      <p className="legal__note">Stand: {O.updated}</p>
    </>
  );
}

function Datenschutz() {
  return (
    <>
      <h1>Datenschutz</h1>
      <p>
        Diese App hat kein Konto, keine Cookies, kein Tracking und keinen eigenen Server, der Ihre Eingaben speichert.
        Damit sie funktioniert, ruft Ihr Browser aber direkt Dienste Dritter auf. Hier steht, welche das sind und was
        dabei übertragen wird.
      </p>
      <h2>1. Verantwortlicher</h2>
      <p>{[...address, `E-Mail: ${O.email}`].map((l) => <span key={l}>{l}<br /></span>)}</p>
      <h2>2. Hosting</h2>
      <p>
        Die App wird als statische Seite bei Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA, gehostet. Beim
        Aufruf verarbeitet Vercel technisch notwendige Zugriffsdaten: IP-Adresse, Datum und Uhrzeit, aufgerufene Adresse,
        Referrer, Browser und Betriebssystem.
      </p>
      <h2>3. Standort</h2>
      <p>
        Beim Start fragt die App Ihren Browser nach Ihrem Standort. Erlauben Sie das nicht, zeigt sie keine Läden. Erlauben
        Sie es, schickt Ihr Browser die Koordinaten als Teil der Suchanfrage an die Overpass API von OpenStreetMap
        (<code>overpass-api.de</code>, bei einem Ausfall <code>overpass.kumi.systems</code>), um die Läden im Umkreis zu
        finden. Dabei erhält der jeweilige Server auch Ihre IP-Adresse. Die App selbst speichert den Standort nicht.
      </p>
      <h2>4. Karte</h2>
      <p>
        Die Kartenbilder lädt Ihr Browser vom Kachelserver der OpenStreetMap Foundation (<code>tile.openstreetmap.org</code>).
        Dabei werden Ihre IP-Adresse und der angezeigte Kartenausschnitt übertragen. Hinweise des Betreibers:{' '}
        <a href="https://osmfoundation.org/wiki/Privacy_Policy" target="_blank" rel="noopener noreferrer">osmfoundation.org/wiki/Privacy_Policy</a>.
      </p>
      <h2>5. Kamera und Barcode</h2>
      <p>
        Die Kamera wird nur eingeschaltet, wenn Sie „Scannen“ wählen und Ihr Browser den Zugriff erlaubt. Das Kamerabild
        wird ausschließlich in Ihrem Browser ausgewertet und nicht übertragen. Erkennt die App einen Barcode, schickt sie
        nur die Nummer an Open Food Facts (<code>world.openfoodfacts.org</code>), um Produktname, Marke und Bild abzurufen;
        die Produktbilder lädt Ihr Browser ebenfalls von Open Food Facts. Dabei wird Ihre IP-Adresse übertragen.
      </p>
      <h2>6. Ihre Rechte</h2>
      <p>
        Sie haben das Recht auf Auskunft (Art. 15), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung der
        Verarbeitung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21 DSGVO). Eine formlose Nachricht an
        die oben genannte E-Mail-Adresse genügt. Außerdem können Sie sich bei einer Datenschutz-Aufsichtsbehörde
        beschweren, etwa beim Landesbeauftragten für den Datenschutz und die Informationsfreiheit Baden-Württemberg.
      </p>
      <p className="legal__note">Stand: {O.updated}</p>
    </>
  );
}

export const LEGAL_PATHS = ['/impressum', '/datenschutz'];

export default function Legal({ path }) {
  return (
    <div className="legal">
      <nav className="legal__nav">
        <a href="/">← Zur App</a>
        <a href="/impressum">Impressum</a>
        <a href="/datenschutz">Datenschutz</a>
      </nav>
      <main className="legal__body">{path === '/impressum' ? <Impressum /> : <Datenschutz />}</main>
    </div>
  );
}
