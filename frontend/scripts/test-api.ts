import { fetchAirQualityData } from '../src/lib/api';
import { analyzeAirQuality } from '../src/lib/pollutionLogic';

async function test() {
    console.log('Testing WAQI API Integration...');
    const data = await fetchAirQualityData('monterrey');

    if (data) {
        console.log('✅ API Fetch Successful');
        console.log(`City: ${data.city.name}`);
        console.log(`AQI: ${data.aqi}`);
        console.log(`PM2.5: ${data.iaqi.pm25?.v}`);

        const analysis = analyzeAirQuality(data);
        console.log('\nTesting Pollution Logic...');
        console.log(`Status: ${analysis.status}`);
        console.log(`Message: ${analysis.message}`);
    } else {
        console.error('❌ API Fetch Failed');
    }
}

test();
