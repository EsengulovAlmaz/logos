import React from 'react';
import { BiMap, BiPhoneCall } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { BsPersonFill } from 'react-icons/bs';
import { customContext } from '../../utils/Context';

import "./Header.scss";
import BasketEmpty from '../BasketEmpty/BasketEmpty';

const Header = () => {
  const { user, setUser, basket } = React.useContext(customContext);
  const [show, setShow] = React.useState(false);
  const navigate = useNavigate();

  const logOutUser = () => {
    setUser({
      email: ""
    });
    localStorage.removeItem("user");
    navigate("/register");
  }

  return (
    <header className="header">
      <div className="container">
        <nav className="header__nav">
          <div className="header__right">
            <h1 className="header__title">
              <Link to={"/"}>LOGOS</Link>
            </h1>
            <div className="header__content">
              <div className="header__search">
                <span className="header__search-map">
                  <BiMap size={20} />
                </span>
                <input type="text" className="header__search-input" placeholder="Введите адрес доставки" />
                <span className="header__search-icon">
                  <CiSearch size={20} />
                </span>
              </div>
              <div className="header__contact">
                <span className="header__contact-icon">
                  <BiPhoneCall />
                </span>
                <div className="header__contact-text">
                  Контакты: <br />
                  <a href="tel:+7 (917) 510-57-59" className="header__contact-link">
                    +7 (917) 510-57-59
                  </a>
                </div>
              </div>
            </div>
          </div>

          {
            user.email.length === 0
              ? <Link to={"/register"} className="header__log-out">
                <BsPersonFill />
                Войти
              </Link>
              : <Link onClick={logOutUser} to={"/login"} className="header__log-out">
                <FaSignInAlt />
                Выйти
              </Link>
          }

          <button className="header__btn" onClick={() => basket.length ? navigate("/basket") : setShow(true)}>
            Корзина
            <span className="header__btn-count">
              {basket.length}
            </span>
          </button>
        </nav>
      </div>
      <BasketEmpty show={show} setShow={setShow} />
    </header>
  )
};

export default Header;