import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";

const AddProduct = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_HOST

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!validation()) {
      return;
    }

    const newProduct = {
      name,
      price: parseInt(price),
      description
    };

    try {
      const response = await axios.post(`${apiUrl}/products`, newProduct);
      navigate(`/products/${response.data.id}`);

    } catch (error) {
      if (error.response) {
        setMessage(`Error: ${error.response.data.errorCode} - ${error.response.data.errorMessage}`);
      } else if (error.request) {
        setMessage('Error: No response received from server');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  const validation = () => {
    if(!name) {
      setMessage('이름은 필수값 입니다.');
      return false;
    } else if (!price) {
      setMessage('금액은 필수값 입니다.');
      return false;
    } else if (!description) {
      setMessage('설명은 필수값 입니다.');
      return false;
    }
    return true;
  }


  return (
    <Container>
      <br />
      <h2>Create New Product</h2>
      {message && <p>{message}</p>}

      <Form className="mt-4" onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Control type="text" placeholder="name" onChange={(e) => setName(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Control type="number" placeholder="price" onChange={(e) => setPrice(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" >
          <Form.Control type="text" placeholder="description" onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>
        <Button variant="outline-info" type="submit">Submit</Button>
        <Button variant="outline-info" onClick={() => navigate(-1)}>Back</Button>
      </Form>
    </Container>
  );
};

export default AddProduct;
