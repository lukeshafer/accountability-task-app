import { useState } from "react";
import { trpc } from "$utils/trpc";

interface Props {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  refetch: () => void;
}

const Task = ({ id, title, description, completed, refetch }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };
  const deleteTask = trpc.useMutation("task.deleteTask");
  const completeTask = trpc.useMutation("task.completeTask");

  return (
    <li className="flex w-[inherit] justify-center">
      <div
        className={`items-between card flex h-20 max-w-full flex-col justify-center bg-base-100 p-4 normal-case ${
          isExpanded ? "w-full" : "w-48 items-center"
        }`}
        tabIndex={0}
        role="button"
        onClick={handleClick}
      >
        <div className="flex items-center justify-between gap-4">
          <h2 className={`text-lg ${completed ? "line-through" : ""}`}>
            {title}
          </h2>
          {isExpanded && (
            <div className="flex items-center justify-end gap-2">
              {/* DELETE */}
              <button
                className="btn btn-secondary btn-sm"
                onClick={() =>
                  deleteTask.mutate({ id }, { onSuccess: refetch })
                }
              >
                𐄂
              </button>
              {/* CREATE */}
              <button
                className="btn btn-primary btn-sm"
                onClick={() =>
                  completeTask.mutate({ id }, { onSuccess: refetch })
                }
              >
                ✓
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
};

export default Task;
