import PocketBase from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
export const PB: Writable<PocketBase> = writable();
