import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
import type { VoterData } from '../allocator/logic';

export const VVM: Writable<RecordModel | null> = writable(null);
export const Voter: Writable<VoterData | null> = writable(null);
