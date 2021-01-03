import { useState, useEffect } from 'react';
import Form from './Form';
import '../extras/App.css';

import axios from 'axios';

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001`).then((res) => {
            setData(res.data);
        });
    }, []);

    console.log(data);

    return (
        <div className="App">
            <header className="App-header">
                <p>Home Page</p>
                <Form />
            </header>
        </div>
    );
};

export default App;
