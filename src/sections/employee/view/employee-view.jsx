import { useState } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';  // Import TableRow
import TableCell from '@mui/material/TableCell'; // Import TableCell

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import TableNoData from '../table-no-data';
import EmployeeTableRow from '../employee-table-row';
import EmployeeTableHead from '../employee-table-head';
import TableEmptyRows from '../table-empty-rows';
import EmployeeTableToolbar from '../employee-table-toolbar';
import { emptyRows, applyFilter, getComparator } from '../utils';

// Import Modal components
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const dummyData = [
  {
    id: '1',
    name: 'John Doe',
    company: 'Company A',
    role: 'Admin',
    isVerified: true,
    status: 'active',
    addedBy: 'Admin1',
    lastEditedBy: 'Admin1',
  },
  {
    id: '2',
    name: 'Jane Smith',
    company: 'Company B',
    role: 'User',
    isVerified: false,
    status: 'banned',
    addedBy: 'Admin2',
    lastEditedBy: 'Admin2',
  },
];

export default function EmployeePage() {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [employees, setEmployees] = useState(dummyData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [filters, setFilters] = useState({
    status: '',
    isVerified: '',
  });
  const [currentEmployee, setCurrentEmployee] = useState({
    id: '',
    name: '',
    company: '',
    role: '',
    isVerified: false,
    status: 'active',
    addedBy: 'Admin1',
    lastEditedBy: 'Admin1',
  });

  const handleSort = (event, id) => {
    const isAsc = orderBy === id && order === 'asc';
    if (id !== '') {
      setOrder(isAsc ? 'desc' : 'asc');
      setOrderBy(id);
    }
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = employees.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleOpenModal = (employee = null) => {
    if (employee) {
      setCurrentEmployee(employee);
      setIsEditMode(true);
    } else {
      setCurrentEmployee({
        id: '',
        name: '',
        company: '',
        role: '',
        isVerified: false,
        status: 'active',
        addedBy: 'Admin1',
        lastEditedBy: 'Admin1',
      });
      setIsEditMode(false);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSave = () => {
    if (isEditMode) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === currentEmployee.id ? currentEmployee : emp
        )
      );
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...currentEmployee, id: (prev.length + 1).toString() },
      ]);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    setSelected([]);
  };

  const handleDeleteSelected = () => {
    setEmployees((prev) => prev.filter((emp) => !selected.includes(emp.name)));
    setSelected([]);
  };



  const applyFilters = (employee) => {
    if (filters.status && employee.status !== filters.status) return false;
    if (filters.isVerified && ((filters.isVerified === 'yes' && !employee.isVerified) || (filters.isVerified === 'no' && employee.isVerified))) return false;
    return true;
  };

  const dataFiltered = applyFilter({
    inputData: employees.filter(applyFilters),
    comparator: getComparator(order, orderBy),
    filterName,
  });

  const notFound = !dataFiltered.length && !!filterName;

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">Employees</Typography>

        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          onClick={() => handleOpenModal()}
        >
          New Employee
        </Button>
      </Stack>

      <Card>
        <EmployeeTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
          onDeleteSelected={handleDeleteSelected}
          setFilters={setFilters}
        />

        <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <EmployeeTableHead
                order={order}
                orderBy={orderBy}
                rowCount={employees.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <EmployeeTableRow
                      key={row.id}
                      employee={row}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                      handleOpenModal={() => handleOpenModal(row)}
                      handleDelete={() => handleDelete(row.id)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, employees.length)}
                />

                {notFound && <TableNoData query={filterName} />}
                {!dataFiltered.length && !filterName && (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <Typography variant="h6" align="center" color="textSecondary">
                        No employees found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar>

        <TablePagination
          page={page}
          component="div"
          count={employees.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Card>

      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" component="h2">
            {isEditMode ? 'Edit Employee' : 'New Employee'}
          </Typography>
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            value={currentEmployee.name}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, name: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Company"
            value={currentEmployee.company}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, company: e.target.value })
            }
          />
          <TextField
            fullWidth
            margin="normal"
            label="Role"
            value={currentEmployee.role}
            onChange={(e) =>
              setCurrentEmployee({ ...currentEmployee, role: e.target.value })
            }
          />
          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            onClick={handleSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </Container>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
