import React from "react";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Tweet from "./pages/Tweet";
// import Callback from './components/Callback';
// import Auth from "./components/Auth";
import { BrowserRouter as Router, Route } from "react-router-dom";
// const auth = new Auth();

// const handleAuthentication = ({ location }) => {
//   if (/access_token|id_token|error/.test(location.hash)) {
//     auth.handleAuthentication();
//   }
// }

const Routes = () => (
  <Router>
    <div>
      <Route exact path="/login" render={(props) => <Login {...props} />} />
      <Route exact path="/" render={(props) => <Home {...props} />} />
      <Route exact path="/Tweet" render={(props) => <Tweet {...props} />} />
    </div>
  </Router>
);

export default Routes;
