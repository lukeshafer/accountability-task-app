import AddTaskButton from "$modules/todo/components/AddTaskButton";
import Task from "$modules/todo/components/Task";
import autoAnimate from "@formkit/auto-animate";
import { useEffect, useRef } from "react";
import { inferQueryOutput } from "$utils/trpc";
import { UseQueryResult } from "react-query";

interface Props {
  tasks: UseQueryResult<inferQueryOutput<"task.getAll">>;
}

const Todo = ({ tasks }: Props) => {
  const parent = useRef(null);

  useEffect(() => {
    parent.current && autoAnimate(parent.current);
  }, [parent]);

  return (
    <ul
      ref={parent}
      className="grid w-full content-start justify-center justify-items-center gap-4"
    >
      {tasks.data?.map(({ id, title, description, completed }) => (
        <Task
          key={id}
          id={id}
          title={title}
          description={description}
          refetch={tasks.refetch}
          completed={completed}
        />
      ))}
      <AddTaskButton tasks={tasks} />
    </ul>
  );
};

export default Todo;
