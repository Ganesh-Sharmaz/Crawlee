"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/lib/firebaseConfig";
import Logout from "@/components/LogOut";
import Image from "next/image";

interface VideoData {
  title: string;
  views: number;
  thumbnail: string;
}

interface GraphData {
  name: string;
  views: number;
}

export default function Home() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [videoData, setVideoData] = useState<VideoData[]>([]);
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<unknown>(null);

  // Mock login function
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoading(false);
      setUsers(user);

      if (!users) {
        window.location.href = "/signup"; // Manual redirect without useRouter
      } 
    });

    return () => unsubscribe();
  }, [auth]);


  // If not logged in, show login screen


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/scrape-playlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ playlistUrl }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch playlist data");
      }

      const data = await response.json();
      setVideoData(data.videoList);
      setGraphData(data.graphData);
    } catch (error) {
      console.error("Error:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    } else {
      return views.toString();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-4 lg:p-8">
      <div className="container mx-auto max-w-6xl space-y-8">

        {/* Search Section */}
        <div className="bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border border-zinc-800">
          <div className="p-6 relative bg-blue-600 text-white">
            <div className=" absolute right-5 top-3"><Logout /></div>
            <h2 className="text-2xl font-bold">YouTube Playlist Analyzer</h2>
            <p className="text-blue-100 mt-2">
              Analyze your playlist and gain deep insights
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="url"
                placeholder="Paste YouTube playlist URL"
                value={playlistUrl}
                onChange={(e) => setPlaylistUrl(e.target.value)}
                className="w-full bg-zinc-800 border-zinc-700 text-white placeholder-zinc-500 focus:ring-blue-500 focus:border-blue-500 rounded-full"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Playlist"
                )}
              </Button>
              {error && (
                <div className="text-red-500 text-sm mt-2 text-center">
                  {error}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Results Section */}
        {videoData.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Video List */}
            <div className="bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border border-zinc-800">
              <div className="bg-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white">
                  Video List
                </h3>
              </div>
              <div className="divide-y divide-zinc-800">
                {videoData.map((video, index) => (
                  <div
                    key={index}
                    className="flex items-center p-4 hover:bg-zinc-800 transition-colors"
                  >
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-20 h-20 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold text-white line-clamp-2">
                        {video.title}
                      </h4>
                      <p className="text-sm text-zinc-400">
                        {formatViews(video.views)} views
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Graph Section */}
            <div className="bg-zinc-900 shadow-2xl rounded-2xl overflow-hidden border border-zinc-800">
              <div className="bg-zinc-800 p-4">
                <h3 className="text-xl font-bold text-white">
                  View Count Trends
                </h3>
              </div>
              <div className="p-4">
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={graphData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      stroke="rgb(63, 63, 70)"
                    />
                    <XAxis
                      dataKey="name"
                      stroke="rgb(161, 161, 170)"
                      tick={{ fill: 'rgb(161, 161, 170)' }}
                    />
                    <YAxis
                      stroke="rgb(161, 161, 170)"
                      tick={{ fill: 'rgb(161, 161, 170)' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgb(24, 24, 27)',
                        borderColor: 'rgb(63, 63, 70)',
                        color: 'white'
                      }}
                      labelStyle={{ color: 'white' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="views"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ stroke: '#3B82F6', strokeWidth: 2 }}
                      activeDot={{
                        r: 8,
                        fill: '#1E40AF',
                        stroke: '#3B82F6',
                        strokeWidth: 2
                      }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}