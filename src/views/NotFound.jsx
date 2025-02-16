import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 2000);
  }, [navigate]);
  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center mb-2 fw-bold">404</h1>
      </div>
    </>
  );
}
