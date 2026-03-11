"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useRouter, useParams } from "next/navigation";

export default function EditPost() {

  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [about1, setAbout1] = useState("");
  const [about2, setAbout2] = useState("");

  useEffect(() => {

    if (!id) return;

    const fetchPost = async () => {

      const docRef = doc(db, "posts", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {

        const data: any = docSnap.data();

        setTitle(data.title || "");
        setContent(data.content || "");
        setImage(data.image || "");
        setAbout1(data.about1 || "");
        setAbout2(data.about2 || "");

      }

    };

    fetchPost();

  }, [id]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    try {

      await updateDoc(doc(db, "posts", id), {
        title,
        content,
        image,
        about1,
        about2
      });

      router.push("/");

    } catch (err) {
      console.error(err);
    }

  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex justify-center">
      <main className="w-full max-w-2xl p-10">

        <h1 className="text-2xl font-bold mb-6">
          Edit Post Blog
        </h1>

        <form onSubmit={handleUpdate} className="space-y-4">

          <input
            type="text"
            className="w-full p-2 bg-zinc-800 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />

          <textarea
            className="w-full h-100 p-2 bg-zinc-800 rounded"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Content"
          />

          {image && (
            <img
              src={image}
              className="w-full mb-4 rounded"
              alt="Preview"
            />
          )}

          <input
            type="text"
            className="w-full p-2 bg-zinc-800 rounded"
            value={image}
            required
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image URL"
          />

          <input
            type="text"
            className="w-full p-2 bg-zinc-800 rounded"
            value={about1}
            onChange={(e) => setAbout1(e.target.value)}
            placeholder="Reference link 1"
          />

          <input
            type="text"
            className="w-full p-2 bg-zinc-800 rounded"
            value={about2}
            onChange={(e) => setAbout2(e.target.value)}
            placeholder="Reference link 2"
          />

          <button
            className="bg-yellow-500 cursor-pointer hover:bg-yellow-700 px-4 py-2 rounded font-bold text-black"
          >
            Edit Post
          </button>

        </form>

      </main>
    </div>
  );
}