import PocketBase, { type RecordModel } from 'pocketbase';
import { CandidatesList } from '../state';

export interface Candidate {
	name: string;
	image: string;
	icon: string;
	post: string;
	class: string;
	section: string;
}

export async function FetchCandidates(pb: PocketBase, house: string): Promise<void> {
	const data: RecordModel[] = await pb
		.collection('candidates')
		.getFullList(200, {
			expand: 'post',
			filter: pb.filter(
				`post.house="Any"||post.house="${house}"`
			)
		});

	let candidates: Candidate[] = [];

	for (let i = 0; i < data.length; i++) {
		const candidate = data[i];

		candidates.push({
			name: candidate.name,
			image: candidate.image,
			icon: candidate.icon,
			post: candidate.expand?.post?.title,
			class: candidate.class,
			section: candidate.section
		});
	}

	CandidatesList.set(candidates);
}
