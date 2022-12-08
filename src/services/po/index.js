import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_POS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('purchaseOrder/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`purchaseOrder/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PO = ({ poCode, poDate, supplierId }) => {
    const data = qs.stringify({
        po_code: poCode,
        po_date: poDate,
        supplier_id: supplierId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`purchaseOrder/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_PO = ({ poCode, poDate, supplierId }, id) => {
    const data = qs.stringify({
        po_code: poCode,
        po_date: poDate,
        supplier_id: supplierId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`purchaseOrder/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_PO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`purchaseOrder/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const CHARGE = (charge, poId) => {
    const data = qs.stringify({
        po_charge: charge,
        po_id: poId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`purchaseOrder/charge`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_ITEM_PO = (productId, itemPrice, itemQty, poId) => {
    const data = qs.stringify({
        product_id: productId,
        item_price: itemPrice,
        item_qty: itemQty,
        po_id: poId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`purchaseOrder/addItem`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_ITEM_PO = (productId, itemPrice, itemQty, poId, id) => {
    const data = qs.stringify({
        product_id: productId,
        item_price: itemPrice,
        item_qty: itemQty,
        po_id: poId
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`purchaseOrder/editItem/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_ITEM_PO = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`purchaseOrder/deleteItem/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_ALL_ITEM = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`purchaseOrder/AllItem/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ISSUED_TO_PROCESSED = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`purchaseOrder/issuedToProcessed/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROCESSED_TO_DONE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`purchaseOrder/processedToDone/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export {
    GET_POS,
    GET_PO,
    ADD_PO,
    UPDATE_PO,
    DELETE_PO,
    CHARGE,
    ADD_ITEM_PO,
    GET_ALL_ITEM,
    UPDATE_ITEM_PO,
    DELETE_ITEM_PO,
    ISSUED_TO_PROCESSED,
    PROCESSED_TO_DONE
};
