import "./App.css";
import { useState , useEffect } from "react";
function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8080/demo',{
      method:'POST', 
      body:JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      } 
    })
    const data = await response.json();
    console.log(data);
    // console.log(response);
    // console.log(form);
    
  };

  //if we want to list all the users in react
  const getUsers = async()=>{
    const response = await fetch('http://localhost:8080/demo',{    //https://node-server-practice.onrender.com
      method:'GET'
    })
    const data = await response.json();
    // console.log(data);
    setUsers(data);
  }
  //react me sidhe getUsers() call ni kar skate
  // yha pe useEffect hook ka use karna padega
  useEffect(()=>{
    getUsers();
  },[users])


  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* <p>{JSON.stringify(form)}</p>      written for debugging purpose*/}  
        <label>username:</label>
        <input type="text" name="username" onChange={handleForm}></input> <br/>
        <label>email:</label>
        <input type="email" name="email" onChange={handleForm}></input> <br/>
        <label>password:</label>
        <input type="password" name="password" onChange={handleForm}></input> <br/>
        <input type="submit"></input>
      </form>

      <div>
        <ul>
          {users.map(user=><li key={user._id}>{user.username},{user.email}</li>)}
        </ul>
      </div>


    </div>
  );
}

export default App;
