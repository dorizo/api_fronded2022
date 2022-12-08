import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_PROJECTALL = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('project/all', { headers })
        .then((response) => response.data)
        .catch((error) => catchCallBack(error));
};
const GET_PROJECTSD = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/one/id/${id}`, { headers })
        .then((response) => response.data)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_TEKNISI = (technician, status, idProject) => {
    // technician array isinya ini
    // {
    //   "userCode",
    //   "user_leader",
    // },
    const data = qs.stringify({
        technician,
        status
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addTechnician/id/${idProject}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_UPDATE_TEKNISI = (technician, idProject) => {
    // technician array isinya ini
    // {
    //   "userCode",
    //   "user_leader",
    // },
    const data = qs.stringify({
        technician
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/updateTechnician/id/${idProject}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_PROJECTALL, GET_PROJECTSD, PROJECT_ADD_TEKNISI, PROJECT_UPDATE_TEKNISI };
