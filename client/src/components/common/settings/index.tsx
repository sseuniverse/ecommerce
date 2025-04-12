import { Settings as IconSettings } from "lucide-react";

export default function Settings() {
  return (
    <>
      <button
        className="fixed bottom-4 right-4 inline-flex items-center justify-center text-sm font-medium disabled:pointer-events-none disabled:opacity-50 border rounded-2xl w-12 h-12 bg-gray-400 hover:bg-gray-700 m-0 cursor-pointer border-gray-200 bg-none p-0 normal-case leading-5 hover:text-gray-900"
        type="button"
        aria-haspopup="dialog"
        aria-expanded="true"
        data-state="closed"
      >
        <IconSettings className="text-black block fill-primart-500 border-gray-200 align-middle animate-spin" />
      </button>
    </>
  );
}
