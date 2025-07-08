import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-4  text-gray-900  bg-gray-200 dark:bg-gray-800  transition-colors duration-500 [font-family:'Poppins',sans-serif]">
      <div className="animate-bounce mb-4">
        <AlertCircle className="w-16 h-16 text-red-500 dark:text-cyan-400 transition-transform duration-500" />
      </div>

      <h1 className="text-6xl font-extrabold mb-2 transition-all duration-500 hover:scale-110">
        404
      </h1>

      <p className="text-lg text-gray-500 dark:text-gray-400 transition-opacity duration-700 hover:opacity-80">
        Oops! Page not found.
      </p>
    </section>
  );
}
