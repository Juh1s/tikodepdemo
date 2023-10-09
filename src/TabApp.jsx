import React, {useState} from  'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import App from './App';
import Home from './components/Home';

function TabApp() {

    
    const [value, setValue] = useState('one');
    const handleChange = (event, value) => {
        setValue(value);
    };
    
    return (
        <div>
            <Tabs value={value} onChange={handleChange}>
                <Tab value="one" label="HOME" />
                <Tab value="two" label="TODOS" />
            </Tabs>
            {value === 'one' && <Home/>}
            {value === 'two' && <App/>}
        </div>
    );
}

export default TabApp;