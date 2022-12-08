import axios, { catchCallBack } from '../config';

const GET_ROS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('reciveOrder/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_RO_BY_WITEL = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`reciveOrder/allByWitel/`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
export { GET_ROS, GET_RO_BY_WITEL };
