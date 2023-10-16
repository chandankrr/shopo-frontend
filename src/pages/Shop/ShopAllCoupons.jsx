import React from 'react';
import AllCoupons from '../../components/Shop/AllCoupons.jsx';
import DashboardHeader from '../../components/Shop/Layout/DashboardHeader.jsx';
import DashboardSideBar from '../../components/Shop/Layout/DashboardSideBar.jsx';

const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[80px] 800px:w-[330px]">
          <DashboardSideBar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCoupons;
