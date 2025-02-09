import { PB_URL } from '$lib/api';
import PocketBase from 'pocketbase';
import { type RecordModel } from 'pocketbase';

export interface Candidate {
	id: string;
	name: string;
	class: string;
	votes: string;
	image: string;
	icon: string;
}

export async function GetPosts(
	pb: PocketBase
): Promise<{ title: string; candidates: Candidate[]; maxVotes: number; house: string }[]> {
	const sortOrder = ['Any', 'Rig', 'Yajur', 'Sama', 'Atharvana'];

	const posts = await pb.collection('posts').getFullList({ expand: 'candidates, candidates.icon' });
	posts.sort((a, b) => {
		return sortOrder.indexOf(a.house) - sortOrder.indexOf(b.house);
	});

	const data: { title: string; candidates: Candidate[]; maxVotes: number; house: string }[] = [];

	posts.forEach((post) => {
		const candidates: Candidate[] = [];
		let maxVotes = 0;

		(Object.keys(post.expand!).length > 0 ? post.expand!.candidates : []).forEach(
			(candidate: RecordModel) => {
				if (candidate.votes > maxVotes) maxVotes = candidate.votes;
				candidates.push({
					id: candidate.id,
					name: candidate.name,
					class: `${candidate.class} - ${candidate.section}`,
					votes: candidate.votes,
					image: `${PB_URL}/api/files/candidates/${candidate.id}/${candidate.image}`,
					icon: `${PB_URL}/api/files/icons/${candidate.expand!.icon.id}/${candidate.expand!.icon.icon}`
				});
			}
		);

		if (post.expand!.candidates)
			data.push({ title: post.title, candidates, maxVotes, house: post.house });
	});

	return data;
}
