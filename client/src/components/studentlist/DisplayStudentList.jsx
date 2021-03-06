import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import avatar from "../common/images/avatar-small.png";
import LoadingSpinner from "../common/LoadingSpinner";

const DisplayStudentList = ({
  allStudents,
  getIcon,
  requestSort,
  isLoading,
}) => {
  return (
    <>
      <div className="student-list-container">
        <div className="gridbox">
          <div className="page-header-container">
            <h2>Students</h2>
            <NavLink to="../addstudent" className="add-icon">
              <FontAwesomeIcon icon={faCirclePlus} />
            </NavLink>
          </div>
          <div className="sort-list">
            <div onClick={() => requestSort("first_name")}>
              First Name {getIcon("first_name")}
            </div>
            <div onClick={() => requestSort("last_name")}>
              Last Name {getIcon("last_name")}
            </div>
            <div onClick={() => requestSort("instrument")}>
              Instrument {getIcon("instrument")}
            </div>
          </div>
          {isLoading ? (
            <div className="loading-container">
              <LoadingSpinner />
            </div>
          ) : (
            allStudents.map((student) => {
              return (
                <div key={student._id}>
                  <NavLink
                    className={"student-list"}
                    to={"/students/" + student._id}
                    state={{ studentProfile: student }}
                  >
                    <img src={avatar} alt={student.first_name} />
                    <div>
                      <div>
                        {student.first_name} {student.tussenvoegsel}{" "}
                        {student.last_name}
                      </div>
                      <div className="additional-info">
                        {student.instrument}
                      </div>
                    </div>
                  </NavLink>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayStudentList;
