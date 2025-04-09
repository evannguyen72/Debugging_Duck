'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useParams } from 'next/navigation';
import Card from '../../../components/Card';

interface ItemProps {
  item: {
    _id: number;
    title: string;
    description: string;
    url: string;
    likeCount: number;
  };
}

export default function ShowItemDetails() {
  const [item, setItem] = useState<ItemProps['item'] | null>(null);
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setItem(data.item);
      } catch (error) {
        console.log('Error from ShowItemDetails', error);
      }
    };

    if (id) fetchItem();
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

  return (
    <div className="bg-gray-50 min-h-screen text-black py-10">
      <div className="max-w-5xl mx-auto px-4">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            href="/show-items"
            className="inline-block px-4 py-2 border border-teal-500 text-teal-600 hover:bg-teal-600 hover:text-white transition rounded-md"
          >
            ⬅ Back to Item List
          </Link>
        </div>
  
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-teal-700 mb-2">Web Programming</h1>
          <p className="text-lg text-gray-700">View Item's Info</p>
          <hr className="my-4 border-gray-300" />
        </div>
  
        {/* Item Display */}
        {item && (
          <Card className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
            {/* Image */}
            <div className="w-full h-72 relative rounded-lg overflow-hidden">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
  
            {/* Item Info */}
            <div className="mt-6 space-y-2 text-center">
              <h2 className="text-2xl font-semibold text-teal-700">{item.title}</h2>
              <p className="text-gray-700">{item.description}</p>
              {/*<p className="text-gray-500">👍 {item.likeCount} Likes</p> ---------------------------------------------------- add this back later when we have likeCounter*/}
            </div>
  
            {/* Action Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <button
                type="button"
                onClick={onDeleteClick}
                className="w-full px-6 py-2 border border-red-500 text-red-600 hover:bg-red-600 hover:text-white transition rounded-md"
              >
                Delete Item
              </button>
  
              <Link
                href={`/update-item/${id}`}
                className="w-full px-6 py-2 border border-teal-500 text-teal-600 hover:bg-teal-600 hover:text-white transition rounded-md text-center"
              >
                Edit Item
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
