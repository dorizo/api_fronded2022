/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable  react/prop-types */
import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material/';
import { Card, CardContent, CardHeader, Chip, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import convertToRupiah from 'utils/curency';
import { useProject } from 'hooks/useProjectnew';

export default function SitaxPart() {
    const { projectSitax } = useProject();
    return (
        <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
            <CardHeader title="Sitax" />
            <CardContent>
                <Typography variant="h3" color="#DB1F1F">
                    {projectSitax?.sitax_type}
                </Typography>
                {projectSitax?.sitax_type === 'sitax' && (
                    <>
                        <h5>Total : {convertToRupiah(projectSitax?.sitax_total)}</h5>
                        <Stack direction="row" spacing={1}>
                            {projectSitax && projectSitax.sitax_list.map((l) => <Chip key={l} label={l} />)}
                        </Stack>
                    </>
                )}
            </CardContent>
        </Card>
    );
}
