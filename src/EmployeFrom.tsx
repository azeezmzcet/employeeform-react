import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateEmployeeField, addEmployee, updateEmployee } from './features/employeeSlice.tsx';
import { RootState } from './store';
import { Button, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import '../src/EmployeeFrom.css';

const EmployeeForm: React.FC = () => {
  const employee = useSelector((state: RootState) => state.employee.currentEmployee);
  const isEditing = useSelector((state: RootState) => state.employee.isEditing);
  const dispatch = useDispatch();

 
  const [errors, setErrors] = useState({name: '',age: '',ph: '',address: ''});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateEmployeeField({ name, value }));
  };

  const validate = (): boolean => {
    const errors = { name: '', age: '', ph: '', address: '' };
    let valid = true;

    if (!employee.name) {
      errors.name = 'Name is required';
      valid = false;
    }
    if (!employee.age) {
      errors.age = 'age is required';
      valid = false;
    }
    if (!employee.ph) {
      errors.ph = 'Phone number is required';
      valid = false;
    } else if (employee.ph.length !== 10) {
      errors.ph = ' exactly 10 digits';
      valid = false;
    }
    if (!employee.address) {
      errors.address = 'Address is required';
      valid = false;
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      if (isEditing) {
        dispatch(updateEmployee());
      } else {
        dispatch(addEmployee());
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="employee-form">
      <div className="form-group">
        <TextField
          id="name"
          name="name"
          label="Name"
          variant="outlined"
          value={employee.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          id="age"
          name="age"
          label="Age"
          variant="outlined"
          type="number"
          value={employee.age}
          onChange={handleChange}
          error={!!errors.age}
          helperText={errors.age}
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          id="ph"
          name="ph"
          label="Phone"
          variant="outlined"
          type="text"
          value={employee.ph}
          onChange={(e) => {
            const value = e.target.value;
            if (value.length <= 10 && /^\d*$/.test(value)) {
              handleChange(e);
            }
          }}
          error={!!errors.ph}
          helperText={errors.ph}
          placeholder="Enter phone number"
          fullWidth
        />
      </div>
      <div className="form-group">
        <TextField
          id="address"
          name="address"
          label="Address"
          variant="outlined"
          value={employee.address}
          onChange={handleChange}
          error={!!errors.address}
          helperText={errors.address}
          fullWidth
        />
      </div>
      <Button
        variant="outlined"
        type="submit"
        startIcon={<AddIcon />}
        className="submit-button"
        style={{ color: isEditing ? 'orange' : 'blue', borderColor: isEditing ? 'orange' : 'blue' }}
      >
        {isEditing ? 'Update' : 'Submit'}
      </Button>
    </form>
  );
};

export default EmployeeForm;
