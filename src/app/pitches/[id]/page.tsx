'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Play } from 'lucide-react';
import CommentSection from '@/components/CommentSection';

interface Pitch {
  id: string;
  title: string;
  description: string;
  video_url: string;
  looking_for: string;
  views: number;
  created_at: string;
  user_email?: string;
}

export default function PitchPage() {
  const params = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetchPitch();
  }, [params.id]);

  const fetchPitch = async () => {
    try {
      console.log('Fetching pitch with ID:', params.id);
      const response = await fetch(`/api/pitches/${params.id}`);
      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to fetch pitch');
      }
      
      const data = await response.json();
      console.log('Received pitch data:', data);
      setPitch(data);
    } catch (err) {
      console.error('Error fetching pitch:', err);
      setError(err instanceof Error ? err.message : 'Failed to load pitch. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVideoPlay = () => {
    setIsPlaying(true);
    if (session?.user?.userType === 'investor') {
      incrementViewCount();
    }
  };

  const incrementViewCount = async () => {
    try {
      const response = await fetch(`/api/pitches/${params.id}/views`, {
        method: 'POST',
      });
      
      if (!response.ok) {
        console.error('Failed to increment view count:', await response.json());
      }
    } catch (err) {
      console.error('Error incrementing view count:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !pitch) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error || 'Pitch not found'}
        </div>
        <button
          onClick={() => router.push('/pitches')}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Back to Pitches
        </button>
      </div>
    );
  }

  const isEntrepreneur = session?.user?.userType === 'entrepreneur';
  const isInvestor = session?.user?.userType === 'investor';
  const isPitchOwner = pitch.user_email === session?.user?.email;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <h1 className="text-2xl font-bold">{pitch.title}</h1>
          {!isEntrepreneur && pitch.user_email && (
            <span className="text-sm text-gray-500">
              By: {pitch.user_email}
            </span>
          )}
        </div>

        <div className="aspect-w-16 aspect-h-9 relative">
          {!isPlaying && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer hover:bg-opacity-40 transition-opacity"
              onClick={handleVideoPlay}
            >
              <Play className="w-16 h-16 text-white" />
            </div>
          )}
          <iframe
            src={`${pitch.video_url}?autoplay=${isPlaying ? '1' : '0'}&mute=1`}
            className="w-full h-full rounded-lg"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700">Description</h3>
            <p className="text-gray-600">{pitch.description}</p>
          </div>

          <div>
            <h3 className="font-medium text-gray-700">Looking For</h3>
            <p className="text-gray-600">{pitch.looking_for}</p>
          </div>

          <div className="flex justify-between text-sm text-gray-500">
            <span>{pitch.views} views</span>
            <span>
              Created on {new Date(pitch.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Comment Section - Show for both investors and entrepreneurs */}
        {session?.user && (
          <div className="mt-8">
            <CommentSection 
              pitchId={pitch.id} 
              userType={session.user.userType || 'investor'} 
            />
          </div>
        )}
      </div>
    </div>
  );
} 