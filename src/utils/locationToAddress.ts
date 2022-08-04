import axios from 'axios'
import { GeoPoint } from '../types/GeoPoint.type';

const API_KEY: string = import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN;
const REGION: string = import.meta.env.VITE_LOCATIONIQ_REGION;
const BASE_URL: string = `https://${REGION}.locationiq.com/v1/reverse`;

export const locationToAddress = async (p: GeoPoint): Promise<string>=>{
    const q: URLSearchParams = new URLSearchParams();
    q.append('key',API_KEY);
    q.append('lat', p.lat + '');
    q.append('lon', p.lng + '');
    q.append('format', 'json');
    const url: string = `${BASE_URL}?${q.toString()}`;
    const { data } = await axios.get(url)
    return data.display_name;
}