import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import {
  delCandidate,
  getAllCandidates,
} from "../features/candidates/candidatesApi";
import { checkAuth, voteCandidate } from "../features/authentication/authApi";
import Edit from "./Edit";
import Load from "./Load";
import { setIsVoted } from "../features/authentication/authSlice";
const Home = () => {
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(null);
  const { totalCandidates } = useSelector((store) => store.candidates);
  const { userInfo,isLoading,isVoted} = useSelector((store) => store.auth);
  const { loading } = useSelector((store) => store.candidates);
  useEffect(() => {
    console.log("hello")
    dispatch(getAllCandidates());
  }, [dispatch]);
  // console.log(totalCandidates)
  let allCandidates = totalCandidates?.slice();
  if (allCandidates) {
    allCandidates?.sort((a, b) => a._id.localeCompare(b._id));

    for (let i = 0; i < allCandidates?.length; i++) {
      if (allCandidates[i]._id === userInfo?.constituency) {
        let t = allCandidates[i];
        allCandidates[i] = allCandidates[0];
        allCandidates[0] = t;
      }
    }
  }
  const voteHandler = (candidate) => {
    console.log( candidate);
    if (candidate.constituency === userInfo.constituency) {
      console.log(userInfo?.votedCandidateId, candidate._id);
      if (userInfo?.votedCandidateId === candidate._id) {
        return;
      }
      console.log("ma");
      const info = {
        email: userInfo.email,
        candidate,
      };
      dispatch(voteCandidate(info));
      
      
    }
  };
  
  if(isVoted){
    console.log('isvoted')
    dispatch(getAllCandidates());
    dispatch(checkAuth());
    dispatch(setIsVoted())
  }

  const delHandler = (candidate) => {
    dispatch(delCandidate({ candidate, email: userInfo.email }));
    setTimeout(() => {
      dispatch(getAllCandidates());
      dispatch(checkAuth());
    }, 1000);
  };
  
  return (
    <div className="py-10 bg-[#151028] ">
      {
        (isLoading)? 
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
     
      <div className="bg-[#00e6e6] p-5 rounded-full opacity-50">
      <Load/>

      </div>
       
 
 </div>:  <div>
        {allCandidates &&
          allCandidates.map((ele) => (
            <div
              key={ele._id}
             
            >
              <h1 className=" text-[2rem] font-bold text-center px-3 pt-3   bg-gradient-to-r from-[#6027fb] to-red-600 text-transparent bg-clip-text">{ele._id}</h1>
              <div  className=" flex md:flex-row flex-col  items-center justify-center  m-3 p-3  rounded-lg">
              {ele.candidates.map((candidate) => (
                <div
                  key={candidate._id}
                  className="text-center flex flex-col justify-center items-center  mx-3   "
                >
                  <div className={`rounded p-5 m-2 bg-[#221b46]  ${userInfo?.votedCandidateId === candidate._id?"border-[4px] shadow-md":"border"}  border-[#6027fb] text-white`} >
                    <div className={`flex  justify-center mx-auto my-3 items-center w-[15rem] h-[15rem] rounded-full   ${candidate.party.toUpperCase()=="BJP"? "bjp-color-radial" :candidate.party.toUpperCase()=="CONGRESS"?"congress-color-radial":candidate.party.toUpperCase()=="BRS"?"brs-color-radial":"mis-color-radial "} `}>
                      <img
                        src={candidate.avatar.url}
                        alt=""
                        className="  h-[10rem] w-[10rem]   rounded-full"
                      />
                    </div>
  
                    <h1 className="font-semibold text-[1.2rem] text-sky-500">{candidate.name}</h1>
                    <h2 className="font-semibold text-[#00e6e6]  text-[1.6rem]">Votes : {candidate.votes}</h2>
                    <h2 className="">{candidate.party}</h2>
                    <h2>{candidate.constituency}</h2>
                    {/* <h2 className="w-[70%] mx-auto">{candidate.history}</h2> */}
                    <div>
                      {userInfo ? (
                        <></>
                      ) : (
                        <button className="rounded-md text-white py-2 px-4 m-2 bg-gradient-to-r from-[#6027fb] to-[#924cf5]">
                          <Link to="/login">Vote</Link>{" "}
                        </button>
                      )}
                      {userInfo?.constituency === candidate?.constituency ? (
                        <button
                          onClick={() => voteHandler(candidate)}
                          className="rounded-md p-2 m-2 bg-gradient-to-r from-[#6027fb] to-[#924cf5]"
                        >
                          Vote
                        </button>
                      ) : (
                        <></>
                      )}
                    </div>
                    {userInfo?.role === "admin" ? (
                      <div className="flex justify-center s">
                        <button
                          className="p-2 m-3 text-white rounded bg-gradient-to-r from-[#6027fb] to-[#0df815]"
                          onClick={() => setEdit({ candidate })}
                        >
                          Edit
                        </button>
                        <button
                          className="p-2 m-3 text-white rounded bg-gradient-to-r from-[#6027fb] to-red-600"
                          onClick={() => delHandler(candidate)}
                        >
                          Delete
                        </button>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              ))}
              </div>
             
            </div>
          ))}
  
        <Toaster />
        {edit && (
          <>
            <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 backdrop-blur-md">
              {/* Parent container */}
              <button
                className="absolute text-[2rem] top-2 right-2 px-3 text-white hover:text-gray-700"
                onClick={() => {
                  setEdit(null);
                }}
              >
                ✕
              </button>
  
              <Edit candidate={edit.candidate} />
            </div>
          </>
        )}
        </div>
      }
      
    
    </div>
  );
};

export default Home;
