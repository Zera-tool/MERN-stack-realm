import { useState, useEffect, useMemo } from "react";
import DisplayStudentList from "./DisplayStudentList";
import StudentDataService from "../../services/StudentDataService";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

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
      return { allStudents: sortedItems, requestSort, sortConfig }
}

const StudentList = () => {

  const [ students, setStudents ] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const retrieveStudents = () => {
    setIsLoading(true);
    StudentDataService.getAll()
      .then(response => {
        setStudents(response.data.students)
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
    <DisplayStudentList 
      allStudents={allStudents}
      getIcon={getIcon}
      requestSort={requestSort}
      isLoading={isLoading}
    />
  )
}

export default StudentList;