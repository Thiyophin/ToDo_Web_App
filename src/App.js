import "./App.css";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// import components
import DateAndInputField from "./Components/DateAndInputField";
import Footer from "./Components/Footer";
function App() {
  // toDos has an array of object related to task details
  const [toDos, setToDos] = useState([]);
  // toDo state will store input string of task and setToDo can used to change toDo
  const [toDo, setToDo] = useState("");
  // useEffect to get localStorage toDos when mount and unmount
  useEffect(() => {
    if (localStorage.getItem("toDos") === null) {
      localStorage.setItem("toDos", JSON.stringify([])); // localStorage store value as key:value, value should be string so we have stringify when inserting
    } else {
      let toDos = JSON.parse(localStorage.getItem("toDos")); // when getting back we have parse and return back todos from string to object.
      setToDos(toDos);
    }
  }, []); // [] array passed so that it works when mounting and unmounting
  // useEffect to update localStorage toDos when toDos array is updated
  useEffect(() => {
    localStorage.setItem("toDos", JSON.stringify(toDos));
  }, [toDos]); // [toDos] passed so work when that array is updated.
  // function to make status true for completed task
  const completedTask = (id) => {
    setToDos(
      toDos.filter((checkTask) => {
        if (checkTask.id === id) {
          checkTask.status = true;
          checkTask.doneDate = Date.now();
        }
        return checkTask;
      })
    );
  };
  // function to make active task to drop
  const droppedTask = (id) => {
    setToDos(
      toDos.filter((droppedTask) => {
        if (droppedTask.id === id) {
          droppedTask.dropped = true;
          droppedTask.dropDate = Date.now();
        }
        return droppedTask;
      })
    );
  };
  //function delete completed tasks or removed tasks
  const deleteDoneTask = (id) => {
    // let checkdelete = window.confirm("Do you want to delete this data?");
    Swal.fire({
      title: "Are you sure?",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setToDos(
          toDos.filter((deleteTask) => {
            if (deleteTask.id === id) {
              //  console.log("Deleted this");
              return false;
            }
            //  console.log("DOnot delte others");
            return true;
          })
        );
      }
    });
  };
  // function to undo cancelled task to make it active again
  const undoRemovedTask = (id) => {
    setToDos(
      toDos.filter((undoTask) => {
        if (undoTask.id === id) {
          undoTask.dropped = false;
          undoTask.id = Date.now();
        }
        return undoTask;
      })
    );
  };
  return (
    <div className="app container-fluid">
      <div className="mainHeading mt-3">
        <h1 align="center ">ToDo List 📝</h1>
      </div>
      {/* Date and Input */}
      <DateAndInputField
        setToDo={setToDo}
        setToDos={setToDos}
        toDo={toDo}
        toDos={toDos}
      />
      <div className="container-fluid mb-10">
        <div className="row">
          {/* Active tasks */}
          <div className="col-md-4 mb-3">
            <h2 align="center ">Active Tasks</h2>
            {/* let's make toDos rendering dynamic here */}
            {toDos.map((task) => {
              //Check task is  not done and not dropped
              if (!task.status && !task.dropped) {
                return (
                  <div className="row" key={task.id}>
                    <div className="todos">
                      <div className="todo col-12 bg-warning text-white animate__animated animate__bounceIn animate__faster">
                        <div className="col-1">
                          {/* filtering  tasks using id and make status to true to checked task,in checkTask all tasks will come check using id and return value by changing status */}
                          <input
                            className="checkBox"
                            type="checkbox"
                            onClick={() => completedTask(task.id)}
                          />
                        </div>
                        <div className="col-9">
                          <p
                            className="todo-content h4 my-2"
                            style={{ marginBottom: "0px", color: "blue" }}
                          >
                            {task.text}
                          </p>
                          <p
                            style={{
                              marginBottom: "",
                              fontSize: "0.7em",
                              color: "blue",
                              fontWeight: "bold",
                            }}
                          >
                            Activated on : {getTimeAndDate(task.id)}
                          </p>
                        </div>
                        <div className="col-1">
                          {/* make droppped true when dropped is clicked   */}
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                            title="Drop"
                            onClick={() => droppedTask(task.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>

          {/* Tasks completed */}
          <div className="col-md-4 ">
            <h2 align="center ">Tasks finished</h2>
            {toDos.map((tasks) => {
              if (tasks.status && !tasks.dropped) {
                return (
                  <div className="row" key={tasks.id}>
                    <div className="todos">
                      <div className="todo col-12 bg-success text-white animate__animated animate__bounceIn animate__faster">
                        <div className="col-9 text-center">
                          <p
                            className="todo-content h4 my-2 textCross"
                            style={{ marginBottom: "0px", color: "orange" }}
                          >
                            {tasks.text}
                          </p>
                          <p
                            style={{
                              marginBottom: "",
                              fontSize: "0.7em",
                              color: "orange",
                              fontWeight: "bold",
                            }}
                          >
                            Activated on: {getTimeAndDate(tasks.id)} <br />
                            Completed on: {getTimeAndDate(tasks.doneDate)}
                          </p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fa fa-trash"
                            title="Delete"
                            style={{ color: "black" }}
                            onClick={() => deleteDoneTask(tasks.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
          {/* Tasks which are cancelled */}
          <div className="col-md-4 mb-3">
            <h2 align="center"> Tasks cancelled</h2>
            {toDos.map((tasks) => {
              if (tasks.dropped) {
                return (
                  <div className="row" key={tasks.id}>
                    <div className="todos">
                      <div className="todo col-12 bg-danger animate__animated animate__bounceIn animate__faster">
                        <div className="col-1">
                          <i
                            className="fa fa-undo"
                            title="Undo"
                            style={{ color: "blue" }}
                            onClick={() => undoRemovedTask(tasks.id)}
                          />
                        </div>
                        <div className="col-9">
                          <p
                            className="todo-content h4 my-2 textCross"
                            style={{ marginBottom: "0px", color: "yellow" }}
                          >
                            {tasks.text}
                          </p>
                          <p
                            style={{
                              marginBottom: "",
                              fontSize: "0.7em",
                              color: "yellow",
                              fontWeight: "bold",
                            }}
                          >
                            Activated on: {getTimeAndDate(tasks.id)} <br />
                            Cancelled on: {getTimeAndDate(tasks.dropDate)}
                          </p>
                        </div>
                        <div className="col-1">
                          <i
                            className="fa fa-trash"
                            title="Delete"
                            style={{ color: "black" }}
                            onClick={() => deleteDoneTask(tasks.id)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      </div>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;

//To get date and time
function getTimeAndDate(dateId) {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //console.log("dateId" +dateId)
  var date = new Date(dateId);
  var hr = date.getHours();
  var min = date.getMinutes();
  if (min < 10) {
    min = "0" + min;
  }
  var ampm = "am";
  if (hr > 12) {
    hr -= 12;
    ampm = "pm";
  }
  if (hr === 0) {
    hr = 12;
  }
  var day = date.getDate();
  var month = months[date.getMonth()];
  return day + " " + month + " " + hr + ":" + min + ampm;
}
