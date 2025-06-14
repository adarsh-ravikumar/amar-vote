import { writable, type Writable } from "svelte/store";

export const RequestedUpload: Writable<boolean> = writable(false);