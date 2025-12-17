'use client';

import { useState } from 'react';

export default function IncentiveCalculator() {
    const [tokens, setTokens] = useState<string>('');

    const calculateIncentives = (amount: number) => {
        // Logic: Tokens * 0.05 = % Discount (Capped at 20%)
        const discount = Math.min((amount * 0.05), 20);
        // Logic: Certification Level based on tokens
        let certification = 'Ninguna';
        if (amount >= 5000) certification = 'Platinum (ISO 14001 Ready)';
        else if (amount >= 2000) certification = 'Gold (Empresa Verde)';
        else if (amount >= 500) certification = 'Silver (Compromiso Ambiental)';

        return { discount, certification };
    };

    const { discount, certification } = calculateIncentives(Number(tokens) || 0);

    return (
        <div className="p-6 bg-white rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Simulador Fiscal Ecológico</h2>

            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tokens $POLU Acumulados
                    </label>
                    <input
                        type="number"
                        value={tokens}
                        onChange={(e) => setTokens(e.target.value)}
                        placeholder="Ej: 1000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div className="pt-4 border-t border-gray-100 space-y-3">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Descuento Impuesto Ecológico</span>
                        <span className="font-bold text-emerald-600 text-lg">{discount.toFixed(2)}%</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-gray-600">Nivel de Certificación</span>
                        <span className="font-bold text-gray-800 text-right text-sm">{certification}</span>
                    </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg text-xs text-gray-500 border border-gray-200">
                    * Cálculo basado en la Ley de Hacienda del Estado de Nuevo León (Art. 158 bis).
                </div>
            </div>
        </div>
    );
}
