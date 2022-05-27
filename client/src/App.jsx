import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import Homepage from "./components/Homepage";
import Dashboard from "./components/dashboard/Dashboard";
import StudentProfile from "./components/studentprofile/StudentProfile";
import StudentList from "./components/studentlist/StudentList";
import AddStudent from "./components/forms/AddStudent";
import AddTodo from "./components/forms/AddTodo";

function App() {
  return (
    <div className="body-div">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="students" element={<StudentList />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="addtodo" element={<AddTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
