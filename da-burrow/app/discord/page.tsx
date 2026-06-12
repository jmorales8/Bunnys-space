export default function Discord() {
	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4">
			<h1 className="text-4xl font-bold">Join our Discord!</h1>
			<a
				href="https://discord.gg/da-burrow"
				target="_blank"
				rel="noopener noreferrer"
				className="px-6 py-3 bg-[#7289da] text-white rounded-lg text-lg font-semibold hover:bg-[#5b6eae] transition-colors duration-300"
			>
				Click here to join
			</a>
		</div>
	);
}
