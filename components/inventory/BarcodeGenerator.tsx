"use client";

import React, { useState } from 'react';

export default function BarcodeGenerator() {
  const [value, setValue] = useState('');

  const svgBarcode = (v: string) => `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='300' height='80'><rect width='100%' height='100%' fill='white'/><text x='10' y='45' font-family='monospace' font-size='20'>${v}</text></svg>`)} `;

  return (
    <div className="card">
      <h3 className="text-sm font-semibold">Barcode / QR</h3>
      <div className="mt-3 grid gap-2">
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Enter SKU or URL" className="w-full border rounded p-2" />
        <div className="flex gap-2">
          <button className="btn-primary" onClick={() => { /* in production generate or download */ }}>Generate</button>
        </div>
        {value && <img src={svgBarcode(value)} alt="barcode" className="mt-2" />}
      </div>
    </div>
  );
}
