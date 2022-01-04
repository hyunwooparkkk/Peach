import React from "react";
import ReactDOM from "react-dom";
// import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { Provider } from 'react-redux';
// import AppRouter from './router/AppRouter';
// import store from './store/store';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './styles.scss';

// basic index.js
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// 진우님 index.js
// ReactDOM.render(
//     <Provider store={store}>
//       <AppRouter />
//     </Provider>,
//     document.getElementById('root')
// );
  

reportWebVitals();
