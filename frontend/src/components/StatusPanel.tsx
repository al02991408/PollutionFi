'use client';

import { useState, useEffect } from 'react';
import { fetchAirQualityData, AirQualityData } from '../lib/api';
import { analyzeAirQuality, AnalysisResult } from '../lib/pollutionLogic';

export default function StatusPanel() {
    const [data, setData] = useState<AirQualityData | null>(null);
    const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            const result = await fetchAirQualityData('monterrey');
            setData(result);
            if (result) {
                setAnalysis(analyzeAirQuality(result));
            }
            setLoading(false);
        };
        loadData();
    }, []);

    if (loading) return <div className="animate-pulse h-32 bg-gray-100 rounded-xl"></div>;

    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Calidad del Aire</h2>
                    <p className="text-sm text-gray-500">Monterrey, Nuevo León</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${analysis?.status === 'MINT' ? 'bg-green-100 text-green-700' :
                        analysis?.status === 'ALERT' ? 'bg-red-100 text-red-700' :
                            'bg-yellow-100 text-yellow-700'
                    }`}>
                    {data?.aqi} AQI
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">PM2.5</p>
                    <p className="font-bold text-gray-800">{data?.iaqi.pm25?.v || '-'}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">PM10</p>
                    <p className="font-bold text-gray-800">{data?.iaqi.pm10?.v || '-'}</p>
                </div>
                <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-500 mb-1">O3</p>
                    <p className="font-bold text-gray-800">{data?.iaqi.o3?.v || '-'}</p>
                </div>
            </div>

            <div className={`p-3 rounded-lg text-sm ${analysis?.status === 'MINT' ? 'bg-green-50 text-green-800' :
                    analysis?.status === 'ALERT' ? 'bg-red-50 text-red-800' :
                        'bg-yellow-50 text-yellow-800'
                }`}>
                {analysis?.message}
            </div>

            <div className="mt-4 text-xs text-gray-400 text-right">
                Fuente: WAQI API (Tiempo Real)
            </div>
        </div>
    );
}
