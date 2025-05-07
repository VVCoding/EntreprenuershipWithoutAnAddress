'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Play } from 'lucide-react';

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

export default function PitchesPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewedPitches, setViewedPitches] = useState<Set<string>>(new Set());
  const [playingVideos, setPlayingVideos] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchPitches();
  }, []);

  const fetchPitches = async () => {
    try {
      const response = await fetch('/api/pitches');
      if (!response.ok) {
        throw new Error('Failed to fetch pitches');
      }
      const data = await response.json();
      setPitches(data);
    } catch (err) {
      setError('Failed to load pitches. Please try again.');
      console.error('Error fetching pitches:', err);
    } finally {
      setLoading(false);
    }
  };

  const incrementViewCount = async (pitchId: string) => {
    // Only increment if the user is an investor and hasn't viewed this pitch yet
    if (session?.user?.userType === 'investor' && !viewedPitches.has(pitchId)) {
      try {
        const response = await fetch(`/api/pitches/${pitchId}/views`, {
          method: 'POST',
        });

        if (response.ok) {
          const { views } = await response.json();
          // Update the pitch's view count in the local state
          setPitches(prevPitches =>
            prevPitches.map(pitch =>
              pitch.id === pitchId ? { ...pitch, views } : pitch
            )
          );
          // Mark this pitch as viewed
          setViewedPitches(prev => new Set([...prev, pitchId]));
        }
      } catch (err) {
        console.error('Error incrementing view count:', err);
      }
    }
  };

  const handleVideoPlay = (pitchId: string) => {
    setPlayingVideos(prev => new Set([...prev, pitchId]));
    incrementViewCount(pitchId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  const isEntrepreneur = session?.user?.userType === 'entrepreneur';

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          {isEntrepreneur ? 'My Pitches' : 'All Pitches'}
        </h1>
        {isEntrepreneur && (
          <Link
            href="/pitches/new"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            Create New Pitch
          </Link>
        )}
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {pitches.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">
            {isEntrepreneur 
              ? "You haven't created any pitches yet."
              : "No pitches available at the moment."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {pitches.map((pitch) => (
            <div
              key={pitch.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-xl font-semibold">{pitch.title}</h2>
                {!isEntrepreneur && pitch.user_email && (
                  <span className="text-sm text-gray-500">
                    By: {pitch.user_email}
                  </span>
                )}
              </div>
              
              <div className="aspect-w-16 aspect-h-9 mb-4 relative">
                {!playingVideos.has(pitch.id) && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 cursor-pointer hover:bg-opacity-40 transition-opacity"
                    onClick={() => handleVideoPlay(pitch.id)}
                  >
                    <Play className="w-16 h-16 text-white" />
                  </div>
                )}
                <iframe
                  src={`${pitch.video_url}?autoplay=${playingVideos.has(pitch.id) ? '1' : '0'}`}
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 