import React from 'react';

import './Blueprint.css';
import BlueprintCanvas from './BlueprintCanvas';

export default function Blueprint({ params, type }) {
  return (
    <section className="blueprint">
      <h2 className="subheading">Чертёж</h2>
      <BlueprintCanvas params={params} type={type} />
    </section>
  );
}
