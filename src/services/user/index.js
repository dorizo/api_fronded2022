import axios, { catchCallBack } from '../config';

import qs from 'qs';
/* eslint-disable camelcase */

const GET_USERS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('user/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_USER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`user/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_USER = ({ name, email, password, nik_api, nik_ta, package_id }) => {
    const data = qs.stringify({
        email,
        password,
        name,
        nik_api,
        nik_ta,
        package_id
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`user/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_USER = ({ name, email, password, nik_api, nik_ta, package_id }, id) => {
    const data = qs.stringify({
        email,
        password,
        name,
        nik_api,
        nik_ta,
        package_id
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`user/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_USER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`user/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_USER_ROLE = (userCode, roleCode) => {
    const data = qs.stringify({
        userCode,
        roleCode
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`user/addRole`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_USER_PERMISSION = (userCode, permissionCode) => {
    const data = qs.stringify({
        userCode,
        permissionCode
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`user/addPermission`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_USER_DETAIL_PERMISSION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`user/detailPermission/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PERMISSIONS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`permission/all`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_USER_ROLE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`user/deleteRole/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_USER_PERMISSION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`user/deletePermission/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export {
    GET_USERS,
    GET_USER,
    ADD_USER,
    UPDATE_USER,
    DELETE_USER,
    ADD_USER_PERMISSION,
    ADD_USER_ROLE,
    GET_USER_DETAIL_PERMISSION,
    DELETE_USER_PERMISSION,
    DELETE_USER_ROLE,
    GET_PERMISSIONS
};
