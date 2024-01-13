import dynamic from "next/dynamic";

const EditTask = dynamic(() => import("@/components/EditTask"), { ssr: false });

export default function EditTodoList({ params }: { params: { id: string } }) {
	return <EditTask todoId={params.id} />;
}
