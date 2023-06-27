import { useSelector } from "react-redux"
import React, { useMemo } from 'react';
import { MaterialReactTable } from 'material-react-table';
import {ListItemIcon, MenuItem } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


const LoanTable = ({id}) => {
  const loanData = useSelector((state) => state.loans.data)

  const clientLoanData = loanData.filter((loan) => loan.client === id);

    //should be memoized or stable
    const columns = useMemo(
      () => [
        {
          accessorKey: 'loanDate', //access nested data with dot notation
          header: 'Loan Date',
          size: 150,
        },
        {
          accessorKey: 'repaymentDate', //access nested data with dot notation
          header: 'Repay Date',
          size: 150,
        },
        {
          accessorKey: 'loanAmount', //access nested data with dot notation
          header: 'Loan Amount',
          size: 150,
        },
        {
          accessorKey: 'repaymentAmount', //access nested data with dot notation
          header: 'Repay Amount',
          size: 150,
        },
        {
          accessorKey: 'settled', //access nested data with dot notation
          header: 'Settled',
          size: 150,
          Cell: ({row}) => (
            <div>
                {row.original.settled === true && <span 
                className='bg-green-500 p-2 rounded-lg'>Settled</span>}
            </div>
        )
        },
        {
          accessorKey: 'notes', //access nested data with dot notation
          header: 'Notes',
          size: 150,
        },
      ],
      [],
    );
  
    return <MaterialReactTable 
    columns={columns} 
    data={clientLoanData} 
    enablePagination={false}
    enableRowActions
    renderRowActionMenuItems={({ closeMenu, row }) => [
      <MenuItem
        key={1}
        onClick={() => {
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
    />;
  };
  
  export default LoanTable;