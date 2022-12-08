import axios, { catchCallBack } from '../config';

import qs from 'qs';

const GET_PRODUCTS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('product/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PRODUCT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`product/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PRODUCT = ({ product, portion, brand }) => {
    const data = qs.stringify({
        product_name: product,
        product_portion: portion,
        brand_id: brand
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`product/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_PRODUCT = ({ product, portion, brand }, id) => {
    const data = qs.stringify({
        product_name: product,
        product_portion: portion,
        brand_id: brand
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`product/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_PRODUCT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`product/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_PRODUCTS, GET_PRODUCT, ADD_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT };
