import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
	title: "My Todo App",
	description: "Created with redux, nextjs and localhost",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<body className={`${inter.className} bg-slate-100 px-4 pb-4`}>
				<StoreProvider>
					<main className="h-screen max-w-[600px] mx-auto mb-4">
						<div className="sticky top-0 bg-white py-2 rounded-b-md z-20 shadow-md">
							<h1 className="text-center text-teal-500 text-3xl font-extrabold pb-2">
								<Link href="/">My Todo List</Link>
							</h1>
						</div>
						{children}
					</main>
				</StoreProvider>
			</body>
		</html>
	);
}
