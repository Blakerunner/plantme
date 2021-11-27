import React from 'react';
import TopNavHome from '../components/nav-bars/topNavHome';
import TopNavHomeAdmin from '../components/nav-bars/topNavHomeAdmin';

const Home = ({ auth, user }) => {
  if (auth.isAuthenticated) {
    return (
      <div>
        <TopNavHomeAdmin user={user} />
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
