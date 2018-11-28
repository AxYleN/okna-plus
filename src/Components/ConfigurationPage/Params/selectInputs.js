export default [
  {
    caption: 'Профиль',
    name: 'profile',
    type: 'select',
    values: [
      {
        value: 'exprof',
        caption: 'Exprof',
      },
      {
        value: 'proplex',
        caption: 'Proplex',
      },
    ],
  },
  {
    caption: 'Стеклопакет',
    name: 'glass',
    type: 'select',
    values: [
      {
        value: '4',
        caption: '4 – одно стекло',
      },
      {
        value: '24',
        caption: '24 – два стекла (однокамерный)',
      },
      {
        value: '32',
        caption: '32 – три стекла (двухкамерный)',
      },
      {
        value: '40',
        caption: '40 – три стекла (двухкамерный)',
      },
    ],
  },
  {
    caption: 'Фурнитура',
    name: 'fittings',
    type: 'select',
    values: [
      {
        value: 'axor',
        caption: 'Axor',
      },
      {
        value: 'maco',
        caption: 'Maco',
      },
    ],
  },
  {
    caption: 'Высота',
    name: 'height',
    type: 'range',
    min: 700,
    max: 1800,
  },
  {
    caption: 'Ширина',
    name: 'width',
    type: 'range',
    min: 700,
    max: 1800,
  },
];

const Select = function(selectProps) {
  const { caption, name, values } = selectProps.value;
  return (
    <label>
      {caption}
      <select
        name={name}
        onChange={onChange}
        value={params[name]}
        className="settings__input">
        {values.map(v => (
          <option value={v.value}>{v.caption}</option>
        ))}
      </select>
    </label>
  );
};

{
  selectInputs.map(v => <Select value={v} />);
}
