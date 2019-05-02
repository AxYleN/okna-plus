import React, { useState, useEffect } from 'react';
import Modal from '../Modal/Modal';
import ProductEdit from '../ProductEdit/ProductEdit';

export default function CartModalEdit({ onClose, onSave, products, cart, editId }) {
  const [tempParams, setTempParams] = useState(null);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (editId === null) {
      setTempParams(null);
      setProduct(null);
      return;
    }
    const selectedProduct = cart[editId];
    setTempParams(selectedProduct.params);
    setProduct(products[selectedProduct.key]);
  }, [editId]);

  if (!tempParams || !product) {
    return null;
  }

  return (
    <Modal onClose={onClose}>
      <div className="cart__modal-edit">
        <ProductEdit params={tempParams} product={product} setParams={setTempParams}>
          <div className="cart__modal-buttons">
            <button className="btn btn--text modal__btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button
              className="btn modal__btn-primary"
              onClick={() => onSave({ params: tempParams }, editId)}>
              Сохранить
            </button>
          </div>
        </ProductEdit>
      </div>
    </Modal>
  );
}
