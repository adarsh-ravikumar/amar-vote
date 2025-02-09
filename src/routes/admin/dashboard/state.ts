import { writable, type Writable } from 'svelte/store';

export const NumPosts: Writable<number> = writable(0);
export const NumCandidates: Writable<number> = writable(0);
export const NumVotes: Writable<number> = writable(0);
export const NumVVMS: Writable<number> = writable(0);
