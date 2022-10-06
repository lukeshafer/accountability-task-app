import { MutableRefObject, useEffect, useRef, useState } from "react";
import { trpc } from "$utils/trpc";

const AddTaskButton = () => {
  const input: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [isAdding, setIsAdding] = useState(false);
  const addTaskMutation = trpc.useMutation("task.createTask");

  useEffect(() => {
    if (isAdding) input.current?.focus();
  }, [isAdding]);

  const addTask = (task: string) => {
    console.log(task);
    // addTaskMutation.mutate({ title: task, description: task });
  };

  const handleBlur = () => {
    const value = input.current?.value;
    if (value) {
      addTask(value);
    }
    setIsAdding(false);
  };

  return (
    <div className="h-20">
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="btn btn-outline btn-block h-20 border-4 border-dashed border-base-content/50"
        >
          Add Task
        </button>
      )}
      {isAdding && (
        <input
          ref={input}
          onBlur={handleBlur}
          onKeyDown={(event) => {
            if (event.key === "Enter") input.current?.blur();
          }}
          type="text"
          placeholder="Add Task"
          className="btn input btn-ghost input-bordered h-full w-full max-w-xs text-center text-sm"
        />
      )}
    </div>
  );
};

export default AddTaskButton;
