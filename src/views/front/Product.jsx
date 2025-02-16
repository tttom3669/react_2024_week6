import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
const { VITE_BASE_URL: BASE_URL, VITE_API_PATH: API_PATH } = import.meta.env;
import ScreenLoading from '../../components/ScreenLoading';
import ReactLoading from 'react-loading';

export default function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [qtySelect, setQtySelect] = useState(0);
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

  useEffect(() => {
    (async function () {
      try {
        setIsScreenLoading(true);
        const res = await axios.get(
          `${BASE_URL}/v2/api/${API_PATH}/product/${id}`
        );
        setProduct(res.data.product);
      } catch (error) {
        console.log(error);
      } finally {
        setIsScreenLoading(false);
      }
    })();
  }, [id]);

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid"
              src={product.imageUrl}
              alt={product.title}
            />
          </div>
          <div className="col-6">
            <div className="d-flex align-items-center gap-2">
              <h2>{product.title}</h2>
              <span className="badge text-bg-success">{product.category}</span>
            </div>
            <p className="mb-3">{product.description}</p>
            <p className="mb-3">{product.content}</p>
            <h5 className="mb-3">NT$ {product.price}</h5>
            <div className="input-group align-items-center w-75">
              <select
                value={qtySelect}
                onChange={(e) => setQtySelect(e.target.value)}
                id="qtySelect"
                className="form-select"
              >
                {Array.from({ length: 10 }).map((_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="d-flex align-content-center gap-2  btn btn-primary"
                onClick={() => addCart(product.id, Number(qtySelect))}
              >
                加入購物車
                {isLoading.id === product.id && isLoading.loading === true && (
                  <ReactLoading
                    type="spin"
                    color="black"
                    width="1rem"
                    height="1rem"
                  />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isScreenLoading && <ScreenLoading />}
    </>
  );
}
