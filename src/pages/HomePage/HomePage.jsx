import React from 'react';
import './homePage.css';
import Header from '../../molecules/Header/Header'

const HomePage = () => {
  return (
    <section className="hero" >
    {/* <Header/> */}
      <div className="text-container">
        <h1 className="main-title">The Future of Automotive Retail.</h1>
        <h2 className="sub-title">AI Powered</h2>
      </div>
      <div className="button-container">
        <a href="/login" className="btn login-btn">Login</a>
        <a href="/signup" className="btn signup-btn">Sign Up</a>
      </div>
    </section>
  );
};

export default HomePage;
