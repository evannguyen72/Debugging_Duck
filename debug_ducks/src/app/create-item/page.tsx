'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/Card';

export default function ItemAddForm() {
  const [formData, setFormData] = useState({
    owner: 0,
    title: '',
    description: '',
    url: '',
    likeCount: 0,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'owner' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      setFormData({ owner: 0, title: '', description: '', url: '', likeCount: 0 });
      router.push('/show-items');
    } catch (error) {
      console.error('Error in CreateItem!', error);
    }
  };

  return (
    <div className="min-h-screen bg-teal-50 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md border border-teal-400 p-8">
        <h2 className="text-3xl font-bold text-teal-700 mb-6 text-center">
          Upload New Document
        </h2>
  
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Owner ID */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Owner ID
            </label>
            <input
              name="owner"
              type="number"
              value={formData.owner}
              onChange={handleChange}
              placeholder="Type Owner ID Here"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          {/* Course Name (Title) */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Course Name
            </label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              placeholder="Type Course Name Here"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          {/* Document (Description) */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Document
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Upload Document Here"
              required
              className="w-full p-3 h-70 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          {/* Image URL */}
          <div>
            <label className="block text-lg font-semibold mb-1">
              Image URL
            </label>
            <input
              name="url"
              type="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Paste Image URL Here"
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
  
          {/* Submit */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
