import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-24 overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-50"></div>

      {/* Grid Background Effect */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-grid-white/5"></div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Animated Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 
            bg-clip-text text-transparent 
            bg-gradient-to-r from-blue-400 to-purple-600 
            animate-gradient-x">
            Unlock Your Playlist Potential
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-10 leading-relaxed">
            Transform your YouTube playlist data into actionable insights with advanced analytics and beautiful visualizations.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center space-x-4">
            <Link 
              href="/signup"
              className="
                bg-gradient-to-r from-blue-600 to-purple-600 
                hover:from-blue-700 hover:to-purple-700 
                text-white 
                px-8 py-3 
                rounded-lg 
                font-semibold 
                text-lg
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-1 
                shadow-lg 
                hover:shadow-xl
                focus:outline-none 
                focus:ring-2 
                focus:ring-blue-500 
                focus:ring-opacity-50"
            >
              Get Started
            </Link>
            
            <Link 
              href="/features"
              className="
                bg-gray-800 
                hover:bg-gray-700 
                text-gray-300 
                hover:text-white 
                px-8 py-3 
                rounded-lg 
                font-semibold 
                text-lg
                transition-all 
                duration-300 
                transform 
                hover:-translate-y-1 
                border 
                border-gray-700 
                shadow-md 
                hover:shadow-lg
                focus:outline-none 
                focus:ring-2 
                focus:ring-gray-600 
                focus:ring-opacity-50"
            >
              Learn More
            </Link>
          </div>

          {/* Social Proof */}
          <div className="mt-16 flex justify-center items-center space-x-6 opacity-70">
            <span className="text-sm text-gray-400">Trusted by</span>
            <div className="flex items-center space-x-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="100" 
                height="30" 
                viewBox="0 0 100 30" 
                className="fill-current text-gray-400 hover:text-white transition"
              >
                <path d="M20 10h-8v4h8v-4z"/>
                <path d="M20 16h-8v4h8v-4z"/>
                <path d="M4 10h8v4H4z"/>
                <path d="M4 16h8v4H4z"/>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="100" 
                height="30" 
                viewBox="0 0 100 30" 
                className="fill-current text-gray-400 hover:text-white transition"
              >
                <path d="M30 15c0-8.284-6.716-15-15-15S0 6.716 0 15s6.716 15 15 15 15-6.716 15-15zm-7.5-5.5c2.481 0 4.5 2.019 4.5 4.5s-2.019 4.5-4.5 4.5-4.5-2.019-4.5-4.5 2.019-4.5 4.5-4.5z"/>
              </svg>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="100" 
                height="30" 
                viewBox="0 0 100 30" 
                className="fill-current text-gray-400 hover:text-white transition"
              >
                <path d="M15 0C6.717 0 0 6.717 0 15c0 8.283 6.717 15 15 15s15-6.717 15-15c0-8.283-6.717-15-15-15zm7.5 21.5h-15v-15h15v15z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}