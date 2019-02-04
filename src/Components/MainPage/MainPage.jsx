import React from 'react';

import Card from './Card/Card';
import './MainPage.css';
import Navbar from '../Navbar/Navbar';
import img1 from './img/1.jpg';
import img2 from './img/2.png';
import img3 from './img/3.png';
import img4 from './img/d1.jpg';

export default function MainPage() {
  return (
    <>
      <Navbar />
      <main className="main-container">
        <Card img={img1} text="Окно" to="/w1" />
        <Card img={img2} text="Окно двухстворчатое" to="/w2" />
        <Card img={img3} text="Окно трёхстворчатое" to="/w3" />
        <Card img={img4} text="Дверь" to="/d" />
      </main>
    </>
  );
}
