import "./Header.scss";
import React from 'react';
import logo from '../../assets/logo/logo-1.png';

function Header() {

  return (
    <header className="header">
      <div className="header__container">
        <img src={logo} className="header__logo"/>
      </div>
    </header>
  )
}

export default Header;
