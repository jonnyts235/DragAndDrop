import React from "react";

import StudentDraggable from "./StudentDraggable";

const Random = props => {
  const handleRandom = () => {
    const randomTeam = Math.floor(Math.random() * 3) + 1;
    console.log(props.setStudents({ team: randomTeam }));

    // return console.log(
    //   <StudentDraggable key={student.id} student={student} />
    // );
  };

  return (
    <div>
      <button onClick={handleRandom}>Random</button>
    </div>
  );
};

export default Random;
