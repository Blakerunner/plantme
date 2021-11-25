import React from 'react';
import TopNavHome from '../components/nav-bars/topNavHome';
import TopNavHomeAdmin from '../components/nav-bars/topNavHomeAdmin';

const Home = ({ auth }) => {
  console.log('home', auth.isAuthenticated);

  if (auth.isAuthenticated) {
    return (
      <div>
        <TopNavHomeAdmin />
      </div>
    );
  }
  return (
    <div>
      <TopNavHome />
    </div>
  );
};

export default Home;
