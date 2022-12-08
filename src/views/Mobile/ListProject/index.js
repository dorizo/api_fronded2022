import { Skeleton, TextField, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useQuery } from 'react-query';
import { GET_PROJECTS } from '../../../services/project';
import { useMee } from '../../../contexts/MeContext';
import { useState } from 'react';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#DB1F1F',
        color: theme.palette.common.white
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0
    }
}));
/* eslint-disable react/prop-types */

export default function ListProject({ handleAction }) {
    const { data, isLoading } = useQuery('GET_PROJECTS', GET_PROJECTS);
    const { checkPermision } = useMee();
    const [search, setSearch] = useState('');
    const list = data && data.data;
    if (isLoading) {
        return (
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Code</StyledTableCell>
                            <StyledTableCell>Category</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {[...Array(10)].map((a) => (
                            <TableRow>
                                <TableCell key={a} align="center" colSpan={4}>
                                    <Skeleton height={50} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
    console.log('list', list);
    const searchData = list.data.filter((item) => item.project_code.toLowerCase().indexOf(search.toLowerCase()) > -1);
    return (
        <>
            <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                style={{ marginBottom: 10 }}
                id="outlined-basic"
                label="Cari Project"
                placeholder="Project Code"
                variant="outlined"
            />
            <TableContainer component={Paper}>
                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Code</StyledTableCell>
                            <StyledTableCell>Cat</StyledTableCell>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell>
                                Region
                                <br />
                                Witel
                            </StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {checkPermision('RPRO') &&
                            searchData.map((row) => (
                                <StyledTableRow onClick={(e) => handleAction(e, row)}>
                                    <StyledTableCell>{row.project_code}</StyledTableCell>
                                    <StyledTableCell>{row.cat_name}</StyledTableCell>
                                    <StyledTableCell>{row.project_date}</StyledTableCell>
                                    <StyledTableCell>
                                        <Typography style={{ margin: 1 }} variant="body1">
                                            {row.region_name}
                                        </Typography>
                                        <Typography style={{ margin: 1 }} variant="subtitle2">
                                            {row.witel_name}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell>{row.project_status}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
