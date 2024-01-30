 // BraintreeDropin.js
import React, { useEffect, useState } from "react";
import "braintree-web";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import { client } from "braintree-web";
import "./UserInfo.css";

const BraintreeDropin = ({ onPaymentMethodReceived, updateVerify }) => {
  const [clientToken, setClientToken] = useState(null);
  const [instance, setInstance] = useState(null);
  const [verify,setVerify]=useState(false);
  const [buttontext,setButtontext]=useState("verify");

  useEffect(() => {
    const getClientToken = async () => {
      try {
        const response = await axios.get(
          "https://stacia-backend.vercel.app/api/braintree/v1/getToken"
        );
        const clientToken = response.data.clientToken;
        setClientToken(clientToken);
        console.log("client token : " + clientToken)
      } catch (error) {
        console.error(error);
      }
    };

    getClientToken();
  }, []);

  const buy = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();
      setVerify(true);
      setButtontext("verified")
      updateVerify(false)
      // Send the nonce to the parent component
      onPaymentMethodReceived({ nonce });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    !clientToken ? "Loading" :
    <div>
    
      <DropIn
        options={{
          authorization: clientToken,
        }}
        onInstance={(instance) => {setInstance(instance);setVerify(false);console.log(verify)}}
      />
      
       <button className="verify-btn" id="verify" onClick={buy} disabled={verify}>{buttontext}</button>
    </div>
  );
};

export default BraintreeDropin;
