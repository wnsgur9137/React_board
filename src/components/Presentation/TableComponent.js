import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

function Row({ row }) {
    const [open, setOpen] = useState(false);
    const [order, setOrder] = useState(false);

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.title}
                </TableCell>
                <TableCell>
                    {
                        row.type === 'memory' ?
                            order ? `${(parseFloat(row.avg) / 1000).toFixed(1)} GB` : `${parseFloat(row.avg).toFixed(1)} MB`
                            : order ? `${((parseFloat(row.avg) * 1.8) + 32).toFixed(1)} ºF` : `${parseFloat(row.avg).toFixed(1)} ºC`
                    }
                </TableCell>
                <TableCell>
                    <Button
                        onClick={() => setOrder(!order)}>
                        {
                            row.type === 'memory' ?
                                order ? '단위 변경(MB)' : '단위 변경(GB)'
                                : order ? '단위 변경(ªC)' : '단위 변경(ªF)'
                        }
                    </Button>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                             <Typography variant="h6" gutterBottom component="div">
                                 History
                             </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        {row['subTableHeader'].map((subTitle) => (
                                            <TableCell>{subTitle}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row['subTableData'].map((rowData) => (
                                        <TableRow>
                                            <TableCell>{rowData[0]}</TableCell>
                                            {rowData.slice(1).map((data) => (
                                                <TableCell>
                                                    {
                                                        row.type === 'memory' ?
                                                            order ? `${(parseFloat(data) / 1000).toFixed(1)} GB` : `${parseFloat(data).toFixed(1)} MB`
                                                            : order ? `${((parseFloat(data) * 1.8) + 32).toFixed(1)} ºF` : `${parseFloat(data).toFixed(1)} ºC`
                                                    }
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    )
}

Row.propTypes = {
    row: PropTypes.shape({
        calories: PropTypes.number.isRequired,
        carbs: PropTypes.number.isRequired,
        fat: PropTypes.number.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                amount: PropTypes.number.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        protein: PropTypes.number.isRequired,
    }).isRequired,
};

function TableComponent({ tableHeader, tableData }) {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <StyledTableCell />
                    {tableHeader.map((title) => (
                        <StyledTableCell>{title}</StyledTableCell>
                    ))}
                    <StyledTableCell />
                </TableHead>
                <TableBody>
                    {tableData.map((row) => (
                        <Row row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

export default TableComponent