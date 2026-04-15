import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import './BarcodeScanner.css';

const CONTAINER_ID = 'html5-qrcode-container';

export default function BarcodeScanner({ onScan, onClose }) {
  const scannerRef = useRef(null);
  const startedRef = useRef(false);
  const [error, setError] = useState(null);
  const [hint, setHint] = useState('Kamera wird gestartet…');

  useEffect(() => {
    const scanner = new Html5Qrcode(CONTAINER_ID, { verbose: false });
    scannerRef.current = scanner;

    scanner
      .start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 260, height: 160 } },
        (decodedText) => {
          if (startedRef.current) {
            startedRef.current = false;
            scanner.stop().catch(() => {}).finally(() => onScan(decodedText));
          }
        },
        () => {} // per-frame parse error — not fatal
      )
      .then(() => {
        startedRef.current = true;
        setHint('Halte die Kamera auf den Barcode des Artikels');
      })
      .catch((err) => {
        const msg = String(err).toLowerCase();
        if (msg.includes('permission') || msg.includes('denied')) {
          setError('Kamerazugriff verweigert. Bitte erlaube den Kamerazugriff in den Browsereinstellungen.');
        } else {
          setError('Kamera konnte nicht gestartet werden.');
        }
      });

    return () => {
      if (startedRef.current) {
        startedRef.current = false;
        scanner.stop().catch(() => {});
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="scanner-overlay" role="dialog" aria-modal="true" aria-label="Barcode scannen">
      <div className="scanner-modal">
        <div className="scanner-modal__header">
          <h2>Artikel scannen</h2>
          <button className="scanner-modal__close" onClick={onClose} aria-label="Schließen">✕</button>
        </div>

        {error ? (
          <div className="scanner-modal__error">
            <p>{error}</p>
            <button className="scanner-modal__btn" onClick={onClose}>Schließen</button>
          </div>
        ) : (
          <>
            <div id={CONTAINER_ID} className="scanner-modal__viewfinder" />
            <p className="scanner-modal__hint">{hint}</p>
          </>
        )}
      </div>
    </div>
  );
}
