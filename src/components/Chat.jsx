import { useEffect, useRef, useState } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import ChatMessage from "./ChatMessage";
import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { text: userMessage, isAi: false }]);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { text: data.message, isAi: true }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { text: "Sorry an Error Occured" + " " + error.message, isAi: true },
      ]);
    }
  };

  return (
    <main>
      {/* Header Section */}
      <div className="">
        <div className="fixed top-0 shadow-xl w-full bg-white">
          <h1 className="sm:text-2xl text-center p-2 sm:py-4 font-bold">
            <span className="text-blue-600">AI POWERED CHAT BOT</span> For
            STUDENT ASSISTANCE
          </h1>
        </div>
      </div>

      {/* Body Message Section */}
      <div className="mt-35">
        {messages.length === 0 ? (
          <div className="border rounded-2xl text-gray-500 mt-5 sm:mt-18 md:mx-auto md:w-[70%] lg:w-[50%]">
            <ChatBubbleLeftIcon className="w-10 mx-auto text-blue-600" />
            <div className="text-center p-2">
              <p className="">
                Hi I am an AI powered chat bot built for student assistance
              </p>
              <i>I was built by the following developers of Group 5</i>
              <ul className=" text-center p-5 font-bold">
                <li>Austine Favour u2019/3020031</li>
                <li>Egba Wisdom u2019/3020033</li>
                <li>Efedhoma Prosper u2019/3020034</li>
                <li>Elezua Gabriel u2019/3020035</li>
                <li>Godspower Chukwuma u2019/3020036</li>
                <li>Okweri-Eric Okezi u2019/3020037</li>
              </ul>
            </div>
            <i className="flex justify-center py-4">Ask Me Anything...</i>
          </div>
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isAi={message.isAi}
            />
          ))
        )}
        {loading && (
          <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-600 ml-5"></div>
        )}
        {useEffect(() => {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, [messages])}
      </div>

      {/* Input section */}
      <div className="fixed bottom-5 w-full">
        <form onSubmit={handleSubmit}>
          <div className="mx-auto sm:w-7/10 no-scrollbar flex justify-around p-3 rounded-4xl shadow-blue-600 shadow-2xl bg-white">
            <textarea
              type="text"
              value={input}
              ref={inputRef}
              placeholder="Ask anything"
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              className="w-8/10 resize-none outline-0 h-15 p-3"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className=" w-3/20"
            >
              <PaperAirplaneIcon className="w-9/10 h-15 text-blue-600 hover:text-blue-300 dark:text-red-500" />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
