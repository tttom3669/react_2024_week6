import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ paginationData, getProducts }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <Link
            to={`/admin/products?page=${paginationData.current_page - 1}`}
            className={`page-link ${paginationData.has_pre ? '' : 'disabled'}`}
          >
            &laquo;
          </Link>
          {/* <a
            className={`page-link ${paginationData.has_pre ? '' : 'disabled'}`}
            href="#"
            onClick={() => getProducts(paginationData.current_page - 1)}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </a> */}
        </li>
        {[...new Array(paginationData.total_pages)].map((item, i) => {
          return (
            <li
              className={`page-item ${
                paginationData.current_page === i + 1 ? 'active' : ''
              }`}
              key={i + 1}
            >
              <Link to={`/admin/products?page=${i + 1}`} className="page-link">
                {i + 1}
              </Link>
              {/* <a
       
                href="#"
                onClick={() => getProducts(i + 1)}
              >
                {i + 1}
              </a> */}
            </li>
          );
        })}
        <li className="page-item">
          <Link
            to={`/admin/products?page=${paginationData.current_page + 1}`}
            className={`page-link ${paginationData.has_next ? '' : 'disabled'}`}
          >
            &raquo;
          </Link>
          {/* <a
            className={`page-link ${paginationData.has_next ? '' : 'disabled'}`}
            onClick={() => getProducts(paginationData.current_page + 1)}
            href="#"
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </a> */}
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  paginationData: PropTypes.object,
  getProducts: PropTypes.func,
};

export default Pagination;
