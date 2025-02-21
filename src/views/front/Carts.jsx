import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { useForm, useWatch } from 'react-hook-form';

const { VITE_BASE_URL: BASE_URL, VITE_API_PATH: API_PATH } = import.meta.env;

function Carts() {
  const [cartsData, setCartsData] = useState({});
  const [isScreenLoading, setIsScreenLoading] = useState(false);

  const getCarts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/cart`);
      setCartsData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCart = async (cart, qty) => {
    try {
      setIsScreenLoading(true);
      await axios.put(`${BASE_URL}/v2/api/${API_PATH}/cart/${cart.id}`, {
        data: {
          product_id: cart.product_id,
          qty,
        },
      });
      getCarts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  const deleteCart = async (cartId) => {
    setIsScreenLoading(true);
    const url = cartId
      ? `${BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`
      : `${BASE_URL}/v2/api/${API_PATH}/carts`;
    try {
      await axios.delete(url);
      getCarts();
    } catch (error) {
      console.log(error);
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getCarts();
  }, []);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onTouched',
  });
  const onSubmit = async (data) => {
    if (cartsData.carts.length <= 0) {
      alert('購物車中未有產品');
      return;
    }
    const { name, email, tel, address, message } = data;
    try {
      const res = await axios.post(`${BASE_URL}/v2/api/${API_PATH}/order`, {
        data: {
          user: {
            name,
            email,
            tel,
            address,
          },
          message,
        },
      });
      getCarts();
      alert(res.data.message);
      reset();
    } catch (error) {
      alert(error.response.data.message);
      console.log(error);
    }
  };
  useWatch({ control });

  return (
    <>
      <div className="container">
        <div className="mt-5">
          <h1 className="text-center fw-bold mb-2">購物車</h1>
          <div className="text-end py-3">
            <button
              className="btn btn-outline-danger"
              type="button"
              onClick={() => deleteCart()}
              disabled={!cartsData?.carts?.length}
            >
              清空購物車
            </button>
          </div>

          <table className="table align-middle">
            <thead>
              <tr>
                <th></th>
                <th>品名</th>
                <th style={{ width: '150px' }}>數量/單位</th>
                <th className="text-end">單價</th>
              </tr>
            </thead>

            <tbody>
              {cartsData?.carts &&
                cartsData?.carts.map((cart) => (
                  <tr key={cart.id}>
                    <td>
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteCart(cart.id)}
                      >
                        x
                      </button>
                    </td>
                    <td>{cart.product.title}</td>
                    <td style={{ width: '150px' }}>
                      <div className="d-flex align-items-center">
                        <div className="btn-group me-2" role="group">
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            disabled={cart.qty === 1}
                            onClick={() => updateCart(cart, cart.qty - 1)}
                          >
                            -
                          </button>
                          <span
                            className="btn border border-dark"
                            style={{ width: '50px', cursor: 'auto' }}
                          >
                            {cart.qty}
                          </span>
                          <button
                            type="button"
                            className="btn btn-outline-dark btn-sm"
                            onClick={() => updateCart(cart, cart.qty + 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="input-group-text bg-transparent border-0">
                          {cart.product.unit}
                        </span>
                      </div>
                    </td>
                    <td className="text-end"> {cart.product.price}</td>
                  </tr>
                ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan="3" className="text-end">
                  總計：
                </td>
                <td className="text-end" style={{ width: '130px' }}>
                  {cartsData?.final_total}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="my-5 row justify-content-center">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                type="email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                placeholder="請輸入 Email"
                {...register('email', {
                  required: {
                    value: true,
                    message: 'Email 為必填',
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/,
                    message: 'Email 格式不正確',
                  },
                })}
              />
              <p className="invalid-feedback my-2">{errors?.email?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                id="name"
                className={`form-control ${errors.name && 'is-invalid'}`}
                placeholder="請輸入姓名"
                {...register('name', {
                  required: {
                    value: true,
                    message: '收件人姓名為必填',
                  },
                })}
              />

              <p className="invalid-feedback my-2">{errors?.name?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人電話
              </label>
              <input
                id="tel"
                type="tel"
                className={`form-control ${errors.tel && 'is-invalid'}`}
                placeholder="請輸入電話"
                {...register('tel', {
                  required: {
                    value: true,
                    message: '電話為必填',
                  },
                  pattern: {
                    value: /^(0[2-8]\d{7}|09\d{8})$/,
                    message: '電話格式不正確',
                  },
                  minLength: {
                    value: 8,
                    message: '電話不少於 8 碼',
                  },
                })}
              />

              <p className="invalid-feedback my-2">{errors?.tel?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                id="address"
                type="text"
                className={`form-control ${errors.address && 'is-invalid'}`}
                placeholder="請輸入地址"
                {...register('address', {
                  required: {
                    value: true,
                    message: '地址為必填',
                  },
                })}
              />

              <p className="text-danger my-2">{errors?.address?.message}</p>
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                id="message"
                className="form-control"
                cols="30"
                rows="10"
                {...register('message')}
              ></textarea>
            </div>
            <div className="text-end">
              <button
                type="submit"
                className="btn btn-danger"
                disabled={!cartsData?.carts?.length}
              >
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>

      {isScreenLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(255,255,255,0.3)',
            zIndex: 3000,
          }}
        >
          <ReactLoading type="spin" color="black" width="4rem" height="4rem" />
        </div>
      )}
    </>
  );
}

export default Carts;
