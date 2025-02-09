import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
import type { Candidate } from './logic';

export const Posts: Writable<
	{ title: string; candidates: Candidate[]; maxVotes: number; house: string }[]
> = writable([]);
