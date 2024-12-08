import axios from "axios";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai"; // Import the close icon
import { db } from "../Constant";
import Loading from "./Loading";

const CenterForm = ({
  message = "",
  setDialog,
  setNotification
}) => {

  const [username, setUsername] = useState("");
  const [isLoading,setIsLoading] = useState(false)

  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!username) {
      alert("Username Required")
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post(
        `${db}/chat/addFriend`,
        {username},
        {withCredentials : true}
      )
      setIsLoading(false)
      setNotification("Friend Added Successfully")
      
      window.location.reload();
    } catch (error) {
      setNotification(error.response.data.Message.toUpperCase())
      console.error("error in adding friend",error)
    } finally {
      setDialog(false)
    }
    
  };


  return (
    <>
      {isLoading && <Loading/>}
      <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-[#14131d] p-8 rounded-lg shadow-lg w-96 text-center text-white border border-zinc-400 relative">
          <button
            onClick={() => setDialog(false)}
            className="absolute top-2 right-2 text-2xl text-white hover:text-gray-400"
          >
            <AiOutlineClose />
          </button>

          <p className="mb-6 text-lg font-semibold">Please enter your Friend's username:</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full p-3 mb-6 border border-gray-300 rounded-md text-lg text-black"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CenterForm;
