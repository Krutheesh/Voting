import React, { useEffect, useReducer, useRef, useState } from "react";
import {
  addNewCandidate,
  getAllCandidates,
} from "../../features/candidates/candidatesApi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Load from "../../pages/Load";
import toast, { Toaster } from "react-hot-toast";
import { checkAuth } from "../../features/authentication/authApi";
import { constituencyData } from "../../features/constants/Constants";
const AddCandidate = () => {
  const [avatar, setAvatar] = useState(null);
  const name = useRef(null);
  const party = useRef(null);

  const [selectedState, setSelectedState] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState("");
  const { loading } = useSelector((store) => store.candidates);

  const dispatch = useDispatch();
  const formHandler = (e) => {
    e.preventDefault();
    if (
      !(
        name &&
        party &&
        selectedState &&
        selectedConstituency &&
        history &&
        avatar
      )
    ) {
      toast.error("Please enter all required fields.");
      return;
    }

    const formData = {
      name: name.current.value,

      party: party.current.value,
      state: selectedState,
      constituency: selectedConstituency,
      avatar: avatar,
    };

    console.log(formData);

    dispatch(addNewCandidate(formData));
  };

  const fileHandler = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleStateChange = (event) => {
    const newState = event.target.value;
    setSelectedState(newState);
    // Optionally, reset the selected constituency when the state changes
    setSelectedConstituency("");
  };
 

  const handleConstituencyChange = (event) => {
    const newConstituency = event.target.value;
    setSelectedConstituency(newConstituency);
    // Make API calls or perform other actions based on the selected state and constituency
  };
  //  useEffect(() => {
  //   dispatch(checkAuth())
  // },[dispatch])
  return (
    <div className="flex justify-center items-center h-full bg-[#151028]">
      <form
        onSubmit={formHandler}
        action=""
        className="bg-gray-200 p-10 w-[90%] md:w-[60%]  flex flex-col space-y-3"
      >
        <input
          className="p-2 rounded-md outline-none"
          ref={name}
          type="text"
          placeholder="Name"
          required
        />
        <input
          className="p-2 rounded-md outline-none"
          ref={party}
          type="text"
          placeholder="Party"
          required
        />
        <select
          id="stateSelect"
          className="  p-2  w-full outline-none rounded-md "
          onChange={handleStateChange}
          value={selectedState}
        >
          {/* Populate options dynamically */}
          <option value="" disabled>
            Select State
          </option>
          {Object.keys(constituencyData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {selectedState && (
          <div className="">
            <select
              id="constituencySelect"
              className="w-full  p-2   outline-none rounded-md  "
              onChange={handleConstituencyChange}
              value={selectedConstituency}
            >
              <option value="" disabled>
                Select Constituency
              </option>
              {/* Populate constituency options based on selectedState */}
              {constituencyData[selectedState].map((constituency) => (
                <option key={constituency} value={constituency}>
                  {constituency}
                </option>
              ))}
            </select>
          </div>
        )}
        <label for="fileInput">Upload a file (max 1 MB)</label>
        <input
          className="p-2 rounded-md"
          onChange={fileHandler}
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
        />
        <button className="p-2 rounded-md bg-sky-700 text-white" type="submit">
          Add
        </button>
      </form>

      <Toaster />
    </div>
  );
};

export default AddCandidate;
