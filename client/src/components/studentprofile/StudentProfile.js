import { useState, useEffect } from "react"
import avatar from '../common/images/avatar-small.png'
import StudentInfo from './StudentInfo'
import { NavLink, useParams } from "react-router-dom"
import StudentDataService from "../../services/StudentDataService"
import StudentProjects from "./StudentProjects"
import LoadingSpinner from "../common/LoadingSpinner"
import DisplayStudentProfile from "./DisplayStudentProfile"

const StudentProfile = () => {

    let params = useParams();

    const [ displayValue, setDisplayValue ] = useState("homework")
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

      const [ student, setStudent ] = useState(initialState);
      const [ descr, setDescr ] = useState("")
    
      const getStudent = id => {
        setIsLoading(true);
        StudentDataService.get(id)
          .then(response => {
            setStudent(response.data);
            setIsLoading(false);
          })
          .catch(e => {
            setIsLoading(false);
            console.log(e);
          });
      };
    
      useEffect(() => {
        getStudent(params.id);
      }, [params]);

    const clickHandler = (e) => {
      setDisplayValue(e.target.value)
    }

    const onChange = (e) => {
        setDescr(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        setIsLoading(true);
        let data = {
            descr: descr,
            studentProject: displayValue,
            studentId: student._id
        }
        StudentDataService.updateStudent(data)
              .then(response => {
                getStudent(params.id)
                setDescr("")
                setIsLoading(false);
              })
              .catch(e => {
                setIsLoading(false);
                console.log(e);
              });
    }

    const displayStudentData = () => {
        switch(displayValue) {
            case "student-info":
                return <StudentInfo studentProfile={student} />
            case "ideas":
                return <StudentProjects data={student.ideas} />
            case "homework":
                return <StudentProjects data={student.homework} />
            case "materials":
                return <StudentProjects data={student.materials} />
            case "current_projects":
                return <StudentProjects data={student.current_projects} />
            default:
                throw new Error(`Unknown displayvalue: ${displayValue}`);
        }
    }

    return (
        <DisplayStudentProfile 
        student={student}
        handleSubmit={handleSubmit}
        displayValue={displayValue}
        isLoading={isLoading}
        onChange={onChange}
        displayStudentData={displayStudentData}
        clickHandler={clickHandler}
        descr={descr}
    />
        // <>
        //     <div className="student-profile">
        //         <h2>{student.first_name} {student.tussenvoegsel} {student.last_name}</h2>
        //         <img src={avatar} alt={student.first_name} />
        //         <NavLink to={"/addstudent"} state={{currentStudent: student}}>
        //             <div>
        //                 Edit Profile
        //             </div>
        //         </NavLink>
        //     </div>
        //     <div className='select-studentprojects'>
        //         <input className="hidden" type="radio" id="homework" name="student-selectbox" value="homework" onClick={clickHandler} defaultChecked={true} />
        //         <label htmlFor="homework">Homework</label>
        //         <input className="hidden" type="radio" id="materials" name="student-selectbox" value="materials" onClick={clickHandler} />
        //         <label htmlFor="materials">Materials</label>
        //         <input className="hidden" type="radio" id="current_projects" name="student-selectbox" value="current_projects" onClick={clickHandler} />
        //         <label htmlFor="current_projects">Current</label>
        //         <input className="hidden" type="radio" id="ideas" name="student-selectbox" value="ideas" onClick={clickHandler} />
        //         <label htmlFor="ideas">Ideas</label>
        //         <input className="hidden" type="radio" id="student-info" name="student-selectbox" value="student-info" onClick={clickHandler}/>
        //         <label htmlFor="student-info">Contact Info</label>
        //      </div>
        //      {isLoading ? <div className="loading-container"><LoadingSpinner /></div> 
        //      : displayValue !== "student-info" ? 
        //         <>
        //             <form className="add-item-form" onSubmit={handleSubmit}>
        //                 <div className="form-container">
        //                     <label>
        //                         <input type="text" name="descr" value={descr} onChange={onChange} required />
        //                         <span className="form-input-label">New item</span>
        //                     </label>
        //                 </div>
        //                 <button type="submit" value="add">add item</button>
        //             </form>
        //         </> 
        //         : null }
        //      <div className="student-data">
        //          {displayValue ? displayStudentData() : null}
        //     </div>
        // </>
    )
}

export default StudentProfile;