import PocketBase, { type RecordModel } from 'pocketbase';
import { Posts, type Candidate } from './state';

export async function FetchPosts(pb: PocketBase): Promise<void> {
	const posts = await pb.collection('posts').getFullList();
	if (!posts) return;

	const postList: { [key: string]: string } = {};
	posts.forEach((post: RecordModel) => {
		postList[post.id] = post.title;
	});

	Posts.set(postList);
}

export async function FetchIcon(pb: PocketBase): Promise<{ collection: string, id: string; icon: string }> {
	const icon = await pb.collection('icons').getFirstListItem('assigned = false');
	return { id: icon.id, collection: icon.collectionId, icon: icon.icon };
}

export async function RegisterCandidate(pb: PocketBase, data: Candidate): Promise<boolean> {
	const response = await fetch(data.image);
	const blob = await response.blob();
	const image = new File(
		[blob],
		`${data.name.toUpperCase().replaceAll(' ', '_')}_${data.post.toUpperCase().replaceAll(' ', '_')}.jpg`,
		{ type: 'image/jpeg' }
	);

	const form = new FormData();
	form.append('image', image);
	form.append('name', data.name);
	form.append('class', data.class);
	form.append('section', data.section);
	form.append('post', data.post);
	form.append('email', data.email);
	form.append('icon', data.icon);

	try {
		const created: RecordModel = await pb.collection('candidates').create(form);

		// update icon status
		await pb.collection("icons").update(data.icon, {
			assigned: true,
			assigned_to: created.id
		})
		
		return created ? true : false;
	} catch {
		return false;
	}
}
