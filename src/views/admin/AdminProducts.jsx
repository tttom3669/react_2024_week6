import { useEffect, useState, useRef } from 'react';
// import PropTypes from 'prop-types';
import { Modal } from 'bootstrap';
import axios from 'axios';
import ProductModal from '../../components/ProductModal';
import DeleteModal from '../../components/DeleteModal';
import Pagination from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
const { VITE_BASE_URL: API_URL, VITE_API_PATH: API_PATH } = import.meta.env;
import { cookie as cookieData } from '../../slices/accountSlice';
import Toast from '../../components/Toast';

const defaultModalState = {
  imageUrl: '',
  title: '',
  category: '',
  unit: '',
  origin_price: '',
  price: '',
  description: '',
  content: '',
  is_enabled: 0,
  imagesUrl: [''],
};

/**
 * 產品面板
 */
const AdminProducts = () => {
  const [tempProduct, setTempProduct] = useState(defaultModalState);
  const [products, setProducts] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [modalStatus, setModalStatus] = useState('create');
  const modalRef = useRef(null);
  const deleteRef = useRef(null);
  const [searchParams] = useSearchParams();
  const cookie = useSelector(cookieData);


  const getProducts = async (page = 1) => {
    try {
      const res = await axios.get(
        `${API_URL}/v2/api/${API_PATH}/admin/products?page=${page}`
      );
      const { products: productsResult, pagination: paginationResult } =
        res.data;
      setPaginationData({ ...paginationResult });
      setProducts([...productsResult]);
    } catch (error) {
      console.log(error);
    }
  };
  const openModal = (product) => {
    const modalInstance = Modal.getInstance(modalRef.current);
    if (!product) {
      setModalStatus('create');
      setTempProduct(defaultModalState);
    } else {
      setModalStatus('update');
      setTempProduct(product);
    }
    modalInstance.show();
  };
  const openDelModal = (product) => {
    setTempProduct(product);
    const modalInstance = Modal.getInstance(deleteRef.current);
    modalInstance.show();
  };

  useEffect(() => {
    new Modal(modalRef.current);
    new Modal(deleteRef.current);
  }, []);

  useEffect(() => {
    if (!cookie) {
      return;
    }
    axios.defaults.headers.common['Authorization'] = cookie;
    getProducts(searchParams.get('page') || 1);
  }, [searchParams, cookie]);

  return (
    <>
      <div className={`container py-5`}>
        <div className="row">
          <div className="col-12">
            <div className="d-flex align-items-center justify-content-between">
              <h2>產品列表</h2>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => openModal()}
              >
                建立新的產品
              </button>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">產品名稱</th>
                  <th scope="col">原價</th>
                  <th scope="col">售價</th>
                  <th scope="col">是否啟用</th>
                  <th scope="col">查看細節</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <th scope="row">{product.title}</th>
                    <td>{product.origin_price}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? '啟用' : '未啟用'}</td>
                    <td>
                      <div className="btn-group">
                        <button
                          type="button"
                          onClick={() => openModal(product)}
                          className="btn btn-outline-primary btn-sm"
                        >
                          編輯
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => openDelModal(product)}
                        >
                          刪除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="col-12">
            <Pagination
              getProducts={getProducts}
              paginationData={paginationData}
            />
          </div>
        </div>
        <ProductModal
          tempProduct={tempProduct}
          setTempProduct={setTempProduct}
          modalRef={modalRef}
          modalStatus={modalStatus}
          getProducts={getProducts}
          paginationData={paginationData}
        />
        <DeleteModal
          tempProduct={tempProduct}
          deleteRef={deleteRef}
          getProducts={getProducts}
          paginationData={paginationData}
        />
      </div>
      <Toast />
    </>
  );
};

export default AdminProducts;
