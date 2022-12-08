import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_WITELS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('witel/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_WITEL = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`witel/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_WITEL_USER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`witel/user/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_WITEL = ({ witel, code, region }) => {
    const data = qs.stringify({
        witel_name: witel,
        witel_code: code,
        region_id: region
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`witel/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_WITEL_USER = (witelId, userCode) => {
    const data = qs.stringify({
        witel_id: witelId,
        userCode
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`witelUser/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_WITEL = ({ witel, code, region }, id) => {
    const data = qs.stringify({
        witel_name: witel,
        witel_code: code,
        region_id: region
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`witel/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_WITEL = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`witel/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_WITEL_USER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`witelUser/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_WITELS, GET_WITEL, ADD_WITEL, UPDATE_WITEL, DELETE_WITEL, GET_WITEL_USER, DELETE_WITEL_USER, ADD_WITEL_USER };
