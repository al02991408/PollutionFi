'use client';

export default function CompanyProfile() {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    T
                </div>
                <div>
                    <h2 className="text-xl font-bold text-gray-800">Ternium México</h2>
                    <p className="text-sm text-green-600">Empresa Socialmente Responsable</p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Historial de Auditoría</h3>
                    <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-800">Reporte Mensual #{12 - i}</p>
                                        <p className="text-xs text-gray-500">2024-12-{10 - i}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-green-600">+500 POLU</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3">Impacto Acumulado</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-gray-800">12.5k</p>
                            <p className="text-xs text-gray-500">Tokens Generados</p>
                        </div>
                        <div className="p-3 border border-gray-100 rounded-lg">
                            <p className="text-2xl font-bold text-gray-800">4.2%</p>
                            <p className="text-xs text-gray-500">Reducción Emisiones</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
