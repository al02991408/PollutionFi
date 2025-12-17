import { AirQualityData } from './api';

export type PollutionStatus = 'MINT' | 'ALERT' | 'NORMAL';

export interface AnalysisResult {
    status: PollutionStatus;
    message: string;
    details: {
        pm25: number;
        pm10: number;
        o3: number;
    };
}

// OMS Standards (approximate for logic)
const OMS_STANDARDS = {
    PM25: 5, // Annual mean is 5, 24h is 15. Using strict 5 for "Minting"
    PM10: 15, // Annual mean is 15, 24h is 45. Using strict 15 for "Minting"
    O3: 60, // Peak season is 60.
};

// Alert Thresholds (3x standard or high levels)
const ALERT_THRESHOLDS = {
    PM25: 15, // 3x 5
    PM10: 45, // 3x 15
    O3: 180, // 3x 60
};

export function analyzeAirQuality(data: AirQualityData): AnalysisResult {
    const pm25 = data.iaqi.pm25?.v || 0;
    const pm10 = data.iaqi.pm10?.v || 0;
    const o3 = data.iaqi.o3?.v || 0;

    // Check for Alert (High Pollution)
    if (pm25 >= ALERT_THRESHOLDS.PM25 || pm10 >= ALERT_THRESHOLDS.PM10 || o3 >= ALERT_THRESHOLDS.O3) {
        return {
            status: 'ALERT',
            message: 'Incumplimiento Normativo: Niveles críticos de contaminación detectados.',
            details: { pm25, pm10, o3 },
        };
    }

    // Check for Minting (Low Pollution / Good Air Quality)
    // Using a slightly more lenient check for "Minting" to make it achievable in demo, 
    // but keeping it close to OMS standards as requested (5-7 micras).
    // Let's use 7 for PM2.5 as the upper bound for "Minting" based on user request "5-7 micras".
    if (pm25 <= 7 && pm10 <= 20 && o3 <= 70) {
        return {
            status: 'MINT',
            message: 'Calidad del aire óptima. Función de Minting de recompensas ACTIVADA.',
            details: { pm25, pm10, o3 },
        };
    }

    return {
        status: 'NORMAL',
        message: 'Calidad del aire aceptable, pero no óptima para recompensas.',
        details: { pm25, pm10, o3 },
    };
}
