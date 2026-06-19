import Link from "next/link";

export default function DiscordPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[500px] gap-4 border-4 border-t-0 border-solid border-[#ffc8e9] bg-gradient-to-l from-[#f28989] via-[#f28989] to-[#b8ffc6]">
      <h1 className="text-4xl font-bold">Join our Discord!</h1>
      <Link
        href="https://discord.gg/da-burrow"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 bg-[#7289da] text-white rounded-lg text-lg font-semibold hover:bg-[#5b6eae] transition-colors duration-300"
      >
        Click here to join
      </Link>
    </div>
  );
}
