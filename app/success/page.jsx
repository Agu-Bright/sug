"use client";
import React, { useState } from "react";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import ConfettiExplosion from "react-confetti-explosion";
import "./success.css";
import { Box } from "@mui/material";
import { useRouter } from "next/navigation";

const page = () => {
  //   const navigate = useNavigate();
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const router = useRouter();

  //   const handleBacktoLogin = () => {
  //     auth.logout();
  //     navigate("/login");
  //   };
  return (
    <div className="success_container">
      <div className="flex sm:pb-0 pb-10 sm:top-0 top-20 relative  flex-col items-center max-h-fit gap-y-3 ">
        <div className="w-16 h-fit">
          <img src="./img/futo.jpeg" className="w-[100%] h-fit" alt="" />
        </div>
        <div className="flex flex-col justify-center">
          <h1 className="uppercase text-xl font-bold text-center font-sans">
            SUG ELECTION <br className="flex sm:hidden"></br>{" "}
          </h1>
        </div>
        <div className="size-48 mt-2 justify-center  flex relative">
          <div className="size-48 flex z-30 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[800ms]  animate-ease-out animate-fill-both  absolute items-center justify-center rounded-full bg-defaultPrimary/30"></div>
          <div className="size-36 z-40 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[600ms]   animate-ease-out animate-fill-both absolute flex items-center justify-center rounded-full bg-defaultPrimary/60"></div>
          <div className="size-24 z-50 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[300ms]  animate-ease-out animate-fill-both absolute flex items-center justify-center rounded-full bg-defaultPrimary">
            <DoneRoundedIcon sx={{ color: "white", width: 50, height: 50 }} />
          </div>
          {displayConfetti && (
            <div className="relative mt-32">
              <ConfettiExplosion
                duration={3000}
                height={700}
                width={1200}
                onComplete={() => setDisplayConfetti(false)}
              />
            </div>
          )}
        </div>
        <div className="px-10 flex justify-center pb-2 border-b border-defaultPrimary">
          <span className="text-gray-900 text-lg font-semibold">
            Voting Successful!
          </span>
        </div>
        <div className="flex gap-y-1 flex-col items-center">
          <p className="text-defaultPrimary leading-none text-4xl font-bold">
            5
          </p>
          <span className="text-xs font-medium text-defaultPrimary">
            Candidates voted
          </span>
        </div>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <button
            className="next_button"
            onClick={() => router.push("/candidates")}
          >
            Back to Login
          </button>
        </Box>
      </div>
    </div>
  );
};

export default page;

// const Success = ({ candidatesVoted }) => {
//   const auth = useAuth();
//   const navigate = useNavigate();
//   const [displayConfetti, setDisplayConfetti] = useState(true);

//   const handleBacktoLogin = () => {
//     auth.logout();
//     navigate("/login");
//   };
//   return (
//     <div className="w-full h-[100vh] flex flex-col overflow-y-scroll overflow-x-hidden justify-center  items-center px-1">
//       <div className="flex sm:pb-0 pb-10 sm:top-0 top-20 relative  flex-col items-center max-h-fit gap-y-3 ">
//         <div className="w-16 h-fit">
//           <img src={Futo_logo} className="w-[100%] h-fit" alt="" />
//         </div>
//         <div className="flex flex-col justify-center">
//           <h1 className="uppercase text-xl font-bold text-center font-sans">
//             SENATE REPRESENTATIVE <br className="flex sm:hidden"></br>{" "}
//             IN-COUNCIL
//           </h1>
//         </div>
//         <div className="size-48 mt-2 justify-center  flex relative">
//           <div className="size-48 flex z-30 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[800ms]  animate-ease-out animate-fill-both  absolute items-center justify-center rounded-full bg-defaultPrimary/30"></div>
//           <div className="size-36 z-40 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[600ms]   animate-ease-out animate-fill-both absolute flex items-center justify-center rounded-full bg-defaultPrimary/60"></div>
//           <div className="size-24 z-50 m-auto left-0 right-0 bottom-0 top-0 animate-jump-in animate-once animate-duration-[300ms]  animate-ease-out animate-fill-both absolute flex items-center justify-center rounded-full bg-defaultPrimary">
//             <DoneRoundedIcon sx={{ color: "white", width: 50, height: 50 }} />
//           </div>
//           {displayConfetti && (
//             <div className="relative mt-32">
//               <ConfettiExplosion
//                 duration={3000}
//                 height={700}
//                 width={1200}
//                 onComplete={() => setDisplayConfetti(false)}
//               />
//             </div>
//           )}
//         </div>
//         <div className="px-10 flex justify-center pb-2 border-b border-defaultPrimary">
//           <span className="text-gray-900 text-lg font-semibold">
//             Voting Successful!
//           </span>
//         </div>
//         <div className="flex gap-y-1 flex-col items-center">
//           <p className="text-defaultPrimary leading-none text-4xl font-bold">
//             {candidatesVoted.length}
//           </p>
//           <span className="text-xs font-medium text-defaultPrimary">
//             Candidates voted
//           </span>
//         </div>
//         <PrimaryButton
//           onClick={handleBacktoLogin}
//           styles={`xs:w-[20rem] hover:bg-defaultPrimary/90 w-[18rem] mt-2 flex items-center justify-center font-bold`}
//         >
//           <span>Back to login</span>
//         </PrimaryButton>
//       </div>
//     </div>
//   );
// };
