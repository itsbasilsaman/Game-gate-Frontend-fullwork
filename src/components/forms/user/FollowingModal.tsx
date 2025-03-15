import React, { useState, useEffect } from "react";

type User = {
  username: string;
  level: number;
  avatar: string;
  following: boolean;
};

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const FollowingModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [animationClass, setAnimationClass] = useState("");

  // Define the users array directly inside UserModal
  const users: User[] = [
    {
      username: "SunRise",
      level: 156,
      avatar: "https://th.bing.com/th/id/R.e2bb45fff1e398723c711c519502d5a3?rik=SEPvooeqfgw0kA&riu=http%3a%2f%2fimages.unsplash.com%2fphoto-1535713875002-d1d0cf377fde%3fcrop%3dentropy%26cs%3dtinysrgb%26fit%3dmax%26fm%3djpg%26ixid%3dMnwxMjA3fDB8MXxzZWFyY2h8NHx8bWFsZSUyMHByb2ZpbGV8fDB8fHx8MTYyNTY2NzI4OQ%26ixlib%3drb-1.2.1%26q%3d80%26w%3d1080&ehk=Gww3MHYoEwaudln4mR6ssDjrAMbAvyoXYMsyKg5p0Ac%3d&risl=&pid=ImgRaw&r=0",
      following: true,
    },
    // You can add more users as needed
  ];

  useEffect(() => {
    if (isOpen) {
      setAnimationClass("modal-enter");
    } else if (!isOpen && animationClass) {
      setAnimationClass("modal-exit");
    }
  }, [isOpen]);

  const handleClose = () => {
    setAnimationClass("modal-exit");
    setTimeout(onClose, 500); // Match the duration of the exit animation
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={handleClose}
        >
          <div
            className={`bg-white p-6 rounded-[18px] shadow-lg w-11/12 max-w-md ${animationClass}`}
            onClick={(e) => e.stopPropagation()} // Prevent modal close on inner click
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold" style={{ fontFamily: "Unbounded" }}>
                Following ({users.length})
              </h2>
              <button
                className="text-gray-500 hover:text-gray-800"
                onClick={handleClose}
              >
                ✖
              </button>
            </div>
            <div className="space-y-4">
              {users.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between space-x-4 border-b pb-2"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={user.avatar}
                      alt={user.username}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-bold">{user.username}</p>
                      <p className="text-sm text-gray-500">Level {user.level}</p>
                    </div>
                  </div>
                  <button
                    className={`px-4 py-1 border rounded ${
                      user.following
                        ? "border-gray-500 text-gray-500 hover:bg-gray-500 hover:text-white"
                        : "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white"
                    }`}
                  >
                    {user.following ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FollowingModal;
