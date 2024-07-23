import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Table from "react-bootstrap/Table";
import {Button} from "react-bootstrap";


const Product = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page');
  const navigate = useNavigate();

  // 환경변수 로드
  const apiUrl = process.env.REACT_APP_API_HOST

  const [productResponse, setProductResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nowPage, setNowPage] = useState(page ?  parseInt(page, 10) : 0);
  const [maxPage, setMaxPage] = useState(10);

  useEffect(() => {
    const url = `${apiUrl}/products?page=${nowPage}`

    const fetchProducts = async () => {
      try {
        const response = await axios.get(url);
        setProductResponse(response.data.productList);
        setMaxPage(response.data.maxPage)
        console.log(nowPage)
        console.log(maxPage)
      } catch (error) {

        // 서버가 응답을 반환한 경우 (show custom error message)
        if (error.response) {
          setError(`Error: ${error.response.data.errorCode} - ${error.response.data.errorMessage}`);
          // 요청이 이루어졌지만 응답이 없는 경우
        } else if (error.request) {
          setError('Error: No response received from server');
          // 요청 설정 중에 발생한 에러
        } else {
          setError(`Error: ${error.message}`);
        }

      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [nowPage]); // hook 설정 (페이지 변경시 리로드)

  const handleTitleClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
      <div className="container mt-4">
        <h3>Product List</h3>
        <Table striped bordered hover>
          <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
          </tr>
          </thead>
          <tbody>
          {productResponse.map((product, index) => (
              <tr key={product.id}>
                <td>{index + 1}</td>
                <td>
                  <Button variant="link" onClick={() => handleTitleClick(product.id)}>
                    {product.name}
                  </Button>
                </td>
              </tr>
          ))}
          </tbody>
        </Table>

        <div className="justify-content-md-center">
          <Button variant="outline-info" onClick={() => setNowPage(nowPage > 0 ? nowPage - 1 : 0)} disabled={nowPage === 0}>
            Previous Page
          </Button>
          <Button variant="outline-info" onClick={() => setNowPage(nowPage + 1)} disabled={nowPage >= maxPage}>
            Next Page
          </Button>
        </div>

      </div>
  );
};

export default Product;