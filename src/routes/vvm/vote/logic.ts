import PocketBase, { type RecordModel } from 'pocketbase';
import { PostsList, Voter, Votes } from '../state';
import { get } from 'svelte/store';
import { PB_URL } from '$lib/api';

export interface Candidate {
	name: string;
	image: string;
	icon: string;
	post: string;
	class: string;
	section: string;
	id: string;
	email: string;
}

export async function FetchCandidates(pb: PocketBase, house: string): Promise<void> {
	const data: RecordModel[] = await pb.collection('posts').getFullList(200, {
		expand: 'candidates, candidates.icon',
		filter: pb.filter(`house="Any"||house="${house}"`)
	});

	let posts: { [key: string]: Candidate[] } = {};
	console.log(data);

	for (let i = 0; i < data.length; i++) {
		const post: RecordModel = data[i];

		posts[post.title] = [];

		if (!Object.keys(post.expand!).length) continue;
		for (let j = 0; j < post.expand?.candidates.length; j++) {
			const candidate: RecordModel = post.expand?.candidates[j];

			posts[post.title].push({
				name: candidate.name,
				image: `${PB_URL}/api/files/${candidate.collectionId}/${candidate.id}/${candidate.image}`,
				icon: `${PB_URL}/api/files/${candidate.expand!.icon.collectionId}/${candidate.expand!.icon.id}/${candidate.expand!.icon.icon}`,
				post: post.title,
				class: candidate.class,
				section: candidate.section,
				id: candidate.id,
				email: candidate.email
			});
		}
	}

	console.log(posts);

	PostsList.set(posts);
}

export async function SubmitVote(pb: PocketBase): Promise<void> {
	const candidates: string[] = [];
	Object.values(get(Votes)).forEach(async (vote) => {
		candidates.push(vote.id);
		await pb.collection('candidates').update(vote.id, {
			'votes+': 1
		});
	});

	await pb.collection('votes').update(get(Voter)?.id!, {
		candidates
	});
}
