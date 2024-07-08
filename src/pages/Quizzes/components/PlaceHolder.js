
import React from 'react';

// import useGlobalContextProvider from '../ContextApi';
import { useNavigate } from 'react-router-dom';
function PlaceHolder(props) {
  // const { userObject } = useGlobalContextProvider();
  // const { user, setUser } = userObject;
   const navigate = useNavigate();
  return (
    <div className="poppins flex-col gap-3   p-4 flex justify-center items-center  ">
      <img src="/emptyBox.png" alt="" width={130} height={130} />
      <h2 className="text-2xl font-bold">Quizzes await! Make one.</h2>
      <span className="text-[13px] font-light">
        Click below to begin your journey here...
      </span>
      <button
         onClick={() => {
           navigate('/add-quiz');
         }}
        className="p-3 px-4 text-white text-[12px] bg-green-700 rounded-md"
      >
        Create my first Quiz
      </button>
    </div>
  );
}

export default PlaceHolder;
