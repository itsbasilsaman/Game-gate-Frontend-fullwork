import { useState } from "react";
import { Link } from "react-router-dom";

interface Message {
  type: "sent" | "received";
  content: string;
  timestamp: string;
}
 
interface User {
  id: number;
  name: string;
  lastMessage: string;
  avatar: string; 
  lastSeen: string;
  messages: Message[];
}

const ChatComponent = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "Basil Saman",
      lastMessage: "You: Hello",
      avatar: "http://images.unsplash.com/photo-1535713875002-d1d0cf377fde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ&ixlib=rb-1.2.1&q=80&w=1080",
      lastSeen: "5 hours ago",
      messages: [
        { type: "sent", content: "Hello", timestamp: "11:25" },
      ],
    },
    {
      id: 2,
      name: "Sinab",
      lastMessage: "You: How are you?",
      avatar: "http://images.unsplash.com/photo-1517841905240-472988babdf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8MXx8ZmVtYWxlJTIwcHJvZmlsZXx8MHx8fHwxNjI1NjY3Mjg5&ixlib=rb-1.2.1&q=80&w=1080",
      lastSeen: "2 hours ago",
      messages: [],
    },
    {
      id: 3,
      name: "Amna ",
      lastMessage: "You: See you later",
      avatar: "http://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8Mnx8ZmVtYWxlJTIwcHJvZmlsZXx8MHx8fHwxNjI1NjY3Mjg5&ixlib=rb-1.2.1&q=80&w=1080",
      lastSeen: "10 minutes ago",
      messages: [],
    },
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [search, setSearch] = useState<string>("");
  const [instantMessage, setInstantMessage] = useState<string>("");

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.lastMessage.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!instantMessage.trim() || !selectedUser) return;

    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Create new message
    const newMessage: Message = {
      type: "sent",
      content: instantMessage,
      timestamp,
    };

    // Update selectedUser messages instantly
    const updatedSelectedUser = {
      ...selectedUser,
      lastMessage: `You: ${instantMessage}`,
      messages: [...selectedUser.messages, newMessage],
    };

    // Update users state with the updated selectedUser
    const updatedUsers = users.map((user) =>
      user.id === selectedUser.id ? updatedSelectedUser : user
    );

    setUsers(updatedUsers);
    setSelectedUser(updatedSelectedUser); // Update the selectedUser with the new message
    setInstantMessage(""); // Clear the input field
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`w-full md:w-1/4 bg-white border-r border-gray-200 ${
          selectedUser ? "hidden md:block" : "block"
        }`}
      >
        <div className="p-4 py-[1.5rem] border-b border-gray-200 flex items-center justify-between" style={{backgroundColor:'#121A67'}}>
          <Link to={'/'}><h1 className="text-lg font-semibold" style={{fontFamily:"Unbounded", color:'white'}}>GAME GATE</h1></Link>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <i className="fas fa-bell"></i>
            </button>
            <div className="w-8 h-8 flex items-center justify-center text-white rounded-full font-bold cursor-pointer" style={{backgroundColor:'white', color:'#121A67'}}>
              U
            </div>
          </div>
        </div>
        <div className="p-4">
          <input
            type="text"
            placeholder="Search name or order no."
            className="w-full px-3 py-2 rounded-md chat-input-field placeholder-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="">
          <h2 className="text-sm font-semibold text-gray-500 px-4" style={{fontFamily:"Unbounded", color:'#121A67'}}>Direct Messages</h2>
          <div className="mt-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 hover:bg-gray-100 cursor-pointer justify-between px-4"
                onClick={() => setSelectedUser(user)}
              >
                <div className="flex gap-[10px]">
                  <img
                    src={user.avatar}
                    alt="Avatar"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.lastMessage}</p>
                  </div>
                </div>
                <span className="ml-auto text-xs text-gray-500">{user.lastSeen}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      {selectedUser && (
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200" style={{backgroundColor:'#121A67'}}>
            <div className="flex items-center">
              <img
                src={selectedUser.avatar}
                alt="User Avatar"
                className="w-10 h-10 rounded-full mr-3 object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-white">{selectedUser.name}</h2>
                <p className="text-[13px] text-gray-200">Last seen {selectedUser.lastSeen}</p>
              </div>
            </div>
            <button
              className="text-white hover:text-gray-100 md:hidden"
              onClick={() => setSelectedUser(null)}
            >
              Back
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            {selectedUser.messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 ${message.type === "sent" ? "text-right" : "text-left"}`}
              >
                <div
                  className={`inline-block p-3 rounded-lg ${
                    message.type === "sent" ? "bg-gray-200" : "bg-gray-100"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">{message.timestamp}</p>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type message here"
              className="flex-1 px-3 py-2 rounded-md chat-input-field"
              value={instantMessage}
              onChange={(e) => setInstantMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <button
              className="text-white px-6 py-3 rounded-full"
              onClick={handleSendMessage}
              style={{backgroundColor:'#121A67'}}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
