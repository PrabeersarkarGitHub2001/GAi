import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
const API_URL = "https://jsonplaceholder.typicode.com/users";

function All() {
    //     const [toogle,setToggle]=useState(true)
    //     const handleToggle=()=>{
    //         setToggle(!toogle)
    //     }
    //   return (
    //     <div>
    //         <button onClick={handleToggle}>
    //             toggle
    //         </button>
    //         {toogle ?"on":"of"}
    //     </div>
    //   )
    // }

    // const[lists,setList]=useState(["hello","hi","hey","how"])
    // const [name,setName]=useState('')
    // const handleAdd=()=>{
    // setList([...lists,name])
    // if (name.trim()) {  // ✅ Prevent adding empty values
    //     setList([...lists, name]);
    //     setName(""); // ✅ Reset input field properly
    // }}

    // const handleDelete=(index)=>{
    //     const updateList=lists.filter((_,i)=>i==!index)
    //     setList(updateList)
    // }

    // return(
    //     <>
    //     <input type="text" 
    //      value={name}
    //      placeholder='enter name'
    //      onChange={(e)=>setName(e.target.value)}
    //      />
    //      <button onClick={handleAdd}>Add</button>
    //     {
    //         lists.map((list,index)=>(
    //             <li key={index}>{list}
    //             <button onClick={handleDelete(index)}>delete</button></li>
    //         ))
    //     }
    //     </>

    // )

    // const [lists, setList] = useState(["Icon", "Hleoeo", "hress", "reddd", "cpder"])
    // const [search, setSearch] = useState("")
    // const searchedLists = lists.filter((list) => list.toLowerCase().includes(search))
    // return (<>
    //     <input type="text" name="search" placeholder='search'
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //     />
    //     {
    //         searchedLists.map((searchList, index) => (
    //             <li key={index}>{searchList}</li>
    //         ))
    //     }

    // </>)
    // const images = [
    //     'https://via.placeholder.com/600x400?text=Image+1',
    //     'https://via.placeholder.com/600x400?te xt=Image+2',
    //     'https://via.placeholder.com/600x400?text=Image+3',
    //   ];
    // const[currentIndex,setCurrentIndex]=useState(0);

    // const handelNext=()=>{
    //     setCurrentIndex((currentIndex+1)%images.length)
    // }
    // const handlePreviosu=()=>{
    //     setCurrentIndex((currentIndex-1+images.length)%images.length)
    // }
    //     return(<>

    //     <button onClick={handlePreviosu}>pre</button>
    //     <img src={images[currentIndex]} alt={`Image${currentIndex}`} />
    //     <button onClick={handelNext}>next</button>
    //     </>)

    //     const [ratting, setRatting] = useState(0);
    // const totalStars = 5; // Define totalStars

    // return (
    //     <>
    //         {[...Array(totalStars)].map((_, index) => {
    //             const starValue = index + 1;
    //             return (
    //                 <span
    //                     key={index}
    //                     onClick={() => setRatting(starValue)} // ✅ Fix: Use function reference
    //                     style={{
    //                         cursor: "pointer",
    //                         color: starValue <= ratting ? "gold" : "gray",
    //                         fontSize: "24px",
    //                     }}
    //                 >
    //                     ★
    //                 </span>
    //             );
    //         })}
    //     </>
    // );
    // const Step1 = ({ next }) => (
    //     <div>
    //       <h2>Step 1</h2>
    //       <button onClick={next}>Next</button>
    //     </div>
    //   );

    //   const Step2 = ({ next, previous }) => (
    //     <div>
    //       <h2>Step 2</h2>
    //       <button onClick={previous}>Previous</button>
    //       <button onClick={next}>Next</button>
    //     </div>
    //   );

    //   const Step3 = ({ previous }) => (
    //     <div>
    //       <h2>Step 3</h2>
    //       <button onClick={previous}>Previous</button>
    //       <button type="submit">Submit</button>
    //     </div>
    //   );

    //     const [step, setStep] = useState(1);

    //     const nextStep = () => setStep(step + 1);
    //     const previousStep = () => setStep(step - 1);

    //     const handleSubmit = (e) => {
    //       e.preventDefault();
    //       console.log('Form submitted');
    //     };

    //     return (
    //       <form onSubmit={handleSubmit}>
    //         {step === 1 && <Step1 next={nextStep} />}
    //         {step === 2 && <Step2 next={nextStep} previous={previousStep} />}
    //         {step === 3 && <Step3 previous={previousStep} />}
    //       </form>
    //     );
    // const [users, setUsers] = useState([]);
    // const [editingUser, setEditingUser] = useState(null);

    // // Fetch Users from API
    // useEffect(() => {
    //     axios.get(API_URL).then((response) => {
    //         setUsers(response.data);
    //     });
    // }, []);

    // // Validation Schema
    // const validationSchema = Yup.object({
    //     name: Yup.string().required("Name is required"),
    //     email: Yup.string().email("Invalid email").required("Email is required"),
    // });

    // // Handle form submission
    // const handleSubmit = async (values, { resetForm }) => {
    //     if (editingUser !== null) {
    //         // Update existing user
    //         await axios.put(`${API_URL}/${editingUser.id}`, values);
    //         setUsers(users.map((user) => (user.id === editingUser.id ? values : user)));
    //         setEditingUser(null);
    //     } else {
    //         // Create new user
    //         const response = await axios.post(API_URL, values);
    //         setUsers([...users, response.data]);
    //     }
    //     resetForm();
    // };

    // // Handle Edit
    // const handleEdit = (user) => {
    //     setEditingUser(user);
    // };

    // // Handle Delete
    // const handleDelete = async (id) => {
    //     await axios.delete(`${API_URL}/${id}`);
    //     setUsers(users.filter((user) => user.id !== id));
    // };

    // return (
    //     <div style={{ maxWidth: "400px", margin: "auto" }}>
    //         <h2>{editingUser ? "Edit User" : "Add User"}</h2>

    //         <Formik
    //             initialValues={{
    //                 name: editingUser ? editingUser.name : "",
    //                 email: editingUser ? editingUser.email : "",
    //             }}
    //             validationSchema={validationSchema}
    //             // enableReinitialize
    //             onSubmit={handleSubmit}
    //         >
    //             <Form>
    //                 <label>Name:</label>
    //                 <Field type="text" name="name" />
    //                 <ErrorMessage name="name" component="div" style={{ color: "red" }} />

    //                 <label>Email:</label>
    //                 <Field type="email" name="email" />
    //                 <ErrorMessage name="email" component="div" style={{ color: "red" }} />

    //                 <button type="submit">{editingUser ? "Update" : "Add"}</button>
    //             </Form>
    //         </Formik>

    //         <h2>Users List</h2>
    //         <ul>
    //             {users.map((user) => (
    //                 <li key={user.id}>
    //                     {user.name} - {user.email}
    //                     <button onClick={() => handleEdit(user)}>Edit</button>
    //                     <button onClick={() => handleDelete(user.id)}>Delete</button>
    //                 </li>
    //             ))}
    //         </ul>
    //     </div>
    // );
} 