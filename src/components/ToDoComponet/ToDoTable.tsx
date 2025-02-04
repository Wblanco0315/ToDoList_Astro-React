import React from "react";
import ToDoInput from "./ToDoInput";
import ToDoRow from "./ToDoRow";

interface Task {
  id: number;
  task: string;
}

interface RowProps {
  id: number;
  taskName: string;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
  moveAbove: (id: number) => void;
  moveBelow: (id: number) => void;
}

export default function ToDoTable() {
  const [tasksList, setTasksList] = React.useState<RowProps[]>([]);
  const [editValue, setInputValue] = React.useState("");
  const [isTop, setIsTop] = React.useState(false);

  function addTask(task: Task): void {
    setTasksList([
      ...tasksList,
      {
        id: task.id,
        taskName: task.task,
        onDelete: deleteTask,
        onSave: saveChanges,
        moveAbove: moveAbove,
        moveBelow: moveBelow,
      },
    ]);
  }

  function deleteTask(id: number): void {
    let index = searchTask(id);
    console.log(index);
    tasksList.splice(index, 1);
    setTasksList([...tasksList]);
  }

  function saveChanges(id: number): void {
    let index = searchTask(id);
    if (index !== -1) {
      tasksList[index].taskName = editValue;
      setTasksList([...tasksList]);
      return;
    }
    alert("Unnexpected error");
  }

  function moveAbove(id: number): void {
    let index = searchTask(id);
    if (index === 0) return;
    let temp = tasksList[index];
    tasksList[index] = tasksList[index - 1];
    tasksList[index - 1] = temp;
    setTasksList([...tasksList]);
  }

  function moveBelow(id: number): void {
    let index = searchTask(id);
    if (index === tasksList.length - 1) return;
    let temp = tasksList[index];
    tasksList[index] = tasksList[index + 1];
    tasksList[index + 1] = temp;
    setTasksList([...tasksList]);
  }

  function isRowTop(id: number): void {
    let index = searchTask(id);
    if (index === 0) {
    }
  }

  function searchTask(id: number): number {
    return tasksList.findIndex((task) => task.id === id);
  }

  return (
    <>
      <ToDoInput addTask={(task) => addTask(task)} />
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" >
            <th className="px-6 py-3 "></th>
            <th className="px-6 py-3 " >Task Name</th>
            <th className="px-6 py-3 ">Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tasksList.length === 0 ? (
            <tr>
              <td colSpan={3} className="px-6 py-4 text-center text-gray-500">
                No hay tareas
              </td>
            </tr>
          ) : (
            tasksList.map((item) => (
              <ToDoRow
                key={item.id}
                id={item.id}
                task={item.taskName}
                onDelete={deleteTask}
                onSave={saveChanges}
                moveAbove={moveAbove}
                moveBelow={moveBelow}
              />
            ))
          )}
        </tbody>
      </table>
    </>
  );
}
