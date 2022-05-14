import { NavLink, useParams } from "react-router-dom"
import LoadingSpinner from "../common/LoadingSpinner"
import avatar from '../common/images/avatar-small.png'

const DisplayStudentProfile = ({
    student,
    handleSubmit,
    displayValue,
    isLoading,
    onChange,
    displayStudentData,
    clickHandler,
    descr
}) => {
    return(
        <>
            <div className="student-profile">
                <h2>{student.first_name} {student.tussenvoegsel} {student.last_name}</h2>
                <img src={avatar} alt={student.first_name} />
                <NavLink to={"/addstudent"} state={{currentStudent: student}}>
                    <div>
                        Edit Profile
                    </div>
                </NavLink>
            </div>
            <div className='select-studentprojects'>
                <input className="hidden" type="radio" id="homework" name="student-selectbox" value="homework" onClick={clickHandler} defaultChecked={true} />
                <label htmlFor="homework">Homework</label>
                <input className="hidden" type="radio" id="materials" name="student-selectbox" value="materials" onClick={clickHandler} />
                <label htmlFor="materials">Materials</label>
                <input className="hidden" type="radio" id="current_projects" name="student-selectbox" value="current_projects" onClick={clickHandler} />
                <label htmlFor="current_projects">Current</label>
                <input className="hidden" type="radio" id="ideas" name="student-selectbox" value="ideas" onClick={clickHandler} />
                <label htmlFor="ideas">Ideas</label>
                <input className="hidden" type="radio" id="student-info" name="student-selectbox" value="student-info" onClick={clickHandler}/>
                <label htmlFor="student-info">Contact Info</label>
             </div>
             {isLoading ? <div className="loading-container"><LoadingSpinner /></div> 
             : displayValue !== "student-info" ? 
                <>
                    <form className="add-item-form" onSubmit={handleSubmit}>
                        <div className="form-container">
                            <label>
                                <input type="text" name="descr" value={descr} onChange={onChange} required />
                                <span className="form-input-label">New item</span>
                            </label>
                        </div>
                        <button type="submit" value="add">add item</button>
                    </form>
                </> 
                : null }
             <div className="student-data">
                 {displayValue ? displayStudentData() : null}
            </div>
        </>
    )
}

export default DisplayStudentProfile