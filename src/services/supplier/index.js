import axios, { catchCallBack } from '../config';

import qs from 'qs';

const GET_SUPPLIERS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('supplier/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_SUPPLIER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`supplier/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_SUPPLIER = ({ supplierName, supplierPhone, supplierAddress }) => {
    const data = qs.stringify({
        supplier_name: supplierName,
        supplier_phone: supplierPhone,
        supplier_address: supplierAddress
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`supplier/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_SUPPLIER = ({ supplierName, supplierPhone, supplierAddress }, id) => {
    const data = qs.stringify({
        supplier_name: supplierName,
        supplier_phone: supplierPhone,
        supplier_address: supplierAddress
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`supplier/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_SUPPLIER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`supplier/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_SUPPLIERS, GET_SUPPLIER, ADD_SUPPLIER, UPDATE_SUPPLIER, DELETE_SUPPLIER };
