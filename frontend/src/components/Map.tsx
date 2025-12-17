'use client';

import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// Mock DePIN Nodes (SparkFun sensors)
const nodes = [
    { id: 1, position: { lat: 25.6866, lng: -100.3161 }, status: 'active', name: 'Centro Monterrey' },
    { id: 2, position: { lat: 25.6500, lng: -100.2900 }, status: 'active', name: 'Tec de Monterrey' },
    { id: 3, position: { lat: 25.7200, lng: -100.3500 }, status: 'inactive', name: 'San Nicolas' },
    { id: 4, position: { lat: 25.6700, lng: -100.4000 }, status: 'active', name: 'San Pedro' },
    { id: 5, position: { lat: 25.7500, lng: -100.2500 }, status: 'active', name: 'Apodaca' },
];

export default function InteractiveMap() {
    return (
        <div className="w-full h-[400px] rounded-xl overflow-hidden relative shadow-sm border border-gray-200">
            <Map
                initialViewState={{
                    longitude: -100.3161,
                    latitude: 25.6866,
                    zoom: 11
                }}
                style={{ width: '100%', height: '100%' }}
                mapStyle="https://demotiles.maplibre.org/style.json"
            >
                <NavigationControl position="top-right" />

                {nodes.map(node => (
                    <Marker
                        key={node.id}
                        longitude={node.position.lng}
                        latitude={node.position.lat}
                        anchor="bottom"
                    >
                        <div className="group relative flex flex-col items-center">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded whitespace-nowrap z-10">
                                {node.name} ({node.status})
                            </div>

                            {/* Pin */}
                            <div className={`w-6 h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center ${node.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                                }`}>
                                <div className="w-2 h-2 bg-white rounded-full" />
                            </div>
                        </div>
                    </Marker>
                ))}
            </Map>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-lg text-xs z-10">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-green-500 rounded-full border border-white shadow-sm"></div>
                    <span className="font-medium text-gray-700">Nodos Activos</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full border border-white shadow-sm"></div>
                    <span className="font-medium text-gray-700">Nodos Inactivos</span>
                </div>
            </div>
        </div>
    );
}
