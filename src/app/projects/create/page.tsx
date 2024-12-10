"use client";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function CreateProject() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const createProject = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/projects", {
        name,
        description,
      });
      setName("");
      setDescription("");
      toast.success(response.data?.message);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.data?.error) toast.error(err.response?.data?.error);
        if (err.response?.data?.errors)
          toast.error(err.response?.data?.errors[0]);
      }
    }
  };

  return (
    <div className="w-full px-2 lg:px-0 lg:max-w-4xl py-4 mx-auto dark:text-black">
      <div className="flex flex-col bg-gradient-to-r from-orange-50 to-blue-50 rounded-lg px-8 py-4 border border-gray-500">
        <h1 className="mx-auto font-semibold text-4xl my-5 text-cyan-800">
          Create Project
        </h1>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="name" className="text-lg">
            Project name:
          </label>
          <input
            id="name"
            type="text"
            placeholder="name"
            className="px-4 py-3 rounded-md "
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4 flex flex-col gap-2">
          <label htmlFor="description" className="text-lg">
            Project description:
          </label>
          <textarea
            id="description"
            placeholder="description"
            className="px-4 py-3 rounded-md min-h-[100px] max-h-[200px] w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end gap-3 mt-4">
          <button
            onClick={() => {
              setName("");
              setDescription("");
            }}
            className="border border-cyan-800 text-cyan-800 px-6 py-3 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={createProject}
            className="bg-cyan-800 text-white px-6 py-3 rounded-md"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
