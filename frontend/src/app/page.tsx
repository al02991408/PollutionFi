"use client"

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

// Imports de wagmi y viem
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

// --- Constantes de Estilo y Centro ---
const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 25.5, // Coordenada base para el centro de Monterrey
  lng: -100.3
};

// --- Componente de Demostración Blockchain (Integrado) ---
function BlockchainDemo() {
  const { address, isConnected } = useAccount()
  const { connect, connectors } = useConnect()
  const { disconnect } = useDisconnect()
  const { data: hash, writeContract, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  // DEBUG - ver en consola
  console.log('Wallet status:', { isConnected, address, connectors })

  const handleConnect = () => {
    // Conectar con el primer connector (MetaMask)
    if (connectors[0]) {
      connect({ connector: connectors[0] })
    }
  }

  const handleMintDemo = async () => {
    if (!isConnected) {
      handleConnect()
      return
    }

    writeContract({
      address: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
      abi: [{
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' },
          { name: 'reason', type: 'string' }
        ],
        outputs: []
      }],
      functionName: 'mint',
      args: [address as `0x${string}`, parseEther('100'), 'Demo emission reduction']
    })
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-black mb-4">Sistema de Recompensas POLU</h3>
      
      {!isConnected ? (
        <button 
          onClick={handleConnect}
          className="w-full bg-[#0457A3] text-white py-3 px-4 rounded-lg mb-3 hover:bg-[#034488] transition-colors font-medium"
        >
          Conectar Wallet
        </button>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">✅ Wallet Conectada</p>
            <p className="text-xs text-green-600 break-all mt-1">{address}</p>
          </div>
          
          <button 
            onClick={handleMintDemo}
            disabled={isPending}
            className="w-full bg-[#74CAE6] text-black py-3 px-4 rounded-lg hover:bg-[#5cb8d6] transition-colors font-medium disabled:opacity-50"
          >
            {isPending ? 'Enviando transacción...' : 'Reclamar 100 POLU (Demo)'}
          </button>

          {hash && (
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800 font-medium">📝 Transacción enviada</p>
              <p className="text-xs text-blue-600 break-all">{hash}</p>
            </div>
          )}

          {isConfirming && (
            <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-yellow-800">⏳ Confirmando transacción...</p>
            </div>
          )}

          {isConfirmed && (
            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <p className="text-sm text-green-800 font-medium">🎉 ¡100 POLU reclamados!</p>
              <p className="text-xs text-green-600">Transacción confirmada en blockchain</p>
            </div>
          )}

          <button 
            onClick={() => disconnect()}
            className="w-full bg-gray-500 text-white py-2 px-4 rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Desconectar Wallet
          </button>
        </div>
      )}

      <div className="mt-4 p-3 bg-[#F9F9F9] rounded-lg">
        <p className="text-sm text-black font-medium">Contratos Desplegados</p>
        <p className="text-xs text-black break-all">POLU: 0xe7f17...F0512</p>
        <p className="text-xs text-black break-all">Rewards: 0x9fE46...fa6e0</p>
        <p className="text-xs text-black">Network: Localhost</p>
      </div>
    </div>
  )
}

export default function Home() {
  const [sensors] = useState([
    { 
      id: 1, 
      name: "CEMEX", 
      aqi: 45, 
      pm25: 35, 
      position: { lat: 25.6915, lng: -100.3218 },
      address: "Planta Cementera Norte",
      type: "industrial"
    },
    { 
      id: 2, 
      name: "FEMSA", 
      aqi: 55, 
      pm25: 28, 
      position: { lat: 25.6759, lng: -100.3161 },
      address: "Planta Embotelladora",
      type: "industrial"
    },
    { 
      id: 3, 
      name: "ALFA", 
      aqi: 52, 
      pm25: 31, 
      position: { lat: 25.6732, lng: -100.3093 },
      address: "Parque Industrial",
      type: "industrial"
    },
    { 
      id: 4, 
      name: "Zona Centro", 
      aqi: 68, 
      pm25: 22, 
      position: { lat: 25.6700, lng: -100.3100 },
      address: "Centro de Monterrey",
      type: "urban"
    },
    { 
      id: 5, 
      name: "Parque Fundidora", 
      aqi: 82, 
      pm25: 12, 
      position: { lat: 25.6850, lng: -100.2850 },
      address: "Parque Fundidora",
      type: "green"
    },
    { 
      id: 6, 
      name: "Zona Industrial Norte", 
      aqi: 38, 
      pm25: 42, 
      position: { lat: 25.7500, lng: -100.3000 },
      address: "Corredor Industrial",
      type: "industrial"
    },
    { 
      id: 7, 
      name: "San Pedro", 
      aqi: 75, 
      pm25: 18, 
      position: { lat: 25.6550, lng: -100.3500 },
      address: "Zona Residencial",
      type: "urban"
    },
    { 
      id: 8, 
      name: "Apodaca", 
      aqi: 48, 
      pm25: 33, 
      position: { lat: 25.7800, lng: -100.1900 },
      address: "Parque Industrial Apodaca",
      type: "industrial"
    }
  ]);

  const [selectedSensor, setSelectedSensor] = useState<any>(null);
  const [totalPOLU, setTotalPOLU] = useState(78200);
  const [map, setMap] = useState<any>(null);

  // Efecto para simular la acumulación de POLU en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPOLU(prev => prev + 150);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Efecto para inicializar el Heatmap
  useEffect(() => {
    if (map && window.google) {
      const industrialZones = [
        { lat: 25.69, lng: -100.32, intensity: 0.9 }, // CEMEX
        { lat: 25.75, lng: -100.30, intensity: 0.8 }, // Norte
        { lat: 25.78, lng: -100.19, intensity: 0.7 }, // Apodaca
        { lat: 25.67, lng: -100.31, intensity: 0.6 }, // Centro industrial
      ];

      const heatmapData = [
        // Zonas industriales - alta intensidad
        ...industrialZones.flatMap(zone => [
          { location: new google.maps.LatLng(zone.lat, zone.lng), weight: zone.intensity },
          { location: new google.maps.LatLng(zone.lat + 0.02, zone.lng + 0.02), weight: zone.intensity * 0.8 },
          { location: new google.maps.LatLng(zone.lat - 0.02, zone.lng - 0.02), weight: zone.intensity * 0.8 },
          { location: new google.maps.LatLng(zone.lat + 0.015, zone.lng - 0.015), weight: zone.intensity * 0.6 },
        ]),
        // Zonas urbanas - media intensidad
        ...sensors.filter(s => s.type === "urban").map(sensor => ({
          location: new google.maps.LatLng(sensor.position.lat, sensor.position.lng),
          weight: 0.4
        })),
        // Zonas verdes - baja intensidad
        ...sensors.filter(s => s.type === "green").map(sensor => ({
          location: new google.maps.LatLng(sensor.position.lat, sensor.position.lng),
          weight: 0.2
        }))
      ];

      const heatmap = new google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        gradient: [
          'rgba(0, 255, 0, 0)',
          'rgba(0, 255, 0, 0.6)',
          'rgba(255, 255, 0, 0.8)',
          'rgba(255, 165, 0, 0.9)',
          'rgba(255, 0, 0, 1)'
        ],
        radius: 70,
        opacity: 0.8,
        maxIntensity: 1
      });
      heatmap.setMap(map);

      // Función de limpieza al desmontar
      return () => {
        heatmap.setMap(null);
      };
    }
  }, [map, sensors]); // Depende de 'map' y 'sensors'


  return (
    <div className="min-h-screen bg-[#F9F9F9] p-6">
      <div className="mb-8 flex items-center gap-4">
        <img 
          src="/logo.png" 
          alt="PollutionFi Logo" 
          className="w-60 h-20 object-contain"
        />
        <h1 className="text-3xl font-extrabold text-[#212C35] ml-4">PollutionFi Dashboard</h1>
      </div>

      {/* --- KPIs --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#0457A3]">
          <p className="text-sm text-black font-medium">Calidad Aire Promedio</p>
          <p className="text-3xl font-bold text-black">65/100</p>
          <p className="text-sm text-yellow-600 mt-1">Zonas industriales críticas</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#74CAE6]">
          <p className="text-sm text-black font-medium">Empresas Activas</p>
          <p className="text-3xl font-bold text-black">8</p>
          <p className="text-sm text-black mt-1">En programa POLU</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#0457A3]">
          <p className="text-sm text-black font-medium">POLU Distribuidos</p>
          <p className="text-3xl font-bold text-black">{totalPOLU.toLocaleString()}</p>
          <p className="text-sm text-green-600 mt-1">En tiempo real</p>
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-[#74CAE6]">
          <p className="text-sm text-black font-medium">Sensores Activos</p>
          <p className="text-3xl font-bold text-black">24</p>
          <p className="text-sm text-black mt-1">Todo Nuevo León</p>
        </div>
      </div>

      {/* --- Mapa de Calor --- */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-black mb-2">Mapa de Calor - Calidad del Aire en Nuevo León</h2>
        <p className="text-sm text-black mb-4">Focos rojos indican zonas industriales con alta polución</p>
        
        {/* Contenedor del Mapa */}
        <LoadScript 
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY"}
          libraries={["visualization"]}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}
            zoom={10}
            onLoad={(mapInstance) => setMap(mapInstance)}
          >
            {/* Markers de Sensores */}
            {sensors.map(sensor => (
              <Marker
                key={sensor.id}
                position={sensor.position}
                // SVG dinámico para el Marker
                icon={{
                  url: `data:image/svg+xml;base64,${btoa(`
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="15" fill="${
                        sensor.aqi >= 70 ? '#10B981' : // Verde (Bueno)
                        sensor.aqi >= 50 ? '#F59E0B' : // Amarillo (Moderado)
                        '#EF4444' // Rojo (Pobre)
                      }" stroke="white" stroke-width="3"/>
                      <text x="20" y="25" text-anchor="middle" fill="white" font-weight="bold" font-size="12">${sensor.aqi}</text>
                    </svg>
                  `)}`
                }}
                onClick={() => setSelectedSensor(sensor)}
              />
            ))}

            {/* InfoWindow del Sensor Seleccionado */}
            {selectedSensor && (
              <InfoWindow
                position={selectedSensor.position}
                onCloseClick={() => setSelectedSensor(null)}
              >
                <div className="p-2 max-w-xs">
                  <h3 className="font-bold text-black">{selectedSensor.name}</h3>
                  <p className="text-sm text-black">{selectedSensor.address}</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm">
                      <span className="font-medium text-black">Calidad del Aire:</span> 
                      <span className={`ml-2 ${
                        selectedSensor.aqi >= 70 ? 'text-green-600' : 
                        selectedSensor.aqi >= 50 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {selectedSensor.aqi}/100
                      </span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-black">PM2.5:</span> 
                      <span className="ml-2 text-black">{selectedSensor.pm25} μg/m³</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-medium text-black">Tipo:</span> 
                      <span className="ml-2 capitalize text-black">{selectedSensor.type}</span>
                    </p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>

        {/* Leyenda del Heatmap y Markers */}
        <div className="mt-4 flex flex-col gap-4">
          <div className="flex gap-6 justify-center flex-wrap">
            {/* Leyenda de Markers (AQI) */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
              <span className="text-sm text-black">Bueno (70-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white"></div>
              <span className="text-sm text-black">Moderado (50-69)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
              <span className="text-sm text-black">Pobre (0-49)</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs text-black italic">Nota del Heatmap: La intensidad del color rojo representa la concentración de la contaminación histórica y en tiempo real.</p>
          </div>
        </div>
      </div>

      {/* --- Sensores y Blockchain (Grid) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Sensores Activos */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-black mb-4">Detalle de Sensores en NL (Datos Crudos)</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {sensors.map(sensor => (
              <div 
                key={sensor.id} 
                className="flex justify-between items-center p-3 bg-[#F9F9F9] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedSensor(sensor)} // Al hacer clic, abre el InfoWindow en el mapa
              >
                <div className="flex-1">
                  <p className="font-medium text-black">{sensor.name}</p>
                  <p className="text-sm text-black">{sensor.address}</p>
                  <div className="flex gap-4 mt-1">
                    <p className="text-sm text-black">PM2.5: <span className="font-bold">{sensor.pm25}μg/m³</span></p>
                    <p className="text-sm text-black">PM10: <span className="font-bold">{(sensor.pm25 * 2).toFixed(1)}μg/m³</span></p>
                  </div>
                </div>
                {/* Indicador de AQI */}
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  sensor.aqi >= 70 ? 'bg-green-100 text-green-800' : 
                  sensor.aqi >= 50 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'
                }`}>
                  AQI: {sensor.aqi}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Blockchain (Bloque reemplazado con el componente dinámico) */}
        <BlockchainDemo />
      </div>

      {/* --- Alertas --- */}
      <div className="bg-white p-6 rounded-xl shadow-md mt-6">
        <h3 className="font-semibold text-black mb-4">Alertas del Sistema 🚨</h3>
        <div className="space-y-2">
          <div className="flex items-center p-3 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-3"></div>
            <span className="text-sm text-black font-medium">CRÍTICO: PM2.5 extremo en Zona Industrial Norte (42μg/m³)</span>
          </div>
          <div className="flex items-center p-3 bg-yellow-50 border-l-4 border-yellow-500 rounded">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3"></div>
            <span className="text-sm text-black">ALERTA: Niveles elevados en Corredor Industrial Apodaca (AQI 48)</span>
          </div>
          <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-500 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-sm text-black">ÓPTIMO: Calidad excelente en Parque Fundidora (PM2.5: 12μg/m³)</span>
          </div>
        </div>
      </div>
    </div>
  );
}