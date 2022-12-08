import axios, { catchCallBack } from '../config';
import qs from 'qs';

const ADD_PROJECT_SUB = (projectxxxx) => {
    // const inputFile = useRef(null);
    const data = qs.stringify(projectxxxx);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addprojectsub`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PROJECT_KHSV2 = (projectxxxx) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addprojectkhsv2`, projectxxxx, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PROJECT_KHSV2_DETAIL = (dataprog) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/Addproject_khs_v2_detail`, dataprog, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const SUB_PROJEC_VIEW = (kodeproject) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`Datateknis/showsubkategori/id_project/${kodeproject}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DESIGNATOR_VIEW_ALL = (Search) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`designator/all/search/${Search}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const SEARCH_STOCK_ALL = (Search) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`stock/witel/id/${Search.witelid}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_KHS_DESIGNATOR = ({ Khsstatusproject, idprojectkhsv2detail }) => {
    const data = qs.stringify({
        Khs_status_project: Khsstatusproject,
        id_project_khs_v2_detail: idprojectkhsv2detail
    });
    console.log('ssss', data);
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/updateproject_khs_v2_detail`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

const UPDATE_KHS_DESIGNATOR_STOK = ({ Khsstatusproject, idprojectkhsv2detail }) => {
    const data = qs.stringify({
        id_stok: Khsstatusproject,
        id_project_khs_v2_detail: idprojectkhsv2detail
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`Datateknis/updateproject_khs_v2_detail`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
// eslint-disable-next-line import/prefer-default-export
// hendle untuk semua file onclick dan paromater yang di input
const handleFileUpload = (x) => (e) => {
    const { files } = e.target;
    console.log('handle event', x);
    if (files && files.length) {
        const data = new FormData();
        const imagedata = e.target.files[0];
        data.append('inputname', imagedata);
        console.log('fileType', data); // ex: zip, rar, jpg, svg etc.
        const headers = {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        };
        return axios
            .post(`uploadfile`, data, { headers })
            .then((response) => response)
            .catch((error) => catchCallBack(error));
    }
    return true;
};

export {
    ADD_PROJECT_SUB,
    SUB_PROJEC_VIEW,
    ADD_PROJECT_KHSV2,
    DESIGNATOR_VIEW_ALL,
    ADD_PROJECT_KHSV2_DETAIL,
    UPDATE_KHS_DESIGNATOR,
    SEARCH_STOCK_ALL,
    UPDATE_KHS_DESIGNATOR_STOK,
    handleFileUpload
};
