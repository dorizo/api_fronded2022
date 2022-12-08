import axios, { catchCallBack } from '../config';
import qs from 'qs';

/* eslint-disable camelcase */

const GET_PROJECTS = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('project/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PROJECT_FILES = (projectId, dir) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    // project/getFile/id/{project_id}/direktori/{survey|instalasi|terminasi|labeling}
    return axios
        .get(`project/getFile/id/${projectId}/direktori/${dir}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PROJECTS_CAT = () => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get('projectCategory/all', { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PROJECT = (id, source) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/one/id/${id}/khs_source/${source}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DECLINE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toDecline/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApprove/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const GET_PROJECT_JOB = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/job/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_RECONSILIASI = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveReconsiliasi/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_PEMBERKASAAN = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApprovePemberkasan/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_SUBMIT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveSubmit/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_PAID = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApprovePaid/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_TASK_RECONSILIASI = ({ project_reconsiliasi }, id) => {
    const data = qs.stringify({
        project_reconsiliasi
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/reconsiliasi/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_SURVEY_TO_KHS = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toKHSCheck/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_INSTALATION = (id, userCode) => {
    const data = qs.stringify({
        userCode
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/toApproveInstalation/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_JOB = ({ project_id, job_id, est_date_start, est_date_done }) => {
    const data = qs.stringify({
        project_id,
        job_id,
        est_date_start,
        est_date_done
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/job`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_TERMINASI = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveTerminasi/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_VALID3 = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveValid3/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_VALID4 = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveValid4/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_DONE = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveDone/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_APPROVE_LABELING = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/toApproveLabeling/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const ADD_PROJECT = ({ project_code, project_date, project_start, project_done, project_note, cat_id, project_name }) => {
    const data = qs.stringify({
        project_code,
        project_date,
        project_start,
        project_done,
        project_note,
        project_name,
        cat_id
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/add`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_KHS = ({ khs_source, stock_id }, projectIid, KhsListId) => {
    const data = qs.stringify({
        khs_source,
        stock_id
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/updateKHSListSource/id/${projectIid}/khs/${KhsListId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_KHS_INSTALLATION = (projectIid) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .get(`project/khs/id/${projectIid}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_KHS_LIST = ({ designator_id, khs_list_qty }, projectId) => {
    const data = qs.stringify({
        designator_id,
        khs_list_qty
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addKHSList/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_FINAL_COMPLETE_DISTRIBUSI = ({ distribusi, note }, projectId) => {
    // [
    //     {
    //       "distribusi_id": 2,
    //       "odp_valid_4": "asd",
    //       "hasil_ukur_odp_valid_4": 4
    //     }
    //   ]
    const data = qs.stringify({
        distribusi,
        note
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/finalCompleteDistribusi/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_COMPLETE_FEEDER_DISTRIBUSI = ({ distribusi, feeder, note }, projectId) => {
    //     'distribusi' | 'example' : [
    //         {
    //           "distribusi_id": 2,
    //           "hasil_ukur_odp_valid_3": 4
    //         }
    //       ]

    // - 'feeder' | 'example' : [
    //     {
    //       "feeder_id": 4,
    //       "olt_gpon": 5,
    //       "olt_slot": 66,
    //       "otl_port": 88,
    //       "output_feeder": 4,
    //       "output_pasif": 4
    //     }
    //   ]
    const data = qs.stringify({
        distribusi,
        feeder,
        note
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/completeFeederAndDistribusi/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_UPDATE_KHS_LIST = ({ designator_id, khs_list_qty }, projectId, id) => {
    const data = qs.stringify({
        designator_id,
        khs_list_qty
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/updateKHSList/id/${projectId}/khs/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_KHS_LIST = (projectId, id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteKHSList/id/${projectId}/khs/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_FILE_SURVEY = (file, projectId) => {
    // file is base64
    const data = qs.stringify({
        file
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addFileSurvey/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_FILE_INSTALATION = (file, projectId) => {
    // file is base64
    const data = qs.stringify({
        file
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addFileInstalation/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_FILE_TERMINATION = (file, projectId) => {
    // file is base64
    const data = qs.stringify({
        file
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addFileTermination/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_FILE_LABELING = (file, projectId) => {
    // file is base64
    const data = qs.stringify({
        file
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addFileLabeling/id/${projectId}`, data, { headers })
        .then((response) => response)
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
const PROJECT_ADD_SITAX = ({ sitax_type, sitax_total, sitax_list }, idProject) => {
    const data = qs.stringify(
        sitax_type === 'sitax'
            ? {
                  sitax_type,
                  sitax_total,
                  sitax_list
              }
            : { sitax_type }
    );
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/sitax/id/${idProject}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_FEEDER = (feeder, idProject) => {
    // array isinya ini
    // {
    //   "feeder_odc": "",
    //   "feeder_capacity": "",
    //   "feeder_address": "",
    //   "feeder_lg": "",
    //   "feeder_lt": "",
    //   "feeder_port": "",
    //   "feeder_core": ""
    // },
    const data = qs.stringify({ feeder });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addFeederBatch/id/${idProject}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_DISTRIBUSI = (distribusi, idFeeder) => {
    // array isinya ini
    // {
    //   "distribusi_kukd": "12",
    //   "distribusi_address": "asdaasd",
    //   "distribusi_lg": "8.67657",
    //   "distribusi_lt": "0.243423",
    //   "distribusi_core": "8",
    //   "distribusi_core_opsi": "9",
    //   "distribusi_capacity": "16",
    //   "distribusi_note": ""
    // }
    const data = qs.stringify({ distribusi });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .post(`project/addDistribusiBatch/id/${idFeeder}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_UPDATE_FEEDER = (
    { feeder_odc, feeder_capacity, feeder_address, feeder_lg, feeder_lt, feeder_port, feeder_core },
    idFeeder
) => {
    const data = qs.stringify({
        feeder_odc,
        feeder_capacity,
        feeder_address,
        feeder_lg,
        feeder_lt,
        feeder_port,
        feeder_core
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/updateFeeder/id/${idFeeder}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_UPDATE_DISTRIBUSI = (
    {
        distribusi_kukd,
        distribusi_dropcore,
        distribusi_address,
        distribusi_benchmark_address,
        distribusi_odp,
        distribusi_lg,
        distribusi_lt,
        distribusi_core,
        distribusi_core_opsi,
        distribusi_capacity,
        distribusi_note,
        feeder_id
    },
    idDistribusi
) => {
    //   distribusi_kukd
    // - distribusi_dropcore | if label_cat on project <> 1
    // - distribusi_address
    // - distribusi_lg
    // - distribusi_lt
    // - distribusi_core
    // - distribusi_core_opsi | nullabel
    // - distribusi_capacity
    // - distribusi_note  | nullabel
    const data = qs.stringify({
        distribusi_kukd,
        distribusi_dropcore,
        distribusi_address,
        distribusi_lg,
        distribusi_benchmark_address,
        distribusi_odp,
        distribusi_lt,
        distribusi_core,
        distribusi_core_opsi,
        distribusi_capacity,
        distribusi_note,
        feeder_id
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/updateDistribusi/id/${idDistribusi}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const UPDATE_PROJECT = ({ project_date, project_start, project_done, project_code, project_note, cat_id, name_project }, id) => {
    const data = qs.stringify({
        project_date,
        project_start,
        project_done,
        project_code,
        project_note,
        cat_id,
        name_project
    });
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .put(`project/edit/id/${id}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const DELETE_PROJECT = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/delete/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_FILE_SURVEY = (project_id, survey_id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteFileSurvey/id/${project_id}/survey/${survey_id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_FILE_INSTALATION = (project_id, survey_id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteFileInstalation/id/${project_id}/survey/${survey_id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_FILE_LABELING = (project_id, survey_id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteFileLabeling/id/${project_id}/survey/${survey_id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_FILE_TERMINATION = (project_id, survey_id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteFileTermination/id/${project_id}/survey/${survey_id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_FEEDER = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteFeeder/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_DISTRIBUSI = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteDistribusi/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_DATA_TEKNISI = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteDataTeknis/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_DELETE_DATA_TEKNISI_LIST = (id) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    return axios
        .delete(`project/deleteDataTeknisList/id/${id}`, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_ONE_DATA_TEKNISI = (dataTeknnisi) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    const data = qs.stringify(dataTeknnisi);
    return axios
        .post(`project/addOneDataTeknis`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};
const PROJECT_ADD_DATA_TEKNISI = (dataTeknnisi, projectId) => {
    const headers = {
        Authorization: `Bearer ${localStorage.getItem('token')}`
    };
    const data = qs.stringify({ data_teknis: dataTeknnisi });
    return axios
        .post(`project/addDataTeknis/id/${projectId}`, data, { headers })
        .then((response) => response)
        .catch((error) => catchCallBack(error));
};

export {
    GET_PROJECTS,
    GET_PROJECTS_CAT,
    GET_PROJECT,
    ADD_PROJECT,
    UPDATE_PROJECT,
    DELETE_PROJECT,
    PROJECT_APPROVE,
    PROJECT_DECLINE,
    PROJECT_ADD_DISTRIBUSI,
    PROJECT_ADD_FEEDER,
    PROJECT_ADD_FILE_SURVEY,
    PROJECT_ADD_SITAX,
    PROJECT_ADD_TEKNISI,
    PROJECT_DELETE_DISTRIBUSI,
    PROJECT_DELETE_FEEDER,
    PROJECT_DELETE_FILE_SURVEY,
    PROJECT_UPDATE_DISTRIBUSI,
    PROJECT_UPDATE_FEEDER,
    PROJECT_UPDATE_TEKNISI,
    PROJECT_ADD_FILE_INSTALATION,
    PROJECT_ADD_FILE_LABELING,
    PROJECT_ADD_KHS,
    PROJECT_ADD_KHS_LIST,
    PROJECT_APPROVE_DONE,
    PROJECT_APPROVE_INSTALATION,
    PROJECT_APPROVE_LABELING,
    PROJECT_APPROVE_TERMINASI,
    PROJECT_APPROVE_VALID3,
    PROJECT_APPROVE_VALID4,
    PROJECT_DELETE_FILE_INSTALATION,
    PROJECT_DELETE_FILE_LABELING,
    PROJECT_DELETE_KHS_LIST,
    PROJECT_SURVEY_TO_KHS,
    PROJECT_UPDATE_KHS_LIST,
    PROJECT_COMPLETE_FEEDER_DISTRIBUSI,
    PROJECT_FINAL_COMPLETE_DISTRIBUSI,
    GET_PROJECT_FILES,
    PROJECT_ADD_FILE_TERMINATION,
    PROJECT_DELETE_FILE_TERMINATION,
    PROJECT_APPROVE_PAID,
    PROJECT_APPROVE_PEMBERKASAAN,
    PROJECT_APPROVE_RECONSILIASI,
    PROJECT_APPROVE_SUBMIT,
    GET_PROJECT_JOB,
    PROJECT_JOB,
    PROJECT_KHS_INSTALLATION,
    PROJECT_TASK_RECONSILIASI,
    PROJECT_ADD_DATA_TEKNISI,
    PROJECT_DELETE_DATA_TEKNISI,
    PROJECT_DELETE_DATA_TEKNISI_LIST,
    PROJECT_ADD_ONE_DATA_TEKNISI
};
