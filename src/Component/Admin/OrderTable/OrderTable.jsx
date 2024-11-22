import * as React from 'react';
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
import EditIcon from '@mui/icons-material/Edit';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { Button, message, Modal, Popconfirm, Select } from 'antd';
import { getAllOrders, updateStatusById } from '../../../Service/OrderApi';

function createData(id, cusId, date, status, billingAddress, phoneNumber, orderDetails) {
    return { id, cusId, date, status, billingAddress, phoneNumber, orderDetails };
}

function Row(props) {
    const { row, reloadTable } = props;
    const [open, setOpen] = React.useState(false);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [rowData, setRowData] = React.useState(null);
    const [changeStatus, setChangeStatus] = React.useState(null);

    const confirm = async () => {
        try {
            const res = await updateStatusById(rowData?.id, changeStatus);
            const result = res.data;

            if (result) {
                message.success('Status updated successfully!');
                setIsModalOpen(false);
                reloadTable();
            } else {
                message.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            message.error('Error occurred while updating status');
        }
    };

    const showModal = (row) => {
        setRowData(row);
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleChange = (value) => {
        setChangeStatus(value);
    };

    return (
        <>
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                    <TableCell>
                        {row?.orderDetails?.reduce((sum, item) => sum + item.price * item.qty, 0).toFixed(2)}
                    </TableCell>
                    <TableCell>{row?.billingAddress}</TableCell>
                    <TableCell>{row?.phoneNumber}</TableCell>
                    <TableCell>{row?.status}</TableCell>
                    <TableCell align="center">
                        <IconButton onClick={() => showModal(row)} color="warning" aria-label="edit">
                            <EditIcon />
                        </IconButton>
                        <IconButton color="primary" aria-label="download">
                            <FileDownloadIcon />
                        </IconButton>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={9}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom>
                                    Order Details
                                </Typography>
                                <Table size="small" aria-label="order details">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Product ID</TableCell>
                                            <TableCell>Image</TableCell>
                                            <TableCell>Product Name</TableCell>
                                            <TableCell>Size</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Total Price (RS)</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {row.orderDetails.map((detail) => (
                                            <TableRow key={detail.productId}>
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

            <Modal
                title={<h2 style={{ textAlign: 'center', color: '#1890ff' }}>Order Details</h2>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel} style={{ background: '#ff4d4f', color: '#fff' }}>
                        Cancel
                    </Button>,
                    <Popconfirm
                        placement="top"
                        title="Edit the Status"
                        onConfirm={confirm}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button key="submit" type="primary">
                            Save
                        </Button>
                    </Popconfirm>,
                ]}
            >
                <table style={{ width: '100%', borderCollapse: 'collapse', padding: '5px' }}>
                    <tbody>
                        <tr>
                            <td style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Order ID</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{rowData?.id}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>
                                Item Quantity
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                                {rowData?.orderDetails?.length}
                            </td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>
                                Billing Address
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{rowData?.billingAddress}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>
                                Phone Number
                            </td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>{rowData?.phoneNumber}</td>
                        </tr>
                        <tr>
                            <td style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #ccc' }}>Status</td>
                            <td style={{ padding: '8px', borderBottom: '1px solid #ccc' }}>
                                <Select
                                    defaultValue={rowData?.status}
                                    style={{ width: '100%' }}
                                    onChange={handleChange}
                                    options={[
                                        { value: 'Pending', label: 'Pending' },
                                        { value: 'Delivering', label: 'Delivering' },
                                        { value: 'Delivered', label: 'Delivered' },
                                        { value: 'Cancelled', label: 'Cancelled' },
                                    ]}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        </>
    );
}

export default function OrderTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [rows, setRows] = React.useState([]);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrders();
            const data = res.data;
            if (data.length > 0) {
                const formattedRows = data.map((item) =>
                    createData(item.id, item.cusId, item.date, item.status, item.billingAddress, item.phoneNumber, item.orderDetails)
                );
                setRows(formattedRows);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box sx={{ width: '100%', overflow: 'hidden' }}>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Date</TableCell>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Item Quantity</TableCell>
                                <TableCell>Total Price (Rs)</TableCell>
                                <TableCell>Billing Address</TableCell>
                                <TableCell>Phone Number</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                <Row key={row.id} row={row} reloadTable={fetchOrders} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 15]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
