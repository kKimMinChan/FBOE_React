import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./containers/Home";
import Layout from "./hocs/Layout";
import Login from "./containers/Login";
import Signup from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Activate from "./containers/Activate";

import { Provider } from "react-redux";
import store from "./store";
import Main from "./containers/main";
import FindId from "./containers/FindId";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/FindId" element={<FindId />} />
            <Route
              path="/password/reset/confirm/:uid/:token"
              element={<ResetPasswordConfirm />}
            />
            <Route path="/activation/:uid/:token" element={<Activate />} />
            <Route path="/main/:uid/:token" element={<Main />} />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
