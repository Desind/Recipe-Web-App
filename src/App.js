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
import RecipeDetails from "./pages/recipeDetails";
import AdminPanel from "./pages/adminPanel";
import EditRecipe from "./pages/editRecipe";
import UserProfile from "./pages/userProfile";

function App() {
  return (
          <BrowserRouter>
              <ToastContainer/>
              <Header/>
              <ContentWrapper>
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
                    <Route exact path="/recipe/:id">
                        <RecipeDetails/>
                    </Route>
                    <Route exact path="/edit/:id">
                        <EditRecipe/>
                    </Route>
                    <Route exact path="/new">
                        <NewRecipe/>
                    </Route>
                    <Route exact path="/admin">
                        <AdminPanel/>
                    </Route>
                    <Route exact path={"/profile"}>
                        <UserProfile/>
                    </Route>
                </Switch>
              </ContentWrapper>
          </BrowserRouter>
  );
}

export default App;
