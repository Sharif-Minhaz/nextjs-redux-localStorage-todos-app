"use client";

import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";

export default function TodoSinglePage({ params }: { params: { id: number } }) {
	const todo = useAppSelector((state: RootState) =>
		state.todos.todos.find((todo) => todo.id === Number(params.id))
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
			<div className="mt-5 pl-3">
				<Link href="/">
					<button className="bg-blue-500 rounded-lg shadow-lg text-white text-sm px-3 py-2 active:shadow-none">
						Return
					</button>
				</Link>
			</div>
		</div>
	);
}
