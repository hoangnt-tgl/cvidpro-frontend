import React from 'react';
import VisaCard from './VisaCard';
import VnPay from './VnPay';
import Baking from './Baking';
import atmpic from '../../../images/atm-card.png';
import './styles.css';
import Header2 from '../../../markup/Layout/Header2';
import Footer from '../../../markup/Layout/Footer';
import PaymentDes from './PaymentDes';
import usePayment from '../../../hooks/usePayment';
const ModalPayment = () => {
  const { paymentMethods, setPaymentMethods } = usePayment();
  const listPaymentMethods = [
    {
      title: 'Credit Card',
      img: atmpic,
    },
    {
      title: 'Net Banking',
      img: atmpic,
    },
    {
      title: 'VNPAY',
      img: atmpic,
    },
  ];
  return (
    <>
      <Header2 />
      <div className='payment-container page-content w-100'>
        <div className='payment-header'>
          <div className='payment-header-title'>
            <h1>Phương thức thanh toán</h1>
          </div>
          <div className='choose-method-container'>
            {listPaymentMethods.map((item, idx) => {
              return (
                <div
                  className={
                    idx === 0 ? 'choose-method bg-white' : 'choose-method'
                  }
                  key={idx}
                  onClick={() => {
                    setPaymentMethods(idx);
                  }}
                >
                  <div className='image-payment'>
                    <img src={item.img} alt='' />
                  </div>
                  <div>
                    <p>{item.title}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>{' '}
        <div className='payment-body row bg-white'>
          <div className='description-payment col-sm-12 col-md-6'>
            <PaymentDes />
          </div>
          <div className='payment-method col-sm-12 col-md-6'>
            {/* <VisaCard /> */}
            {/* <VnPay /> */}
            {paymentMethods === 0 ? <VisaCard /> : <Baking />}

            <div className='register-btn'>
              {' '}
              <button className='btn site-button dz-xs-flex w-100 '>
                Tiếp tục
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ModalPayment;
