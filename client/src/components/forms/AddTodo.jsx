import { useLocation } from "react-router";
import { useState, useReducer, useEffect } from "react";
import { NavLink } from "react-router-dom";
import StudentDataService from "../../services/StudentDataService";
import LoadingSpinner from "../common/LoadingSpinner";

const AddTodo = () => {
  const [studentNames, setStudentNames] = useState([]);
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  let editing = false;

  const retrieveStudents = () => {
    StudentDataService.getAll()
      .then((response) => {
        setStudents(response.data.students);
        // setStudents(response.data)
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveStudents();
  }, []);

  const studentNamesList = () => {
    return students.map((e) => {
      if (e.tussenvoegsel) {
        return {
          name: `${e.first_name} ${e.tussenvoegsel} ${e.last_name}`,
          studentId: e._id,
        };
      } else {
        return {
          name: `${e.first_name} ${e.last_name}`,
          studentId: e._id,
        };
      }
    });
  };

  useEffect(() => {
    setStudentNames(studentNamesList());
  }, [students]);

  let initialState = {
    descr: "",
    studentId: null,
  };

  const reducer = (state, { field, value }) => {
    return {
      ...state,
      [field]: value,
    };
  };

  if (location.state && location.state.currentTodo) {
    editing = true;
    initialState = {
      studentId: location.state.currentTodo.student_id,
      studentName: location.state.currentTodo.student_name,
      descr: location.state.currentTodo.descr,
    };
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const { descr, studentId } = state;
  const [submitted, setSubmitted] = useState(false);
  const [valid, setValid] = useState(true);

  const onChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (editing) {
      let data = {
        todo_id: location.state.currentTodo._id,
        descr: descr,
      };
      StudentDataService.updateTodo(data)
        .then(() => {
          setIsLoading(false);
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    } else {
      event.preventDefault();
      if (state.studentId === null || state.studentId === "general") {
        setValid(false);
        setIsLoading(false);
        return;
      }
      let split = state.studentId.split(",");
      let data = {
        descr: state.descr,
        student_id: split[0],
        student_name: split[1],
      };
      setIsLoading(true);
      StudentDataService.createTodo(data)
        .then(() => {
          setIsLoading(false);
          setSubmitted(true);
          setValid(true);
        })
        .catch((e) => {
          console.log(e);
          setIsLoading(false);
        });
    }
  };

  return (
    <>
      {editing ? <h2>Edit Todo</h2> : <h2>New Todo</h2>}
      {valid ? null : (
        <h2>
          <span className="warning">Please select a student</span>
        </h2>
      )}
      {isLoading ? (
        <div className="loading-container">
          <LoadingSpinner />
        </div>
      ) : submitted ? (
        <div className="submitted-container">
          <h4>You submitted successfully!</h4>
          <NavLink to={"/dashboard"}>
            <button>Back to Dashboard</button>
          </NavLink>
        </div>
      ) : (
        <form className="add-student-form todo-form" onSubmit={handleSubmit}>
          {initialState.studentName ? (
            <div className="name-field">{initialState.studentName}</div>
          ) : (
            <select name="studentId" onChange={onChange} required>
              <option value={"general"}>please select student</option>
              {studentNames.map((student) => {
                return (
                  <option
                    key={student.studentId}
                    value={[student.studentId, student.name]}
                  >
                    {student.name}
                  </option>
                );
              })}
            </select>
          )}
          <div className="form-container">
            <label>
              <textarea
                type="text"
                name="descr"
                value={descr}
                onChange={onChange}
                required
              />
              <span className="form-input-label">Note</span>
            </label>
          </div>
          <div className="button-container">
            <button type="submit" value="Submit">
              Submit
            </button>
            <NavLink to="../dashboard">
              <button value={"cancel"}>Cancel</button>
            </NavLink>
          </div>
        </form>
      )}
    </>
  );
};

export default AddTodo;
