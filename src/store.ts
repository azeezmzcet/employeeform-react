import {configureStore} from '@reduxjs/toolkit';
import employeeReducer from './features/employeeSlice.tsx';


const store = configureStore({

    reducer:{
        employee : employeeReducer,   // name : actionsreduceraname
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;