import React from 'react';
import Header from '../components/Layout/Header.jsx';
import Categories from '../components/Route/Categories/Categories.jsx';
import Hero from '../components/Route/Hero/Hero.jsx';

const HomePage = () => {
  return (
    <div>
      <Header activeHeading={1} />
      <Hero />
      <Categories />
    </div>
  );
};

export default HomePage;