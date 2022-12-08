import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_BRANDS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('brand/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_BRAND = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`brand/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_BRAND = ({ brand }) => {
    const data = qs.stringify({
        brand_name: brand
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`brand/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_BRAND = ({ brand }, id) => {
    const data = qs.stringify({
        brand_name: brand
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`brand/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_BRAND = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`brand/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_BRANDS, GET_BRAND, ADD_BRAND, UPDATE_BRAND, DELETE_BRAND };
