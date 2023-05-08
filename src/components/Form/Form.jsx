import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPencilAlt } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { customContext } from '../../utils/Context';
import instance from '../../utils/axios';

import "./Form.scss";

const Form = () => {
  const { setUser } = useContext(customContext);
  const navigate = useNavigate();
  const [status, setStatus] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [eye, setEye] = React.useState(false);

  const registerUser = (e) => {
    e.preventDefault();

    const newUser = {
      email,
      password: e.target[0].value
    }

    instance.post("/register", newUser)
      .then(({ data }) => {
        setUser({
          token: data.accessToken,
          ...data.user
        })
        localStorage.setItem("user", JSON.stringify({
          token: data.accessToken,
          ...data.user
        }))
        navigate("/")
      })
      .catch(err => console.log(err.message))
  }

  return (
    <div className="content">
      <form action="" className="form" onSubmit={registerUser}>
        {status &&
          <p onClick={() => setStatus(false)} className="form__email">{email} <FaPencilAlt /></p>}

        <h2 className="form__title">
          {
            status
              ? "Придумай пароль для входа"
              : "Регистрация"
          }
        </h2>

        {
          status
          && <>
            <div className="form__password">
              <input
                className="form__field"
                type={eye ? "text" : "password"}
                placeholder="Придумайте пароль"
              />
              <span onClick={() => setEye(prev => !prev)} className="form__eye">
                {
                  eye
                    ? <AiOutlineEyeInvisible />
                    : <AiOutlineEye />
                }
              </span>
            </div>
            <button className="form__btn" type="submit">Создать аккаунт</button>
          </>
        }

        {
          !status && <>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form__field"
              type="email"
              placeholder="Введите email"
            />
            <button
              onClick={() => setStatus(true)}
              className="form__btn"
            >Продолжить</button>
            <Link to={"/login"} className="form__">У меня есть аккаунт</Link>
          </>
        }

      </form>
    </div>
  )
};

export default Form;