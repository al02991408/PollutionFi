"use client"

import { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { useAccount, useConnect, useDisconnect, useWriteContract, useWaitForTransactionReceipt, useReadContract } from 'wagmi';
import { parseEther, getAddress } from 'viem';

const mapContainerStyle = {
  width: '100%',
  height: '500px'
};

const center = {
  lat: 25.5,
  lng: -100.3
};

const POLU_TOKEN_ADDRESS = (process.env.NEXT_PUBLIC_POLU_TOKEN_ADDRESS || '0x5FbDB2315678afecb367f032d93F642f64180aa3') as `0x${string}`
const REWARDS_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_REWARDS_CONTRACT_ADDRESS || '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512') as `0x${string}`
const OWNER_ADDRESS = getAddress('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266')

const REWARDS_ABI = [
  {
    name: 'distributeRewards',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'companyAddr', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'reason', type: 'string' }
    ],
    outputs: []
  },
  {
    name: 'registerCompany',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'companyAddr', type: 'address' },
      { name: 'name', type: 'string' }
    ],
    outputs: []
  },
  {
    name: 'companies',
    type: 'function',
    stateMutability: 'view',
    inputs: [{ name: '', type: 'address' }],
    outputs: [
      { name: 'name', type: 'string' },
      { name: 'totalRewards', type: 'uint256' },
      { name: 'lastRewardDate', type: 'uint256' }
    ]
  },
  {
    name: 'owner',
    type: 'function',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'address' }]
  }
] as const
function BlockchainDemo() {
  const [mounted, setMounted] = useState(false)
  const { address, isConnected } = useAccount()
  const { connect, connectors, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  
  const { data: registerHash, writeContract: writeRegister, isPending: isRegistering, error: registerError } = useWriteContract()
  const { data: distributeHash, writeContract: writeDistribute, isPending: isDistributing, error: distributeError } = useWriteContract()
  
  const { isLoading: isConfirmingRegister, isSuccess: isRegisteredConfirmed, error: registerConfirmError } = useWaitForTransactionReceipt({ hash: registerHash })
  const { isLoading: isConfirmingDistribute, isSuccess: isDistributeConfirmed, error: distributeConfirmError } = useWaitForTransactionReceipt({ hash: distributeHash })

  const hash = distributeHash || registerHash
  const isPending = isRegistering || isDistributing
  const isConfirming = isConfirmingRegister || isConfirmingDistribute
  const isConfirmed = isDistributeConfirmed
  const writeError = distributeError || registerError
  const confirmError = distributeConfirmError || registerConfirmError

  const { data: contractOwner } = useReadContract({
    address: REWARDS_CONTRACT_ADDRESS,
    abi: REWARDS_ABI,
    functionName: 'owner',
    query: { enabled: mounted && isConnected }
  })

  const isOwner = mounted && address && contractOwner && getAddress(address).toLowerCase() === getAddress(contractOwner as string).toLowerCase()

  const { data: companyData } = useReadContract({
    address: REWARDS_CONTRACT_ADDRESS,
    abi: REWARDS_ABI,
    functionName: 'companies',
    args: address ? [address] : undefined,
    query: { enabled: mounted && !!address && isConnected }
  })

  const isRegistered = companyData && (companyData as any)[0]?.length > 0

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleConnect = () => {
    if (connectors && connectors.length > 0) {
      connect({ connector: connectors[0] })
    } else {
      console.error('No connectors available. Make sure MetaMask is installed.')
    }
  }

  const handleClaimRewards = () => {
    if (!isConnected || !address) {
      handleConnect()
      return
    }

    if (!isOwner) {
      alert(`Only the contract owner can claim rewards.\n\nYour account: ${address}\nContract owner: ${contractOwner || 'Loading...'}`)
      return
    }

    if (!contractOwner) {
      alert('Error: Could not read contract owner. Make sure contracts are deployed.')
      return
    }

    if (!isRegistered) {
      writeRegister({
        address: REWARDS_CONTRACT_ADDRESS,
        abi: REWARDS_ABI,
        functionName: 'registerCompany',
        args: [address, 'Owner Account']
      })
      return
    }

    writeDistribute({
      address: REWARDS_CONTRACT_ADDRESS,
      abi: REWARDS_ABI,
      functionName: 'distributeRewards',
      args: [address, parseEther('100'), 'Demo emission reduction']
    })
  }

  if (!mounted) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="font-semibold text-black mb-4">Sistema de Recompensas POLU</h3>
        <div className="space-y-3">
          <button
            className="w-full bg-[#0457A3] text-white py-3 px-4 rounded-lg mb-3 hover:bg-[#034488] transition-colors font-medium"
            disabled
          >
            Conectar Wallet
          </button>
        </div>
        <div className="mt-4 p-3 bg-[#F9F9F9] rounded-lg">
          <p className="text-sm text-black font-medium">Contratos Desplegados</p>
          <p className="text-xs text-black break-all">POLU: {POLU_TOKEN_ADDRESS.slice(0, 7)}...{POLU_TOKEN_ADDRESS.slice(-4)}</p>
          <p className="text-xs text-black break-all">Rewards: {REWARDS_CONTRACT_ADDRESS.slice(0, 7)}...{REWARDS_CONTRACT_ADDRESS.slice(-4)}</p>
          <p className="text-xs text-black">Network: Localhost (Hardhat)</p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="font-semibold text-black mb-4">Sistema de Recompensas POLU</h3>
      
      {!isConnected ? (
        <div className="space-y-3">
          <button
            onClick={handleConnect}
            className="w-full bg-[#0457A3] text-white py-3 px-4 rounded-lg mb-3 hover:bg-[#034488] transition-colors font-medium"
          >
            Conectar Wallet
          </button>
          {connectError && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">❌ Error al conectar: {connectError.message}</p>
              <p className="text-xs text-red-600 mt-1">Asegúrate de tener MetaMask instalado y Hardhat corriendo en localhost:8545</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-green-800 font-medium">✅ Wallet Conectada</p>
            <p className="text-xs text-green-600 break-all mt-1">{address}</p>
            {contractOwner && (
              <p className="text-xs text-gray-600 mt-1">Owner del contrato: {String(contractOwner).slice(0, 6)}...{String(contractOwner).slice(-4)}</p>
            )}
            {isOwner && (
              <p className="text-xs text-blue-600 mt-1">👑 Cuenta Owner detectada</p>
            )}
            {!isOwner && address && contractOwner && (
              <p className="text-xs text-yellow-600 mt-1">⚠️ Solo el owner puede reclamar recompensas. Tu cuenta: {address.slice(0, 6)}...{address.slice(-4)}</p>
            )}
            {isOwner && isRegistered && (
              <p className="text-xs text-green-600 mt-1">✓ Cuenta registrada</p>
            )}
          </div>

          <button 
            onClick={handleClaimRewards}
            disabled={isPending || isConfirming || !isOwner}
            className="w-full bg-[#74CAE6] text-black py-3 px-4 rounded-lg hover:bg-[#5cb8d6] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending || isConfirming ? 'Procesando transacción...' : isOwner ? 'Reclamar 100 POLU' : 'Solo Owner puede reclamar'}
          </button>

          {writeError && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800 font-medium">❌ Error en la transacción</p>
              <p className="text-xs text-red-600 break-all mt-1">{writeError.message}</p>
            </div>
          )}

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

          {confirmError && (
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <p className="text-sm text-red-800">❌ Error al confirmar: {confirmError.message}</p>
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
        <p className="text-xs text-black break-all">POLU: {POLU_TOKEN_ADDRESS.slice(0, 7)}...{POLU_TOKEN_ADDRESS.slice(-4)}</p>
        <p className="text-xs text-black break-all">Rewards: {REWARDS_CONTRACT_ADDRESS.slice(0, 7)}...{REWARDS_CONTRACT_ADDRESS.slice(-4)}</p>
        <p className="text-xs text-black">Network: Localhost (Hardhat)</p>
        <p className="text-xs text-gray-500 mt-1">Owner: {OWNER_ADDRESS.slice(0, 6)}...{OWNER_ADDRESS.slice(-4)}</p>
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

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalPOLU(prev => prev + 150);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (map && window.google) {
      const industrialZones = [
        { lat: 25.69, lng: -100.32, intensity: 0.9 },
        { lat: 25.75, lng: -100.30, intensity: 0.8 },
        { lat: 25.78, lng: -100.19, intensity: 0.7 },
        { lat: 25.67, lng: -100.31, intensity: 0.6 },
      ];

      const heatmapData = [
        ...industrialZones.flatMap(zone => [
          { location: new google.maps.LatLng(zone.lat, zone.lng), weight: zone.intensity },
          { location: new google.maps.LatLng(zone.lat + 0.02, zone.lng + 0.02), weight: zone.intensity * 0.8 },
          { location: new google.maps.LatLng(zone.lat - 0.02, zone.lng - 0.02), weight: zone.intensity * 0.8 },
          { location: new google.maps.LatLng(zone.lat + 0.015, zone.lng - 0.015), weight: zone.intensity * 0.6 },
        ]),
        ...sensors.filter(s => s.type === "urban").map(sensor => ({
          location: new google.maps.LatLng(sensor.position.lat, sensor.position.lng),
          weight: 0.4
        })),
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

      return () => {
        heatmap.setMap(null);
      };
    }
  }, [map, sensors]);



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

      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h2 className="text-xl font-semibold text-black mb-2">Mapa de Calor - Calidad del Aire en Nuevo León</h2>
        <p className="text-sm text-black mb-4">Focos rojos indican zonas industriales con alta polución</p>
        
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
            {sensors.map(sensor => (
              <Marker
                key={sensor.id}
                position={sensor.position}
                icon={{
                  url: `data:image/svg+xml;base64,${btoa(`
                    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="15" fill="${
                        sensor.aqi >= 70 ? '#10B981' :
                        sensor.aqi >= 50 ? '#F59E0B' :
                        '#EF4444'
                      }" stroke="white" stroke-width="3"/>
                      <text x="20" y="25" text-anchor="middle" fill="white" font-weight="bold" font-size="12">${sensor.aqi}</text>
                    </svg>
                  `)}`
                }}
                onClick={() => setSelectedSensor(sensor)}
              />
            ))}

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

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex gap-6 justify-center flex-wrap">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="font-semibold text-black mb-4">Detalle de Sensores en NL (Datos Crudos)</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {sensors.map(sensor => (
              <div 
                key={sensor.id} 
                className="flex justify-between items-center p-3 bg-[#F9F9F9] rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedSensor(sensor)}
              >
                <div className="flex-1">
                  <p className="font-medium text-black">{sensor.name}</p>
                  <p className="text-sm text-black">{sensor.address}</p>
                  <div className="flex gap-4 mt-1">
                    <p className="text-sm text-black">PM2.5: <span className="font-bold">{sensor.pm25}μg/m³</span></p>
                    <p className="text-sm text-black">PM10: <span className="font-bold">{(sensor.pm25 * 2).toFixed(1)}μg/m³</span></p>
                  </div>
                </div>
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

        <BlockchainDemo />
      </div>

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
