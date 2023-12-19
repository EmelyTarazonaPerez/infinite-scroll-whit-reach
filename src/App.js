import './App.css';
import ProductsComponent from './components/productsComponent';

function App() {
  return (
    <div className="App">
      <h1>Categoria mascotas<span>.</span></h1>
      <p className='sub-tittle'>Alimentos</p>
      <ProductsComponent />
    </div>
  );
}

export default App;
