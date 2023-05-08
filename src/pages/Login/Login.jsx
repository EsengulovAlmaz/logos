import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { customContext } from '../../utils/Context';
import instance from '../../utils/axios';

const Login = () => {
  const { setUser } = React.useContext(customContext);
  const navigate = useNavigate();

  const logInUser = (e) => {
    e.preventDefault();

    let newUser = {
      email: e.target[0].value,
      password: e.target[1].value
    }

    instance.post("http://localhost:8080/login", newUser)
      .then(res => {
        setUser({
          token: res.data.accessToken,
          ...res.data.user
        });

        localStorage.setItem("user", JSON.stringify({
          token: res.accessToken,
          ...res.data.user
        }));

        navigate("/");
      })
  }

  return (
    <div className="content">
      <form action="" className="form" onSubmit={logInUser}>
        <h2 className="form__title">Вход на LOGOS</h2>

        <input type="email" className="form__field" placeholder="Email" />
        <input type="password" className="form__field" placeholder="Пароль" />
        <div className="form__create">
          <Link to="/register" >Создать аккаунт</Link>
        </div>
        <button className="form__btn" type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login