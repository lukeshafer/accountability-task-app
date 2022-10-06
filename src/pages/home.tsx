// The Home page is your default place in the app, where you see your task list
import { useSession } from "next-auth/react";
import MainLayout from "$components/layouts/MainLayout";
import AddTaskButton from "$modules/todo/components/AddTaskButton";
import { trpc } from "$utils/trpc";

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
            <li key={index} className="">
              <button className="btn btn-outline btn-block h-20">
                {value}
              </button>
            </li>
          ))}
          <li className="bg-base-100/25 shadow-xl">
            <AddTaskButton></AddTaskButton>
          </li>
        </ul>
      </MainLayout>
    );
  } else return <MainLayout title="Loading..."></MainLayout>;
};

export default Home;
