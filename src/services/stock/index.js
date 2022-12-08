import axios, { catchCallBack } from '../config';

const STOCK_ALL_HO = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('stock/allHO', { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const STOCK_WITEL = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`stock/witel/id/${id}`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};
const STOCK_ALL_BY_WITEL = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`stock/allByWitel`, { headers })
        .then((response) => response)
        .catch((e) => catchCallBack(e));
};

export { STOCK_ALL_HO, STOCK_WITEL, STOCK_ALL_BY_WITEL };
