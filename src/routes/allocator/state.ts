import { writable, type Writable } from "svelte/store";
interface VVM {
	id: string|undefined;
	machine_num: string;
}

export const Machine: Writable<VVM|undefined> = writable();