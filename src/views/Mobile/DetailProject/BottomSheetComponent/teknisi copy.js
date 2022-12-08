/* eslint-disable no-alert */

import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import { Autocomplete, Button, Grid, IconButton, TextField } from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { PROJECT_ADD_TEKNISI, PROJECT_UPDATE_TEKNISI } from 'services/project';
import { GET_USERS } from 'services/user';

export default function TeknisiComponent(props) {
    const qc = useQueryClient();

    const { projectTechnician, open, onClose, snackBarOpen } = props;
    const initialprojectTechnician = projectTechnician.map((s) => {
        const d = { name: s.name, id: s.userCode };
        return d;
    });
    const intitLeader = projectTechnician.length === 0 ? [] : projectTechnician.filter((l) => l.user_leader === '1')[0].userCode;
    const [leader, setLeader] = useState(intitLeader);
    const editAble = initialprojectTechnician.length === 0 ? Boolean(false) : Boolean(true);
    const params = useParams();
    const { data, isLoading } = useQuery('GET_USERS', GET_USERS);
    const [teknisiName, setTeknisiName] = useState(initialprojectTechnician);
    const [loading, setLoading] = useState(null);
    const handlePilihTeknisi = (e, val) => {
        // const index = teknisiName.indexOf((item) => item.id === val.id)
        val = val.filter((value, index, self) => index === self.findIndex((t) => t.id === value.id));
        const le = val.filter((item) => item.id === leader);
        if (le.length === 0) {
            setLeader(null);
        }
        setTeknisiName(val);
    };
    const handleSimpan = async () => {
        const le = teknisiName.filter((item) => item.id === leader);
        if (le.length === 0) {
            alert('pilih leader');
        }
        const technician = teknisiName.map((item) => {
            if (leader === item.id) {
                return { userCode: item.id, user_leader: 1 };
            }
            return { userCode: item.id, user_leader: 0 };
        });
        setLoading(true);
        const response = editAble
            ? await PROJECT_UPDATE_TEKNISI(JSON.stringify(technician), params.idProject)
            : await PROJECT_ADD_TEKNISI(JSON.stringify(technician), 'Survey', params.idProject);
        if (response.status === 404) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 400) {
            await snackBarOpen(response.data.error.message, 'error');
        }
        if (response.status === 200) {
            await snackBarOpen(response.data.success.message, 'success');
            await qc.fetchQuery(['GET_PROJECT', params.idProject]);
            onClose();
        }
        await setLoading(false);
    };
    if (isLoading) {
        return <p>loading</p>;
    }
    const user = data && data.data;
    const userTeknisi =
        user &&
        user.data.map((s) => {
            const d = { name: s.name, id: s.userCode };
            return d;
        });
    const cekbtn = teknisiName.length < 2 || leader === null || loading;
    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div>Tambah Teknisi</div>}
                snapPoints={({ maxHeight }) => 0.6 * maxHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="tags-outlined"
                            options={userTeknisi}
                            getOptionLabel={(option) => option.name}
                            onChange={handlePilihTeknisi}
                            freeSolo
                            defaultValue={teknisiName}
                            value={teknisiName}
                            renderInput={(params) => <TextField variant="standard" {...params} label="User" placeholder="Pilih" />}
                        />
                        <div className="mx-2 mt-4">
                            {teknisiName.length !== 0 && (
                                <div className="row">
                                    <div className="col-8">
                                        <h6>Nama</h6>
                                    </div>
                                    <div className="col-4">
                                        <h6>Leader</h6>
                                    </div>
                                </div>
                            )}
                            {teknisiName.map((item, index) => (
                                <div className="row border border-dark rounded" key={index}>
                                    <div className="col-8">
                                        <h6 className="mt-2">{item.name}</h6>
                                    </div>
                                    <div className="col-2">
                                        <IconButton onClick={() => setLeader(item.id)}>
                                            {leader === item.id ? <CheckBox /> : <CheckBoxOutlineBlank />}
                                        </IconButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <Button
                            style={{ marginTop: 10 }}
                            fullWidth
                            variant="contained"
                            color="success"
                            disabled={cekbtn}
                            onClick={handleSimpan}
                        >
                            Simpan
                        </Button>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
TeknisiComponent.propTypes = {
    open: PropTypes.any,
    onClose: PropTypes.any,
    projectTechnician: PropTypes.any,
    snackBarOpen: PropTypes.any
};
