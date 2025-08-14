import mockData from './mock-data.json'
import axios from 'axios';

export async function getMatchingDatasets(offerId: string) {

    //const response = await axios.get('https://pistis-market.eu/srv/matchmaking-service/api/mms/${offerId}')
    const mockResponse = mockData
        
    return Object.values(mockResponse.data).slice(1);    
}