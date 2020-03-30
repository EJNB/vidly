import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const NavBar = props => {
    return (
        <React.Fragment>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">Vidly</Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <NavLink className="nav-item nav-link" to="/movies">Movies</NavLink>
                        <NavLink className="nav-item nav-link" to="/customers">Customers</NavLink>
                        <NavLink className="nav-item nav-link" to="/rentals">Rentals</NavLink>
                        <NavLink className="nav-item nav-link" to="/login">Login</NavLink>
                        <NavLink className="nav-item nav-link" to="/register">Register</NavLink>
                    </ul>
                </div>
            </nav>
        </React.Fragment>
    );
};

export default NavBar;
