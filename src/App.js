import './App.css';
import Register from "./components/Registration";
import Login from './components/Login';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/includes/Headers';
import Footer from './components/includes/Footer';
import { useState } from 'react';
import Blog from './components/blog';
import Logout from './components/logout';
import Dashboard from './components/Dashboard';
import Auth from './components/Auth';
import { useDispatch, useSelector } from "react-redux";
import CoinTransferForm from './components/coinTransferForm';
import { loginUser } from "./components/redux/actions/actionParamObj";

function App() {

  let [users, setUsers] = useState([]);
  let [loginError, setLoginError] = useState('');
  const gState = useSelector((state) => state.userReducer);

  let navigate = useNavigate();
  const dispatch = useDispatch();

  function registerNewUser(newUser) {
    let newUserList = [...users];
    newUserList.push(newUser);
    setUsers(newUserList);
  }


  function loginHandler(userData) {
    let newUserList = [...gState.users];

    const loginUserIndex = newUserList.findIndex((element) => element.email === userData.email);

    if (loginUserIndex != '-1') {

      if (newUserList[loginUserIndex].password === userData.password) {
        // localStorage.setItem('user', JSON.stringify(newUserList[loginUserIndex]));
        dispatch(loginUser(newUserList[loginUserIndex]));
        navigate('/dashboard');
      } else {
        setLoginError('Incorrect Password');
      }

    } else {
      setLoginError('User not found');
    }

  }

  return (
    <div className="App">

      <Header />

      <Routes>
        <Route
          path='/'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/dashboard'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                <Dashboard />
              </Auth>
            )
          }}
          userList={users}
          exact
        />
        
        <Route
          path='/register'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                <Register newUser={registerNewUser} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/login'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="not-allowed">
                <Login loginHandler={loginHandler} loginError={loginError} setLoginError={setLoginError} />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/logout'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                <Logout />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/coinTransferForm'
          Component={() => {
            return (
              <Auth authenticatedUser={gState.loggedInUser} authUser="allowed">
                <CoinTransferForm />
              </Auth>
            )
          }}
          exact
        />
        <Route
          path='/blog'
          Component={Blog}
          userList={users}
          exact
        />
        <Route
          path='*'
          Component={() => <h1>ERROR 404</h1>}
          exact
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
