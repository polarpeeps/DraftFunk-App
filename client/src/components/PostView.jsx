/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "../utils/axios/index.js";
import { useNavigate, useParams } from "react-router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const Comment = ({ comment }) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-2 overflow-hidden md:max-w-full md:flex">
      <div className=" md:flex-shrink-0 flex items-center rounded">
        <div
          className="
          w-10
          h-10
          bg-red-500
          rounded-full
          flex
          items-center
          justify-center
          font-bold
          text-white
        "
        >
        {comment.initials}
        </div>
      </div>
      <div className="p-4 md:w-1/2 md:flex-grow">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
          {comment.commenter}
        </div>
        <p className="mt-2 text-gray-600">{comment.commentText}</p>
        <button
          className="flex items-center focus:outline-none"
          onClick={handleLike}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 mr-1 ${liked ? "text-red-500 animate-like" : "text-gray-600"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                liked
                  ? "M5 12h14M12 5l7 7-7 7"
                  : "M12 4.5c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2 4.5l4 3.5 4-3.5c1.2-1.1 2-2.7 2-4.5 0-3.3-2.7-6-6-6zm0 10.5l-3.5 3-1.5-1.5 5-4.5 5 4.5-1.5 1.5-3.5-3z"
              }
            />
          </svg>
          <p className="text-gray-600 text-sm">{liked ? "Liked" : "Like"}</p>
        </button>
      </div>
    </div>
  );
};

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [ownerName, setUserName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [liked, setLiked] = useState(false);
  const [newComment, setNewComment] = useState(''); // State to hold the new comment text
  const [commentToShow, setShowComment] = useState([]);
  const user = useSelector((state) => state.auth.user);
  console.log(user)
  
  // console.log(emailWithoutDomain);
  // Function to post a new comment
  const addComment = async () => {
    if (newComment.trim()) {
      try {
        // Replace with your API endpoint to add a comment
        var email = user.email; // Example: "username@example.com"
        var emailWithoutDomain = email.replace(/@.*/, "");
        const response = await axios.post(`/comment/${id}`, { commentText: newComment, commenter: emailWithoutDomain, user: user.id, initials: user.initials });
        // You might want to update the post's comments here
        setNewComment(''); // Clear the comment input after submission
      } catch (error) {
        console.error('Failed to add comment:', error.response);
      }
    } else {
      toast.error("Enter some text")
      console.log('Comment is empty');
    }
  };
  const getPost = async () => {
    try {
      setIsLoading(true);
      const {
        data: {
          post: { title, description, image, comments },
          userscheme: { firstName },

        }
      } = await axios.get(`/post/${id}`);
      setShowComment(comments)
      setUserName(firstName)
      setTitle(title);
      setDescription(description);
      setImagePreview(image);
    } catch (error) {
      console.log(error.message)
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="max-w-full mx-auto bg-white rounded-md shadow-md overflow-hidden">
      <div className="md:flex gap-4">
        <div className="md:w-1/2 flex items-center justify-center">
          <img
            src={imagePreview}
            alt="Post"
            // className="w-full h-auto object-cover md:h-full md:object-none"
            className="object-cover rounded-sm m-2 "
          />
        </div>
        <div className="md:w-1/2 p-4 flex flex-col justify-center ">
          <div className="flex items-center mb-4">
            <img
              src="https://picsum.photos/50/50?image=1005"
              alt="Profile"
              className="w-10 h-10 rounded-full mr-2 object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{ownerName}</h2>
              {/* <p className="text-gray-600 text-sm">Location</p> */}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 text-sm">
              {description}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <button
              className="flex items-center focus:outline-none"
              onClick={handleLike}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 mr-1 ${liked ? "text-red-500 animate-like" : "text-gray-600"
                  }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    liked
                      ? "M5 12h14M12 5l7 7-7 7"
                      : "M12 4.5c-3.3 0-6 2.7-6 6 0 1.8.8 3.4 2 4.5l4 3.5 4-3.5c1.2-1.1 2-2.7 2-4.5 0-3.3-2.7-6-6-6zm0 10.5l-3.5 3-1.5-1.5 5-4.5 5 4.5-1.5 1.5-3.5-3z"
                  }
                />
              </svg>
              <p className="text-gray-600 text-sm">
                {liked ? "Liked" : "Like"}
              </p>
            </button>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {commentToShow.map((comm, index) => (
              <Comment
                key={index} // It's better to use a unique identifier if you have one
                comment={comm}
              />
            ))}


            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Add Comment</h3>
              <textarea
                className="w-full p-2 border rounded-md"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              ></textarea>
              <button
                className="px-4 py-2 bg-blue-500 text-white rounded-md mt-2"
                onClick={addComment}
              >
                Post Comment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PostView;