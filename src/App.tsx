import { Route, Routes } from 'react-router-dom';
import { HomePage, ProductPage } from './pages';
import { Header } from './components/Header/index';
import { Footer } from './components/Footer';
import { CreateProduct } from './components/CreateProduct';
import { Snackbar } from './components/Snackbar/index';

export const App = () => {
  return (
    <>
      <Header />
      <main className="grow p-5">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/product" element={<CreateProduct />} />
        </Routes>
      </main>
      <Footer />
      <Snackbar />
    </>
  );
};
