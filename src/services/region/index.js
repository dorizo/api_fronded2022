import axios, { catchCallBack } from '../config';

import qs from 'qs';

const GET_REGIONS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('region/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_REGION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`region/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_REGION = ({ region }) => {
    const data = qs.stringify({
        region_name: region
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`region/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_REGION = ({ region }, id) => {
    const data = qs.stringify({
        region_name: region
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`region/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_REGION = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`region/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_REGIONS, GET_REGION, ADD_REGION, UPDATE_REGION, DELETE_REGION };
