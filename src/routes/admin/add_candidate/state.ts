import { writable, type Writable } from 'svelte/store';

export interface Candidate {
	name: string;
	email: string;
	image: string;
	post: string;
	class: string;
	section: string;
	icon: string;
}

export const Posts: Writable<{ [key: string]: string }> = writable({});
export const ShowModal: Writable<boolean> = writable(false);
export const CandidateData: Writable<Candidate | undefined> = writable(undefined);

