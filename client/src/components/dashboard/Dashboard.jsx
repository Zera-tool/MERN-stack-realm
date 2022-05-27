import { useState, useEffect } from "react";
import StudentDataService from "../../services/StudentDataService";
import DisplayDashboard from "./DisplayDashboard";

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
            setTodos(response.data.todos)
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
          .then(() => {
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
          .then(() => {
            retrieveTodos();
            setIsLoading(false)
          })
          .catch(e => {
            console.log(e);
            setIsLoading(false)
          });
      }

    return (
      <DisplayDashboard 
        todos={todos}
        editIcons={editIcons}
        setEditIcons={setEditIcons}
        setTodo={setTodo}
        isLoading={isLoading}
        deleteTodo={deleteTodo}
      />
    )
}

export default Dashboard;