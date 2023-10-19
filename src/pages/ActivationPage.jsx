import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { server } from '../server';

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/user/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((error) => {
            console.log(error);
            setError(true);
          });
      };
      sendRequest();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {error ? (
        <p>Your token is expired!</p>
      ) : (
        <p>Your account has been create successfully!</p>
      )}
    </div>
  );
};

export default ActivationPage;
