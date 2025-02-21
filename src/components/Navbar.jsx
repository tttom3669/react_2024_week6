import { NavLink } from 'react-router-dom';

export default function Navbar() {
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
          <NavLink className="btn btn-secondary" to="/login">
            登入
          </NavLink>
        </div>
      </nav>
    </>
  );
}
