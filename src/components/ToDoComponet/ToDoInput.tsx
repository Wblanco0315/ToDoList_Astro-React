import React from "react";

interface ToDoInputProps {
  addTask: (task: { id: number; task: string }) => void;
}

export default function ToDoInput({ addTask }: ToDoInputProps) {
  const [inputValue, setInputValue] = React.useState("");
  const [contador, setContador] = React.useState(0);

  function handleChange(): void {
    if (inputValue.trim() === "" || inputValue === null) {
      alert("Please enter a task");
      setInputValue("");
      return;
    }

    addTask({
      id: contador,
      task: inputValue,
    });
    setInputValue("");
    setContador(contador + 1);
  }

  function addTaskOnKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === 'Enter') {
      handleChange();
    }
  }

  return (
    <div className="w-full flex flex-row gap-2 mb-4">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(event) => addTaskOnKeyPress(event)}
        placeholder="Add a new task..."
        className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
      />
      <button
        onClick={handleChange}
        className="text-2xl px-2 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 inline-flex items-center gap-2 hover:-translate-y-1 duration-200 transition-transform"
      >
        <i className="icon-[weui--add-filled]"></i>
      </button>
    </div>
  );
}
