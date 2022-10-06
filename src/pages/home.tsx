// The Home page is your default place in the app, where you see your task list
import { useSession } from "next-auth/react";
import MainLayout from "$components/layouts/MainLayout";
import AddTaskButton from "$modules/todo/components/AddTaskButton";
import { trpc } from "$utils/trpc";
import Task from "$modules/todo/components/Task";

const Home = () => {
  const { data: session, status } = useSession();

  const tasks = ["First task", "second task", "Another Task!"];
  const tasksData = trpc.useQuery(["task.getAll"]);

  if (session) {
    return (
      <MainLayout title={`${session?.user?.name} - Home`}>
        {tasksData.data?.map((value) => (
          <p key={value.id}>{value.title}</p>
        ))}
        {/* LIST */}
        <ul className="flex w-40 flex-col gap-4">
          {tasks.map((value, index) => (
            <Task key={index} value={value} />
          ))}
        </ul>
      </MainLayout>
    );
  } else return <MainLayout title="Loading..."></MainLayout>;
};

export default Home;
