import { useState } from 'react';

interface VideoData {
  title: string;
  views: number;
}

interface PlaylistData {
  playlistTitle: string;
  videos: VideoData[];
}

export default function PlaylistGraph() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const data: PlaylistData = {
    playlistTitle: "Top Coding Tutorials",
    videos: [
      { title: "JavaScript Basics", views: 1200 },
      { title: "React Introduction", views: 980 },
      { title: "Node.js Fundamentals", views: 750 },
      { title: "CSS Grid Layout", views: 670 },
      { title: "TypeScript for Beginners", views: 430 },
    ],
  };

  // Calculate the maximum views to normalize the bar heights
  const maxViews = Math.max(...data.videos.map(video => video.views));

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-400 to-purple-600">
            {data.playlistTitle} Analytics
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Insights into video performance based on total views
          </p>
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-2xl">
          <div className="flex justify-center items-end space-x-4 md:space-x-6 lg:space-x-8">
            {data.videos.map((video, index) => (
              <div 
                key={index} 
                className="flex flex-col items-center group relative"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Tooltip */}
                {hoveredIndex === index && (
                  <div className="absolute -top-16 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg z-10 text-sm">
                    <p className="font-semibold">{video.title}</p>
                    <p>{video.views.toLocaleString()} views</p>
                  </div>
                )}

                {/* Bar */}
                <div
                  className={`
                    transition-all duration-300 ease-in-out
                    bg-gradient-to-b from-blue-600 to-purple-600 
                    hover:from-blue-700 hover:to-purple-700
                    text-white text-center text-xs font-medium 
                    rounded-t-md w-12 md:w-16 lg:w-20
                    flex items-end justify-center pb-2
                    ${hoveredIndex === index ? 'scale-105' : ''}
                  `}
                  style={{
                    height: `${(video.views / maxViews) * 250}px`,
                  }}
                >
                  {video.views}
                </div>

                {/* Label */}
                <p className="mt-2 text-xs md:text-sm text-gray-400 text-center truncate w-full max-w-20">
                  {video.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto">
            <div>
              <p className="text-2xl font-bold text-blue-400">
                {Math.max(...data.videos.map(v => v.views)).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Top Video Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-400">
                {(data.videos.reduce((sum, v) => sum + v.views, 0) / data.videos.length).toLocaleString()}
              </p>
              <p className="text-sm text-gray-400">Avg. Views</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-400">
                {data.videos.length}
              </p>
              <p className="text-sm text-gray-400">Total Videos</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}