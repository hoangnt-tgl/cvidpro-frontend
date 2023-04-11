import React from 'react';
import { useState } from 'react';

const usePayment = () => {
  const [paymentMethods, setPaymentMethods] = useState(0);

  return { paymentMethods, setPaymentMethods };
};

export default usePayment;
