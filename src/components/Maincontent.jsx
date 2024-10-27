import React from "react";
import Teamcards from "./Teamcards";
import { SidebarTrigger } from "./ui/sidebar";
import AddtoTeam from "./AddtoTeam";
import TeamPage from "@/app/team/page";



const Maincontent = () => {
  return (
    <>
      <div className="w-[100%] h-[100%] bg-white rounded-[0.5rem] p-6">
        <SidebarTrigger/>
        <div>    
        <Teamcards />
        </div>
        <div>
        <TeamPage/>
        </div>

        <div>
            <AddtoTeam/>
        </div>

      </div>
    </>
  );
};

export default Maincontent;
