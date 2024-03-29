"use client";

import { searchTodo } from "@/lib/features/todos/todoSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Search as SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();
	const dispatch = useAppDispatch();

	const handleSearch = useDebouncedCallback((term) => {
		const params = new URLSearchParams(searchParams);

		if (term) {
			params.set("query", term);
			params.set("page", "1");
		} else {
			params.delete("query");
		}

		dispatch(searchTodo(term));

		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className="relative flex flex-1 flex-shrink-0 shadow-sm">
			<label htmlFor="search" className="sr-only">
				Search
			</label>
			<input
				className="peer block w-full rounded-md border dark:bg-slate-800 border-gray-200 py-[9px] pl-10 text-sm dark:border-slate-600 outline-1 outline-teal-500 dark:outline-none placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				defaultValue={searchParams.get("query")?.toString()}
			/>
			<SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900 dark:peer-focus:text-gray-200" />
		</div>
	);
}
