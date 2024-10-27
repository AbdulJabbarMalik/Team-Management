// import React from "react";

// const Teamcards = () => {
//   const data = [
//     {
//       title: "Sales Team",
//       totalmembers: 20,

//     },
//     {
//       title: "Development Team",
//       totalmembers: 20,

//     },
//     {
//       title: "Shipment Team",
//       totalmembers: 20,

//     },
//   ];
//   return (
//     <>
//       <div className="flex flex-row justify-around items-center w-full  p-2">
//         {data.map((item) => {
//           return (
//             <div className="teamcards cursor-pointer w-[300px] h-[250px]  bg-black shadow-lg shadow-black rounded-xl  p-2 flex flex-col justify-around items-center  ">
//               <h2 className="text-slate-300 font-medium text-xl">{item.title}</h2>
//               <p className="text-slate-300 font-thin text-base">Total Members : {item.totalmembers}</p>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };

// export default Teamcards;

"use client"

import React, { useEffect, useState } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { initializeApp } from "firebase/app";
const Teamcards = () => {
  const [teamCounts, setTeamCounts] = useState({
    "Sales Team": 0,
    "Development Team": 0,
    "Shipment Team": 0,
  });
  const firebaseConfig = {
    apiKey: "AIzaSyDlcCfpWctE_fFA8NHOTZFyDDjGpcNNRP8",
    authDomain: "management-system-90c0a.firebaseapp.com",
    projectId: "management-system-90c0a",
    storageBucket: "management-system-90c0a.appspot.com",
    messagingSenderId: "35767766078",
    appId: "1:35767766078:web:ef3c26b60ab59c0aa1556f",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  useEffect(() => {
    const fetchUserCounts = async () => {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const teamData = { "Sales Team": 0, "Development Team": 0, "Shipment Team": 0 };

      querySnapshot.forEach((doc) => {
        const user = doc.data();
        if (teamData[user.team] !== undefined) {
          teamData[user.team]++;
        }
      });

      setTeamCounts(teamData);
    };

    fetchUserCounts();
  }, []);

  const data = [
    {
      title: "Sales Team",
      totalmembers: teamCounts["Sales Team"],
    },
    {
      title: "Development Team",
      totalmembers: teamCounts["Development Team"],
    },
    {
      title: "Shipment Team",
      totalmembers: teamCounts["Shipment Team"],
    },
  ];

  return (
    <>
      <div className="flex flex-row justify-around items-center w-full p-2">
        {data.map((item, index) => (
          <div
            key={index}
            className="teamcards cursor-pointer w-[300px] h-[250px] bg-black shadow-lg shadow-black rounded-xl p-2 flex flex-col justify-around items-center"
          >
            <h2 className="text-slate-300 font-medium text-xl">{item.title}</h2>
            <p className="text-slate-300 font-thin text-base">
              Total Members: {item.totalmembers}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Teamcards;
