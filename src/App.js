import React from "react";
import Homepage from "./pages/homepage"
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";
import ContentWrapper from "./components/contentWrapper";
import Header from "./components/header";
import Login from "./pages/login";
import Register from "./pages/register";
import NewRecipe from "./pages/newRecipe";

function App() {
  return (
      <ContentWrapper>
          <ToastContainer/>
          <BrowserRouter>
              <Header/>
              <Switch>
                  <Route exact path="/">
                      <Homepage/>
                  </Route>
                  <Route exact path="/login">
                      <Login/>
                  </Route>
                  <Route exact path="/register">
                      <Register/>
                  </Route>
                  <Route exact path="/new">
                      <NewRecipe/>
                  </Route>
              </Switch>
          </BrowserRouter>
      </ContentWrapper>
  );
}

export default App;
