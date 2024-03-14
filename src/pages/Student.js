import { Link } from "react-router-dom";
import React,{useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading";
function Student() {
  //for showing loading part
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const deleteStudent=(e, id)=>{
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";
    axios.delete(`http://localhost:8000/api/students/${id}/delete`)
    .then((res) => {
      alert(res.data.message);
      thisClicked.closest("tr").remove();
        // navigate("/students");
        
      })
      .catch(function (error) {
        if (error.reponse) {
          
          if (error.reponse.status === 404) {
            setLoading(false);
            thisClicked.innerText = "Delete";
          }

          if (error.reponse.status === 500) {
            alert(error.reponse.data);
          }
        }
      });
  }
  useEffect(()=>{
    axios.get(`http://localhost:8000/api/students`).then(res =>{
    console.log(res);
    setStudents(res.data.students);
    setLoading(false);
    });
  },[])

if(loading){
  return (
   <Loading />
  )
}
  var studentDetails = "";
  studentDetails = students.map((item,index)=>{
    return (
      <tr key={index}>
        <td>{item.id}</td>
        <td>{item.name}</td>
        <td>{item.cource}</td>
        <td>{item.email}</td>
        <td>{item.phone}</td>
        <td><Link to={`/students/${item.id}/edit`} className="btn btn-success">Edit</Link></td>
        <td><button type="button" onClick={(e)=>deleteStudent(e,item.id)} className="btn btn-danger">Delete</button></td>
      </tr>
    )
  });






  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>Students List
              <Link to="/students/create" className="btn btn-primary float-end">Add Student</Link>
              </h4>
            </div>
            <div className="card-body">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Cource</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Edit</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                {studentDetails}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Student;
