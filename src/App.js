import React from 'react';
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import {Route, Switch, Redirect} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
// import './App.css';

function App() {
    return (
        <React.Fragment>
            <NavBar/>
            <main className="container">
                <Switch>
                    <Route path="/movies" component={Movies}></Route>
                    <Route path="/customers" component={Customers}></Route>
                    <Route path="/rentals" component={Rentals}></Route>
                    <Route path="/not-found" component={NotFound}></Route>
                    <Redirect from="/" exact to="/movies"/>
                    <Redirect to="/not-found"/>
                </Switch>
            </main>
        </React.Fragment>
    );
}

export default App;
