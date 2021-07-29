import { useState } from 'react'

function User() { 
    const[users, setUsers]=useState([''])
    const[name, setName]=useState('')

    function addUser()
    {
        const newList = users.concat(name)
        setUsers(newList)
        setName('');
    }
    
    return (
        <div>
            <input type='text' value={name} onChange={(e)=>setName(e.target.value)} />
            <button onClick={()=>addUser()}>Add User</button>
            {
            users.map((user, index) =>
            user.length>0 ? <li key={index}>{user}</li> : null
            
            )
            }
           
        </div>


    );
}

export default User;