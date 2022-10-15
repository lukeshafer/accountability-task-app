import { MutableRefObject, useEffect, useRef, useState } from "react";
import { inferQueryOutput, trpc } from "$utils/trpc";
import { UseQueryResult } from "react-query";

const AddTaskButton = ({
  tasks: { refetch },
}: {
  tasks: UseQueryResult<inferQueryOutput<"task.getAll">>;
}) => {
  const input: MutableRefObject<null | HTMLInputElement> = useRef(null);
  const [isAdding, setIsAdding] = useState(false);
  const addTaskMutation = trpc.useMutation("task.createTask");

  useEffect(() => {
    if (isAdding) input.current?.focus();
  }, [isAdding]);

  const addTask = (task: string) => {
    addTaskMutation.mutate(
      { title: task, description: task },
      {
        onSuccess() {
          refetch();
        },
      }
    );
  };

  const handleBlur = () => {
    const value = input.current?.value;
    if (value) {
      addTask(value);
    }
    setIsAdding(false);
  };

  return (
    <li className="w-48">
      <div className="h-20 normal-case">
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="btn btn-outline h-20 w-48 border-4 border-dashed border-base-content/50 text-base normal-case"
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
            className="btn input btn-ghost input-bordered h-full w-full max-w-xs text-center text-base normal-case"
          />
        )}
      </div>
    </li>
  );
};

export default AddTaskButton;
