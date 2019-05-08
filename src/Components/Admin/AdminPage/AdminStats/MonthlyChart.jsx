import React from 'react';
import Chart from 'react-apexcharts';
import { objToArr } from 'lib';

export default function MonthlyChart({ ordersAndIncomeMonthly }) {
  if (!ordersAndIncomeMonthly) return null;

  const years = Object.keys(ordersAndIncomeMonthly);

  if (years.length < 1) {
    return null;
  }

  let ordersAndIncomeMonthlyArr = objToArr(ordersAndIncomeMonthly, (elYear, year) =>
    objToArr(elYear, (elMonth, month) => ({
      year,
      month,
      count: elMonth.count,
      sum: elMonth.sum,
    })),
  ).flat();

  const removeMonthCount = 12 - (new Date().getMonth() + 1);

  ordersAndIncomeMonthlyArr.splice(
    ordersAndIncomeMonthlyArr.length - removeMonthCount,
    removeMonthCount,
  );
  ordersAndIncomeMonthlyArr = ordersAndIncomeMonthlyArr.reverse().slice(0, 24);

  while (ordersAndIncomeMonthlyArr.length < 24) {
    const curMonth = ordersAndIncomeMonthlyArr[ordersAndIncomeMonthlyArr.length - 1];
    const nextMonth = (curMonth.month % 12) + 1;

    ordersAndIncomeMonthlyArr.push({
      year: +curMonth.year + Math.floor(nextMonth / 12),
      month: nextMonth,
      count: 0,
      sum: 0,
    });
  }

  const curYear = ordersAndIncomeMonthlyArr.slice(0, 12).reverse();
  const prevYear = ordersAndIncomeMonthlyArr.slice(12, 24).reverse();

  var options = { month: 'short' };

  const date = new Date();
  const categories = curYear.map(el => {
    date.setMonth(el.month - 1);
    return date.toLocaleString('ru', options);
  });

  const series = [
    {
      name: 'Текущий год',
      data: curYear.map(el => el.count),
    },
    {
      name: 'Предыдущий год',
      data: prevYear.map(el => el.count),
    },
  ];
  const series2 = [
    {
      name: 'Текущий год',
      data: curYear.map(el => el.sum),
    },
    {
      name: 'Предыдущий год',
      data: prevYear.map(el => el.sum),
    },
  ];

  return (
    <>
      <section className="admin-stats__section">
        <h2 className="subheading">Количество заказов</h2>
        <Chart
          options={{
            stroke: {
              curve: 'smooth',
            },
            xaxis: {
              categories,
            },
          }}
          series={series}
          type="area"
          height={380}
        />
      </section>
      <section className="admin-stats__section">
        <h2 className="subheading">Стоимость заказов</h2>
        <Chart
          options={{
            stroke: {
              curve: 'smooth',
            },
            xaxis: {
              categories,
            },
            dataLabels: {
              enabled: false,
            },
          }}
          series={series2}
          type="area"
          height={380}
        />
      </section>
    </>
  );
}
