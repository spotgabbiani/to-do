import React, {PropTypes} from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo"/>
      <div className="app-title">
        <span>To do</span>
        <p className="slogan">Keep track of your tasks.</p>
      </div>
      <nav className="main-nav">
      </nav>
    </header>
  );
};

Header.propTypes = {

};

export default Header;
