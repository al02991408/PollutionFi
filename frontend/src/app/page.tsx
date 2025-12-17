'use client';

import Map from '../components/Map';
import StatusPanel from '../components/StatusPanel';
import CompanyProfile from '../components/CompanyProfile';
import RewardsDashboard from '../components/RewardsDashboard';
import IncentiveCalculator from '../components/IncentiveCalculator';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
              P
            </div>
            <span className="text-xl font-bold text-gray-900">PollutionFi</span>
          </div>
        </div>
    </div>
      </footer >
    </div >
  );
}
