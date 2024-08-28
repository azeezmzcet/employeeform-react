import React, { useEffect } from 'react';
import EmployeeForm from './EmployeFrom.tsx';
import EmployeeTable from './features/employeeTable.tsx';
import { Container } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { loadEmployees } from './features/employeeSlice.tsx';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadEmployees());
  }, [dispatch]);

  return (
    <>
      <header>
        <h1>EmployeeForm:</h1>
      </header>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ bgcolor: '#cfe8fc', height: '100%' }}>
          <EmployeeForm />
          <h2 style={{ padding: '20px' }}>Employee List:</h2>
          <EmployeeTable />
        </Box>
      </Container>
    </>
  );
};

export default App;
