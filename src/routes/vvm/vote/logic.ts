import PocketBase, { type RecordModel } from 'pocketbase';
import { PostsList } from '../state';

export interface Candidate {
	name: string;
	image: string;
	icon: string;
	post: string;
	class: string;
	section: string;
	id: string;
}

export async function FetchCandidates(pb: PocketBase, house: string): Promise<void> {
	const data: RecordModel[] = await pb.collection('posts').getFullList(200, {
		expand: 'candidates',
		filter: pb.filter(`house="Any"||house="${house}"`)
	});

	let posts: { [key: string]: Candidate[] } = {};

	for (let i = 0; i < data.length; i++) {
		const post: RecordModel = data[i];

		posts[post.title] = [];

		for (let j = 0; j < post.expand?.candidates.length; j++) {
			const candidate: RecordModel = post.expand?.candidates[j];

			posts[post.title].push({
				name: candidate.name,
				image: candidate.image,
				icon: candidate.icon,
				post: post.title,
				class: candidate.class,
				section: candidate.section,
				id: candidate.id
			});
		}
	}

	PostsList.set(posts);
}
