import { useState, useEffect } from 'react';
import Form from './Form';
import '../extras/App.css';

// import libraries
import axios from 'axios'; // used for CRUD operations

const App = () => {
    const [data, setData] = useState([]);

    // Fetches data from index.js on server side
    useEffect(() => {
        axios.get(`http://localhost:3001`).then((res) => {
            // once data is fetched set the new state to data received
            setData(res.data);
        });
    }, []);

    console.log(data);

    return (
        <div className="App">
            <header className="App-header">
                <p>Home Page</p>
                <Form />
                {data.map((value, index) => {
                    return (
                        <div key={index}>
                            <p>{value.value}</p>
                        </div>
                    );
                })}
            </header>
        </div>
    );
};

export default App;
