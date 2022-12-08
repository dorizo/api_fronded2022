import axios, { catchCallBack } from '../config';

import qs from 'qs';

const GET_ROLES = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('role/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_ROLE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`role/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_ROLE = ({ role, type }) => {
    const data = qs.stringify({
        role,
        type
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`role/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_ROLE_PERMISSION = (roleCode, permissionCode) => {
    const data = qs.stringify({
        roleCode,
        permissionCode
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`role/addPermission`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_ROLE = ({ role, type }, id) => {
    const data = qs.stringify({
        role,
        type
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`role/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_ROLE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`role/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_ROLE_PERMISSION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`role/deletePermission/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ROLE_ALL_PERMISSION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`role/allPermission/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_ROLES, GET_ROLE, ADD_ROLE, UPDATE_ROLE, DELETE_ROLE, ROLE_ALL_PERMISSION, ADD_ROLE_PERMISSION, DELETE_ROLE_PERMISSION };
