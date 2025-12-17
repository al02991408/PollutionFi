'use client';

import { useState, useEffect } from 'react';
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';
import { analyzeAirQuality, AnalysisResult } from '../lib/pollutionLogic';
import { fetchAirQualityData } from '../lib/api';
import { POLU_ABI, REWARDS_ABI, POLU_ADDRESS, REWARDS_ADDRESS } from '../lib/abis';

export default function RewardsDashboard() {
    const { address, isConnected } = useAccount();
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(false);

    const { data: balance } = useReadContract({
        address: POLU_ADDRESS,
        abi: POLU_ABI,
        functionName: 'balanceOf',
        args: address ? [address] : undefined,
        query: {
            enabled: !!address,
        }
    });

    const { data: hash, writeContract, isPending, error } = useWriteContract();
    const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const data = await fetchAirQualityData('monterrey');
            if (data) {
                const result = analyzeAirQuality(data);
                setAnalysis(result);
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleClaim = () => {
        if (!address || !analysis) return;

        // Logic: Only claim if status is MINT (AQI < 50 approx)
        if (analysis.status !== 'MINT') {
            alert('La calidad del aire no cumple con los estándares para reclamar recompensas.');
            return;
        }

        writeContract({
            address: REWARDS_ADDRESS,
            abi: REWARDS_ABI,
            functionName: 'distributeRewards',
            args: [address, parseEther('100'), 'Clean Air Reward']
        });
    };

    if (!isConnected) {
        return (
            <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Rewards Dashboard</h2>
                <p className="text-gray-500">Conecta tu wallet para ver tus recompensas.</p>
            </div>
        );
    }

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Rewards Dashboard</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Token Balance */}
                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
                    <p className="text-sm text-emerald-600 font-medium mb-1">Balance Total</p>
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-gray-900">
                            {balance ? Number(balance) / 1e18 : '0'}
                        </span>
                        <span className="text-sm font-bold text-emerald-600">$POLU</span>
                    </div>
                </div>

                {/* Minting Status */}
                <div className={`p-4 rounded-lg border ${analysis?.status === 'MINT' ? 'bg-emerald-50 border-emerald-100' :
                        analysis?.status === 'ALERT' ? 'bg-red-50 border-red-100' :
                            'bg-gray-50 border-gray-100'
                    }`}>
                    <div className="flex justify-between items-start mb-2">
                        <p className={`text-sm font-medium ${analysis?.status === 'MINT' ? 'text-emerald-600' :
                                analysis?.status === 'ALERT' ? 'text-red-600' :
                                    'text-gray-600'
                            }`}>Estado de Minting</p>

                        <div className={`w-3 h-3 rounded-full ${analysis?.status === 'MINT' ? 'bg-emerald-500 animate-pulse' :
                                analysis?.status === 'ALERT' ? 'bg-red-500' :
                                    'bg-gray-400'
                            }`} />
                    </div>

                    <p className="text-xs text-gray-500 mb-4">
                        {analysis?.message}
                    </p>

                    <button
                        onClick={handleClaim}
                        disabled={analysis?.status !== 'MINT' || isPending || isConfirming}
                        className={`w-full py-2 px-4 rounded-lg text-sm font-bold transition-all ${analysis?.status === 'MINT' && !isPending && !isConfirming
                                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md hover:shadow-lg'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isPending ? 'Confirmando...' :
                            isConfirming ? 'Procesando...' :
                                analysis?.status === 'MINT' ? 'Reclamar Recompensas' : 'No Disponible'}
                    </button>

                    {isConfirmed && <p className="text-xs text-emerald-600 mt-2 text-center">¡Recompensa reclamada con éxito!</p>}
                    {error && <p className="text-xs text-red-600 mt-2 text-center">Error: {error.message.slice(0, 50)}...</p>}
                </div>
            </div>
        </div>
    );
}
