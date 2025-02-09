import { writable, type Writable } from "svelte/store";

export const Page: Writable<string> = writable("")