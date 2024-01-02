import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Pricing from './pages/Pricing';
import NotFound from './pages/NotFound';
import Product from './pages/Product';
import Login from './pages/Login';
import AppLayout from './pages/AppLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/pricing' element={<Pricing />} />
        <Route path='/product' element={<Product />} />
        <Route path='/login' element={<Login />} />
        <Route path='/app' element={<AppLayout />}>
          <Route path='cities' element={<p>Cities</p>} />
          <Route path='country' element={<p>Country</p>} />
          <Route path='form' element={<p>Form</p>} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
