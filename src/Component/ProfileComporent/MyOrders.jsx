
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getProduct } from '../../Service/ProductApi';

const columns = [
  { id: 'oid', label: 'Order ID', minWidth: 50 },
  { id: 'date', label: 'Date', minWidth: 100 },
  {
    id: 'name',
    label: 'Product Name',
    minWidth: 170,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size',
    minWidth: 50,
    align: 'left',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'qty',
    label: 'Qty',
    minWidth: 50,
    align: 'lef',
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 100,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(oid, date, name, size,qty,price,status) {
  return { oid, date, name, size, qty,price,status };
}



export default function MyOrders() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows, setRows] = React.useState([]);

  React.useEffect(() => {
    const getProductData = async () => {
      try {
        const res = await getProduct(); 
        const data = res.data;

        if (data.length > 0) {
          const formattedRows = data.map(item =>
            createData(item.id, item.date, item.name, item.size, item.qty, item.price, item.status)
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
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
