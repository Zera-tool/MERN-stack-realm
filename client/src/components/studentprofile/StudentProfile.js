import { useState, useEffect } from "react"
import StudentInfo from './StudentInfo'
import { useParams } from "react-router-dom"
import StudentDataService from "../../services/StudentDataService"
import StudentProjects from "./StudentProjects"
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
    )
}

export default StudentProfile;