import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrashAlt, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import StudentDataService from "../services/StudentDataService";
import LoadingSpinner from "./common/LoadingSpinner";

const Dashboard = () => {

    const [ todos, setTodos ] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        retrieveTodos();
      }, []);
  
      const retrieveTodos = () => {
        setIsLoading(true);
        StudentDataService.getAllTodos()
          .then(response => {
            setTodos(response.data);
            setIsLoading(false)
          })
          .catch(e => {
            setIsLoading(false)
            console.log(e);
          });
      };

      const deleteTodo = (todoId) => {
        setIsLoading(true);
        StudentDataService.deleteTodo(todoId)
          .then(response => {
            retrieveTodos();
            setIsLoading(false)
          })
          .catch(e => {
            console.log(e);
            setIsLoading(false)
          });
      };

    return (
        <div className="student-list-container">
            <h2>Dashboard</h2>
            <NavLink to="../addtodo" className="add-student-icon">
                <FontAwesomeIcon icon={faCirclePlus} />
            </NavLink>
                    {isLoading ? <div className="loading-container"><LoadingSpinner /></div> : todos.map((todo) => {
                        return <div key={todo._id} className="todo-list-item">
                          <div className="todo-descr-item">
                            <div>{todo.descr}</div>
                            <div className="additional-info">{todo.student_name}</div>
                          </div>
                            
                          <div className="icon-div">  
                            <NavLink to={"/addtodo"} state={{currentTodo: todo}} >
                              <FontAwesomeIcon icon={faPenToSquare} />                        
                            </NavLink>
                            <a>
                            <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTodo(todo._id)} />
                            </a>
                          </div>
                        </div>
                    })}
        </div>
    )
}

export default Dashboard;