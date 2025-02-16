import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
const { VITE_BASE_URL: API_URL } = import.meta.env;

export default function Navbar() {
  const [isLogin, setIsLogin] = useState(false);
  const checkUser = async () => {
    try {
      const cookie = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
        '$1'
      );
      axios.defaults.headers.common['Authorization'] = cookie;
      await axios.post(`${API_URL}/v2/api/user/check`);
      setIsLogin(true);
    } catch (error) {
      console.log(error);
      setIsLogin(false);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <nav
        className="navbar bg-dark border-bottom border-body"
        data-bs-theme="dark"
      >
        <div className="container d-flex justify-space-between align-items-center">
          <ul className="navbar-nav flex-row gap-5 fs-5">
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/">
                首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/products">
                產品頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/carts">
                購物車
              </NavLink>
            </li>
          </ul>
          {isLogin ? (
            <div className='btn btn-success'>已登入</div>
          ) : (
            <NavLink className="btn btn-secondary" to="/login">
              登入
            </NavLink>
          )}
        </div>
      </nav>
    </>
  );
}
