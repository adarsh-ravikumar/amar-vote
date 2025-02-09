import { writable, type Writable } from 'svelte/store';

export const RefreshTable: Writable<boolean> = writable(false);
