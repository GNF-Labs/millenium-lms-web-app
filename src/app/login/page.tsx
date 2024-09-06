"use client";

import NavigationBar from "@/components/navbar/navigation-bar";
import { navigationRoute } from "../constants";
import React, { useReducer } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { initialState, reducer } from "./reducer";
import { handleLogin, handleRegister } from "@/services/handlers";
import { useAppDispatch } from "@/redux/hooks";
import { saveToken } from "@/redux/slices/tokenSlice";

/**
 * Login Screen
 * @returns
 */
export default function Login() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const tokenDispatch = useAppDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = new FormData;
    form.append("username", state.username);
    form.append("password", state.password);

    // try to login
    const {status, data} = await handleLogin(form);

    if (status !== 200) {
      console.error(`${status}: ${data}`);
      dispatch({type: 'SET_ERROR', payload: data?.error || "Error tidak terduga"});
      return;
    }
    
    // set the token and username
    tokenDispatch(saveToken({username: data.username, token:data.token, user_id: data.user_id}))

    router.push("/dashboard");
    console.log(state);
  }
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {dispatch({type: 'SET_USERNAME', payload: e.target.value})};
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {dispatch({type: 'SET_PASSWORD', payload: e.target.value})};
  const handleShowPasswordChange = () => {dispatch({type: 'TOGGLE_SHOW_PASSWORD'})};
  const handleAccountclick = () => {router.push('/register')};

  return (
    <>
      <title>
        Login
      </title>
      <NavigationBar logo={{source:"images/logo_GNF.png", width: 90, height: 90}} navigationMenu={navigationRoute} />
      <main className="flex h-screen flex-col p-4">
        <div className="parallax-bg" />
        <div className="h-6" />
        <div className="backdrop-blur-xl bg-white/60 p-8 rounded-3xl shadow-md max-w-sm w-full mx-auto mt-10">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-6">
                <h2 className="text-2xl font-bold text-center">
                    Login
                </h2>
                <input
                    className="pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                    type="text"
                    id="username"
                    name="username"
                    placeholder="Username"
                    value = {state.username}
                    onChange={handleUsernameChange}
                    required
                />
                <div className="relative">
                    <input
                        type={state.showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        placeholder="Password"
                        value = {state.password}
                        onChange={handlePasswordChange}
                        required
                        className="mt-1 pb-0.5 w-full bg-transparent placeholder-gray-600 border-b-2 border-gray-500/70 focus:outline-none focus:border-gray-800"
                    />
                    <div
                        onClick={handleShowPasswordChange}
                        className="absolute right-2 top-2 cursor-pointer text-gray-500"
                    >
                    {state.showPassword ? <FaEye /> : <FaEyeSlash />}
                    </div>
                </div>
                { state.error? 
                <div className="text-red-500 bg-red-500/25 text-center place-content-center text-xs p-1 border-2 border-red-600/25">
                  {state.error}
                </div> 
                : null}
                
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Login
                </button>
                <p className="text-center text-gray-600 text-sm">
                  Belum punya akun? {' '}
                  <span
                      onClick={handleAccountclick}
                      className="font-extrabold hover:underline cursor-pointer"
                  >
                      Register
                  </span>
                </p>
            </div>
          </form>
        </div>
      </main>
    </>

  );
}

