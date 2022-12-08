import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_JOBS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('job/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_JOB = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`job/one/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_JOB = ({ jobName, jobPercent, jobDay }) => {
    const data = qs.stringify({
        job_name: jobName,
        job_percent: jobPercent,
        job_day: jobDay
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`job/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_JOB = ({ jobName, jobPercent, jobDay }, id) => {
    const data = qs.stringify({
        job_name: jobName,
        job_percent: jobPercent,
        job_day: jobDay
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`job/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_JOB = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`job/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_JOBS, GET_JOB, ADD_JOB, UPDATE_JOB, DELETE_JOB };
