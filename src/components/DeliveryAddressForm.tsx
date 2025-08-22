import React, { FC, ChangeEvent } from 'react';
import { DeliveryAddress } from '../types';

interface DeliveryAddressFormProps {
  address: DeliveryAddress;
  onChange: (next: DeliveryAddress) => void;
}

const DeliveryAddressForm: FC<DeliveryAddressFormProps> = ({ address, onChange }) => {
  const handleFieldChange = (field: keyof DeliveryAddress) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...address, [field]: e.target.value });
  };

  return (
    <section className="delivery-address-form">
      <h3>Адрес доставки</h3>
      <div className="form-grid">
        <label>
          Город
          <input
            type="text"
            value={address.city}
            onChange={handleFieldChange('city')}
            placeholder="Например, Москва"
          />
        </label>
        <label>
          Улица
          <input
            type="text"
            value={address.street}
            onChange={handleFieldChange('street')}
            placeholder="Например, Тверская"
          />
        </label>
        <label>
          Дом
          <input
            type="text"
            value={address.house}
            onChange={handleFieldChange('house')}
            placeholder="№"
          />
        </label>
        <label>
          Квартира
          <input
            type="text"
            value={address.apartment || ''}
            onChange={handleFieldChange('apartment')}
            placeholder="Опционально"
          />
        </label>
        <label>
          Подъезд
          <input
            type="text"
            value={address.entrance || ''}
            onChange={handleFieldChange('entrance')}
            placeholder="Опционально"
          />
        </label>
        <label>
          Этаж
          <input
            type="text"
            value={address.floor || ''}
            onChange={handleFieldChange('floor')}
            placeholder="Опционально"
          />
        </label>
        <label style={{ gridColumn: '1 / -1' }}>
          Комментарий для курьера
          <textarea
            value={address.comment || ''}
            onChange={handleFieldChange('comment')}
            placeholder="Например, позвоните за 10 минут"
            rows={3}
          />
        </label>
      </div>
    </section>
  );
};

export default DeliveryAddressForm;


