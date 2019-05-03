import React from 'react';
import './OrderInfoPrint.css';
import BlueprintCanvas from '../../../../ConfigurationPage/Blueprint/BlueprintCanvas';
import { mapObj, formatNumber } from 'lib';

const dateFormat = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

export default function OrderInfoPrint({ order, cart }) {
  return (
    <div>
      <div className="print-order-header">
        <h1 className="print-order-header__heading">
          ОКНА
          <br />
          плюс
        </h1>
        <table className="print-order-header__order print-table">
          <tbody>
            <tr>
              <td>ЗАЯВКА:</td>
              <td>
                {order.id} от {new Date(order.date).toLocaleString('ru', dateFormat)}
              </td>
            </tr>
            <tr>
              <td>ВАРИАНТ:</td>
              <td>3.0.5.8-15241</td>
            </tr>
          </tbody>
        </table>
        <table className="print-order-header__info print-table">
          <tbody>
            <tr>
              <td>Офис:</td>
              <td>ул. Советская 93, 2 этаж</td>
            </tr>
            <tr>
              <td>Менеджер:</td>
              <td>Екатерина Огородник</td>
            </tr>
            <tr>
              <td>Телефон:</td>
              <td>+7 (909) 138-96-04</td>
            </tr>
          </tbody>
        </table>
      </div>
      <hr />
      <table className="print-order-summary print-table">
        <tbody>
          <tr>
            <td>Заказчик:</td>
            <td>
              {order.client.lname} {order.client.fname} {order.client.patronymic}
            </td>
          </tr>
          <tr>
            <td>Телефон:</td>
            <td>{order.client.phone}</td>
          </tr>
          <tr>
            <td>Адрес:</td>
            <td>{order.client.addess}</td>
          </tr>
          <tr>
            <td>Сумма:</td>
            <td>{formatNumber(order.price)} руб.</td>
          </tr>
          <tr>
            <td>Количество конструкций:</td>
            <td>
              {cart.reduce((acc, val) => acc + val.count, 0)} шт. (Изделий: {cart.length} шт.)
            </td>
          </tr>
          <tr>
            <td>Общая площадь заказа:</td>
            <td>
              {cart.reduce((acc, val) => acc + val.area * val.count, 0).toFixed(2)} м<sup>2</sup>
            </td>
          </tr>
        </tbody>
      </table>
      <h2 className="print-order-heading">1. Конструкции в заказе</h2>
      {cart.map((prod, id) => (
        <ProductComponent product={prod} id={id + 1} key={id} />
      ))}
      <div className="print-order-footer">
        <p style={{ fontSize: '6pt' }}>
          Заказчик уведомлен о том, что согласно ГОСТу 23166-99 &laquo;Блоки оконные. Общие
          технические условия&raquo; для обеспечения безопасности, в целях предотвращения
          травматизма и возможности выпадения детей из окон в детских школьных, дошкольных
          учреждениях, а так же в жилых домах, блоки оконные должны быть укомплектованы замками
          безопасности (пункт 5.18 ГОСТа 23166-99 &laquo;Блоки оконные. Общие технические
          условия&raquo;). <br />
          При отказе Заказчика от укомплектования оконного блока замком безопасности Заказчик
          принимает на себя все последствия такого отказа.
        </p>
        <strong>
          Внимание! Подписывая заказ, Вы тем самым подтверждаете КОНФИГУРАЦИЮ, КОМПЛЕКТАЦИЮ и ВСЕ
          ВНУТРЕННИЕ РАЗМЕРЫ заказываемых изделий. Убедистесь, что все ваши пожелания учтены. Все
          предварительные договорённости, не отраженные в заказе, считаются недействительными.
          Впоследствии претензии по вышеперечисленным параметрам приниматься не будут. В случае
          расторжения договора после выплаты аванса и начала работ, все понесенные затраты
          удерживаются из суммы аванса.
        </strong>
        <table className="print-order-signature">
          <tbody>
            <tr>
              <td>Заказчик согласен</td>
            </tr>
            <tr>
              <td>(подпись)</td>
            </tr>
            <tr>
              <td>Заказчик</td>
              <td />
              <td>Расшифровка подписи</td>
            </tr>
            <tr>
              <td>с предложенной комплектацией и стоимостью согласен (подпись)</td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductComponent({ product, id }) {
  const { params } = product;
  let mosquitoNet = product.type === 'door' ? null : {};

  if (mosquitoNet && params.window.value.value.some(el => el.mosquitoNet)) {
    mosquitoNet = {
      width: params.width.value.value - 70,
      height: params.height.value.value - 48,
      count: params.window.value.value.reduce((acc, el) => acc + +el.mosquitoNet, 0),
    };
  } else {
    mosquitoNet = null;
  }

  const { count, name, cost } = product;

  return (
    <section className="print-order-product">
      <h3 className="print-order-product__heading">
        Конструкция № {id}, количество {count} шт
      </h3>
      <div className="print-order-product__container">
        <div className="print-order-product__blueprint">
          <div>
            <strong>Конструкция № {id}</strong> (сборный чертёж)
          </div>
          <BlueprintCanvas type={product.type} params={mapObj(params, p => p.value.value)} />
        </div>
        <table className="print-order-product__info print-table">
          <tbody>
            {mosquitoNet === null ? null : (
              <>
                <tr>
                  <td className="print-order-product__info-heading" colSpan="2">
                    Москитные сетки
                  </td>
                  <td />
                </tr>
                <tr>
                  <td>Ширина</td>
                  <td>{mosquitoNet.width}</td>
                </tr>
                <tr>
                  <td>Высота</td>
                  <td>{mosquitoNet.height}</td>
                </tr>
                <tr>
                  <td>Тип москитной сетки</td>
                  <td>Оконная</td>
                </tr>
                <tr>
                  <td>Цвет москитной сетки</td>
                  <td>Белый</td>
                </tr>
              </>
            )}
            <tr>
              <td className="print-order-product__info-heading" colSpan="2">
                Характеристики изделия
              </td>
              <td />
            </tr>
            <tr>
              <td>Тип конструкции</td>
              <td>{product.type === 'door' ? 'Дверь' : 'Окно'}</td>
            </tr>
            <ParamsList params={params} />
            <tr>
              <td>Цвет внешний</td>
              <td>Белый</td>
            </tr>
            <tr>
              <td>Цвет внутренний</td>
              <td>Белый</td>
            </tr>
            <tr>
              <td>Положение ручки</td>
              <td>{(params.height.value.value / (product.type === 'door' ? 3 : 2)).toFixed(0)}</td>
            </tr>
            <tr>
              <td>Цвет профиля</td>
              <td>Белый</td>
            </tr>
            <tr>
              <td>
                <strong>Площадь</strong>
              </td>
              <td>
                {product.area.toFixed(2)} м<sup>2</sup>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <table className="print-order-product__summary">
        <thead>
          <tr>
            <td />
            <td>Кол-во</td>
            <td>Цена</td>
            <td>Сумма</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{name}</td>
            <td>{count} шт</td>
            <td>{formatNumber(cost)} р.</td>
            <td>{formatNumber(cost * count)} р.</td>
          </tr>
          {mosquitoNet === null ? null : (
            <tr>
              <td>Москитная сетка</td>
              <td>{mosquitoNet.count * count} шт</td>
              <td />
              <td />
            </tr>
          )}
          <tr>
            <td>
              <strong>Итого:</strong> Конструкция № {id}
            </td>
            <td />
            <td />
            <td>{formatNumber(cost * count)} р.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

function ParamsList({ params }) {
  const items = [];

  for (let key in params) {
    const { name, value } = params[key];

    if (!Array.isArray(value.text)) {
      items.push(
        <tr key={key}>
          <td>{name}</td>
          <td>{value.text}</td>
        </tr>,
      );
      continue;
    }
  }

  return items;
}
