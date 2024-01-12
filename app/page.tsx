import Search from "@/components/Search";
import { Plus } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

// dynamic import for forbidding the server side rendering (hydration error)
const Tasks = dynamic(() => import("@/components/Tasks"), { ssr: false });

export default function Home() {
	return (
		<div className="">
			<div className="flex gap-2 mt-3 items-center">
				<Search placeholder="Search todo..." />
				<Link href="/todos/create">
					<button className="bg-teal-500 rounded-md p-1.5 text-white">
						<Plus />
					</button>
				</Link>
			</div>
			<div>
				<Tasks />
			</div>
		</div>
	);
}
