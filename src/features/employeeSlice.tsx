import { createSlice } from '@reduxjs/toolkit';

interface Azeez {
  name: string;
  age: string;
  ph: string;
  address: string;
}

interface AzeezState {
  currentEmployee: Azeez;
  isEditing: boolean;
  employees: Azeez[];
  editingIndex: number | null;
}

const initialState: AzeezState = {
  currentEmployee: {
    name: '',
    age: '',
    ph: '',
    address: '',
  },
  isEditing: false,
  employees: [], 
  editingIndex: null, 
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    loadEmployees(state) {
      const employees: Azeez[] = [];
      for (let i = 0; ; i++) {
        const employee = localStorage.getItem(`value:${i}`);
        if (!employee) break;
        employees.push(JSON.parse(employee));
      }
      state.employees = employees;
    },
    updateEmployeeField(state, action) {
      const { name, value } = action.payload;
      state.currentEmployee[name] = value;
    },
    addEmployee: (state) => {
      const id = state.employees.length;
      localStorage.setItem(`value:${id}`, JSON.stringify(state.currentEmployee));
      state.employees.push({ ...state.currentEmployee });
      state.currentEmployee = { name: '', age: '', ph: '', address: '' };
      state.isEditing = false;
    },
    setEmployeeToEdit(state, action) {
      const index = action.payload;
      if (index >= 0) {
        state.currentEmployee = { ...state.employees[index] };
        state.isEditing = true;
        state.editingIndex = index;
      }
    },
    updateEmployee(state) {
      if (state.editingIndex !== null) {
        const id = state.editingIndex;
        localStorage.setItem(`value:${id}`, JSON.stringify(state.currentEmployee));
        state.employees[id] = { ...state.currentEmployee };
        state.currentEmployee = { name: '', age: '', ph: '', address: '' };
        state.isEditing = false;
        state.editingIndex = null;
      }
    },
    deleteEmployee(state, action) {
      const index = action.payload;
      localStorage.removeItem(`value:${index}`);
      state.employees.splice(index, 1);
      for (let i = index; i < state.employees.length; i++) {
        const employee = localStorage.getItem(`value:${i + 1}`);
        if (employee) {
          localStorage.setItem(`value:${i}`, employee);
          localStorage.removeItem(`value:${i + 1}`);
        }
      }
    },
  },
});

export const { loadEmployees, updateEmployeeField, addEmployee, setEmployeeToEdit, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
