import { writable, type Writable } from 'svelte/store';

export const PositionsData: Writable<{ pos: string; can: number }[]> = writable([]);
export const ResultsData: Writable<{ pos: string; name: string; image: string; icon: string }[]> =
	writable([]);
export const AnalyticsData: Writable<
	{ pos: string; candidates: { name: string; image: string; icon: string; votes: string }[] }[]
> = writable([]);
