import { useState, useEffect, useMemo } from "react";
import { NavLink } from "react-router-dom";
import StudentDataService from "../services/StudentDataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';
import avatar from './common/images/avatar-small.png'
import LoadingSpinner from "./common/LoadingSpinner";

const useSortableList = (allStudents) => {
    const [sortConfig, setSortConfig] = useState('');
  
    const sortedItems = useMemo(() => {
      let sortableItems = [...allStudents];
      if (sortConfig !== null) {
        sortableItems.sort((a, b) => {
          if (a[sortConfig.key] < b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? -1 : 1;
          }
          if (a[sortConfig.key] > b[sortConfig.key]) {
            return sortConfig.direction === 'ascending' ? 1 : -1;
          }
          return 0;
        });
      }
      return sortableItems;
    }, [allStudents, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
          direction = 'descending';
        }
        setSortConfig({ key, direction });
      }
      return { allStudents: sortedItems, requestSort, sortConfig };
}

const StudentList = () => {

  const [ students, setStudents ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const retrieveStudents = () => {
    setIsLoading(true);
    StudentDataService.getAll()
      .then(response => {
        setStudents(response.data.students);
        // setStudents(response.data)
        setIsLoading(false)        
      })
      .catch(e => {
        setIsLoading(false);
        console.log(e);
      });
  };

  useEffect(() => {
    retrieveStudents();
  }, []);

  const { allStudents, requestSort, sortConfig } = useSortableList(students);

  const getIcon = (name) => {
    if (!sortConfig) {
      return;
    }
    const arrow = (direc) => {
      return direc === "ascending" ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />
    }
    return sortConfig.key === name ? arrow(sortConfig.direction) : undefined;
  };

  return (
    <div className="student-list-container">
      <h2>Students</h2>
        <NavLink to="../addstudent" className="add-icon">
            <FontAwesomeIcon icon={faCirclePlus} />
        </NavLink>
        <div className="sort-list">
            <div onClick={() => requestSort('first_name')}
            >First Name {getIcon('first_name')}
            </div>
            <div onClick={() => requestSort('last_name')}
            >Last Name {getIcon('last_name')}
            </div>
            <div onClick={() => requestSort('instrument')}
            >Instrument {getIcon('instrument')}
            </div>
        </div>
        {isLoading ? <div className="loading-container"><LoadingSpinner /></div> : 
            allStudents.map(student => {
              return <div key={student._id}>
                <NavLink className={"student-list"} to={"/students/" + student._id} state={{studentProfile: student}}>
                      <img src={avatar} alt={student.first_name} />
                    <div>
                      <div>{student.first_name} {student.tussenvoegsel} {student.last_name}</div>
                    <div className="additional-info">{student.instrument}</div>
                  </div>
                </NavLink>
              </div>
            })
          }
    </div>
  )
}

export default StudentList;