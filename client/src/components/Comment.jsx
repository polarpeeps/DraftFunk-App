import axios from "../utils/axios";
import { useEffect, useRef } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
const Comment = ({ comments, postUser, setCommentState }) => {
  const user = useSelector((state) => state.auth.user);

  const lastCommentRef = useRef(null);
  useEffect(() => {
    if (lastCommentRef.current) {
      lastCommentRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [comments]);
  const handleDelete = async (commentId) => {
    try {
      const res = await axios.delete(`/comment/${commentId}`);
      if (res.data) {
        setCommentState(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="pt-1 overflow-y-scroll h-[18rem] hide-scrollbar px-2">
      {comments?.map(
        ({ commentText, _id: commentId, user: commenter }, index) => (
          <div
            key={commentId}
            className="text-sm mb-2 flex flex-start items-center"
            ref={index === comments.length - 1 ? lastCommentRef : null}
          >
            <div>
              <a
                href="#"
                className="cursor-pointer flex items-center text-sm border-2 border-transparent rounded-full focus:outline-none focus:border-gray-300 transition duration-150 ease-in-out"
              >
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={
                    commenter?.profilePicture ||
                    "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                  }
                  alt="user"
                />
              </a>
            </div>
            <p className="cursor-pointer font-bold ml-2 w-full group">
              <a className="">{commenter?.firstName}</a>
              <p className="flex items-center relative text-gray-700 font-medium ml-1">
                {commentText}
                {user &&
                (commenter?._id === user.id ||
                  user.role === 1 ||
                  postUser === user.id) ? (
                  <>
                    <svg
                      onClick={() => handleDelete(commentId)}
                      className="opacity-0 absolute right-1 group-hover:opacity-100"
                      width="20px"
                      height="20px"
                      viewBox="0 0 24 24"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      fill="#e63333"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <g id="SVGRepo_iconCarrier">
                        {" "}
                        {/* Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools */}{" "}
                        <title>ic_fluent_comment_delete_24_regular</title>{" "}
                        <desc>Created with Sketch.</desc>{" "}
                        <g
                          id="🔍-Product-Icons"
                          stroke="none"
                          strokeWidth={1}
                          fill="none"
                          fillRule="evenodd"
                        >
                          {" "}
                          <g
                            id="ic_fluent_comment_delete_24_regular"
                            fill="#e63333"
                            fillRule="nonzero"
                          >
                            {" "}
                            <path
                              d="M12.0222817,2.99927567 C11.7253991,3.46285541 11.4857535,3.96661073 11.3133148,4.50057151 L5.25,4.5 C4.28350169,4.5 3.5,5.28350169 3.5,6.25 L3.5,14.75 C3.5,15.7164983 4.28350169,16.5 5.25,16.5 L7.49878573,16.5 L7.49985739,20.2505702 L12.5135149,16.5 L18.75,16.5 C19.7164983,16.5 20.5,15.7164983 20.5,14.75 L20.5010736,12.2672297 C21.0520148,11.9799518 21.5566422,11.6160435 22.0008195,11.1896412 L22,14.75 C22,16.5449254 20.5449254,18 18.75,18 L13.0124851,18 L7.99868152,21.7506795 C7.44585139,22.1641649 6.66249789,22.0512036 6.2490125,21.4983735 C6.08735764,21.2822409 6,21.0195912 6,20.7499063 L5.99921427,18 L5.25,18 C3.45507456,18 2,16.5449254 2,14.75 L2,6.25 C2,4.45507456 3.45507456,3 5.25,3 L12.0222817,2.99927567 Z M17.5,1 C20.5375661,1 23,3.46243388 23,6.5 C23,9.53756612 20.5375661,12 17.5,12 C14.4624339,12 12,9.53756612 12,6.5 C12,3.46243388 14.4624339,1 17.5,1 Z M14.7156945,3.58859116 L14.6464466,3.64644661 L14.5885912,3.7156945 C14.4704696,3.88620412 14.4704696,4.11379588 14.5885912,4.2843055 L14.6464466,4.35355339 L16.793,6.5 L14.6464466,8.64644661 L14.5885912,8.7156945 C14.4704696,8.88620412 14.4704696,9.11379588 14.5885912,9.2843055 L14.6464466,9.35355339 L14.7156945,9.41140884 C14.8862041,9.52953039 15.1137959,9.52953039 15.2843055,9.41140884 L15.3535534,9.35355339 L17.5,7.207 L19.6464466,9.35355339 L19.7156945,9.41140884 C19.8862041,9.52953039 20.1137959,9.52953039 20.2843055,9.41140884 L20.3535534,9.35355339 L20.4114088,9.2843055 C20.5295304,9.11379588 20.5295304,8.88620412 20.4114088,8.7156945 L20.3535534,8.64644661 L18.207,6.5 L20.3535534,4.35355339 L20.4114088,4.2843055 C20.5295304,4.11379588 20.5295304,3.88620412 20.4114088,3.7156945 L20.3535534,3.64644661 L20.2843055,3.58859116 C20.1137959,3.47046961 19.8862041,3.47046961 19.7156945,3.58859116 L19.6464466,3.64644661 L17.5,5.793 L15.3535534,3.64644661 L15.2843055,3.58859116 C15.1381544,3.48734412 14.9500654,3.47288026 14.791932,3.54519957 L14.7156945,3.58859116 Z"
                              id="🎨-Color"
                            >
                              {" "}
                            </path>{" "}
                          </g>{" "}
                        </g>{" "}
                      </g>
                    </svg>
                  </>
                ) : (
                  <></>
                )}
              </p>
            </p>
          </div>
        )
      )}
    </div>
  );
};
export default Comment;