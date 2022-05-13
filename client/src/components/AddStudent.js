import { useLocation } from "react-router";
import { useReducer, useState } from "react";
import { NavLink } from "react-router-dom";
import StudentDataService from "../services/StudentDataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from "./common/LoadingSpinner";

const AddStudent = () => {

    const [isLoading, setIsLoading] = useState(false);

    let initialState = {
        first_name: '',
        tussenvoegsel: '',
        last_name: '',
        instrument: '',
        adress: '',
        postal_code: '',
        city: '',
        email: '',
        phonenumber: '',
        background: '',
        homework: [],
        ideas: [],
        materials: [],
        current_projects: []
    }
    
    const reducer = (state, {field, value}) => {
        return {
            ...state,
            [field]: value
        }
    }

    const location = useLocation();

    let editing = false;

    if(location.state && location.state.currentStudent) {
        editing = true
        initialState = location.state.currentStudent
    }

    const [state, dispatch] = useReducer(reducer, initialState)
    const [submitted, setSubmitted] = useState(false);

    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const { first_name, tussenvoegsel, last_name, instrument, adress, postal_code, city, email, phonenumber, background } = state

    const handleSubmit = async (event) => {
        if (editing) {
            event.preventDefault();
            state._id = location.state.currentStudent._id
            setIsLoading(true);
            await StudentDataService.updateStudent(state)
              .then(response => {
                // setSubmitted(true);
              })
              .catch(e => {
                console.log(e);
              });            
                const todo = {
                    student_id: state._id,
                    first_name: state.first_name,
                    tussenvoegsel: state.tussenvoegsel,
                    last_name: state.last_name
                }      
                await StudentDataService.updateAllTodos(todo)
                    .then(response => {
                        setSubmitted(true);
                        setIsLoading(false)
                    })
                    .catch(e => {
                        console.log(e);
                        setIsLoading(false)
                    });
            } else {
                event.preventDefault();
                StudentDataService.createStudent(state)
                .then(response => {
                    setSubmitted(true)
                    setIsLoading(false)
                })
                .catch(e => {
                    console.log(e);
                    setIsLoading(false);
                });
            }
    }

    const deleteStudent = () => {
        let studentId = location.state.currentStudent._id
        setIsLoading(true)
        StudentDataService.deleteStudent(studentId)
        .then(response => {
          })
        .catch(e => {
            console.log(e);
          });
        StudentDataService.deleteAllTodos(studentId)
        .then(response => {
            setSubmitted(true)
            setIsLoading(false)
        })
        .catch(e => {
            console.log(e);
            setIsLoading(false)
        });
      };

    return( 
        <> {editing ? <h2>Edit Student</h2> : <h2>New Student</h2>}

        {isLoading ? <div className="loading-container"><LoadingSpinner /></div> : 

        submitted ? (
          <div className="submitted-container">
            <h4>You submitted successfully!</h4>
            <NavLink to={"/students"} >
              <button>Back to Students</button>
            </NavLink>
          </div>
            ) : (
                <form className="add-student-form" onSubmit={handleSubmit}>
                    <div className="form-container">
                        <label>
                            <input type="text" name="first_name" value={first_name} onChange={onChange} required />
                            <span className="form-input-label">First Name (*)</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="tussenvoegsel" value={tussenvoegsel} onChange={onChange} />
                            <span className="form-input-label">preposition</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="last_name" value={last_name} onChange={onChange} required />
                            <span className="form-input-label">Last Name (*)</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="instrument" value={instrument} onChange={onChange} />
                            <span className="form-input-label">Instrument</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="adress" value={adress} onChange={onChange} />
                            <span className="form-input-label">Address</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="postal_code" value={postal_code} onChange={onChange} />
                            <span className="form-input-label">Postal Code</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="city" value={city} onChange={onChange} />
                            <span className="form-input-label">City</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="email" value={email} onChange={onChange} />
                            <span className="form-input-label">Email</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <input type="text" name="phonenumber" value={phonenumber} onChange={onChange} />
                            <span className="form-input-label">Phone</span>
                        </label>
                    </div>
                    <div className="form-container">
                        <label>
                            <textarea name="background" value={background} onChange={onChange} />
                            <span className="form-input-label">Background</span>
                        </label>
                    </div>
                    <div className="button-container">
                        <button type="submit" value="Submit" onSubmit={handleSubmit}>Submit</button>
                        <NavLink to="../students">
                            <button value={"cancel"}>Cancel</button>
                        </NavLink>
                    </div>
                    { editing ? <div className={"delete-student-icon"}>
                            <a><FontAwesomeIcon icon={faTrashAlt} onClick={deleteStudent} /></a>
                            </div> 
                    : null}
                </form>
                )
            }      
        </>
    )
}

export default AddStudent