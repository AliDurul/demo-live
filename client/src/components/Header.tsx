import React from "react";

//* 1. way to give type to props
// export default function Header({ title }: { title: string }) {

//* 2. way to give type to props
interface HeaderProps {
  title: string;
  a?: string; // optional prop
  b?: number; // optional prop
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="text-center space-y-2">
      <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-linear-to-r from-indigo-600 to-violet-600 drop-shadow-sm">
        {title}
      </h1>
      <p className="text-slate-500 font-medium">Manage your tasks with style and ease.</p>
    </header>
  );
}
