import { useState, useEffect } from 'react'
import { Table, Container, Row, Col, InputGroup, FormControl, Button } from 'react-bootstrap';

function List() {
    const [users, setUsers] = useState([]);
    const [id, setId] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [button, setButton] = useState('Add');



    useEffect(() => {
        getUserList()
    }, [])

    function getUserList() {
        fetch("http://localhost:3004/users").then(result => {
            result.json().then(resp => {
                setUsers(resp)
            })
        })
    }

    function addUser() {
        let data = { name, email }

        let apiUrl='http://localhost:3004/users';
        let apiMethod='POST'
        
        if(button==='Update')
        {
            data = {id, name, email }
            apiMethod='PUT'
            apiUrl=`http://localhost:3004/users/${id}`
        }

        fetch(apiUrl, {
            method: apiMethod, // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(data => {
                setName('');
                setEmail('');
                getUserList();              
                setButton('Add')
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    function deleteUser(id)
    {
        fetch(`http://localhost:3004/users/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {             
                getUserList();              
                
            })
            .catch((error) => {
                console.error('Error:', error);
            })
    }

    function updateUser(id)
    {
        fetch(`http://localhost:3004/users/${id}`).then(result => {
            result.json().then(resp => {
                setButton('Update')
                setName(resp.name);
                setEmail(resp.email);
                setId(resp.id)
            })
        })
        
    }

    return (
        <Container>

            <Row>
                <Col md={12}>
                    <input type='text' value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Enter your name' /><br /><br />

                    <input type='text' value={email}
                        onChange={(e) => setEmail(e.target.value)} placeholder='Enter your email' /><br /><br />

                    <button onClick={() => addUser()}>{button} User</button>

                </Col>
                <br /><br />
                <Col md={12}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.map((item, i) =>
                                    <tr key={i}>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button onClick={()=>deleteUser(item.id)}>Delete</button>
                                            ||
                                            <button onClick={()=>updateUser(item.id)}>Update</button>
                                        </td>
                                    </tr>
                                )
                            }

                        </tbody>
                    </Table>
                </Col>

            </Row>


            {/* <button onClick={()=>getUserList()}>Click Me</button> */}
        </Container>
    )
}

export default List;