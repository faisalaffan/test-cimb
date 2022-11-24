import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import UserService from '../usecase/UserService';
import {UserNetworkStruct, UserNetworkStructPayload} from '../domain/network/UsersNetworkStruct';
import {Button, Container, Grid, Typography} from "@mui/material";
import AppDialog from "../components/App/AppDialog";
import AppButton from '../components/App/AppButton';
import AppInputText from "../components/App/AppInputText";

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const {count, page, rowsPerPage, onPageChange} = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{flexShrink: 0, ml: 2.5}}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon/> : <FirstPageIcon/>}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight/> : <KeyboardArrowLeft/>}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft/> : <KeyboardArrowRight/>}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon/> : <LastPageIcon/>}
            </IconButton>
        </Box>
    );
}

interface Column {
    id: 'name' | 'email' | 'gender' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right' | 'center';
    format?: (value: number) => string;
}

const HomePage = () => {
    const [dialog, setDialog] = React.useState(false as boolean);
    const [rows, setRows] = React.useState([] as any[]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const headers: readonly Column[] = [
        {id: 'name', label: 'Name', minWidth: 170},
        {id: 'email', label: 'Email', minWidth: 170},
        {id: 'gender', label: 'Gender', minWidth: 170},
        {id: 'action', label: 'Action', minWidth: 170, align: 'center'},
    ];

    React.useEffect(() => {
        const initPage = async () => {
            const res = await UserService.get()
            const data = []
            for (const item of res.data) {
                const transform = new UserNetworkStruct(item)
                data.push(transform)
            }
            setRows(data)
        }
        Promise.all([initPage()]).then((v) => {
        }).catch(err => {
        })
    }, [])

    const printBody = () => {
        const element = (row: any) => {
            return (
                <TableRow key={row?.id}>
                    <TableCell component="th" scope="row">
                        {row?.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row?.email}
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row?.gender}
                    </TableCell>
                    <TableCell component="th" scope="row" align={'center'}>
                        <AppButton type={'View'} onClick={() => {
                            setDialog(true)
                        }}/>
                        <AppButton type={'Update'} onClick={() => {
                            setDialog(true)
                        }}/>
                        <AppButton type={'Delete'} onClick={() => {
                            setDialog(true)
                        }}/>
                    </TableCell>
                </TableRow>
            )
        }
        if (rowsPerPage > 0) {
            return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                return (
                    element(row)
                )
            })
        } else {
            return rows.map((row) => {
                return (
                    element(row)
                )
            })
        }
    }


    const [payload, setPayload] = React.useState(new UserNetworkStructPayload({}));

    return (
        <>
            {JSON.stringify(payload)}
            <AppDialog open={dialog} onCancel={() => {
                setDialog(false)
            }} onSubmit={() => {
                console.log('do cancel')
            }} title={'Tambah Pengguna'} isShowSubmit={true}>
                <AppInputText value={payload.name} label={'Nama'} type={'Text'} onChange={(v: any) => {
                    setPayload({...payload, name: v.target.value})
                }}/>
                <AppInputText value={payload.name} label={'Gender'} type={'Text'} onChange={(v: any) => {
                    setPayload({...payload, gender: v.target.value})
                }}/>
                <AppInputText value={payload.name} label={'Email'} type={'Text'} onChange={(v: any) => {
                    setPayload({...payload, email: v.target.value})
                }}/>
            </AppDialog>
            <Container>
                <Grid container spacing={2} style={{marginTop: '10rem'}} justifyContent={'center'}
                      justifyItems={'center'} justifySelf={'center'}>
                    <Grid lg={8} style={{paddingLeft: '1rem'}}>
                        <Typography variant="h4" gutterBottom>
                            Daftar Pengguna
                        </Typography>
                    </Grid>
                    <Grid lg={4} textAlign={'right'}>
                        <Button variant="contained" onClick={() => setDialog(true)}>
                            Tambah
                        </Button>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 500}} aria-label="custom pagination table">
                        <TableHead>
                            <TableRow>
                                {headers.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{minWidth: column.minWidth}}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {printBody()}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, {label: 'All', value: -1}]}
                                    colSpan={headers.length}
                                    align={'center'}
                                    valign={'middle'}
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage}
                                    page={page}
                                    SelectProps={{
                                        inputProps: {
                                            'aria-label': 'rows per page',
                                        },
                                        native: true,
                                    }}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    ActionsComponent={TablePaginationActions}
                                />
                            </TableRow>
                            {
                                /**
                                 /* TODO: Create Pagination For Preferred
                                 */
                            }
                            {/*<Stack spacing={2} alignContent={'center'} alignItems={'center'}>*/}
                            {/*    <Pagination count={10} variant="outlined" shape="rounded" onChange={(e, v) => {*/}
                            {/*        console.log(v)*/}
                            {/*    }}/>*/}
                            {/*</Stack>*/}
                        </TableFooter>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
}

export default HomePage;
