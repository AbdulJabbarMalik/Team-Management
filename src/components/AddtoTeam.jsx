"use client"

import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import Swal from 'sweetalert2';
import { useState } from "react";
import { initializeApp } from "firebase/app";
import { query, where, getDocs,getFirestore,collection, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useRouter } from 'next/navigation';




const AddtoTeam = () => {
  
    const [role ,setRole] = useState(null);
    const [team , setTeam] = useState(null)
    console.log(role , "Role")
    console.log(team , "Team")
    
    
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
    
    const auth = getAuth();
    const user = auth.currentUser;
  const router = useRouter();
    
    const userdetails = async () => {
      if (user) {
        // Query Firestore to check if user already exists in the specified team
        const q = query(
          collection(db, "Users"),
          where("email", "==", user.email),
          where("team", "==", team)
        );
  
        const querySnapshot = await getDocs(q);
  
        if (!querySnapshot.empty) {
          // User is already in the team
          Swal.fire({
            icon: "warning",
            title: "Duplicate Entry",
            text: "You are already in this team!",
          });
        } else {
          // Add the user to the team
          await addDoc(collection(db, "Users"), {
            email: user.email,
            role: role,
            team: team,
          });
          Swal.fire({
            icon: "success",
            title: "Added to Team",
            text: "You have been successfully added to the team!",
          })
        }
      }
    };


    

  return <>
  <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Add To Team</CardTitle>
        <CardDescription>Add members to team</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Role</Label>
              <Input id="name" placeholder="role of the user" onChange={(e)=>{setRole(e.target.value)}} value={role} />
             
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Team">Team</Label>
              <Select onValueChange={(e)=>{setTeam(e)}}>
                <SelectTrigger id="Team">
                  <SelectValue placeholder="Select"  value={team}/>
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="Sales Team">Sales Team</SelectItem>
                  <SelectItem value="Development Team">Development Team</SelectItem>
                  <SelectItem value="Shipment Team">Shipment Team</SelectItem>
                  <SelectItem value="nuxt">other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" className='text-white bg-transparent'>Cancel</Button>
        <Button className='bg-slate-50 text-black' onClick={()=>{userdetails()}}>Deploy</Button>
      </CardFooter>
    </Card>
  </>;
};

export default AddtoTeam;
