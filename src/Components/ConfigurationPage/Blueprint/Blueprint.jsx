import React from 'react';

import './Blueprint.css';
import BlueprintCanvas from './BlueprintCanvas';

export default function Blueprint({ params }) {
  return (
    <div className="blueprint">
      <h2>Чертёж</h2>
      <BlueprintCanvas params={params} />
    </div>
  );
}
