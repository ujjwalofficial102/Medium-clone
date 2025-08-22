import type { SignupInput } from "@ujjwalmishra102/medium-common";
import { useState, type ChangeEvent } from "react";
import { Link } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });
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
