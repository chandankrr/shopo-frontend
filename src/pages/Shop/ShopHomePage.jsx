import React from 'react';
import ShopInfo from '../../components/Shop/ShopInfo.jsx';
import ShopProfileData from '../../components/Shop/ShopProfileData.jsx';
import styles from '../../styles/styles';

const ShopHomePage = () => {
  return (
    <div className={`${styles.section} bg-[#f5f5f5]`}>
      <div className="w-full flex flex-col lg:flex-row py-10 justify-between">
        <div className="w-full lg:w-[25%] bg-[#fff] rounded-[4px] shadow-sm overflow-y-scroll h-[90vh] lg:sticky lg:top-10 lg:left-0 lg:z-10 mb-4 lg:mb-0">
          <ShopInfo isOwner={true} />
        </div>
        <div className="w-full lg:w-[72%] rounded-[4px]">
          <ShopProfileData isOwner={true} />
        </div>
      </div>
    </div>
  );
};

export default ShopHomePage;
