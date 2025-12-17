'use client';

import Map from '../components/Map';
import StatusPanel from '../components/StatusPanel';
import CompanyProfile from '../components/CompanyProfile';
import RewardsDashboard from '../components/RewardsDashboard';
import IncentiveCalculator from '../components/IncentiveCalculator';
import ConnectWallet from '../components/ConnectWallet';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
              P
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 leading-none">PollutionFi</h1>
              <p className="text-xs text-gray-500 font-medium">DePIN Air Quality Network</p>
            </div>
          </div>
          <ConnectWallet />
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Top Row: Map & Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Mapa de Monitoreo en Tiempo Real</h2>
            <Map />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Estado de la Red</h2>
            <StatusPanel />
          </div>
        </div>

        {/* Middle Row: Rewards & Tools */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Panel de Recompensas</h2>
            <RewardsDashboard />
          </div>
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Herramientas Fiscales</h2>
            <IncentiveCalculator />
          </div>
        </div>

        {/* Bottom Row: Company Verification */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-800">Perfil Corporativo</h2>
            <CompanyProfile />
          </div>
        </div>
      </main>
    </div>
  );
}
