import http from "../http-common.js";

class StudentDataService {
  getAll() {
    return http.get(`students`);
  }

  get(id) {
      return http.get(`students/id?id=${id.toString()}`);
  }

  find(query, by = "name", page = 0) {
    return http.get(`students?${by}=${query}&page=${page}`);
  } 

  createStudent(data) {
    return http.post("students", data);
  }

  updateStudent(data) {
    return http.put("students", data);
  }

  deleteStudent(id) {
    return http.delete(`students?id=${id.toString()}`);
  }

  getAllTodos() {
    return http.get(`students/todo`)
  }

  createTodo(data) {
    return http.post("students/todo", data);
  }

  updateTodo(data) {
    return http.put("students/todo", data);
  }

  deleteTodo(id) {
    return http.delete(`students/todo?id=${id}`);
  }

  deleteAllTodos(id) {
    return http.delete(`/todo/delete_by_studentid?id=${id}`);
  }

  updateAllTodos(data) {
    return http.put("/todo/update_by_studentid", data)
  }
}

export default new StudentDataService();