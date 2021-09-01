import React from "react";

function DateAndInputField({ setToDo, setToDos, toDo, toDos }) {
  //To get dates
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let dateObj = new Date();
  let weekday = days[dateObj.getDay()];
  function getDate() {
    var curr_date = dateObj.getDate();
    var curr_month = dateObj.getMonth() + 1; //Months are zero based
    var curr_year = dateObj.getFullYear();
    let date = curr_date + "/" + curr_month + "/" + curr_year;
    return date;
  }
  // function to store input task to toDo
  const inputTask = (e) => {
    setToDo(e.target.value);
  };
  // function add tasks to toDos array
  const addTasks = () => {
    // add task if task length is > 0
    if (toDo.length > 0) {
      setToDos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
          status: false,
          dropped: false,
          doneDate: null,
        },
      ]);
      setToDo(""); // toDo value set to empty string.
    }
  };
  return (
    <div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center">
          <div className="text-center pb-3">
            <div className="subHeading">
              <br />
              <h2>🙂 Whoop, it's {getDate()} ☕ </h2>
              <h3>{weekday}</h3>
            </div>
            <div className="input py-3">
              <input
                type="text"
                placeholder="🖊️ Add tasks..."
                onInput={inputTask}
                value={toDo}
              />
              <i className="fas fa-plus" title="Add" onClick={addTasks}>
                {" "}
              </i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DateAndInputField;
