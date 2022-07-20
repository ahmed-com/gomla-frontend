import axios from 'axios';
import { map } from 'ramda';
import { GeoPoint } from '../types/GeoPoint.type';

const API_KEY: string = import.meta.env.VITE_LOCATIONIQ_ACCESS_TOKEN;
const BASE_URL: string = 'https://api.locationiq.com/v1/autocomplete';

export const addressToLocations = async (
	address: string
): Promise<(GeoPoint & { display_name: string })[]> => {
	const q: URLSearchParams = new URLSearchParams();
	q.append('key', API_KEY);
	q.append('q', address);
	q.append('format', 'json');
	const url: string = `${BASE_URL}?${q.toString()}`;
	const { data } = await axios.get(url);
	return map((x: any) => ({
		lat: x.lat,
		lng: x.lon,
		display_name: x.display_name,
	}))(data);
};
