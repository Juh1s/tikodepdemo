import { useState, useRef } from 'react';
import { AgGridReact } from 'ag-grid-react';
import Header from './components/Header';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
//import TodoTable from './components/TodoTable';

function App() {
  const [todo, setTodo] = useState({
    description: '',
    date: '',
    priority: ''
  });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const [columnDefs] = useState([
    { field: 'description', sortable: true, filter: true, floatingFilter: true},
    { field: 'priority', sortable: true, filter: true, floatingFilter: true,
      cellStyle: params => params.value ==='High' ? { color: 'red'} : { color: 'black'}
    },
    { field: 'date', sortable: true, filter: true, floatingFilter: true}
  ]);

  const addTodo = () => {
    setTodos([...todos, todo]);
    setTodo({description:'', date:'', priority:''});
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      const row = gridRef.current.getSelectedNodes()[0].id;
      setTodos(todos.filter((item, index) => 
        index != row));
    }
    else {
      alert('Select row first');
    }
  }

 
  return (
    <Container>
      <Header/>
      <Stack 
        direction={'row'} 
        spacing={2}
        alignItems={"center"}
        justifyContent={"center"}
        mt={2}
      >
        <TextField
        label='Description'
        value={todo.description}
        onChange={e => setTodo({...todo, description: e.target.value})}
        />
        <TextField
        label='Priority'
        value={todo.priority}
        onChange={e => setTodo({...todo, priority: e.target.value})}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker
              label="Date"
              onChange={e => setTodo({...todo, date: e})}
            />
          </DemoContainer>
        </LocalizationProvider>
        <Button variant='contained' onClick={addTodo}>Add</Button>
        <Button variant='contained' color="error" onClick={deleteTodo}>Delete</Button>
      </Stack>
      <Stack alignItems={"center"} justifyContent={"center"}>
        <div className='ag-theme-material' style={{ width: 600, height: 500}} >
          <AgGridReact
              ref={gridRef}
              onGridReady={params => gridRef.current = params.api}
              rowSelection='single'
              columnDefs={columnDefs}
              rowData={todos}
              animateRows={true}
          />

        </div>
      </Stack>
    </Container>
  )
}

export default App