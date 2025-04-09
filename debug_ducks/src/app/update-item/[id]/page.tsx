'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Card from '../../../components/Card';


export default function UpdateItem() {
    const [item, setItem] = useState ({
      owner: 0,
      title: '',
      description: '',
      url: '',
      likeCount: 0,
    });

    const router = useRouter();
    const params = useParams();
    const id = params?.id as string;

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await fetch(`/api/items/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const itemData = data.item; 
        setItem({
            owner: itemData.owner || 0,
            title: itemData.title || '',
            description: itemData.description || '',
            url: itemData.url || '',
            likeCount: itemData.likeCount || 0,
          });
        } catch (error) {
          console.error('Error from UpdateItemInfo:', error);
        }
    };

    if (id) {
      fetchItem();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    // Create a new object from the existing item (prev) with the update to the field 
    // that changed.  If the owner field changed, convert the string input to a number.
    setItem(prev => ({
      ...prev,
      [name]: name === 'owner' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await fetch(`/api/items/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(item),
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        router.push(`/show-item/${id}`);
      } catch (error) {
        console.log('Error in UpdateItemInfo!', error);
      }
    };

    return (
      <div className="min-h-screen bg-teal-50 py-10 px-4 py-12 px-4 text-black">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-teal-800 mb-6">Edit Item</h2>
    
          <Card className="rounded-2xl p-8 shadow-lg bg-white bg-opacity-90">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                name="owner"
                type="number"
                value={item.owner}
                onChange={handleChange}
                placeholder="Owner ID"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                name="title"
                type="text"
                value={item.title}
                onChange={handleChange}
                placeholder="Title"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <textarea
                name="description"
                value={item.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="w-full p-3 h-40 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                name="url"
                type="url"
                value={item.url}
                onChange={handleChange}
                placeholder="Image URL"
                required
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md transition"
                >
                  Update Item
                </button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
}