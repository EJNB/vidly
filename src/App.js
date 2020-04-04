import React, {Component} from 'react';
import Movies from "./components/movies";
import NavBar from "./components/navbar";
import jwtDecode from 'jwt-decode';
import {Route, Switch, Redirect} from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import './App.css';

class App extends Component {
    state = {};

    /* This method called only once during the life cycle on our application,
    * becouse where app component is mounted once and then whenever, we change the state is re-render*/
    componentDidMount() {
        try {
            const jwt = localStorage.getItem('token');
            const user = jwtDecode(jwt);
            this.setState({user});
        } catch (e) {}
    }

    render() {
        return (
            <React.Fragment>
                <ToastContainer/>
                <NavBar user={this.state.user}/>
                <main className="container">
                    <Switch>
                        <Route path="/login" component={LoginForm}/>
                        <Route path="/register" component={RegisterForm}/>
                        <Route path="/movies/:id" component={MovieForm}/>
                        <Route path="/movies" component={Movies}/>
                        <Route path="/customers" component={Customers}/>
                        <Route path="/rentals" component={Rentals}/>
                        <Route path="/not-found" component={NotFound}/>
                        <Redirect from="/" exact to="/movies"/>
                        <Redirect to="/not-found"/>
                    </Switch>
                </main>
            </React.Fragment>
        );
    }
}

export default App;
