"use client";
import React from 'react';
import { useStore } from '../../store/store';
import MainLayout from '../../components/layouts/main';
import { useRouter } from 'next/navigation';

const Profile: React.FC = () => {
  const { isLoggedIn, user, logout } = useStore();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn || !user) {
    return null;
  }

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
            <h2 className="text-3xl font-bold text-center text-primary mb-6">User Profile</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-secondary text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
                onClick={() => {
                  logout();
                  router.push('/');
                }}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
