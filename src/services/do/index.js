import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_DOS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('deliveryOrder/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_DOS_BY_WITEL = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`deliveryOrder/allByWitel/id${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_DO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`deliveryOrder/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_DO = ({ doCode, doDate, witelId }) => {
    const data = qs.stringify({
        do_code: doCode,
        do_date: doDate,
        witel_id: witelId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`deliveryOrder/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_DO = ({ doCode, doDate, witelId }, id) => {
    const data = qs.stringify({
        do_code: doCode,
        do_date: doDate,
        witel_id: witelId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`deliveryOrder/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_DO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`deliveryOrder/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const CHARGE = (charge, doId) => {
    const data = qs.stringify({
        do_charge: charge,
        do_id: doId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`deliveryOrder/charge`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_ITEM_DO = (stokId, itemQty, doId) => {
    const data = qs.stringify({
        stock_id: stokId,
        item_qty: itemQty,
        do_id: doId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`deliveryOrder/addItem`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_ITEM_DO = (stokId, itemQty, id) => {
    const data = qs.stringify({
        stock_id: stokId,
        item_qty: itemQty
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`deliveryOrder/editItem/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

const DELETE_ITEM_DO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`deliveryOrder/deleteItem/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_ALL_ITEM = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`deliveryOrder/AllItem/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ISSUED_TO_PROCESSED = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`deliveryOrder/issuedToProcessed/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROCESSED_TO_DONE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`deliveryOrder/processedToDone/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export {
    GET_DOS,
    GET_DO,
    ADD_DO,
    UPDATE_DO,
    DELETE_DO,
    CHARGE,
    ADD_ITEM_DO,
    GET_ALL_ITEM,
    UPDATE_ITEM_DO,
    DELETE_ITEM_DO,
    ISSUED_TO_PROCESSED,
    PROCESSED_TO_DONE,
    GET_DOS_BY_WITEL
};
