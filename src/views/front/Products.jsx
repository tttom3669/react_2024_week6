import { useEffect, useState } from 'react';
import axios from 'axios';
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';
const { VITE_BASE_URL: BASE_URL, VITE_API_PATH: API_PATH } = import.meta.env;
import ScreenLoading from '../../components/ScreenLoading';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [isScreenLoading, setIsScreenLoading] = useState(false);
  const [isLoading, setIsLoading] = useState({});

  const addCart = async (productId, qty = 1) => {
    try {
      setIsLoading({ id: productId, loading: true });
      await axios.post(`${BASE_URL}/v2/api/${API_PATH}/cart`, {
        data: {
          product_id: productId,
          qty,
        },
      });
      alert('已加入購物車');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading({ id: productId, loading: false });
    }
  };

  const getProducts = async () => {
    try {
      setIsScreenLoading(true);
      const res = await axios.get(`${BASE_URL}/v2/api/${API_PATH}/products`);
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      alert('取得產品失敗');
    } finally {
      setIsScreenLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <div className="container mt-5">
        <h1 className="text-center fw-bold mb-2">產品頁</h1>
        <table className="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td style={{ width: '200px' }}>
                  <img
                    className="img-fluid"
                    src={product.imageUrl}
                    alt={product.title}
                  />
                </td>
                <td>{product.title}</td>
                <td>
                  <del className="h6">原價 {product.origin_price} 元</del>
                  <div className="h5">特價 {product.price}元</div>
                </td>
                <td>
                  <div className="btn-group btn-group-sm">
                    <Link
                      to={`/products/${product.id}`}
                      className="btn btn-outline-secondary"
                    >
                      產品詳細頁
                    </Link>
                    <button
                      type="button"
                      className="d-flex align-content-center gap-2 btn btn-outline-danger"
                      onClick={() => {
                        addCart(product.id);
                      }}
                      disabled={isLoading.loading}
                    >
                      加到購物車
                      {isLoading.id === product.id &&
                        isLoading.loading === true && (
                          <ReactLoading
                            type="spin"
                            color="black"
                            width="1rem"
                            height="1rem"
                          />
                        )}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isScreenLoading && <ScreenLoading />}
    </>
  );
}
