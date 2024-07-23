import React, {useEffect, useState} from 'react';
import axios from "axios";
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
const ProductDetail = (props) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const from = searchParams.get('from');
  const navigate = useNavigate();
  const productId = useParams().productId;
  const apiUrl = process.env.REACT_APP_API_HOST

  const [productDetail, setProductDetail] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const goList = () => {
    console.log('from == ' + from)
    if(from === null) {
      navigate("/products?page=0")
    } else {
      navigate(`/products?page=${from}`)
    }
  }

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await axios.get(`${apiUrl}/products/${productId}`);
        setProductDetail(response.data);
      } catch (error) {
        if (error.response) {
          setError(`Error: ${error.response.data.errorCode} - ${error.response.data.errorMessage}`);
        } else if (error.request) {
          setError('Error: No response received from server');
        } else {
          setError(`Error: ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div>
        <h3>Product Detail</h3>
        id: {productDetail.id} <br/>
        name: {productDetail.name} <br/>
        price: {productDetail.price} <br/>
        description: {productDetail.description} <br/>
        <br/>

        <button onClick={goList}>Back to Product List</button>
      </div>
  );
};

export default ProductDetail;