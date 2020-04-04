import {Component} from 'react';
import auth from "../services/authService";

class Logout extends Component {

    componentDidMount() {
        auth.logout();
        /* Redirect the user to the home page*/
        window.location = '/';
        /* With this, out entire application will be realoaded,
        * App component will be mounted again and navigation bar will be refresh   */
    }

    render() {
        return null;
    }
}

export default Logout;