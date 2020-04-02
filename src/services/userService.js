import http from './httpService';
import {apiUrl} from '../config';

const apiEndpoint= `${apiUrl}/users`;

export function saveUser(user) {
    return http.post(apiEndpoint, {
        email: user.username,
        password: user.password,
        name: user.name
    });
}
