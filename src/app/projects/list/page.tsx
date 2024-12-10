"use client";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type TProject = {
  id: string;
  name: string;
  description: string;
};

export default function ProjectsList() {
  const [projects, setProjects] = useState<TProject[]>([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const token = localStorage.getItem("token");
  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/projects");
      setProjects(response.data);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        toast.error(err.response?.data?.error);
      }
    }
  };

  const deleteProject = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await axios.delete(
          "http://127.0.0.1:8000/api/projects/" + id
        );
        setProjects((prev) => {
          return prev.filter((project) => project.id !== id);
        });
        toast.success(response.data?.message);
      } catch (err) {
        if (err instanceof AxiosError) {
          console.log(err);
          if (err.response?.data?.error) toast.error(err.response?.data?.error);
          else if (err.response?.data?.errors)
            toast.error(err.response?.data?.errors[0]);
          else if (err.response?.data?.code === 401)
            toast.error("Login to update/delete project");
          else toast.error("Problem updating project");
        }
      }
    } else {
      return false;
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const updateProject = async () => {
    try {
      const response = await axios.put(
        "http://127.0.0.1:8000/api/projects/" + id,
        {
          name,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      setProjects((prev) => {
        return prev.map((project) => {
          if (project.id !== id) return project;
          else
            return {
              id,
              name,
              description,
            };
        });
      });
      toast.success(response.data?.message);
      setOpenDialog(false);
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log(err);
        if (err.response?.data?.error) toast.error(err.response?.data?.error);
        else if (err.response?.data?.errors)
          toast.error(err.response?.data?.errors[0]);
        else if (err.response?.data?.code === 401)
          toast.error("Login to update/delete project");
        else toast.error("Problem updating project");
      }
    }
  };

  return (
    <div className="w-full px-2 lg:px-0 lg:max-w-4xl py-4 mx-auto dark:text-black">
      <div className="flex flex-col bg-gradient-to-r from-lime-50 to-blue-50 rounded-lg px-8 py-4 border border-gray-500">
        <h1 className="mx-auto font-semibold text-4xl my-5 text-cyan-800">
          Projects List
        </h1>
        <div className="w-full mb-4 border-b-0 border border-cyan-800 rounded-md text-lg overflow-x-auto">
          <div className="flex w-full border-b border-cyan-800">
            <div className="w-[10%] shrink-0 px-3 py-2 font-semibold">Id</div>
            <div className="w-[20%] shrink-0 px-3 py-2 font-semibold">Name</div>
            <div className="w-[40%] shrink-0 px-3 py-2 font-semibold">
              Description
            </div>
            <div className="w-[15%] shrink-0 px-3 py-2 font-semibold">
              Update
            </div>
            <div className="w-[15%] shrink-0 px-3 py-2 font-semibold">
              Delete
            </div>
          </div>
          {projects.map((project, index) => {
            return (
              <div
                key={index}
                className="flex w-full rounded-md border-b border-cyan-800"
              >
                <div className="w-[10%] shrink-0 px-3 py-2">{project.id}</div>
                <div className="w-[20%] shrink-0 px-3 py-2">{project.name}</div>
                <div className="w-[40%] shrink-0 px-3 py-2">
                  {project.description}
                </div>
                <div className="w-[15%] shrink-0 px-3 py-2">
                  <button
                    onClick={() => {
                      setOpenDialog(true);
                      setId(project.id);
                      setName(project.name);
                      setDescription(project.description);
                    }}
                    className="text-cyan-800"
                  >
                    Update
                  </button>
                </div>
                <div className="w-[15%] shrink-0 px-3 py-2">
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="sm:max-w-[425px] bg-gradient-to-r from-orange-50 to-blue-50 dark:text-black">
          <DialogHeader>
            <DialogTitle className="text-2xl">Update Project</DialogTitle>
            <DialogDescription>
              Make changes to your project here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="name" className="">
                Project name:
              </label>
              <input
                id="name"
                type="text"
                placeholder="name"
                className="px-4 py-3 rounded-md border"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4 flex flex-col gap-2">
              <label htmlFor="description" className="">
                Project description:
              </label>
              <textarea
                id="description"
                placeholder="description"
                className="px-4 py-3 border rounded-md min-h-[100px] max-h-[200px] w-full"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <button
              onClick={updateProject}
              className="bg-cyan-800 text-white px-6 py-3 rounded-md"
            >
              Save
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
