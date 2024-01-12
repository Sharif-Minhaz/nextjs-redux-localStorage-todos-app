"use client";

import {
	deleteTodo,
	selectFilteredTodos,
	selectSearchTerm,
	toggleTodo,
} from "@/lib/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { CheckCircle, Circle, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import Pagination from "./Pagination";
import { useSearchParams } from "next/navigation";

export default function Tasks() {
	const searchParams = useSearchParams();

	const currentPage = Number(searchParams.get("page")) || 1;

	const dispatch = useAppDispatch();
	const searchTerm = useAppSelector(selectSearchTerm);
	const filteredTodos = useAppSelector((state) => selectFilteredTodos(state, searchTerm));

	// pagination logic
	const itemsPerPage = 5;
	// @ts-ignore
	const sortedTodos = [...filteredTodos].sort((a, b) => b.id - a.id);

	// Calculate the start and end index for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;

	// Slice the sortedTodos array to get the todos for the current page
	const todosForCurrentPage = sortedTodos.slice(startIndex, endIndex);

	if (todosForCurrentPage.length === 0) {
		return <p className="p-3">No. todo available.</p>;
	}

	const deleteATodo = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
		event.stopPropagation();
		dispatch(deleteTodo(id));
	};

	const handleCompleteTodo = (event: React.MouseEvent<SVGSVGElement, MouseEvent>, id: number) => {
		event.stopPropagation();
		dispatch(toggleTodo(id));
	};

	return (
		<div className="flex flex-col gap-4 mt-4">
			{todosForCurrentPage.map((todo) => (
				<div
					key={todo.id}
					className={`shadow-md rounded-lg px-3.5 py-5 ${
						todo.completed ? "bg-slate-200" : "bg-white"
					}  flex justify-between`}
				>
					<Link href={`/todos/${todo.id}`}>
						<span className={todo.completed ? "line-through" : ""}>{todo.title}</span>
					</Link>
					<div className="flex gap-3">
						<Trash2
							onClick={(e) => deleteATodo(e, Number(todo.id))}
							className="text-red-500 cursor-pointer"
						/>
						<Link href={`/todos/edit/${todo.id}`}>
							<Pencil className="text-blue-500 cursor-pointer" />
						</Link>
						{todo.completed ? (
							<CheckCircle
								onClick={(e) => handleCompleteTodo(e, Number(todo.id))}
								className="text-teal-500 cursor-pointer"
							/>
						) : (
							<Circle
								onClick={(e) => handleCompleteTodo(e, Number(todo.id))}
								className="text-teal-500 cursor-pointer"
							/>
						)}
					</div>
				</div>
			))}

			<div className="flex justify-center mb-3">
				<Pagination totalPages={Math.ceil(sortedTodos.length / 5) || 1} />
			</div>
		</div>
	);
}
