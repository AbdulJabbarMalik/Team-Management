"use client";

import React, { useState } from "react";
import { useRouter } from 'next/navigation'
import Swal from 'sweetalert2'


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword , signInWithEmailAndPassword } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlcCfpWctE_fFA8NHOTZFyDDjGpcNNRP8",
  authDomain: "management-system-90c0a.firebaseapp.com",
  projectId: "management-system-90c0a",
  storageBucket: "management-system-90c0a.appspot.com",
  messagingSenderId: "35767766078",
  appId: "1:35767766078:web:ef3c26b60ab59c0aa1556f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const Login = () => {
    const router = useRouter()
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [issignup , setIssignup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    {issignup === true ? (signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          Swal.fire({
            icon: "success",
            title: "Login successfull",
            // text: "Account doesn't exist!",
            // footer: '<a href="#">Sign Up first</a>'
          });
          router.push('/dashboard')
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
            footer: '<a href="#">Sign Up first</a>'
          });
        })):(createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(user, "User Cradentials");
          Swal.fire({
            icon: "success",
            title: "Sign Up successfull",
            // text: "Account doesn't exist!",
            // footer: '<a href="#">Sign Up first</a>'
          });
  
         setIssignup(true)
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorMessage,
  
          });
        }))}

    
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {issignup === true ? "Login" : "Sign Up " }  
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* <div className="flex items-center justify-between mb-4">
              <a href="#" className="text-sm text-purple-600 hover:underline">
                Forgot Password?
              </a>
            </div> */}

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 ease-in-out"
            >
             {issignup === true ? "Login" : "Sign Up" } 
            </button>
          </form>

          <p className="mt-4 text-sm text-center text-gray-600">
            {issignup === true ? "Don't have an account?" : "Already have a account?"}
            {" "}
            <a onClick={()=>setIssignup(!issignup)}  className="text-purple-600 hover:underline cursor-pointer">
                {issignup === true ? " Sign Up":"Login"}
             
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
