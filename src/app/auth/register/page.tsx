"use client";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const register = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        email,
        password,
      });
      //   setEmail("");
      //   setPassword("");
      console.log(response.data);
      localStorage.setItem("token", response.data.token);
      toast.success("Registered successfully");
      router.push("/auth/login");
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.data?.error) toast.error(err.response?.data?.error);
        else if (err.response?.data?.errors)
          toast.error(err.response?.data?.errors[0]);
        else if (err.response?.data?.message)
          toast.error(err.response.data?.message);
        else toast.error("Problem registering");
      } else {
        toast.error("Problem registering");
      }
    }
  };

  return (
    <div className="w-full px-2 lg:px-0 lg:max-w-4xl py-4 mx-auto dark:text-black">
      <div className="flex flex-col bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg px-8 py-4 border border-gray-500">
        <h1 className="mx-auto font-semibold text-4xl my-5 text-cyan-800">
          Register
        </h1>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="email" className="text-lg">
            Email:
          </label>
          <input
            id="email"
            type="email"
            placeholder="name"
            className="px-4 py-3 rounded-md "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="password" className="text-lg">
            Password:
          </label>
          <input
            id="password"
            type="password"
            placeholder="description"
            className="px-4 py-3 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end gap-3 mt-4">
          <button
            onClick={register}
            className="bg-cyan-800 text-white px-6 py-3 rounded-md"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
}
