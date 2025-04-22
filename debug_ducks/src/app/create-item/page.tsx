'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Card from '../../components/Card';

export default function ItemAddForm() {
  const [formData, setFormData] = useState({
    owner: '', 
    title: '',
    description: '',
    url: '',
    likeCount: 0,
  });

  const router = useRouter();

  // Fetch user email from session on mount
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await fetch('/api/auth/session');
        const data = await res.json();
        const email = data?.user?.email;

        if (email) {
          setFormData(prev => ({ ...prev, owner: email }));
        }
      } catch (error) {
        console.error('Error fetching session:', error);
      }
    };

    fetchSession();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
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

      setFormData({ owner: '', title: '', description: '', url: '', likeCount: 0 });
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
              disabled={!formData.owner} // disable if session hasn't loaded yet
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}