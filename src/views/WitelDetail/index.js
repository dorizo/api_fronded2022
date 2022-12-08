import { Button, Chip, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from '@mui/material';
import LoadingComponent from 'components/LoadingComponent';
import useSnackbar from 'components/SnackBar';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { GET_USERS } from 'services/user';
import { ADD_WITEL_USER, DELETE_WITEL_USER, GET_WITEL_USER } from 'services/witel';
import MainCard from 'ui-component/cards/MainCard';

export default function Index() {
    const params = useParams();
    const [selectUser, setSelectUser] = useState('');
    const [loading, setLoading] = useState(false);
    const { snackBarOpen, SnackBarComponent } = useSnackbar();
    const { data, isLoading, refetch } = useQuery('GET_WITEL_USER', () => GET_WITEL_USER(params.id));

    const { data: user, isLoading: luser } = useQuery('GET_USERS', GET_USERS);

    if (isLoading || luser || loading) {
        return <LoadingComponent />;
    }
    const result = data && data.data;

    const userss = user && user.data;

    const handleDeletePermission = async (code) => {
        setLoading(true);

        const rst = await DELETE_WITEL_USER(code);

        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setLoading(false);
    };
    const handleAddUser = async () => {
        setLoading(true);

        const rst = await ADD_WITEL_USER(params.id, selectUser);

        if (rst.status === 200) {
            await refetch();
            await snackBarOpen(rst.data.success.message, 'success');
        }
        if (rst.status === 400) {
            await snackBarOpen(rst.data.error.message, 'error');
        }
        setSelectUser(null);
        setLoading(false);
    };
    return (
        <div>
            <MainCard>
                <h5>Witel User</h5>
                <MainCard>
                    <Typography sx={{ marginBottom: 2 }}>User</Typography>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="grouped-select">User</InputLabel>
                            <Select value={selectUser} onChange={(e) => setSelectUser(e.target.value)} id="u-select">
                                <MenuItem aria-label="None" value="">
                                    Pilih
                                </MenuItem>
                                {userss && userss.data.map((u) => <MenuItem value={u.userCode}>{u.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Button disabled={!selectUser} onClick={handleAddUser} sx={{ marginLeft: 2 }}>
                            Tambah
                        </Button>
                    </div>

                    <Typography>List user {result.data.witel_name}</Typography>
                    <Stack direction="column" style={{ marginTop: 4 }} spacing={1}>
                        {result.data.user.map((u) => (
                            <Chip label={u.name} onDelete={() => handleDeletePermission(u.witel_user_id)} />
                        ))}
                    </Stack>
                </MainCard>
            </MainCard>
            <SnackBarComponent />
        </div>
    );
}
