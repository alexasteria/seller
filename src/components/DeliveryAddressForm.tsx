import React, { FC, ChangeEvent } from 'react';
import { DeliveryAddress } from '@/types';
import styles from '@/components/DeliveryAddressForm.module.css';

interface DeliveryAddressFormProps {
  address: DeliveryAddress;
  onChange: (next: DeliveryAddress) => void;
}

const DeliveryAddressForm: FC<DeliveryAddressFormProps> = ({ address, onChange }) => {
  const handleFieldChange = (field: keyof DeliveryAddress) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({ ...address, [field]: e.target.value });
  };

  return (
    <section className={styles.deliveryAddressForm}>
      <div className={styles.formHeader}>
        <h3>📍 Адрес доставки</h3>
        <p className={styles.formSubtitle}>Заполните данные для доставки заказа</p>
      </div>
      
      <div className={styles.formSections}>
        {/* Основная информация */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Основная информация</h4>
          <div className={styles.formFields}>
            <div className={`${styles.formField} ${styles.required}`}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelText}>Город</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                type="text"
                className={styles.fieldInput}
                value={address.city}
                onChange={handleFieldChange('city')}
                placeholder="Например, Москва"
                required
              />
            </div>
            
            <div className={`${styles.formField} ${styles.required}`}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelText}>Улица</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                type="text"
                className={styles.fieldInput}
                value={address.street}
                onChange={handleFieldChange('street')}
                placeholder="Например, Тверская"
                required
              />
            </div>
            
            <div className={`${styles.formField} ${styles.required}`}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelText}>Дом</span>
                <span className={styles.requiredMark}>*</span>
              </label>
              <input
                type="text"
                className={styles.fieldInput}
                value={address.house}
                onChange={handleFieldChange('house')}
                placeholder="№ дома"
                required
              />
            </div>
          </div>
        </div>

        {/* Дополнительная информация */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Дополнительная информация</h4>
          <div className={styles.formFields}>
            <div className={styles.formField}>
              <label className={styles.fieldLabel}>
                <span className={styles.labelText}>Квартира</span>
                <span className={styles.optionalMark}>(необязательно)</span>
              </label>
              <input
                type="text"
                className={styles.fieldInput}
                value={address.apartment || ''}
                onChange={handleFieldChange('apartment')}
                placeholder="№ квартиры"
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Подъезд</span>
                  <span className={styles.optionalMark}>(необязательно)</span>
                </label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={address.entrance || ''}
                  onChange={handleFieldChange('entrance')}
                  placeholder="№ подъезда"
                />
              </div>
              
              <div className={styles.formField}>
                <label className={styles.fieldLabel}>
                  <span className={styles.labelText}>Этаж</span>
                  <span className={styles.optionalMark}>(необязательно)</span>
                </label>
                <input
                  type="text"
                  className={styles.fieldInput}
                  value={address.floor || ''}
                  onChange={handleFieldChange('floor')}
                  placeholder="№ этажа"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Комментарий */}
        <div className={styles.formSection}>
          <h4 className={styles.sectionTitle}>Комментарий для курьера</h4>
          <div className={styles.formField}>
            <label className={styles.fieldLabel}>
              <span className={styles.labelText}>Дополнительная информация</span>
              <span className={styles.optionalMark}>(необязательно)</span>
            </label>
            <textarea
              className={styles.fieldTextarea}
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


