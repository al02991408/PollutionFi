'use client';

import * as React from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

// Mock DePIN Nodes with simulated AQI
const nodes = [
    { id: 1, position: { lat: 25.6866, lng: -100.3161 }, status: 'active', name: 'Centro Monterrey', aqi: 65 },
    { id: 2, position: { lat: 25.6500, lng: -100.2900 }, status: 'active', name: 'Tec de Monterrey', aqi: 42 },
    { id: 3, position: { lat: 25.7200, lng: -100.3500 }, status: 'inactive', name: 'San Nicolas', aqi: 110 },
    { id: 4, position: { lat: 25.6700, lng: -100.4000 }, status: 'active', name: 'San Pedro', aqi: 35 },
    { id: 5, position: { lat: 25.7500, lng: -100.2500 }, status: 'active', name: 'Apodaca', aqi: 85 },
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
                mapStyle="https://tiles.openfreemap.org/styles/liberty" // Free reliable style
            >
                <NavigationControl position="top-right" />

                {nodes.map(node => (
                    <Marker
                        key={node.id}
                        longitude={node.position.lng}
                        latitude={node.position.lat}
                        anchor="bottom"
                    >
                        <div className="group relative flex flex-col items-center cursor-pointer">
                            {/* Tooltip */}
                            <div className="absolute bottom-full mb-2 hidden group-hover:block bg-black/90 text-white text-xs px-3 py-1.5 rounded shadow-lg whitespace-nowrap z-50">
                                <div className="font-bold">{node.name}</div>
                                <div>AQI: {node.aqi}</div>
                                <div className="text-[10px] opacity-80 capitalize">{node.status}</div>
                            </div>

                            {/* Pin */}
                            <div className={`w-8 h-8 rounded-full border-2 border-white shadow-md flex items-center justify-center transition-transform group-hover:scale-110 ${node.aqi < 50 ? 'bg-emerald-500' :
                                    node.aqi < 100 ? 'bg-yellow-500' :
                                        'bg-red-500'
                                }`}>
                                <span className="text-[10px] font-bold text-white">{node.aqi}</span>
                            </div>
                        </div>
                    </Marker>
                ))}
            </Map>

            {/* Legend Overlay */}
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-lg text-xs z-10 border border-gray-100">
                <p className="font-bold text-gray-800 mb-2">Calidad del Aire (AQI)</p>
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full shadow-sm"></div>
                    <span className="text-gray-600">Buena (0-50)</span>
                </div>
                <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
                    <span className="text-gray-600">Moderada (51-100)</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
                    <span className="text-gray-600">Mala (100+)</span>
                </div>
            </div>
        </div>
    );
}
