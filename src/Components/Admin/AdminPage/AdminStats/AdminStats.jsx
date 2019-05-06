import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'react-apexcharts';
import { formatNumber } from 'lib';
import './AdminStats.css';
import MonthlyChart from './MonthlyChart';

const dayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье',
];

export default function AdminStats() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/stats').then(({ data }) => {
      setStats(data);
    });
  }, []);

  if (!stats) {
    return (
      <div className="admin-container">
        <h1 className="heading">Статистика</h1>
        Загрузка...
      </div>
    );
  }

  const {
    ordersAndIncomeAtMonth,
    ordersAndIncomeAtPrevMonth,
    ordersAndIncomeMonthly,
    ordersAtDayOfTheWeek,
    productsByPopularity,
  } = stats;

  return (
    <div className="admin-container">
      <h1 className="heading">Статистика</h1>
      <section className="admin-stats__section">
        <h2 className="subheading">Заказы</h2>
        <table className="admin-stats__table">
          <thead>
            <tr>
              <th>Месяц</th>
              <th>Кол-во заказов</th>
              <th>Сумма</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Текущий месяц</td>
              <td className="text--center">{ordersAndIncomeAtMonth.count}</td>
              <td className="text--right">{formatNumber(ordersAndIncomeAtMonth.income || 0)}</td>
            </tr>
            <tr>
              <td>Предыдущий месяц</td>
              <td className="text--center">{ordersAndIncomeAtPrevMonth.count}</td>
              <td className="text--right">
                {formatNumber(ordersAndIncomeAtPrevMonth.income || 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="admin-stats__section">
        <h2 className="subheading">Товары по популярности</h2>
        <table className="admin-stats__table">
          <thead>
            <tr>
              <th>№</th>
              <th>Товар</th>
              <th>Продано, ед.</th>
            </tr>
          </thead>
          <tbody>
            {productsByPopularity.map((el, id) => (
              <tr key={id}>
                <td>{id + 1}</td>
                <td>{el.name}</td>
                <td className="text--center">{el.num}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="admin-stats__section">
        <h2 className="subheading">Число заказов по дням недели</h2>
        <Chart
          options={{
            chart: {
              id: 'apexchart-example',
            },
            xaxis: {
              categories: ordersAtDayOfTheWeek.map(el => dayNames[el.weekday]),
            },
          }}
          series={[
            {
              name: 'Количество заказов',
              data: ordersAtDayOfTheWeek.map(el => el.count),
            },
          ]}
          type="bar"
          height={320}
        />
      </section>
      <MonthlyChart ordersAndIncomeMonthly={ordersAndIncomeMonthly} />
    </div>
  );
}
