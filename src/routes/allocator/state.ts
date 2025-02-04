import { writable, type Writable } from "svelte/store";
interface VVM {
	id: string|undefined;
	machine_num: string|undefined;
}

export const Machine: Writable<VVM|undefined> = writable();