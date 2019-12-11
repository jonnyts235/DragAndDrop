import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useEffect } from "react";

import StudentDraggable from "./components/StudentDraggable";

// import mockData from "./mockData";
import TeamList from "./components/TeamList";

const App = () => {
  const [student, setStudent] = React.useState("");
  const [students, setStudents] = React.useState([]);

useEffect(() => { 
    fetch(
      `https://dragdropteem.herokuapp.com/students`
    )
    .then(response => response.json())
    .then(results => {
      setStudents (
        results
      )
      
  })
},[])


  const shuffleStudents = arr => {
    let currentIndex = arr.length,
      temporaryValue,
      randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  };

  const handleRandom = () => {
    let shuffledteam = shuffleStudents(students);
    let newArray = [];
    let teams = 3;
    let counter = 1;
    shuffledteam.map(student => {
      student.team = counter;
      newArray.push(student);
      if (counter == teams) {
        counter = 1;
      } else {
        counter += 1;
      }
    });
    setStudents(newArray);
  };

  const renderStudents = () => {
    console.log(students)
    const noTeam = students.filter(student => student.team === 0);
    return noTeam.map((student, index) => {
      return (
        <StudentDraggable key={student.id} student={student} index={index} />
      );
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setStudents([...students, { id: students.length, name: student, team: 0 }]);
  };

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const droppedStudent = students.find(
      student => student.id === result.draggableId
    );
    droppedStudent.team = +result.destination.droppableId;
  };

  return (

    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <Droppable droppableId={"0"}>
          {provided => (
 
            <div
              className="left-student-list"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {provided.placeholder}
              <form onSubmit={handleSubmit}>
                <div className="button-names-wrapper">
                  <input
                    type="text"
                    className="input"
                    placeholder="                  Enter Student Name"
                    value={student}
                    onChange={e => setStudent(e.target.value)}
                  />
                </div>
              </form>
              <div className="simplebuttons">
                <button>Add Student</button>
              <div>
                <button onClick={handleRandom}>Random</button>
              </div>
              </div>

              {renderStudents()}
            </div>
          )}
        </Droppable>

        
        {students.length>0 ?
          <div className="teams-wrapper">
          <TeamList students={students} number={"1"} />
          <TeamList students={students} number={"2"} />
          <TeamList students={students} number={"3"} />
        </div>
          :
          null
        }
      </div>
    </DragDropContext>
  );
};

export default App;
