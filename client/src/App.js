import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/common/Header';
import Homepage from './components/Homepage';
import Dashboard from './components/Dashboard';
import StudentProfile from './components/displaystudent/StudentProfile';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import AddTodo from './components/AddTodo';

function App() {

  return (
    <div className="body-div">
      <BrowserRouter>
        <Header />
        <div className='gridbox'>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="students" element={<StudentList />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="students/:id" element={<StudentProfile />} />
          <Route path="addtodo" element={<AddTodo />} />
        </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;