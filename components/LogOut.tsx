// pages/logout.tsx


import { FC } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig';


const Logout: FC = () => {
  const auth = getAuth(app)

  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to home or login page
      window.location.href("/signup");
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="px-4 py-2 rounded-xl shadow bg-red-600 hover:bg-red-700">
        Logout
      </button>
    </div>
  );
};

export default Logout;
