const Task = ({ value }: { value: string }) => {
  return (
    <li className="">
      <button className="btn btn-outline btn-block h-20">{value}</button>
    </li>
  );
};

export default Task;
