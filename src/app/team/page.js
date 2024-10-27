"use client";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const TeamPage = () => {
  const [users, setUsers] = useState([]);

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
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "Users"));
      const usersList = querySnapshot.docs.map((doc) => doc.data());
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of team members and their details.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[200px]">Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Team</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium text-white">
                {user.email}
              </TableCell>
              <TableCell className="font-medium text-white">
                {user.role}
              </TableCell>
              <TableCell className="font-medium text-white">
                {user.team}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TeamPage;
