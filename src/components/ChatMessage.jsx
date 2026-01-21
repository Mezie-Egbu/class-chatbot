import { UserIcon, ComputerDesktopIcon } from "@heroicons/react/24/solid";

export default function ChatMessage({ isAi, message }) {
  return (
    <div>
      <div
        className={`text-left flex ${
          isAi ? "justify-start mb-23" : "justify-end"
        }`}
      >
        <div
          className={`flex flex-col p-5 m-4 rounded-2xl  ${
            isAi ? " bg-blue-600 text-white w-[95%]" : "bg-gray-300 max-w-[70%]"
          }`}
        >
          <div className="flex p-3 gap-2">
            {isAi ? (
              <ComputerDesktopIcon className="w-8 text-white" />
            ) : (
              <UserIcon className="w-8 text-blue-500" />
            )}
            <div>
              <p>{isAi ? "Student AI Assistant" : "You"}</p>
            </div>
          </div>
          <div>
            <p className="p-2 break-words whitespace-pre-wrap">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
