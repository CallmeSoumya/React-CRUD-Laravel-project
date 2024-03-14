import React, { useEffect, useState } from "react";
import { Link,  useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";

function StudentEdit() {
  let { id } = useParams();
  // const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [inputErrorList, setInputErrorList] = useState({});
  const [student, setStudent] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/api/students/${id}/edit`).then((res) => {
      console.log(res);
      setStudent(res.data.student);
      setLoading(false);
    })
    .catch(function (error) {
      if (error.reponse) {
        if (error.reponse.status === 404) {
          setLoading(false);
          alert(error.reponse.data.message);
        }
        if (error.reponse.status === 422) {
          setLoading(false);
          setInputErrorList(error.reponse.data.errors);
        }
        if (error.reponse.status === 500) {
          setLoading(false);
          alert(error.reponse.data);
        }
      }
    });
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const UpdateStudent = (e) => {
    e.preventDefault();

    setLoading(true);
    const data = {
      name: student.name,
      cource: student.cource,
      email: student.email,
      phone: student.phone,
    };

    axios.put(`http://localhost:8000/api/students/${id}/edit`,data)
      .then((res) => {
        alert(res.data.message);
        // navigate("/students");
        setLoading(false);
      })
      .catch(function (error) {
        if (error.reponse) {
          if (error.reponse.status === 422) {
            setLoading(false);
            setInputErrorList(error.reponse.data.errors);
          }
          if (error.reponse.status === 404) {
            setLoading(false);
            alert(error.reponse.data.message);
          }
          if (error.reponse.status === 500) {
            setLoading(false);
            alert(error.reponse.data);
          }
        }
      });
  };
  if (loading) {
    return <Loading />;
  }
  if(Object.keys(student).length === 0){
    return (
      <div className="container">
        <h4>No Such Student Id Found</h4>
      </div>
    )
  }
  return (
    <div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit Student
                  <Link to="/students" className="btn btn-danger float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={UpdateStudent}>
                  <div className="mb-3">
                    <label htmlFor="">Name</label>
                    <input
                      type="text"
                      name="name"
                      onChange={handleInput}
                      value={student.name}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.name}</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Cource</label>
                    <input
                      type="text"
                      name="cource"
                      onChange={handleInput}
                      value={student.cource}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.cource}</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Email</label>
                    <input
                      type="email"
                      name="email"
                      onChange={handleInput}
                      value={student.email}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.email}</span>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleInput}
                      value={student.phone}
                      className="form-control"
                    />
                    <span className="text-danger">{inputErrorList.phone}</span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default StudentEdit;
