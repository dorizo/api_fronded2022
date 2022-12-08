/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable react/prop-types */
import useSnackbar from 'components/SnackBar';
import { useMee } from 'contexts/MeContext';
import { PropTypes } from 'prop-types';
import React, { createContext, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    PROJECT_ADD_DATA_TEKNISI,
    PROJECT_ADD_DISTRIBUSI,
    PROJECT_ADD_FEEDER,
    PROJECT_ADD_KHS,
    PROJECT_ADD_KHS_LIST,
    PROJECT_ADD_ONE_DATA_TEKNISI,
    PROJECT_ADD_SITAX,
    PROJECT_COMPLETE_FEEDER_DISTRIBUSI,
    PROJECT_DELETE_DATA_TEKNISI,
    PROJECT_DELETE_DATA_TEKNISI_LIST,
    PROJECT_DELETE_DISTRIBUSI,
    PROJECT_DELETE_FEEDER,
    PROJECT_DELETE_KHS_LIST,
    PROJECT_FINAL_COMPLETE_DISTRIBUSI,
    PROJECT_UPDATE_DISTRIBUSI,
    PROJECT_UPDATE_FEEDER,
    PROJECT_UPDATE_KHS_LIST
} from '../services/project';

const ProjectContext = createContext();

const ProjectProvider = ({ children, initialValue }) => {
    const { project, khsSource, refetch } = initialValue;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { checkPermision } = useMee();
    const [radioValue, setRadioValue] = React.useState('1');
    const [open, setOpen] = React.useState(false);
    const [feederSelected, setFeederSelected] = React.useState(null);
    const [disSelected, setDisSelected] = React.useState(null);
    const [khsListSelected, setKhsListSelected] = React.useState(null);
    const [khsIdSelected, setKhsIdSelected] = React.useState(null);
    const [selectedTeknisi, setSelectedTeknisi] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [expanded, setExpanded] = React.useState(false);
    const [expanded2, setExpanded2] = React.useState(false);
    const [expandedKhsL, setExpandedKhsL] = React.useState(false);
    const [dataTeknisi, setDataTeknisi] = React.useState(project.khs);

    useEffect(() => {
        setDataTeknisi(project.khs);
    }, [project.khs]);
    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const navigate = useNavigate();
    const projectFeeder = project.feeder;
    const projectSitax = project.sitax;
    const projectSurvey = project.survey;
    const projectTechnician = project.technician;
    const projectKhs = project.khs;

    const handleEditFeeder = (item) => {
        setFeederSelected(item);
        setOpen(true);
        setRadioValue('2');
    };
    const handleComplateD = (item) => {
        setDisSelected(item);
        setOpen(true);
        setRadioValue('8');
    };
    const handleComplateF = (item) => {
        setFeederSelected(item);
        setOpen(true);
        setRadioValue('9');
    };
    const handleFinal = (item) => {
        setDisSelected(item);
        setOpen(true);
        setRadioValue('10');
    };
    const handleEditDistribusi = (item) => {
        setDisSelected(item);
        setOpen(true);
        setRadioValue('3');
    };
    const handleEditKhsList = (item) => {
        setKhsListSelected(item);
        setOpen(true);
        setRadioValue('6');
    };
    const handleKhsSource = (item) => {
        console.log(item, 'iiii');
        setKhsListSelected(item);
        setOpen(true);
        setRadioValue('7');
    };

    const handleAddDataTeknisiNext = (item, m) => {
        setKhsIdSelected(item);
        setOpen(true);
        setRadioValue(m);
    };

    // FEEDER
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleChange2 = (panel) => (event, isExpanded) => {
        setExpanded2(isExpanded ? panel : false);
    };
    const handleChangeKhsL = (panel) => (event, isExpanded) => {
        setExpandedKhsL(isExpanded ? panel : false);
    };
    const handleAddFeeder = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_ADD_FEEDER(JSON.stringify([data]), id);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleDistribusiComplete = async (data, note, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_COMPLETE_FEEDER_DISTRIBUSI({ distribusi: JSON.stringify([data]), note }, id);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleFeederComplete = async (data, note, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_COMPLETE_FEEDER_DISTRIBUSI({ feeder: JSON.stringify([data]), note }, id);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleDistribusiFinal = async (data, note, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_FINAL_COMPLETE_DISTRIBUSI({ distribusi: JSON.stringify([data]), note }, id);
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };

    const handleUpdateFeeder = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_UPDATE_FEEDER(data, id);
        if (response.data.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.data.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleDeleteFeeder = async (id) => {
        if (window.confirm('Delete the item?')) {
            setLoading(true);
            const response = await PROJECT_DELETE_FEEDER(id);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
            }
            await setLoading(false);
            setOpen(false);
        }
    };
    const handleDeleteKhsList = async (id) => {
        if (window.confirm('Delete the item?')) {
            setLoading(true);
            const response = await PROJECT_DELETE_KHS_LIST(project.project_id, id);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
            }
            await setLoading(false);
            setOpen(false);
        }
    };
    const handleDeleteDistribusi = async (id) => {
        if (window.confirm('Delete the item?')) {
            setLoading(true);
            const response = await PROJECT_DELETE_DISTRIBUSI(id);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                setFeederSelected(null);
                refetch();
            }
            await setLoading(false);
            setOpen(false);
        }
    };

    // DISTRIBUSI

    const handleAddDistribusi = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_ADD_DISTRIBUSI(JSON.stringify([data]), id);
        if (response.status === 404) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            setDisSelected(null);
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };

    const handleUpdateDistribusi = async (data, idF, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_UPDATE_DISTRIBUSI(data, disSelected.distribusi_id);
        if (response.data.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.data.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };

    // SITAX

    const handleAddSitax = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_ADD_SITAX(data, id);
        if (response.status === 404) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 400) {
            callbackSetError(response.data.error.form);
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };

    // khs
    const handleAddKhs = async (data, id, callbackSetError) => {
        setLoading(true);
        const response = await PROJECT_ADD_KHS(data, id, khsListSelected.khs_list_id);
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
            callbackSetError(response.data.error.form);
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            navigate(`/mobile/project/detail/${project.project_id}`, {
                state: {
                    source: data.khs_source
                }
            });
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    // list
    const handleAddKhsList = async (data) => {
        setLoading(true);
        const response = await PROJECT_ADD_KHS_LIST(data, project.project_id);
        if (response.status === 404) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }

        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleUpdateKhsList = async (data) => {
        setLoading(true);
        const response = await PROJECT_UPDATE_KHS_LIST(data, project.project_id, khsListSelected.khs_list_id);
        if (response.status === 404) {
            await snackBarOpen(response.data.error.message, 'error');
        }

        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            refetch();
        }
        await setLoading(false);
        setOpen(false);
    };
    const openModal = (value) => {
        setSelectedTeknisi(null);
        setDisSelected(null);
        setOpen(true);
        setRadioValue(value);
    };
    const permis = [
        { add: 'CFLS', status: 'Survey' },
        { add: 'CFLT', status: 'Termination' },
        { add: 'CFLL', status: 'Labeling' },
        { add: 'CFLI', status: 'Approved Instalation' }
    ];
    function checkPermisionFile() {
        return permis.some((p) => checkPermision(p.add) && project.project_status === p.status);
    }

    // data teknisi
    const handleAddDataTeknisi = async (data) => {
        // setLoading(true);
        if (khsIdSelected?.khs_id) {
            console.log(data, 'datateknisi');
            // {
            //     "designator_id": "1",
            //     "khs_list_qty": "12",
            //     "tipe": "ODP",
            //     "ODP": {
            //         "address": "asd",
            //         "lg": 21321,
            //         "lt": 21323,
            //         "benchmark_address": "asd",
            //         "core": 7,
            //         "core_opsi": 7,
            //         "distribusi_core_opsi": 9,
            //         "distribusi_core": 9
            //     }
            // }
            let param = data;
            param.khs_id = khsIdSelected?.khs_id;

            if (data.tipe === 'ODC') {
                const odc = param.ODC;
                param = { ...param, ...odc };
            }
            if (data.tipe === 'ODP') {
                const odp = param.ODP;
                param = { ...param, ...odp };
            }

            console.log(param);
            const response = await PROJECT_ADD_ONE_DATA_TEKNISI(param);
            if (response.status === 404) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }

            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
            }
        } else {
            const params = JSON.stringify([
                {
                    project_id: project.project_id,
                    khs_list: [data]
                }
            ]);
            const response = await PROJECT_ADD_DATA_TEKNISI(params, project.project_id);
            if (response.status === 404) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }

            if (response.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
            }
            // PROJECT_ADD_DATA_TEKNISI()
        }
        await setLoading(false);
        setOpen(false);
    };
    const handleDeleteDataTeknisList = async (id) => {
        if (window.confirm('Delete the item?')) {
            setLoading(true);
            const response = await PROJECT_DELETE_DATA_TEKNISI_LIST(id);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
                setDataTeknisi(project.khs);
            }
            await setLoading(false);
            setOpen(false);
        }
    };
    const handleDeleteDataTeknis = async (id) => {
        if (window.confirm('Delete the item?')) {
            setLoading(true);
            const response = await PROJECT_DELETE_DATA_TEKNISI(id);
            if (response.data.status === 400) {
                await snackBarOpen(response.data.error.message, 'error');
            }
            if (response.data.status === 200) {
                await snackBarOpen(response.data.success.message, 'success');
                refetch();
                setDataTeknisi(project.khs);
            }
            await setLoading(false);
            setOpen(false);
        }
    };
    const handelPlusDT = () => {
        const x = dataTeknisi.length < 5;
        if (x) {
            setDataTeknisi([...dataTeknisi, { id: dataTeknisi.length, khs_list: [] }]);
        }
    };
    const handelMinDT = () => {
        const x = dataTeknisi.length > 0;
        if (x) {
            const xxx = dataTeknisi[dataTeknisi.length - 1];
            if (xxx.khs_id) {
                handleDeleteDataTeknis(xxx.khs_id);
            } else {
                const values = [...dataTeknisi];
                values.splice(dataTeknisi.length - 1, 1);
                console.log(values);
                setDataTeknisi(values);
            }
        }
    };

    return (
        <ProjectContext.Provider
            value={{
                handelMinDT,
                openModal,
                handelPlusDT,
                handleAddDistribusi,
                handleAddFeeder,
                handleAddKhs,
                handleAddKhsList,
                handleAddSitax,
                handleChange,
                handleChange2,
                handleChangeKhsL,
                handleComplateD,
                handleComplateF,
                handleDeleteDistribusi,
                handleDeleteFeeder,
                handleDeleteKhsList,
                handleDistribusiComplete,
                handleDistribusiFinal,
                handleEditDistribusi,
                handleKhsSource,
                handleUpdateFeeder,
                handleUpdateDistribusi,
                handleUpdateKhsList,
                checkPermisionFile,
                handleEditFeeder,
                handleFinal,
                handleEditKhsList,
                handleFeederComplete,
                setRadioValue,
                setOpen,
                setFeederSelected,
                setKhsListSelected,
                setDisSelected,
                setSelectedTeknisi,
                setLoading,
                setDataTeknisi,
                setExpanded,
                setExpanded2,
                setExpandedKhsL,
                handleDeleteDataTeknisList,
                handleAddDataTeknisiNext,
                snackBarOpen,
                refetch,
                SnackBarComponent,
                projectFeeder,
                projectSitax,
                projectSurvey,
                projectTechnician,
                projectKhs,
                radioValue,
                open,
                feederSelected,
                disSelected,
                khsListSelected,
                selectedTeknisi,
                loading,
                dataTeknisi,
                expanded,
                expanded2,
                expandedKhsL,
                khsSource,
                project,
                handleAddDataTeknisi
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};
export function useProject() {
    return useContext(ProjectContext);
}
export default ProjectProvider;

ProjectProvider.propTypes = { children: PropTypes.any };
