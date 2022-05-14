import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus, faTrashAlt, faPenToSquare, faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";
import StudentDataService from "../services/StudentDataService";
import LoadingSpinner from "./common/LoadingSpinner";

const Dashboard = () => {

    const [ todos, setTodos ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ editIcons, setEditIcons ] = useState(false)

    useEffect(() => {
        retrieveTodos();
      }, []);
  
      const retrieveTodos = () => {
        setIsLoading(true);
        StudentDataService.getAllTodos()
          .then(response => {
            setTodos(response.data.todos);
            // setTodos(response.data)
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
            setEditIcons(false)
          })
          .catch(e => {
            console.log(e);
            setIsLoading(false)
          });
      };

      const setTodo = (todoId, active) => {
        setIsLoading(true)
        const todo = {
          todoId,
          active: !active
        }
        StudentDataService.setTodo(todo)
          .then(response => {
            retrieveTodos();
            setIsLoading(false)
          })
          .catch(e => {
            console.log(e);
            setIsLoading(false)
          });
      }

    return (
      <div className="student-list-container">
          <h2>Dashboard</h2>
          <NavLink to="../addtodo" className="add-icon">
            <FontAwesomeIcon icon={faCirclePlus} />
          </NavLink>
          <div className="todo-list-item">
            <div className="icon-div">
            <a onClick={() => setEditIcons(!editIcons)} >
              <FontAwesomeIcon icon={faEllipsis} size={"2x"} />                        
            </a>
            </div>
          </div>
            {isLoading ? <div className="loading-container"><LoadingSpinner /></div> 
            : <>{todos.map((todo) => {
                if(todo.active === true){
                return <div key={todo._id} className="todo-list-item">
                  <div onClick={() => setTodo(todo._id, todo.active)} className="check-icon">
                      <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div className="todo-descr-item">
                    <div>{todo.descr}</div>
                    <div className="additional-info">{todo.student_name}</div>
                  </div>   
                  { editIcons ? 
                  <div className="icon-div">  
                    <NavLink to={"/addtodo"} state={{currentTodo: todo}} >
                      <FontAwesomeIcon icon={faPenToSquare} />                        
                    </NavLink>
                    <a>
                      <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTodo(todo._id)} />
                    </a>
                  </div>
                  : null
                }
                </div>
                }    
              }
            )}
            {todos.map((todo) => {
              if(todo.active === false) {
                return <div key={todo._id} className="todo-list-item">
                  <div onClick={() => setTodo(todo._id, todo.active)} className="check-icon-done">
                      <FontAwesomeIcon icon={faCheck} />
                  </div>
                  <div className="todo-descr-item">
                    <div className="todo-done">{todo.descr}</div>
                    <div className="additional-info">{todo.student_name}</div>
                  </div>   
                  {editIcons ?
                  <div className="icon-div">  
                    <NavLink to={"/addtodo"} state={{currentTodo: todo}} >
                      <FontAwesomeIcon icon={faPenToSquare} />                        
                    </NavLink>
                    <a>
                      <FontAwesomeIcon icon={faTrashAlt} onClick={() => deleteTodo(todo._id)} />
                    </a>
                  </div> : null }
                </div>    
              }
            })}
            </>
          }
      </div>
    )
}

export default Dashboard;