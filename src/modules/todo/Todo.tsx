import { FormEventHandler, useState } from "react";

const Todo = () => {
  const [todoList, setTodoList] = useState<string[]>([]);

  const addTodoItem: FormEventHandler<HTMLFormElement> = (evt) => {
    evt.preventDefault();
    const todoValue = evt.currentTarget.task.value;
    setTodoList((value) => [...value, todoValue]);
    evt.currentTarget.task.value = "";
  };

  return (
    <>
      <ul>
        {todoList.map((item, index) => (
          <li key={index} className="border border-cyan-300 p-2 text-center">
            {item}
          </li>
        ))}
      </ul>
      <form onSubmit={addTodoItem} className="flex justify-center gap-2">
        <input
          type="text"
          name="task"
          id="task"
          required
          className="border-2 border-sky-500 p-2 text-center"
        />
        <button
          type="submit"
          className="border-2 border-sky-500 p-2 text-center"
        >
          Add Item
        </button>
      </form>
    </>
  );
};

export default Todo;
