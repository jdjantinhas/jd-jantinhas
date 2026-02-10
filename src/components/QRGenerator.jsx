import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGenerator = () => {
  const refs = useRef({});

  const baseUrl = 'https://jdjantinhas.com/mesa/';

  const downloadQRCode = (mesa) => {
    const canvas = refs.current[mesa];
    if (!canvas) return;

    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');

    const downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `mesa-${mesa}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
        gap: 24,
        marginTop: 40,
        padding: '0 20px',
      }}
    >
      {Array.from({ length: 30 }).map((_, index) => {
        const mesa = index + 1;
        const url = `${baseUrl}${mesa}`;

        return (
          <div
            key={mesa}
            style={{
              border: '1px solid #ddd',
              borderRadius: 20,
              padding: 10,
              textAlign: 'center',
            }}
          >
            <QRCodeCanvas
              value={url}
              size={180}
              level="H"
              includeMargin
              ref={(el) => (refs.current[mesa] = el)}
            />

            <h3>Mesa {mesa}</h3>

            <button
              onClick={() => downloadQRCode(mesa)}
              style={{
                marginTop: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                borderRadius: 20,
                border: 'none',
              }}
            >
              Baixar QR
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default QRCodeGenerator;
