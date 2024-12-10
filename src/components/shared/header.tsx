"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [token, setToken] = useState<string | null>();
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  return (
    <header className="w-full bg-white shadow text-cyan-800 font-semibold">
      <div className="w-full lg:max-w-4xl mx-auto flex justify-between items-center px-2">
        <Link href={"/projects/list"}>
          <div
            style={{
              backgroundImage: `url(/esen-manouba.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="aspect-square cursor-pointer h-[88px] w-[150px] scale-75"
          ></div>
        </Link>
        <div className="flex gap-5">
          <Link href={"/projects/list"} className="hover:underline text-xl">
            Projects list
          </Link>
          <Link href={"/projects/create"} className="hover:underline text-xl">
            Create project
          </Link>
          {!token ? (
            <>
              <Link href={"/auth/login"} className="hover:underline text-xl">
                Login
              </Link>{" "}
              <Link href={"/auth/register"} className="hover:underline text-xl">
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                localStorage.removeItem("token");
                setToken("");
              }}
              className="hover:underline text-xl text-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
