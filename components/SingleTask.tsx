"use client";

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { convertTime } from "@/lib/utils";
import { useRouter } from "next/navigation";

export default function SingleTask({ todoId }: { todoId: string }) {
	const router = useRouter();

	const todo = useAppSelector((state: RootState) =>
		state.todos.todos.find((todo) => todo.id === Number(todoId))
	);

	// Check if the todo was found
	if (!todo) {
		return <div className="p-3">Todo not found</div>;
	}

	return (
		<div className="bg-white shadow-lg mt-3 py-4 rounded-lg">
			<h1 className="border-b border-slate-300 px-3 pb-3 font-bold text-[20px]">
				{todo.title}
			</h1>
			<p className="px-3 pt-3">{todo.description}</p>
			<p className="text-sm px-3 pt-3 text-slate-500">
				{" "}
				Added at {convertTime(Number(todo.id))}
			</p>
			<div className="mt-5 pl-3">
				<button
					onClick={() => router.back()}
					className="bg-blue-500 rounded-lg shadow-lg text-white text-sm px-3 py-2 active:shadow-none"
				>
					Return
				</button>
			</div>
		</div>
	);
}
