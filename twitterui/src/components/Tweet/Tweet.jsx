// // import axios from 'axios';
// // import { formatDistance } from 'date-fns/esm';
// // import React, { useEffect, useState } from 'react'
// // import { useSelector } from "react-redux";
// // import { Link, useLocation, useParams } from 'react-router-dom';
// // const Tweet = ({ tweet, setData,onDelete }) => {

// //     const { currentUser } = useSelector((state) => state.user);

// //     const [userData, setUserData] = useState();
  
// //     const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
// //     const location = useLocation().pathname;
// //     const { id } = useParams();
  
// //     console.log(location);
// //     useEffect(() => {
// //       const fetchData = async () => {
// //         try {
// //           const findUser = await axios.get(`http://localhost:8000/api/users/find/${tweet.userId}`);
  
// //           setUserData(findUser.data);
// //         } catch (err) {
// //           console.log("error", err);
// //         }
// //       };
  
// //   fetchData();
// // }, [tweet.userId, tweet.likes]);


// // const handleDelete = async () => {
// //   try {
// //     await axios.delete(`http://localhost:8000/api/tweets/${tweet._id}`);
// //     onDelete(tweet._id);
// //   } catch (err) {
// //     console.log('Error:', err);
// //   }
// // };
  

// //   return (
// //     <div>
// //       {userData && (
// //         <>
// //           <div className="flex space-x-2">
// //             {/* <img src="" alt="" /> */}
// //             <Link to={`/profile/${userData._id}`}>
// //               <h3 className="font-bold">{userData.username}</h3>
// //             </Link>

// //             <span className="font-normal">@{userData.username}</span>
// //             <p> - {dateStr}</p>
// //           </div>

// //           <p>{tweet.description}</p>
// //           {/* <button onClick={handleLike}>
// //             {tweet.likes.includes(currentUser._id) ? (
// //               <FavoriteIcon className="mr-2 my-2 cursor-pointer"></FavoriteIcon>
// //             ) : (
// //               <FavoriteBorderIcon className="mr-2 my-2 cursor-pointer"></FavoriteBorderIcon>
// //             )}
// //             {tweet.likes.length}
// //           </button> */}
// //           <p>{tweet.content}</p>
// //           <p>{tweet.content}</p>

// //       {onDelete && (
// //         <button className="delete-button" onClick={handleDelete}>
// //           Delete
// //         </button>
// //       )}
          
      
      
// //         </>
// //       )}
      
// //     </div>
// //   )
// // }

// // export default Tweet

// import axios from 'axios';
// import { formatDistance } from 'date-fns/esm';
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import { Link, useLocation, useParams } from 'react-router-dom';

// const Tweet = ({ tweet, setData, onDelete }) => {
  
//   const { currentUser } = useSelector((state) => state.user);
//   const [userTweets, setUserTweets] = useState([]);
//   const [userData, setUserData] = useState();

//   const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
//   const location = useLocation().pathname;
//   const { id } = useParams();

//   console.log(location);
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const findUser = await axios.get(`http://localhost:8000/api/users/find/${tweet.userId}`);

//         setUserData(findUser.data);
//       } catch (err) {
//         console.log('Error:', err);
//       }
//     };

//     fetchData();
//   }, [tweet.userId, tweet.likes]);

//   // const handleDelete = async () => {
//   //   try {
//   //     await axios.delete(`http://localhost:8000/api/tweets/${tweet._id}`);
//   //     onDelete(tweet._id);
//   //   } catch (err) {
//   //     console.log('Error:', err);
//   //   }
//   // };
//   const handleDeleteTweet = async (tweetId) => {
//     try {
//       const access_token = localStorage.getItem("access_token");
//       await axios.delete(`http://localhost:8000/api/tweets/${tweetId}`, {
//         headers: {
//           Authorization: `Bearer ${access_token}`,
//         },
//       });
  
//       setUserTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
//     } catch (err) {
//       console.log('Error:', err);
//     }
//   };

//   return (
//     <div>
//       {userData && (
//         <>
//           <div className="flex space-x-2">
//             <Link to={`/profile/${userData._id}`}>
//               <h3 className="font-bold">{userData.username}</h3>
//             </Link>
//             <span className="font-normal">@{userData.username}</span>
//             <p> - {dateStr}</p>
//           </div>

//           <p>{tweet.description}</p>
//           <p>{tweet.content}</p>

//           {/* {onDelete && (
//             <button className="delete-button" onClick={handleDelete}>
//               Delete
//             </button>
//           )} */}
          
//           {currentUser._id === tweet.userId && (
//   <button className="delete-button" onClick={handleDeleteTweet}>
//     Delete
//   </button>
// )}

//         </>
//       )}
//     </div>
//   );
// };

// export default Tweet;

import axios from 'axios';
import { formatDistance } from 'date-fns/esm';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';

const Tweet = ({ tweet, setData, onDelete }) => {
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState();
  const dateStr = formatDistance(new Date(tweet.createdAt), new Date());
  const location = useLocation().pathname;
  const { id } = useParams();

  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(`http://localhost:8000/api/users/find/${tweet.userId}`);
        setUserData(findUser.data);
      } catch (err) {
        console.log('Error:', err);
      }
    };

    fetchData();
  }, [tweet.userId, tweet.likes]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/tweets/${tweet._id}`);
      onDelete(tweet._id);
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <div>
      {userData && (
        <>
          <div className="flex space-x-2">
            <Link to={`/profile/${userData._id}`}>
              <h3 className="font-bold">{userData.username}</h3>
            </Link>
            <span className="font-normal">@{userData.username}</span>
            <p> - {dateStr}</p>
          </div>

          <p>{tweet.description}</p>
          <p>{tweet.content}</p>

          {onDelete && (
            <button className="delete-button" onClick={handleDelete}>
              Delete
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default Tweet;
