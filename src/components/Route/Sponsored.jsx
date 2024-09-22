import React from "react";
import styles from "../../styles/styles";
import lgLogo from "../../Assests/svg/logo-lg.svg";
import samsungLogo from "../../Assests/svg/logo-samsung.svg";
import microsoftLogo from "../../Assests/svg/logo-microsoft.svg";
import sonyLogo from "../../Assests/svg/logo-sony.svg";
import appleLogo from "../../Assests/svg/logo-apple.svg";

const Sponsored = () => {
  return (
    <div
      className={`${styles.section} hidden sm:block bg-white py-10 px-5 mb-12 cursor-pointer rounded-xl`}
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-start">
          <img
            src={samsungLogo}
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src={appleLogo}
            alt=""
            style={{ width: "150px", objectFit: "contain" }}
          />
        </div>
        <div className="flex items-start">
          <img
            src={lgLogo}
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src={microsoftLogo}
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>
        <div className="flex items-start">
          <img
            src={sonyLogo}
            style={{ width: "150px", objectFit: "contain" }}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Sponsored;
