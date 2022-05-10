const StudentProjects = ({ data }) => {
    
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