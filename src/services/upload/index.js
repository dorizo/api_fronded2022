import axios, { catchCallBack } from '../config';
import qs from 'qs';

const GET_IMAGES = ({ body }) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'multipart/form-data'
    };
    const level = body.level;
    const formData = new FormData();
    formData.append('level', level);

    return axios
        .post('uploadimage/getfile', formData, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

const UPLOAD_IMAGES = ({ level, files }) => {
    const formData = new FormData();
    formData.append('level', level);
    formData.append('files', files);

    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
        // 'Content-Type': 'multipart/form-data'
    };

    return axios
        .post(`uploadimage/all`, formData, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

export { GET_IMAGES, UPLOAD_IMAGES };
