import { Button, Grid } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import { BottomSheet } from 'react-spring-bottom-sheet';

export default function TeknisiAmbilBarang(props) {
    /* eslint-disable react/prop-types */
    const { open, onClose, handleApproveInstallation, teknisi } = props;
    const [user, setUser] = useState(null);

    const handleSubmit = () => {
        handleApproveInstallation(user.userCode);
    };

    return (
        <div>
            <BottomSheet
                open={open}
                blocking={false}
                onDismiss={onClose}
                header={<div>Pilih User </div>}
                snapPoints={({ minHeight }) => minHeight}
            >
                <Grid container paddingX={4} rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                    <Grid item xs={12}>
                        <Autocomplete
                            disablePortal
                            margin="dense"
                            name="userCode"
                            id="userCode"
                            value={user}
                            onChange={(e, v) => setUser(v)}
                            options={teknisi}
                            getOptionLabel={(option) => `${option.name} ${(option.user_leader === '1' && '(Leader)') || ''} `}
                            renderInput={(params) => (
                                <TextField {...params} fullWidth variant="standard" autoComplete="off" label="Pilih User" margin="dense" />
                            )}
                        />
                        <Button
                            fullWidth
                            onClick={handleSubmit}
                            style={{ marginTop: 20, marginBottom: 20 }}
                            type="submit"
                            disabled={user === null}
                            variant="contained"
                            color="success"
                        >
                            Simpan
                        </Button>
                    </Grid>
                </Grid>
            </BottomSheet>
        </div>
    );
}
