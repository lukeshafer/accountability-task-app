import { trpc } from "$utils/trpc"

type TRPCContext = ReturnType<typeof trpc.useContext>
type TRPCMutation = ReturnType<typeof trpc.useMutation>
type Query = Parameters<typeof trpc.useQuery>[0]
type QueryResult = ReturnType<typeof trpc.useQuery>
type MutateValue = Parameters<TRPCMutation["mutateAsync"]>[0]

const x = trpc.useQuery(["task.getAll"])


const optimisticAdd = async (valueToAdd: MutateValue, context: TRPCContext, mutation: TRPCMutation, query: Query, data: QueryResult) => {
	if (mutation.isLoading) return;

	const addPromise = mutation.mutateAsync(valueToAdd, {
		onError(error, variables, context) {
			console.log("onError", error, variables, context);
		},
	});

	context.setQueryData(query, (old) => {
		old?.push(valueToAdd);
		return old ?? [];
	});
	try {
		const newTask = await addTaskPromise;

		trpcContext.setQueryData(
			["task.getAll"],
			(prev) =>
				prev?.map((prev) =>
					prev.id === newTask.id
						? newTask
						: {
								...prev,
							}
				) ?? []
		);