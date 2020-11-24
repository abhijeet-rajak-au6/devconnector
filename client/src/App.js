import React from "react";
import "./App.css";
import { Switch, Redirect, BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import RouteProtection from "./components/common/RouteProtection";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Profiles from "./components/Profiles";
import CreateProfile from "./components/CreateProfile";
import ViewProfile from "./components/ViewProfile";
import AddExperience from "./components/AddExperience";
import AddEducation from "./components/AddEducation";
import Post from './components/Post';
import DashBoard from "./pages/DashBoard";
import Posts from "./components/Posts";
import store from "./redux/store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Switch>
              <RouteProtection exact path="/login" component={Login} />
              <RouteProtection exact path="/register" component={Register} />
              <RouteProtection exact path="/dashboard" component={DashBoard} />
              <RouteProtection exact path="/post/:id" component={Post}/>
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/viewProfile/:id" component={ViewProfile} />
              <RouteProtection
                exact
                path="/createProfile"
                component={CreateProfile}
              />

              <RouteProtection exact path="/posts" component={Posts} />
              <RouteProtection
                exact
                path="/addExperience"
                component={AddExperience}
              />
              <RouteProtection
                exact
                path="/addEducation"
                component={AddEducation}
              />
              <RouteProtection
                exact
                path="/addEducation"
                component={CreateProfile}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
