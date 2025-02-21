import Navbar from '../components/Navbar';
import axios from 'axios';
import { useState } from 'react';
const { VITE_BASE_URL: API_URL } = import.meta.env;
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [account, setAccount] = useState({});
  const navigate = useNavigate();
  const accountHandler = (e) => {
    const { value, name } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };
  const signIn = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/v2/admin/signin`, account);
      const { token, expired } = res.data;
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
      axios.defaults.headers.common['Authorization'] = token;
      alert('登入成功');
    } catch (error) {
      alert('帳號或密碼錯誤');
      console.log(error);
    } finally {
      navigate('/admin');
    }
  };
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <div
              className={`flex-column justify-content-center align-items-center vh-100`}
            >
              <h1 className="mb-5">請先登入</h1>
              <form className="d-flex flex-column gap-3" onSubmit={signIn}>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="username"
                    id="username"
                    placeholder="name@example.com"
                    onChange={accountHandler}
                  />
                  <label htmlFor="username">Email address</label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    onChange={accountHandler}
                  />
                  <label htmlFor="password">Password</label>
                </div>
                <button className="btn btn-primary">登入</button>
              </form>
              <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
