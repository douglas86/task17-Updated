import { useState, useEffect } from 'react';
import Form from './Form';
import '../extras/App.css';

// import libraries
import axios from 'axios'; // used for CRUD operations

const App = () => {
    const [data, setData] = useState([]); // data that is received from express

    // Fetches data from index.js on server side
    useEffect(() => {
        axios.get(`http://localhost:3001`).then((res) => {
            // once data is fetched set the new state to data received
            setData(res.data);
        });
    }, []);

    const deleteRow = (id, e) => {
        axios.delete(`http://localhost:3001/${id}`).then((res) => {
            console.log(res);
            console.log(res.data);

            const posts = data.filter((item) => item.id !== id);
            setData({ posts });
        });

        window.location.reload();
    };

    console.log(data);

    return (
        <div className="App">
            <header className="App-header">
                <p>Home Page</p>
                <Form />
                {data.map((posts, index) => {
                    return (
                        <div key={index}>
                            <p>
                                {posts.Todo}{' '}
                                <button
                                    type="submit"
                                    onClick={(e) => deleteRow(posts.id, e)}
                                >
                                    Delete
                                </button>
                            </p>
                        </div>
                    );
                })}
            </header>
        </div>
    );
};

export default App;
