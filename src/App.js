import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './component/header';
import Main from './component/main';
import Product from './component/product';
import ProductDetail from './component/productDetail';
import NotFound from './component/notFound';
import AddProduct from './component/productCreate'

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  let data = {'name': 'od'}

  return (
      <div>
        <BrowserRouter>
          <Header name={data.name}/>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/products" element={<Product />} />
            <Route path="/add-product" element={<AddProduct />} />
            {/* pathVariable setting */}
            <Route path="/products/:productId" element={<ProductDetail />} />
            {/* 일치하는 라우트가 없는경우 처리 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;
