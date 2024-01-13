import dynamic from "next/dynamic";

const SingleTask = dynamic(() => import("@/components/SingleTask"), { ssr: false });

export default function TodoSinglePage({ params }: { params: { id: string } }) {
	return <SingleTask todoId={params.id} />;
}
