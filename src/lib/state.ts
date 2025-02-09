import PocketBase from 'pocketbase';
import { writable, type Writable } from 'svelte/store';

export const PB: Writable<PocketBase> = writable();
export const LoggedIn: Writable<boolean> = writable(false);
