const Header = (props) => {
    return (
      <><h1>{props.course}</h1></>
    )
}
  
  const Part = (props) => {
    return(
      <><p>
      {props.part.name} {props.part.exercises}
      </p>
      </>
    )
}
  
  const Content = (props) => {
    return (
        <div>
          {props.parts.map((part)=> 
          <Part part = {part} key = {part.id} />
          )}
        </div>  
    )
}
  
  const Total = (props) => {
    return (
    <><h4>total of {props.parts.reduce( (sum, part) => sum + part.exercises, 0 )} exercises</h4></>
    )
}

const Course = ({course}) => {
    return (
      <div>
        <Header course = {course.name} />
        <Content parts = {course.parts} />
        <Total parts = {course.parts} />
      </div>
    )
}

export default Course