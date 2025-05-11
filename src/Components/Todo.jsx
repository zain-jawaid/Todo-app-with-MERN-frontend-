// import React, { useEffect, useState } from "react";
// import { TextField, Button, Box, Checkbox } from "@mui/material";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// function Todo() {
//   const [todos, setTodos] = useState([]);
//   const [task, settask] = useState("");
//   const [editIndex, setEditIndex] = useState(null);
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);
  
  

//   const navigate = useNavigate();
//     const handleSignOut = () => {
//       localStorage.removeItem("authToken"); // Remove token on logout
//       navigate("/signin"); // Redirect to sign-in page
//     };
    
//   const addTodo = () => {
//     if (editIndex !== null) {
//       const id = todos[editIndex]._id; // find the _id from todos
//       editTodo(id, task); // call editTodo function
//     } else {
//       axios.post("http://localhost:4000/add", { task: task })
//         .then(result => {
//           setTodos([...todos, result.data]);
//           settask("");
//         })
//         .catch(err => console.log(err));
//     }
//   };
  
//   useEffect(()=>{ 
//     axios.get('http://localhost:4000/get')
//     .then(result=> setTodos(result.data))
//     .catch(err=> console.log(err))
//   },[])

  
//   const editTodo = (id, newTask) => {
//     axios.put('http://localhost:4000/edit/' + id, { task: newTask })
//       .then(result => {
//         const updatedTodos = todos.map(todo =>
//           todo._id === id ? { ...todo, task: newTask } : todo
//         );
//         setTodos(updatedTodos);
//         settask("");
//         setEditIndex(null);
//       })
//       .catch(err => console.log(err));
//   };
//   const handleEditButton = (index) => {
//     settask(todos[index].task);
//     setEditIndex(index);
//   };
    
  
//   const completeTodo = (id) =>{
//     axios.put('http://localhost:4000/update/'+id)
//     .then(result=> {
//       const updatedTodos = todos.map(todo =>
//         todo._id === id ? { ...todo, done: true } : todo
//       )
//       setTodos(updatedTodos);
//     })
//     .catch(err=> console.log(err))
    
//   }

//   const deleteTodo = (id) => {
//     axios.delete('http://localhost:4000/delete/' + id)
//       .then(result => {
//         const filteredTodos = todos.filter(todo => todo._id !== id);
//         setTodos(filteredTodos);
//       })
//       .catch(err => console.log(err));
//   };
  

//   const deleteAllTodo = () => {
//     axios.delete('http://localhost:4000/deleteAll')
//     .then(result=> {
//       setTodos([]);
//     })
//     .catch(err=> console.log(err))
//   };
  
//   return (
//     <div className="main m-5">
//     <h2 className="text-2xl font-semibold mb-4">
//   Welcome, {user ? user.name : "Guest"}!
// </h2>


//       <Box className="flex gap-2 mt-10 items-center ">
//         <TextField
//           value={task}
//           label="Add Item"
      
//           variant="outlined"
//           onChange={(e) => settask(e.target.value)}
//         />
//         <Button variant="contained" onClick={addTodo}>
//           {editIndex !== null ? "Update" : "Add"}
//         </Button>
//         <Button variant="contained" onClick={deleteAllTodo}>
//           Delete All
//         </Button>
//       </Box>
//       <br />
//       <ul className="max-h-130 overflow-y-auto min-w-90 ">
//         {todos.map((todo, index) => (
//           <li
//             key={index}
//             className="flex p-2 m-5 text-2xl gap-4 border border-gray-300 rounded bg-gray-200"
//           >
//             <div onClick={()=> completeTodo(todo._id)}>
            
//             <Checkbox checked={todo.done} /> 
//             </div>
//             {todo.task}
//             <div className="flex gap-2 ml-auto"> 
//             <Button className="editBtn " variant="outlined" onClick={() => handleEditButton(index)}>
//               Edit
//             </Button>
//             <Button className="deleteBtn" variant="outlined" onClick={() => deleteTodo(todo._id)}>
//               Delete
//             </Button>
//             </div>
//           </li>
//         ))}
//       </ul>
//       <Button variant="contained" onClick={handleSignOut}>
//               Sign Out
//             </Button>
//     </div>
//   );
// }

// export default Todo;



import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Checkbox } from "@mui/material";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [task, settask] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const navigate = useNavigate();
  
  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove token on logout
    navigate("/signin"); // Redirect to sign-in page
  };

  // Get the auth token from localStorage and use it in headers for requests
  const authToken = localStorage.getItem("authToken");

  const addTodo = () => {
    if (editIndex !== null) {
      const id = todos[editIndex]._id; // find the _id from todos
      editTodo(id, task); // call editTodo function
    } else {
      axios.post(
        "https://todo-app-with-mern-backend.onrender.com/add", 
        { task: task },
        {
          headers: {
            Authorization: `Bearer ${authToken}`
          }
        }
      )
      .then(result => {
        setTodos([...todos, result.data]);
        settask("");
      })
      .catch(err => console.log(err));
    }
  };

  useEffect(() => { 
    axios.get(
      'https://todo-app-with-mern-backend.onrender.com/get',
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then(result => setTodos(result.data))
    .catch(err => console.log(err));
  }, [authToken]);

  const editTodo = (id, newTask) => {
    axios.put(
      `https://todo-app-with-mern-backend.onrender.com/edit/${id}`, 
      { task: newTask },
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then(result => {
      const updatedTodos = todos.map(todo =>
        todo._id === id ? { ...todo, task: newTask } : todo
      );
      setTodos(updatedTodos);
      settask("");
      setEditIndex(null);
    })
    .catch(err => console.log(err));
  };

  const handleEditButton = (index) => {
    settask(todos[index].task);
    setEditIndex(index);
  };

  const completeTodo = (id) => {
    axios.put(
      `https://todo-app-with-mern-backend.onrender.com/update/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then(result => {
      const updatedTodos = todos.map(todo =>
        todo._id === id ? { ...todo, done: true } : todo
      );
      setTodos(updatedTodos);
    })
    .catch(err => console.log(err));
  };

  const deleteTodo = (id) => {
    axios.delete(
      `https://todo-app-with-mern-backend.onrender.com/delete/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then(result => {
      const filteredTodos = todos.filter(todo => todo._id !== id);
      setTodos(filteredTodos);
    })
    .catch(err => console.log(err));
  };

  const deleteAllTodo = () => {
    axios.delete(
      'https://todo-app-with-mern-backend.onrender.com/deleteAll',
      {
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      }
    )
    .then(result => {
      setTodos([]);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="main m-5">
      <h2 className="text-2xl font-semibold mb-4">
        Welcome, {user ? user.name : "Guest"}!
      </h2>

      <Box className="flex gap-2 mt-10 items-center ">
        <TextField
          value={task}
          label="Add Item"
          variant="outlined"
          onChange={(e) => settask(e.target.value)}
        />
        <Button variant="contained" onClick={addTodo}>
          {editIndex !== null ? "Update" : "Add"}
        </Button>
        <Button variant="contained" onClick={deleteAllTodo}>
          Delete All
        </Button>
      </Box>
      <br />
      <ul className="max-h-130 overflow-y-auto min-w-90 ">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="flex p-2 m-5 text-2xl gap-4 border border-gray-300 rounded bg-gray-200"
          >
            <div onClick={() => completeTodo(todo._id)}>
              <Checkbox checked={todo.done} />
            </div>
            {todo.task}
            <div className="flex gap-2 ml-auto">
              <Button className="editBtn" variant="outlined" onClick={() => handleEditButton(index)}>
                Edit
              </Button>
              <Button className="deleteBtn" variant="outlined" onClick={() => deleteTodo(todo._id)}>
                Delete
              </Button>
            </div>
          </li>
        ))}
      </ul>
      <Button variant="contained" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
}

export default Todo;

