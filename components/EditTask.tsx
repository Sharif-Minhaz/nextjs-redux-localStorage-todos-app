"use client";

import TodoForm from "@/components/TodoForm";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function EditTask({ todoId }: { todoId: string }) {
	const todo = useAppSelector((state: RootState) =>
		state.todos.todos.find((todo) => todo.id === Number(todoId))
	);

	// Check if the todo was found
	if (!todo) {
		return <div className="p-3">Todo not found</div>;
	}
	return (
		<div className="mt-3">
			<TodoForm todoId={todoId} />
		</div>
	);
}
