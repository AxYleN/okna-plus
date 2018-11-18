export default [
  {
    caption: 'Профиль',
    name: 'profile',
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
    name: 'стеклопакет',
    values: [
      {
        value: '9',
        caption: '9 – одно стекло',
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
    name: 'фурнитура',
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
];

const Select = function(selectProps) {
  const { caption, name, values } = selectProps.value;
  return (
    <label>
      {caption}
      <select name={name} onChange={onChange} value={params[name]} className="settings__input">
        {values.map(v => (
          <option value={v.value}>{v.caption}</option>
        ))}
      </select>
    </label>
  );
};

{selectInputs.map(v => <Select value={v}/>)}