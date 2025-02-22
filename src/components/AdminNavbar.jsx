import { NavLink } from 'react-router-dom';
import { useEffect } from 'react';
import { asyncCheckUser, asyncLogout, cookie } from '../slices/accountSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { isLogin as isLoginData } from '../slices/accountSlice';

export default function AdminNavbar() {
  const dispatch = useDispatch();
  const isLogin = useSelector(isLoginData);
  const navigate = useNavigate();

  useEffect(() => {
    const cookie = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    dispatch(asyncCheckUser({ cookie, navigate }));
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
                前台首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="/admin">
                後台首頁
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" aria-current="page" to="products">
                後台產品
              </NavLink>
            </li>
          </ul>
          {isLogin ? (
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                dispatch(asyncLogout({ cookie, navigate }));
              }}
            >
              登出
            </button>
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
