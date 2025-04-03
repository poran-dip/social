'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState } from 'react';

export default function NotFound() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  // This would need to be replaced with your actual post IDs or logic
  // to fetch a random post
  const handleRandomPost = () => {
    setIsLoading(true);
    
    // Example: Simulate fetching a random post ID
    // In a real app, you might fetch this from an API
    const randomPostIds = ['post-1', 'post-2', 'post-3', 'post-4', 'post-5'];
    const randomId = randomPostIds[Math.floor(Math.random() * randomPostIds.length)];
    
    // Navigate to the random post
    router.push(`/posts/${randomId}`);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">Page Not Found</h2>
        <p className="text-gray-600 mb-8">
          Oops! The page you are looking for doesn&aps;t exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleRandomPost}
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? 'Loading...' : 'Random Post'}
          </button>
          
          <Link href="/" className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}