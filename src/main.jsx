// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Provider } from 'react-redux';
import ShopingCartStore from './Store/ShopingCartStore.jsx';
axios.defaults.baseURL="http://localhost:8080"
createRoot(document.getElementById('root')).render(
  <Provider store={ShopingCartStore}>
    <App />
  </Provider>,
)
