import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
import type { VoterData } from '../allocator/logic';
import type { Candidate } from './vote/logic';

export const VVM: Writable<RecordModel | null> = writable(null);
export const Voter: Writable<VoterData | null> = writable(null);

export const PostsList: Writable<{ [key: string]: Candidate[] } | null> = writable(null);
export const Votes: Writable<{ [key: string]: Candidate }> = writable({});

export const CurrentPostIndex: Writable<number> = writable(0);
export const ShowModal: Writable<boolean> = writable(false);
