import StudentDataService from "../../services/StudentDataService";

const StudentProjects = ({ data }) => {

  // const deleteStudentProject = (projectId) => {
  //   StudentDataService.deleteProject(projectId)
  //     .then(response => {
  //       console.log(response)
  //     })
  //     .catch(e => {
  //       console.log(e)
  //     });
  // }
  
    
    return (
        <> 
          {data.length === 0 ? "No items yet" : data.map(item => {
              if(item){
                return <div key={item._id}>- {item.descr}</div>
              } else {
                return "No items yet"
              }
          })}
        </>
    )
}

export default StudentProjects