import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEmployeeToEdit, deleteEmployee } from './employeeSlice.tsx';
import Button from '@mui/material/Button';
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { RootState } from '../store';
import './employeeTable.css';

const EmployeeTable = () => {
  const employees = useSelector((state: RootState) => state.employee.employees);
  const dispatch = useDispatch();
    
  const handleEdit = (index: number) => {
    dispatch(setEmployeeToEdit(index));
  };

  const handleDelete = (index: number) => {
    dispatch(deleteEmployee(index));
  };

  return (
    <table className='one' style={{ width: "100%", justifyContent: "space-between", textAlign: "center" }}>
      <thead>
        <tr style={{ borderCollapse: "collapse", width: "100%" }}>
          <th>NAME</th>
          <th>AGE</th>
          <th>PHONE</th>
          <th>ADDRESS</th>
          
        </tr>
      </thead>
      <tbody style={{ borderCollapse: "collapse", width: "100%" }}>
        {employees.map((emp, index) => (
          <tr key={index}>
            <td>{emp.name}</td>
            <td>{emp.age}</td>
            <td>{emp.ph}</td>
            <td>{emp.address}</td>
            <td>
              <Button startIcon={<EditNoteIcon />} variant="contained" color="success" onClick={() => handleEdit(index)}>Edit</Button>
              <Button style={{ left: "10px" }} endIcon={<DeleteIcon />} variant="outlined" color="error" onClick={() => handleDelete(index)}>Delete</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeeTable;
