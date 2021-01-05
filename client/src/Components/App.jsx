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

    const editRow = (index, id, e) => {
        axios
            .put(`http://localhost:3001/${index}/${id}`, { Todo: e })
            .then((res) => {
                console.log(res);
            });
    };

    const handleSubmit = () => {
        window.location.reload();
    };

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
                                    onClick={(e) => deleteRow(index, e)}
                                >
                                    Delete
                                </button>
                                <input
                                    style={{ width: '80px' }}
                                    type="text"
                                    onChange={(e) => {
                                        editRow(
                                            index,
                                            posts.id,
                                            e.target.value
                                        );
                                    }}
                                />
                                <button type="submit" onClick={handleSubmit}>
                                    Edit
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
