import { writable, type Writable } from 'svelte/store';

export const Deleting: Writable<boolean> = writable(false);
