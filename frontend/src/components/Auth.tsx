import {
  type SigninInput,
  type SignupInput,
} from "@ujjwalmishra102/medium-common";
import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";
import axios, { AxiosError } from "axios";

type AuthProps = { type: "signup" } | { type: "signin" };

export const Auth = ({ type }: AuthProps) => {
  const [postInputs, setPostInputs] = useState(
    type === "signup"
      ? ({ name: "", email: "", password: "" } as SignupInput)
      : ({ email: "", password: "" } as SigninInput)
  );
  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        postInputs
      );
      console.log(response.data);
      if (response?.data?.jwt) {
        const jwt = await response?.data?.jwt;
        localStorage.setItem("token", "Bearer " + jwt);
        navigate("/blogs");
      } else alert(response?.data.error);
    } catch (err) {
      // console.log(error);
      const error = err as AxiosError<{ error: string }>;
      if (error.response?.data?.error) {
        alert(error.response.data.error); // backend error
      } else {
        alert(error.message); // fallback generic error
      }
    }
  }

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        {/* {JSON.stringify(postInputs)} */}
        <div className="px-8">
          <h1 className="font-bold text-4xl text-center">
            {type === "signup" ? "Create an account" : "Login to an account"}
          </h1>
          <p className="text-center mt-2 text-gray-400 font-semibold">
            {type === "signup"
              ? "Already have an account? "
              : "Don't have an account? "}
            <Link
              to={type === "signup" ? "/signin" : "/signup"}
              className="underline pinter-cursor"
            >
              {type === "signup" ? "Login" : "Signup"}
            </Link>
          </p>
        </div>
        <div className="mt-8">
          {type === "signup" && (
            <LabeledInput
              name="name"
              label="Name"
              placeholder="Enter your name"
              onChange={(e) => {
                setPostInputs((c) => ({
                  ...c,
                  name: e.target.value,
                }));
              }}
            />
          )}
          <LabeledInput
            name="email"
            label="Email"
            placeholder="Enter your email"
            onChange={(e) => {
              setPostInputs((c) => ({
                ...c,
                email: e.target.value,
              }));
            }}
          />
          <LabeledInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            type="password"
            onChange={(e) => {
              setPostInputs({
                ...postInputs,
                password: e.target.value,
              });
            }}
          />
        </div>
        <button
          onClick={sendRequest}
          type="button"
          className="bg-black text-white mt-6 w-full py-2 rounded-md cursor-pointer"
        >
          {type === "signup" ? "Sign Up" : "Sign In"}
        </button>
      </div>
    </div>
  );
};

interface LabeledInputType {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

function LabeledInput({
  name,
  label,
  placeholder,
  type,
  onChange,
}: LabeledInputType) {
  return (
    <div>
      <div className="mt-4 flex flex-col">
        <label htmlFor={name} className="font-bold">
          {label}
        </label>
        <input
          type={type || "text"}
          id={name}
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          className="border-2 border-gray-200 rounded-sm px-3 py-1 mt-2 focus:border-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}
