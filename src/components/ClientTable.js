import { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import { useSelector } from 'react-redux'
import { Box, ListItemIcon, MenuItem } from '@mui/material';
import { format } from 'date-fns'
import { AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import LoanTable from './LoanTable'
import { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from '@mui/material';
import { Edit } from '@mui/icons-material';
import axios from 'axios';


const ClientTable = () => {
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [tableData, setTableData] = useState(useSelector((state) => state.clients.data).data);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate()

  const handleCreateNewRow = (values) => {
    tableData.push(values);
    setTableData([...tableData]);
  };

  const handleSaveRowEdits = async ({ exitEditingMode, row, values }) => {
    if (!Object.keys(validationErrors).length) {
      try {
        const updatedValues = { id: row.original._id, ...values };
  
        // Make the API request to update the client data
        await axios.put('/clients', updatedValues);
  
        // Update the local table data and exit editing mode
        const updatedTableData = [...tableData]; // Create a copy of the tableData array
        updatedTableData[row.index] = values; // Update the specific row with the new values
        setTableData(updatedTableData);
        exitEditingMode(); // Required to exit editing mode and close modal
      } catch (error) {
        console.log('Error updating client data:', error);
        // Handle the error accordingly (e.g., display an error message)
      }
    }
  };
  

  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: 'name',
        header: 'Name',
        size: 150,
        Cell: ({row}) => (
          <Link className='underline' to={`/client/${row.original._id}`}>{row.original.name}</Link>
        )
      },
      {
        accessorKey: 'idNumber',
        header: 'ID Number',
        size: 150,
      },
      {
        accessorKey: 'bank',
        header: 'Bank',
        size: 150,
      },
      {
        accessorKey: 'accNumber',
        header: 'Account Number',
        size: 150,
      },
      {
        accessorKey: 'salaryDate',
        header: 'Salary Date',
        size: 150,
        Cell:({row}) => (
          <div>
            {format(new Date(row.original.salaryDate), 'd')}
          </div>
        )
      },
      {
        accessorKey: 'phone',
        header: 'Phone Number',
        size: 150,
      },
      {
        accessorKey: 'badLender',
        header: 'Status',
        size: 150,
        Cell: ({row}) => (
            <div>
                {row.original.badLender === true && <span 
                className='bg-red-500 p-2 rounded-lg'>Bad Lender</span>}
            </div>
        )
      },
      {
        accessorKey: 'office',
        header: 'Office',
        size: 150,
      },
      {
        accessorKey: 'address',
        header: 'Address',
        size: 100,
      },
      {
        accessorKey: 'industry',
        header: 'Industry',
        size: 150,
      },
      {
        accessorKey: 'notes',
        header: 'Notes',
        size: 150,
      },
    ],
    [],
  );

  const handleViewProfile = (id) => {
    navigate(`/client/${id}`)
  }

  const handleProfileEdit = (id) => {
    navigate(`/client/add/${id}`)
  }

  return (
    <>
    <MaterialReactTable
    displayColumnDefOptions={{
      'mrt-row-actions': {
        muiTableHeadCellProps: {
          align: 'center',
        },
        size: 120,
      },
    }}
      columns={columns}
      data={tableData}
      editingMode="modal" //default
      enableColumnOrdering
      enableEditing
      onEditingRowSave={handleSaveRowEdits}
      onEditingRowCancel={handleCancelRowEdits}
      enableColumnFilterModes
      enablePinning
      enableRowActions
      enablePagination={false}
      enableRowVirtualization
      initialState={{ showColumnFilters: false }}
      renderDetailPanel={({ row }) => (
        <Box>
          <div>
            {row.original.name} Loans:
            <LoanTable id={row.original._id}/>
          </div>
        </Box>
      )}
      renderRowActionMenuItems={({ closeMenu, row }) => [
        <MenuItem
          key={0}
          onClick={() => {
            handleViewProfile(row.original._id)
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          View Profile
        </MenuItem>,
        <MenuItem
          key={1}
          onClick={() => {
            handleProfileEdit(row.original._id)
            closeMenu();
          }}
          sx={{ m: 0 }}
        >
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          Edit
        </MenuItem>,
      ]}
      renderRowActions={({ row, table }) => (
        <Box sx={{ display: 'flex', gap: '1rem' }}>
          <Tooltip arrow placement="left" title="Edit">
            <IconButton onClick={() => table.setEditingRow(row)}>
              <Edit />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      renderTopToolbarCustomActions={() => (
        <Button
          color="secondary"
          onClick={() => setCreateModalOpen(true)}
          variant="contained"
        >
          Create New Account
        </Button>
      )}
    />
    
    <CreateNewAccountModal
      columns={columns}
      open={createModalOpen}
      onClose={() => setCreateModalOpen(false)}
      onSubmit={handleCreateNewRow}
    />
    </>
  );
};

export const CreateNewAccountModal = ({ open, columns, onClose, onSubmit }) => {
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ''] = '';
      return acc;
    }, {}),
  );

  const handleSubmit = () => {
    //put your validation logic here
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Account</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: '100%',
              minWidth: { xs: '300px', sm: '360px', md: '400px' },
              gap: '1.5rem',
            }}
          >
            {columns.map((column) => (
              <TextField
                key={column.accessorKey}
                label={column.header}
                name={column.accessorKey}
                onChange={(e) =>
                  setValues({ ...values, [e.target.name]: e.target.value })
                }
              />
            ))}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: '1.25rem' }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClientTable;