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
import { deleteOrderByOrderId, getOrdersById } from '../../Service/OrderApi';
import { Button, message, Tag } from 'antd';
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, SyncOutlined } from '@ant-design/icons';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import jsPDF from 'jspdf'; 
import 'jspdf-autotable'; 

function createData(id, cusId, date, status, billingAddress, phoneNumber, orderDetails, invoiceNumber, paymentMethod) {
    return { id, cusId, date, status, billingAddress, phoneNumber, orderDetails, invoiceNumber, paymentMethod };
}

function Row(props) {
    const { row, handleDeleteOrder } = props;
    const [open, setOpen] = React.useState(false);
    const generatePDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text(`Order Details: CS${row.id}`, 14, 20);

        doc.setFontSize(12);
        doc.text(`Date: ${row.date}`, 14, 30);
        doc.text(`Invoice Number: ${row.invoiceNumber}`, 14, 40);
        doc.text(`Payment Method: ${row.paymentMethod}`, 14, 50);
        doc.text(`Billing Address: ${row.billingAddress}`, 14, 60);
        doc.text(`Phone Number: ${row.phoneNumber}`, 14, 70);
        doc.text(`Total Items: ${row.orderDetails.length}`, 14, 80);
        doc.text(`Total Price: RS ${row.orderDetails.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}`, 14, 90);

        const tableData = row.orderDetails.map((detail) => [
            detail.productId,
            detail.productName,
            detail.productSize,
            detail.qty,
            (detail.price * detail.qty).toFixed(2),
        ]);

        doc.autoTable({
            head: [['Product ID', 'Product Name', 'Size', 'Qty', 'Total Price (RS)']],
            body: tableData,
            startY: 100,
        });

        doc.save(`Order_CS${row.id}.pdf`);
    };

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
                <TableCell>{row?.paymentMethod}</TableCell>
                <TableCell >{row?.billingAddress}</TableCell>
                <TableCell>{row.orderDetails?.length}</TableCell>
                <TableCell >{row?.orderDetails?.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}</TableCell>
                <TableCell>
                    {row?.status === 'Processing' && (<Tag icon={<SyncOutlined spin />} color="processing">Processing </Tag>)}
                    {row?.status === 'Delivering' && (<Tag icon={<SyncOutlined spin />} color="pink">Delivering</Tag>)}
                    {row?.status === 'Delivered' && (<Tag icon={<CheckCircleOutlined />} color="success">Delivered </Tag>)}
                    {row?.status === 'Rejected' && (<Tag icon={<CloseCircleOutlined />} color="error"> Rejected </Tag>)}
                </TableCell>
                <TableCell ><Button icon={<DeleteOutlined />} type='dashed' color='danger' disabled={row.status != "Processing"} onClick={() => handleDeleteOrder(row.id)} danger></Button>
                    <IconButton onClick={generatePDF} color="primary" aria-label="download">
                        <FileDownloadIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow >
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6} >
                    <Collapse in={open} timeout="auto" unmountOnExit >
                        <Box sx={{ margin: 1 }} >
                            <Typography variant="h6" gutterBottom component="div" className='fw-bold' >
                                Order Details
                            </Typography>
                            <h6>INV Number   : {row?.invoiceNumber} </h6>
                            <h6> Phone Number :  {row?.phoneNumber}</h6>
                            <hr />
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

export default function MyOrders({ cusID }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const handleDeleteOrder = async (id) => {
        try {
            const res = await deleteOrderByOrderId(id);
            if (res.data === true) {
                message.success("Your Order Delete Success...");
                await getProductData();
            } else if (res.data?.status === "Failed") {
                message.error(res.data?.message);
            } else {
                message.error("Your Order Delete failed.");
            }
        } catch (e) {
            console.error("Error deleting order:", e);
            message.error("An error occurred while deleting the order.");
        }
    };

    const getProductData = async () => {
        try {
            const res = await getOrdersById(cusID);
            let value = res.data;

            if (value && value.length > 0) {
                value = value.sort((a, b) => b.id - a.id);

                const formattedRows = value.map((item) =>
                    createData(
                        item.id,
                        item.cusId,
                        item.date,
                        item.status,
                        item.billingAddress,
                        item.phoneNumber,
                        item.orderDetails,
                        item.invoiceNumber,
                        item.paymentMethod
                    )
                );
                setRows([...formattedRows]);
            } else {
                setRows([]);
            }
        } catch (error) {
            console.error("Error fetching product data:", error);
        }
    };

    React.useEffect(() => {
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
                        <TableCell className='fw-bold' >Payment Method</TableCell>
                        <TableCell className='fw-bold' >Billing Address</TableCell>
                        <TableCell className='fw-bold' >Items</TableCell>
                        <TableCell className='fw-bold' >Total Price</TableCell>
                        <TableCell className='fw-bold' >Status</TableCell>
                        <TableCell className='fw-bold' >Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                        <Row key={row.id} row={row} handleDeleteOrder={handleDeleteOrder} />
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
