import TodoForm from "@/components/TodoForm";

export default function EditTodoList({ params }: { params: { id: string } }) {
	return (
		<div className="mt-3">
			<TodoForm todoId={params.id} />
		</div>
	);
}
