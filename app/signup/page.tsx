"use client";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useEffect, useState } from "react";
import { app } from "@/lib/firebaseConfig";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PlaylistGraph from "@/components/PlaylistGraph";

export default function SignUpPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle Google Sign-Up
  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect to dashboard
    } catch (error) {
      
      
      setError("Sign up failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Redirect if user is already signed in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        router.push("/"); // Redirect to dashboard
      }
    });
    return () => unsubscribe();
  }, [router, auth]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100 flex flex-col">
      <Head>
        <title>Playlist Insights | Sign Up</title>
        <meta 
          name="description" 
          content="Unlock powerful YouTube playlist analytics. Sign up now." 
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="flex-grow flex items-center justify-center px-4 py-16 mt-5">
        <div className="w-full max-w-md mt-10">
          <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden">
            <div className="p-8">
              <h1 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 mb-6">
                Get Started
              </h1>

              <p className="text-gray-400 text-center mb-8">
                Sign up to unlock detailed insights into your YouTube playlists
              </p>

              {error && (
                <div className="bg-red-600/20 border border-red-500/30 text-red-400 px-4 py-3 rounded-lg mb-6 text-center">
                  {error}
                </div>
              )}

              <button
                onClick={handleGoogleSignUp}
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-3 
                  bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white py-3 px-4 rounded-lg 
                  hover:from-blue-700 hover:to-purple-700 
                  transition-all duration-300 
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
                  disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <svg 
                    className="animate-spin h-5 w-5 text-white" 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24"
                  >
                    <circle 
                      className="opacity-25" 
                      cx="12" 
                      cy="12" 
                      r="10" 
                      stroke="currentColor" 
                      strokeWidth="4"
                    ></circle>
                    <path 
                      className="opacity-75" 
                      fill="currentColor" 
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <svg className="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4"/><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853"/><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04"/><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335"/></svg>
                )}
                {isLoading ? 'Signing Up...' : 'Continue with Google'}
              </button>
            </div>

            <div className="bg-gray-700/30 px-8 py-4 text-center text-xs text-gray-400">
              Protected by Google Authentication
            </div>
          </div>

          <div className="text-center mt-6 text-gray-500">
            <p>By signing up, you agree to our <a href="/terms" className="underline hover:text-blue-400">Terms of Service</a></p>
          </div>
        </div>
      </main>
      <HeroSection/>
      <PlaylistGraph/>

      <Footer />
    </div>
  );
}