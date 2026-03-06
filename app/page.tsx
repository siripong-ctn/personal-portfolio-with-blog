"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));

      const data: any[] = [];

      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      setPosts(data);
    };

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex justify-center">
      <main className="w-full max-w-3xl px-6 py-16">

        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={40}
            height={40}
            className="invert"
          />

          <div>
            <h1 className="text-3xl font-bold">Personal Portfolio with Blog</h1>
            <p className="text-zinc-400 text-sm">
              Create a personal portfolio website with 
              an integrated blog where users can add, edit, and delete posts.
              This is an excellent project for learning the basics of frontend
              and backend development and gaining foundational experience in React and Next.js.
              <br></br>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                <a href="#">Go create</a>
              </button>
            </p>
          </div>
        </div>

        {/* Posts */}
        <div className="space-y-6">

          {posts.length === 0 && (
            <p className="text-zinc-500">No posts found</p>
          )}

          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-zinc-600 transition"
            >
              <h2 className="text-xl font-semibold mb-2">
                {post.title || "Untitled"}
              </h2>

              <p className="text-zinc-300 mb-2">
                {post.content}
              </p>

              <p className="text-zinc-400 text-xs">
                Upload on {post.date?.toDate().toLocaleString()}
              </p>

              {post.author && (
                <p className="text-xs text-zinc-500">
                  by {post.author}
                </p>
              )}
            </div>
          ))}

        </div>

      </main>
    </div>
  );
}