export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-[#060d17] text-gray-800 dark:text-white py-6  dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-lg font-semibold">cineScope</div>

        <div className="flex gap-6 text-sm text-gray-500 dark:text-gray-400">
          <span className="hover:text-blue-500 cursor-pointer transition">Privacy</span>
          <span className="hover:text-blue-500 cursor-pointer transition">Terms</span>
          <span className="hover:text-blue-500 cursor-pointer transition">Support</span>
        </div>

        <p className="text-xs text-gray-400 dark:text-gray-500">
          &copy; {new Date().getFullYear()} cineScope. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
