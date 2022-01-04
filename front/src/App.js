// import logo from "./logo.svg";
import "./App.css";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import First from "./components/First";
import Code from "./components/register/Code";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore,applyMiddleware,compose  } from "redux"
import rootReducer from "./reducers/combine";
import Subinformation from "./components/register/Subinformation";
import PasswordChange from "./components/login/PasswordChange";
import Mainpage from "./components/Mainpage";
import Modal from "react-modal";
import Calendar from "./components/Calender";
import ChatHomePage from "./pages/ChatHomePage";
import ChatPage from "./pages/ChatPage";
import Mypage from "./components/Mypage";
// import Gallary from "./components/Gallary"
// import AppRouter from '../src/router/AppRouter'
import thunk from 'redux-thunk';
import Ogallery from "./components/Ogallery";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
Modal.setAppElement("#root");

let store = createStore(rootReducer,
  composeEnhancers(applyMiddleware(thunk)));

function App() {
  console.log("app렌더링");
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Provider store={store}>
            <Route path="/" exact component={First}></Route>
            <Route path="/register" exact component={Register}></Route>
            <Route path="/login" exact component={Login}></Route>
            <Route path="/code" exact component={Code}></Route>
            <Route path="/calendar" exact component={Calendar}></Route>
            <Route exact path="/chat" component={ChatHomePage} />
            <Route exact path="/chat/:room" component={ChatPage} />
            <Route
              path="/subinformation"
              exact
              component={Subinformation}
            ></Route>
            <Route
              path="/passwordchange"
              exact
              component={PasswordChange}
            ></Route>
            <Route path="/mainpage" exact component={Mainpage}></Route>
            <Route path="/mypage" exact component={Mypage}></Route>
            <Route exact path="/ogallery" component={Ogallery} />
          </Provider>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
