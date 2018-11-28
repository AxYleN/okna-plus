import React from 'react';

import './Params.css';
import WindowOptions from '../WindowOptions/WindowOptions';
import RangeInput from '../../RangeInput/RangeInput';

export default function Params(props) {
  const { params, onChange } = props;

  const windows = params.windows.map((window, id) => (
    <WindowOptions
      caption={`Окно ${id + 1}`}
      value={window}
      onChange={window => {
        props.onWindowChange(window, id);
      }}
      key={id}
    />
  ));

  const { width, height } = params;
  const area = (width * height) / 1000000; // Площадь в кв. метрах
  const pricePerSqrM = 4500;
  const price = pricePerSqrM * area;

  return (
    <div className="settings">
      <h2>Параметры</h2>
      <label>
        Профиль
        <select
          name="profile"
          onChange={onChange}
          value={params.profile}
          className="settings__input">
          <option value="exprof">Exprof</option>
          <option value="proplex">Proplex</option>
        </select>
      </label>
      <label>
        Стеклопакет
        <select
          name="glass"
          onChange={onChange}
          value={params.glass}
          className="settings__input">
          <option value="4">4 &ndash; одно стекло</option>
          <option value="24">24 &ndash; два стекла (однокамерный)</option>
          <option value="32">32 &ndash; три стекла (двухкамерный)</option>
          <option value="40">40 &ndash; три стекла (двухкамерный)</option>
        </select>
      </label>
      <label>
        Фурнитура
        <select
          name="fittings"
          onChange={onChange}
          value={params.fittings}
          className="settings__input">
          <option value="axor">Axor</option>
          <option value="maco">Maco</option>
        </select>
      </label>
      <RangeInput
        caption="Высота:"
        name="height"
        onChange={onChange}
        value={params.height}
      />
      <RangeInput
        caption="Ширина:"
        name="width"
        onChange={onChange}
        value={params.width}
      />
      {windows}

      <div className="settings__info">
        <p>
          <strong>Площадь:</strong> {area.toFixed(2)} м<sup>2</sup>
        </p>
        <p>
          <strong>Цена:</strong> {price.toFixed(2)}р.
        </p>
      </div>
    </div>
  );
}
