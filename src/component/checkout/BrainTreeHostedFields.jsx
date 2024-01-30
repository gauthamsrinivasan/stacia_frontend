import React, { useEffect, useRef } from 'react';
import { useBraintree } from 'react-braintree-fields';

const BraintreeHostedFields = ({ clientToken, onPaymentMethodReceived }) => {
  const { initialize, tokenize, hostedFields } = useBraintree({
    clientToken,
  });

  const hostedFieldsContainer = useRef(null);

  useEffect(() => {
    if (clientToken) {
      initialize({
        authorization: clientToken,
        fields: {
          number: {
            selector: '#card-number',
            placeholder: '4111 1111 1111 1111',
          },
          cvv: {
            selector: '#cvv',
            placeholder: '123',
          },
          expirationDate: {
            selector: '#expiration-date',
            placeholder: 'MM/YYYY',
          },
        },
      });
    }
  }, [clientToken, initialize]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { nonce } = await tokenize();
      onPaymentMethodReceived({ nonce });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="card-number" ref={hostedFieldsContainer}></div>
      <div id="cvv"></div>
      <div id="expiration-date"></div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BraintreeHostedFields;
