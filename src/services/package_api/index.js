import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_PACKAGES = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('package/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PACKAGE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`package/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PACKAGE_DESIGNATOR = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`package/designator/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PACKAGE = ({ packageName, packageDesc }) => {
    const data = qs.stringify({
        package_name: packageName,
        package_desc: packageDesc
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`package/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_PACKAGE = ({ packageName, packageDesc }, id) => {
    const data = qs.stringify({
        package_name: packageName,
        package_desc: packageDesc
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`package/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_PACKAGE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`package/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_PACKAGES, GET_PACKAGE, ADD_PACKAGE, UPDATE_PACKAGE, DELETE_PACKAGE, GET_PACKAGE_DESIGNATOR };
