import React from 'react';
import Navbar from '../Navbar/Navbar';
import ProductCard from '../ProductCard/ProductCard';

export default function Cart(props) {
  const productExample = {
    name: 'Окно двустворчатое',
    cost: 6700,
    count: 1,
    type: 'window',
    params: {
      width: 1400,
      height: 1100,
      profile: 'Exporf',
      window: [
        {
          openTo: 'no',
          mosquitoNet: false,
        },
        {
          openTo: 'tilt_toRight',
          mosquitoNet: true,
        },
      ],
    },
    labels: {
      width: 'Ширина',
      height: 'Высота',
      profile: 'Профиль',
      window: {
        label: 'Окно',
        no: 'Глухое',
        tilt: 'Откидное',
        tilt_toLeft: 'Поворотно-откидное влево',
        tilt_toRight: 'Поворотно-откидное вправо',
        toLeft: 'Поворотное влево',
        toRight: 'Поворотное вправо',
      },
    },
  };
  const productExample2 = {
    name: 'Окно',
    cost: 4700,
    count: 2,
    type: 'window',
    params: {
      width: 1100,
      height: 1400,
      profile: 'Exporf',
      window: [
        {
          openTo: 'no',
          mosquitoNet: false,
        },
      ],
    },
    labels: {
      width: 'Ширина',
      height: 'Высота',
      profile: 'Профиль',
      window: {
        label: 'Окно',
        no: 'Глухое',
        tilt: 'Откидное',
        tilt_toLeft: 'Поворотно-откидное влево',
        tilt_toRight: 'Поворотно-откидное вправо',
        toLeft: 'Поворотное влево',
        toRight: 'Поворотное вправо',
      },
    },
  };

  return (
    <>
      <Navbar backLink="/" />
      <main className="container">
        <h1 className="heading">Корзина</h1>
        <hr />
        <ProductCard {...productExample} />
        <hr />
        <ProductCard {...productExample2} />
        <hr />
      </main>
    </>
  );
}
