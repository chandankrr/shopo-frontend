import axios from 'axios';
import { Country, State } from 'country-state-city';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { server } from '../../server';
import styles from '../../styles/styles';

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [userInfo, setUserInfo] = useState(false);
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [zipCode, setZipCode] = useState();
  const [couponCode, setCouponCode] = useState('');
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [discountPrice, setDiscountPrice] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paymentSubmit = () => {
    if (
      address1 === '' ||
      address2 === '' ||
      zipCode === null ||
      country === '' ||
      state === ''
    ) {
      toast.error('Please choose your delivery address!');
    } else {
      const shippingAddress = {
        address1,
        address2,
        zipCode,
        country,
        state,
      };

      const orderData = {
        cart,
        totalPrice,
        subTotalPrice,
        shipping,
        discountPrice,
        shippingAddress,
        user,
      };

      // update local storage with the updated orders array
      localStorage.setItem('latestOrder', JSON.stringify(orderData));
      navigate('/payment');
    }
  };

  const subTotalPrice = cart.reduce(
    (acc, item) => acc + item.qty * item.discountPrice,
    0
  );

  const shipping = subTotalPrice * 0.1;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = couponCode;

    await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
      const shopId = res.data.couponCode?.shopId;
      const couponCodeValue = res.data.couponCode?.value;
      if (res.data.couponCode !== null) {
        const isCouponValid =
          cart && cart.filter((item) => item.shopId === shopId);

        if (isCouponValid.length === 0) {
          toast.error('Coupon code is not valid for this shop');
          setCouponCode('');
        } else {
          const eligiblePrice = isCouponValid.reduce(
            (acc, item) => acc + item.qty * item.discountPrice,
            0
          );
          const discountPrice = (eligiblePrice * couponCodeValue) / 100;
          setDiscountPrice(discountPrice);
          setCouponCodeData(res.data.couponCode);
          setCouponCode('');
        }
      }
      if (res.data.couponCode === null) {
        toast.error("Coupon code doesn't exists!");
        setCouponCode('');
      }
    });
  };

  const discountPercentage = couponCodeData ? discountPrice : '';

  const totalPrice = couponCodeData
    ? (subTotalPrice + shipping - discountPercentage).toFixed(2)
    : (subTotalPrice + shipping).toFixed(2);

  return (
    <div className="w-full flex flex-col items-center py-8">
      <div className="w-[90%] 1000px:w-[70%] block 800px:flex">
        <div className="w-full 800px:w-[65%]">
          <ShippingInfo
            user={user}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            address1={address1}
            setAddress1={setAddress1}
            address2={address2}
            setAddress2={setAddress2}
            zipCode={zipCode}
            setZipCode={setZipCode}
          />
        </div>
        <div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
          <CartData
            handleSubmit={handleSubmit}
            totalPrice={totalPrice}
            shipping={shipping}
            subTotalPrice={subTotalPrice}
            couponCode={couponCode}
            setCouponCode={setCouponCode}
            discountPercentage={discountPercentage}
          />
        </div>
      </div>
      <div
        className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
        onClick={paymentSubmit}
      >
        <h5 className="text-white">Go to Payment</h5>
      </div>
    </div>
  );
};

const ShippingInfo = ({
  user,
  country,
  setCountry,
  state,
  setState,
  userInfo,
  setUserInfo,
  address1,
  setAddress1,
  address2,
  setAddress2,
  zipCode,
  setZipCode,
}) => {
  return (
    <div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
      <h5 className="text-[18px] font-[500]">Shipping Address</h5>
      <br />
      <form>
        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Full Name</label>
            <input
              type="text"
              required
              className={`${styles.input} !w-[95%]`}
              defaultValue={user && user.name}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Email Address</label>
            <input
              type="email"
              required
              className={`${styles.input}`}
              defaultValue={user && user.email}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Phone Number</label>
            <input
              type="number"
              required
              className={`${styles.input} !w-[95%]`}
              defaultValue={user && user.phoneNumber}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Zip Code</label>
            <input
              type="number"
              required
              className={`${styles.input}`}
              value={zipCode || ''}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Country</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your country
              </option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">State</label>
            <select
              className="w-[95%] border h-[40px] rounded-[5px]"
              value={state}
              onChange={(e) => setState(e.target.value)}
            >
              <option className="block pb-2" value="">
                Choose your State
              </option>
              {State &&
                State.getStatesOfCountry(country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>
        </div>

        <div className="w-full flex pb-3">
          <div className="w-[50%]">
            <label className="block pb-2">Address1</label>
            <input
              type="address"
              required
              className={`${styles.input} !w-[95%]`}
              value={address1}
              onChange={(e) => setAddress1(e.target.value)}
            />
          </div>
          <div className="w-[50%]">
            <label className="block pb-2">Address2</label>
            <input
              type="address"
              required
              className={`${styles.input}`}
              value={address2}
              onChange={(e) => setAddress2(e.target.value)}
            />
          </div>
        </div>

        <div></div>
      </form>
      <h5
        className="text-[18px] cursor-pointer inline-block"
        onClick={() => setUserInfo(!userInfo)}
      >
        Choose from saved address
      </h5>
      {userInfo && (
        <div>
          {user &&
            user.addresses.map((item, index) => (
              <div className="w-full flex mt-1" key={index}>
                <input
                  type="checkbox"
                  className="mr-3"
                  value={item.addressType}
                  onClick={() =>
                    setAddress1(item.address1) ||
                    setAddress2(item.address2) ||
                    setZipCode(item.zipCode) ||
                    setCountry(item.country) ||
                    setState(item.state)
                  }
                />
                <h2>{item.addressType}</h2>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

const CartData = ({
  handleSubmit,
  totalPrice,
  shipping,
  subTotalPrice,
  couponCode,
  setCouponCode,
  discountPercentage,
}) => {
  return (
    <div className="w-full bg-[#fff] rounded-md p-5 pb-8">
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
        <h5 className="text-[18px] font-[600]">${subTotalPrice}</h5>
      </div>
      <br />
      <div className="flex justify-between">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
        <h5 className="text-[18px] font-[600]">${shipping.toFixed(2)}</h5>
      </div>
      <br />
      <div className="flex justify-between border-b pb-3">
        <h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
        <h5 className="text-[18px] font-[600]">
          - {discountPercentage ? '$' + discountPercentage.toString() : null}
        </h5>
      </div>
      <h5 className="text-[18px] font-[600] text-end pt-3">${totalPrice}</h5>
      <br />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className={`${styles.input} h-[40px] pl-2`}
          placeholder="Coupoun code"
          required
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        <input
          className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
          required
          value="Apply code"
          type="submit"
        />
      </form>
    </div>
  );
};

export default Checkout;
