/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable  react/prop-types */

import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material/';
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import { useProject } from 'hooks/useProject';
import React from 'react';

export default function TeknisiPart() {
    const { project, projectTechnician } = useProject();

    return (
        <Card sx={{ boxShadow: 2, marginBottom: 2 }}>
            <CardHeader title="Teknisi" />
            <CardContent>
                {projectTechnician?.length !== 0 && (
                    <div className="row">
                        <div className="col-8">
                            <h6>Nama</h6>
                        </div>
                        <div className="col-4">
                            <h6>Leader</h6>
                        </div>
                    </div>
                )}
                {projectTechnician &&
                    projectTechnician.map((item, index) => (
                        <div className="row border border-dark rounded mt-1" key={index}>
                            <div className="col-8">
                                <h6 className="mt-2">
                                    {item.name}{' '}
                                    {project.userCode === item.userCode && (
                                        <span className="text-danger" style={{ fontWeight: 'bold' }}>
                                            *
                                        </span>
                                    )}
                                </h6>
                            </div>
                            <div className="col-4">
                                <IconButton disabled>{item.user_leader === '1' ? <CheckBox /> : <CheckBoxOutlineBlank />}</IconButton>
                            </div>
                        </div>
                    ))}
            </CardContent>
        </Card>
    );
}
