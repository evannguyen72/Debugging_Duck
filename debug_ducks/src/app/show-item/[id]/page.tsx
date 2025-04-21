'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';

interface ItemProps {
  item: {
    _id: string;
    title: string;
    description: string;
    url: string;
    likeCount: number;
    owner: string;
    likedBy?: string[];
  };
}

export default function ShowItemDetails() {
  const [item, setItem] = useState<ItemProps['item'] | null>(null);
  const [liked, setLiked] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchItemAndSession = async () => {
      try {
        const itemRes = await fetch(`/api/items/${id}`);
        const itemData = await itemRes.json();

        const sessionRes = await fetch("/api/auth/session");
        const sessionData = await sessionRes.json();
        const email = sessionData?.user?.email || null;

        setItem(itemData.item);
        setUserEmail(email);

        if (email && itemData.item.likedBy?.includes(email)) {
          setLiked(true);
        }
      } catch (err) {
        console.error("Failed to load item or session:", err);
      }
    };

    if (id) fetchItemAndSession();
  }, [id]);

  const onDeleteClick = async () => {
    try {
      const response = await fetch(`/api/items/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Network response was not ok');
      router.push('/show-items');
    } catch (error) {
      console.log('Error in ShowItemDetails_deleteClick', error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await fetch(`/api/items/${id}/like`, {
        method: 'POST',
      });

      if (!response.ok) return;

      const data = await response.json();
      setItem(data.item);
      setLiked(true);
    } catch (error) {
      console.error("Error liking item:", error);
    }
  };

  const isOwner = userEmail && item?.owner === userEmail;

  return (
    <div className="min-h-screen bg-teal-50 px-4 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md border border-teal-400 p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/show-items"
            className="inline-block text-teal-600 hover:underline text-sm"
          >
            ← Back to Item List
          </Link>
        </div>

        {/* Header */}
        <h1 className="text-3xl font-bold text-teal-700 text-center mb-2">
          Web Programming
        </h1>
        <p className="text-center text-gray-700 mb-6">
          Web programming is the process of designing and developing websites or web applications...
        </p>

        {/* Image */}
        {item?.url && (
          <div className="w-full h-72 relative mb-6 rounded-md overflow-hidden">
            <Image
              src={item.url}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* created by */}
        <div className="text-sm text-gray-600 mb-2">
          Created by: {isOwner ? 'You' : item?.owner || 'Unknown'}
        </div>

        {/* description box */}
        <div className="w-full p-4 border border-gray-300 rounded-md text-gray-800 whitespace-pre-wrap bg-gray-50">
          {item?.description}
        </div>

        {/* likes */}
        <div className="mt-4 flex items-center gap-4">
          <p className="text-sm text-gray-500">👍 {item?.likeCount ?? 0} Likes</p>
          <button 
            onClick={handleLike}
            disabled={liked}
            className={`text-sm px-3 py-1 rounded border transition ${
              liked
                ? "bg-green-200 text-green-700 border-green-400 cursor-not-allowed"
                : "text-blue-600 border-blue-600 hover:bg-blue-50"
            }`}
          >
            {liked ? "Liked" : "Like"}
          </button>
        </div>

        {/* action Buttons - Only for owner */}
        {isOwner && (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="button"
              onClick={onDeleteClick}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-full shadow-md w-full sm:w-auto"
            >
              Delete Document
            </button>

            <Link
              href={`/update-item/${id}`}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md text-center w-full sm:w-auto"
            >
              Edit Document
            </Link>
          </div>
        )}

        {/* date */}
        <div className="text-right text-sm text-gray-500 mt-4">
          Posted 4/3/25
        </div>
      </div>
    </div>
  );
}
