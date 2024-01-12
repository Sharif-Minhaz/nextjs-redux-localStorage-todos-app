"use client";

import { addTodo, editTodo } from "@/lib/features/todos/todoSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function TodoForm({ todoId }: { todoId: string }) {
	const router = useRouter();
	const pathname = usePathname();

	const todo = useAppSelector((state: RootState) =>
		state.todos.todos.find((todo) => todo.id === Number(todoId))
	);

	const dispatch = useAppDispatch();

	const [formData, setFormData] = useState({
		title: todo?.title || "",
		description: todo?.description || "",
	});

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (todo) {
			dispatch(editTodo({ ...todo, ...formData }));
			setFormData({ title: "", description: "" });
			return router.push(`/todos/${todoId}`);
		} else {
			dispatch(addTodo(formData));
			setFormData({ title: "", description: "" });
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col gap-3">
			<div>
				<label htmlFor="title" className="sr-only">
					Title
				</label>
				<input
					className="peer block w-full rounded-md border dark:bg-slate-800 border-gray-200 py-[9px] text-sm dark:border-slate-600 outline-1 pl-3 outline-teal-500 dark:outline-none placeholder:text-gray-500"
					placeholder="Title"
					name="title"
					required
					value={formData.title}
					onChange={handleOnChange}
				/>
			</div>
			<div>
				<label htmlFor="description" className="sr-only">
					Description
				</label>
				<textarea
					className="peer block w-full rounded-md border dark:bg-slate-800 border-gray-200 py-[9px] text-sm dark:border-slate-600 outline-1 pl-3 outline-teal-500 dark:outline-none placeholder:text-gray-500"
					placeholder="Description"
					name="description"
					required
					rows={6}
					value={formData.description}
					onChange={handleOnChange}
				/>
			</div>
			<div className="flex justify-between mt-2">
				<button
					type="submit"
					className="bg-teal-500 rounded-lg shadow-lg text-white text-sm px-3 py-2 active:shadow-none"
				>
					{pathname === `/todos/edit/${todoId}` ? "Update" : "Add"} Todo
				</button>
				<Link href="/">
					<button
						type="button"
						className="bg-blue-500 rounded-lg shadow-lg text-white text-sm px-3 py-2 active:shadow-none"
					>
						Return
					</button>
				</Link>
			</div>
		</form>
	);
}
