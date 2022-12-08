import axios from 'axios';
// Next we make an 'instance' of it
const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL
    // baseURL: 'https://api.cosisma.com/'

    // baseURL: 'http://localhost/api_app_api/'
    // baseURL: 'http://192.168.43.18/api_app/'
});

// Where you would set stuff like your 'Authorization' header, etc ...
// if (localStorage.getItem('accessToken')) {
//     instance.defaults.headers.common.Authorization = localStorage.getItem('accessToken');
// }
instance.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

export function catchCallBack(error) {
    if (error.response) {
        // console.log('error.response ', error.response);
        return error.response;
    }
    if (error.request) {
        // console.log('error.request ', error.request);
        return error.request;
    }
    if (error.message) {
        // do something other than the other two
        // console.log('error.message ', error.message);
        return error.message;
    }
    return error;
}
export default instance;
