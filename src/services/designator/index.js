import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_DESIGNATORS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('designator/all', { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const GET_DESIGNATOR = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`designator/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const GET_DESIGNATOR_PRODUCT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`designator/product/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const ADD_DESIGNATOR = ({ designatorCode, designatorDesc, productId }) => {
    const data = qs.stringify({
        designator_code: designatorCode,
        designator_desc: designatorDesc,
        product_id: productId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`designator/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_DESIGNATOR_PACAKGE = ({ designatorid, packageid, materialprice, serviceprice }) => {
    const data = qs.stringify({
        designator_id: designatorid,
        package_id: packageid,
        material_price: materialprice,
        service_price: serviceprice
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`designatorPackage/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_DESIGNATOR_PRODUCT = ({ designatorid, productid }) => {
    const data = qs.stringify({
        designator_id: designatorid,
        product_id: productid
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`designatorPackage/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

const UPDATE_DESIGNATOR = ({ designatorCode, designatorDesc, productId }, id) => {
    const data = qs.stringify({
        designator_code: designatorCode,
        designator_desc: designatorDesc,
        product_id: productId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`designator/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_DESIGNATOR = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`designator/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const DELETE_DESIGNATOR_PACKAGE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`designatorPackage/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const DELETE_DESIGNATOR_PRODUCT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`designatorProduct/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};

export {
    GET_DESIGNATORS,
    GET_DESIGNATOR,
    ADD_DESIGNATOR,
    UPDATE_DESIGNATOR,
    DELETE_DESIGNATOR,
    GET_DESIGNATOR_PRODUCT,
    ADD_DESIGNATOR_PACAKGE,
    ADD_DESIGNATOR_PRODUCT,
    DELETE_DESIGNATOR_PACKAGE,
    DELETE_DESIGNATOR_PRODUCT
};
