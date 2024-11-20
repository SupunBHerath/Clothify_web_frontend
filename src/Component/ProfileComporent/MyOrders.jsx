import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import { getOrdersById } from '../../Service/OrderApi';

function createData(id, cusId, date, status,billingAddress, phoneNumber,orderDetails) {
    return { id, cusId, date, status,billingAddress,phoneNumber, orderDetails };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    return (
        <React.Fragment >
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} >
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell>{row?.date}</TableCell>
                <TableCell>CS{row?.id}</TableCell>
                <TableCell>{row.orderDetails?.length}</TableCell>
                <TableCell >{row?.orderDetails?.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</TableCell>
                <TableCell >{row?.billingAddress}</TableCell>
                <TableCell >{row?.phoneNumber}</TableCell>
                <TableCell >{row?.status}</TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 1 }} >
                            <Typography variant="h6" gutterBottom component="div" className='fw-bold' >
                                Order Details
                            </Typography>
                            <Table size="small" aria-label="order details" className='bg-body-tertiary'>
                                <TableHead>
                                    <TableRow>
                                        <TableCell className='fw-bold'  >Product ID</TableCell>
                                        <TableCell className='fw-bold'  >Image</TableCell>
                                        <TableCell className='fw-bold'  >Product Name</TableCell>
                                        <TableCell className='fw-bold'  >Size</TableCell>
                                        <TableCell className='fw-bold'  >Qty</TableCell>
                                        <TableCell className='fw-bold'  >Total Price (RS)</TableCell>
                                       
                                    </TableRow>
                                </TableHead>
                                <TableBody >
                                    {row.orderDetails.map((detail) => (
                                        <TableRow key={detail.productId} >
                                            <TableCell>{detail.productId}</TableCell>
                                            <TableCell>
                                                {detail.productImg && (
                                                    <img
                                                        src={detail.productImg}
                                                        alt={detail.productName}
                                                        style={{ width: '80px', height: 'auto' }}
                                                    />
                                                )}
                                            </TableCell>
                                            <TableCell>{detail.productName}</TableCell>
                                            <TableCell>{detail.productSize}</TableCell>
                                            <TableCell>{detail.qty}</TableCell>
                                            <TableCell>{(detail.price * detail.qty).toFixed(2)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

// const rows = [
//     createData(
//         3,
//         100,
//         '2024-11-20',
//         'Pending',
//         [
//             {
//                 productId: 101,
//                 productName: 'T-Shirt',
//                 productImg: '',
//                 productSize: 'M',
//                 price: 29.99,
//                 productImg: 'https://res.cloudinary.com/dklmxsahg/image/upload/v1731833285/ascmy2yaygdel9iya7xi.png',

//                 qty: 2,
//                 phoneNumber: '1234567890',
//                 cusAddress: '123 Main Street, Cityville',
//                 postalCode: '98765'
//             },
//             {
//                 productId: 102,
//                 productName: 'Jeans',
//                 productImg: 'https://res.cloudinary.com/dklmxsahg/image/upload/v1731833285/ascmy2yaygdel9iya7xi.png',
//                 productSize: 'L',
//                 price: 49.99,
//                 qty: 1,
//                 phoneNumber: '1234567890',
//                 cusAddress: '123 Main Street, Cityville',
//                 postalCode: '98765'
//             }
//         ]
//     ),
// ];

export default function MyOrders() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        const getProductData = async () => {
            try {
                const res = await getOrdersById(100);
                const data = res.data;

                if (data.length > 0) {
                    const formattedRows = data.map(item =>
                        createData(item.id, item.cusId, item.date, item.status,item.billingAddress,item.phoneNumber, item.orderDetails)
                    );
                    setRows(formattedRows);
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        getProductData();
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); 
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell className='fw-bold' >Date</TableCell>
                        <TableCell className='fw-bold' >Order ID</TableCell>
                        <TableCell className='fw-bold' >Items</TableCell>
                        <TableCell className='fw-bold' >Total Price</TableCell>
                        <TableCell className='fw-bold' >Billing Address</TableCell>
                        <TableCell className='fw-bold'  >Phone Number</TableCell>
                        <TableCell className='fw-bold' >Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <Row key={row.id} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
}
