import React from "react";
import { useContext,useState,useEffect } from "react";
import { CartContext } from "../../context/CartProvider";
import "./UserInfo.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import BraintreeHostedFields from "./BrainTreeHostedFields";
import BraintreeDropin from "./BrainTreeDropIn";

function UserInfo() {
  const [verify, setVerify] = useState(true);
  return (
    <div className="user-info_container">
      <ContactInformation />
      <ShippingAddress verify={verify} updateVerify={setVerify}/>
    </div>
  );
}

function ContactInformation() {
  return (
    <div className="contact-info_container">
      <h3>Contact Information</h3>
      <input type="email" placeholder="Email" />
    </div>
  );
}

function ShippingAddress( {verify,updateVerify}) {
  const { emptyCart, cart } = useContext(CartContext);
  const [clientToken, setClientToken] = useState('');
  const [paymentMethodNonce, setPaymentMethodNonce] = useState("");
  
  let navigate = useNavigate();

  const onPaymentMethodReceived = ({ nonce }) => {
    // Process the nonce as needed (send to server, etc.)
    setPaymentMethodNonce(nonce);
    console.log('Received nonce:', nonce);
  };

  const totalPrice = cart.reduce((accumulator, current) => {
    return accumulator + current.price * current.qty;
  }, 0);


  const generateToken = async () => {
    try {
      const response = await axios.get( "https://stacia-backend.vercel.app/api/braintree/v1/getToken");
      const clientToken = response.data.clientToken;
      setClientToken(clientToken);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    generateToken();
  }, []);

  


  async function checkoutHandler() {
    if (cart.length < 1) {
      toast.error("Your shopping list is Emtpy");
      return;
    }
   

    try {
      // Send the paymentMethodNonce to your server for further processing
      console.log("check nonce : " + paymentMethodNonce  );
      console.log("totalprice : " + totalPrice.toFixed(2));
      const response = await axios.post(
        "https://stacia-backend.vercel.app/api/braintree/v1/sandbox",
        { paymentMethodNonce: paymentMethodNonce, amount: totalPrice.toFixed(2) }
      );
      console.log(response);
      if (response.data.success) {
        toast.success("Amount Debited : $" + totalPrice.toFixed(2));
        
        emptyCart();
        toast.success("Checked out");
        navigate("/");
      } else {
        toast.error("Transaction failed: " + response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during the transaction.");
    }
  
  }

  return (
    <div className="shipping-address_container">
      <h3>Shipping Address</h3>
      <div className="shipping-address_wrapper">
        <input type="name" placeholder="First name" id="firstname" />
        <input type="name" placeholder="Last name" id="lastname" />
        <input type="name" placeholder="Address" id="address" />
        <input type="name" placeholder="City" id="city" />
        </div>
        <div className="shipping-address_container">
        <BraintreeDropin onPaymentMethodReceived={onPaymentMethodReceived} updateVerify={updateVerify} />
        </div>
        <div>
        <button className="checkout-btn" disabled={verify} onClick={checkoutHandler}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default UserInfo;
