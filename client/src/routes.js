// Dependencies
import React, { Component } from "react";
import { Fragment } from "react";
import { Route, Switch } from "react-router";
import { PrivateRoute } from "./security/PrivateRoute";

// Material UI
import Paper from "@material-ui/core/Paper";

/* START MY VIEWS IMPORT */

import ActorEdit from "./pages/ActorEdit";
import ActorList from "./pages/ActorList";
import FilmEdit from "./pages/FilmEdit";
import FilmList from "./pages/FilmList";
import FilmMakerEdit from "./pages/FilmMakerEdit";
import FilmMakerList from "./pages/FilmMakerList";

/* END MY VIEWS IMPORT */

// CUSTOM VIEWS
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import UserEdit from "./pages/UserEdit";
import UserList from "./pages/UserList";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Fragment>
          <Paper>
            <div className="main-cointainer">
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <PrivateRoute exact path="/users/:id" component={UserEdit} roles={["ADMIN"]}/>
              <PrivateRoute exact path="/users" component={UserList} roles={["ADMIN"]}/>
              
              {/* CUSTOM VIEWS */}

              <PrivateRoute exact path="/home" component={Home} />

              {/* START MY VIEWS */}

              <PrivateRoute exact path="/actors/:id" component={ ActorEdit }  />
              <PrivateRoute exact path="/actors" component={ ActorList }  />
              <PrivateRoute exact path="/films/:id" component={ FilmEdit }  />
              <PrivateRoute exact path="/films" component={ FilmList }  />
              <PrivateRoute exact path="/filmmakers/:id" component={ FilmMakerEdit }  />
              <PrivateRoute exact path="/filmmakers" component={ FilmMakerList }  />

             {/* END MY VIEWS */}

            </div>
          </Paper>
        </Fragment>
      </Switch>
    );
  }
}

export default Routes;