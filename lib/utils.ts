export const generatePagination = (currentPage: number, totalPages: number) => {
	// If the total number of pages is 7 or less,
	// display all pages without any ellipsis.
	if (totalPages <= 7) {
		return Array.from({ length: totalPages }, (_, i) => i + 1);
	}

	// If the current page is among the first 3 pages,
	// show the first 3, an ellipsis, and the last 2 pages.
	if (currentPage <= 3) {
		return [1, 2, 3, "...", totalPages - 1, totalPages];
	}

	// If the current page is among the last 3 pages,
	// show the first 2, an ellipsis, and the last 3 pages.
	if (currentPage >= totalPages - 2) {
		return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
	}

	// If the current page is somewhere in the middle,
	// show the first page, an ellipsis, the current page and its neighbors,
	// another ellipsis, and the last page.
	return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
};

export function convertTime(timestamp: number) {
	// Create a new Date object using the timestamp
	const date = new Date(timestamp);

	// Define an array of month names
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	// Get the day, month, and year
	const day = date.getDate();
	const month = monthNames[date.getMonth()];
	const year = date.getFullYear();

	// Get the day of the week and format it to three letters
	const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "short" });

	// Output the formatted date
	const formattedDate = `${dayOfWeek} ${day} ${month} ${year}`;

	return formattedDate;
}
