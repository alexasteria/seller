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
      <div className="form-header">
        <h3>📍 Адрес доставки</h3>
        <p className="form-subtitle">Заполните данные для доставки заказа</p>
      </div>
      
      <div className="form-sections">
        {/* Основная информация */}
        <div className="form-section">
          <h4 className="section-title">Основная информация</h4>
          <div className="form-fields">
            <div className="form-field required">
              <label className="field-label">
                <span className="label-text">Город</span>
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="field-input"
                value={address.city}
                onChange={handleFieldChange('city')}
                placeholder="Например, Москва"
                required
              />
            </div>
            
            <div className="form-field required">
              <label className="field-label">
                <span className="label-text">Улица</span>
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="field-input"
                value={address.street}
                onChange={handleFieldChange('street')}
                placeholder="Например, Тверская"
                required
              />
            </div>
            
            <div className="form-field required">
              <label className="field-label">
                <span className="label-text">Дом</span>
                <span className="required-mark">*</span>
              </label>
              <input
                type="text"
                className="field-input"
                value={address.house}
                onChange={handleFieldChange('house')}
                placeholder="№ дома"
                required
              />
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className="form-section">
          <h4 className="section-title">Дополнительная информация</h4>
          <div className="form-fields">
            <div className="form-field">
              <label className="field-label">
                <span className="label-text">Квартира</span>
                <span className="optional-mark">(необязательно)</span>
              </label>
              <input
                type="text"
                className="field-input"
                value={address.apartment || ''}
                onChange={handleFieldChange('apartment')}
                placeholder="№ квартиры"
              />
            </div>
            
            <div className="form-row">
              <div className="form-field">
                <label className="field-label">
                  <span className="label-text">Подъезд</span>
                  <span className="optional-mark">(необязательно)</span>
                </label>
                <input
                  type="text"
                  className="field-input"
                  value={address.entrance || ''}
                  onChange={handleFieldChange('entrance')}
                  placeholder="№ подъезда"
                />
              </div>
              
              <div className="form-field">
                <label className="field-label">
                  <span className="label-text">Этаж</span>
                  <span className="optional-mark">(необязательно)</span>
                </label>
                <input
                  type="text"
                  className="field-input"
                  value={address.floor || ''}
                  onChange={handleFieldChange('floor')}
                  placeholder="№ этажа"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Комментарий */}
        <div className="form-section">
          <h4 className="section-title">Комментарий для курьера</h4>
          <div className="form-field">
            <label className="field-label">
              <span className="label-text">Дополнительная информация</span>
              <span className="optional-mark">(необязательно)</span>
            </label>
            <textarea
              className="field-textarea"
              value={address.comment || ''}
              onChange={handleFieldChange('comment')}
              placeholder="Например: позвоните за 10 минут, код домофона 1234, оставьте у двери"
              rows={4}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeliveryAddressForm;


