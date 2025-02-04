import React from "react";

interface RowProps {
  id: number;
  task: string;
  onDelete: (id: number) => void;
  onSave: (id: number) => void;
  moveAbove: (id: number) => void;
  moveBelow: (id: number) => void;
}

export default function ToDoRow({ id, task, onDelete, onSave,moveAbove,moveBelow }: RowProps) {
  const [editValue, setInputValue] = React.useState(task);
  const [isEditable, setIsEditable] = React.useState(false);

  function editTask(id: number) {
    setIsEditable(!isEditable);
    onSave(id);
  }

  function editTaskKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      editTask(id);
    }
  }

  return (
    <>
      <tr className="hover:bg-gray-100 hover:-translate-y-1 transition-transform focus-within:-translate-y-1.5 focus-within:shadow-lg focus-within:bg-gray-100">
        <td className="px-6 py-4 text-sm text-gray-900"><input type="checkbox" className="peer"/></td>
        {isEditable ? (
          <>
            <td className="px-6 py-4">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(event)=>editTaskKeyDown(event)}
                placeholder="Edit task..."
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-full"
              />
            </td>
            <td className="px-6 py-4 text-sm font-medium items-center">
              <button
                onClick={() => editTask(id)}
                className="text-xl inline-flex items-center px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <i className="icon-[weui--done-filled]"></i>
              </button>
            </td>
          </>
        ) : (
          <>
            <td className="px-6 py-4 text-lg w-full peer-checked:line-through">{editValue}</td>
            <td className="px-6 py-4 text-sm font-medium flex flex-row  justify-evenly gap-1">
              <button
                onClick={() => editTask(id)}
                className="text-xl inline-flex items-center px-3 py-1 border border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition-colors"
              >
                <i className="icon-[weui--pencil-filled]"></i>
              </button>
              <button
                onClick={() => onDelete(id)}
                className="text-xl inline-flex items-center px-3 py-1 border border-red-600 text-red-600 rounded-md hover:bg-red-600 hover:text-white transition-colors"
              >
                <i className="icon-[weui--delete-filled]"></i>
              </button>
            </td>
            <td>
              <button onClick={() => moveAbove(id)}>
                <i className="icon-[mingcute--up-fill]"></i>
              </button>
              <button onClick={() => moveBelow(id)}>
                <i className="icon-[mingcute--down-fill]"></i>
              </button>
            </td>
          </>
        )}
      </tr>
    </>
  );
}
