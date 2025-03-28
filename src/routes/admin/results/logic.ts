import PocketBase, { type RecordModel } from 'pocketbase';
import { Deleting } from './state';

export async function ResetData(pb: PocketBase, resetPosts: boolean, resetVote: boolean) {
	Deleting.set(true);

	(await pb.collection('vvm').getFullList({ requestKey: null })).forEach(
		async (rec: RecordModel) => {
			await pb.collection('vvm').delete(rec.id);
		}
	);

	if (resetPosts) {
		(await pb.collection('candidates').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('candidates').delete(rec.id);
			}
		);

		(await pb.collection('posts').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('posts').delete(rec.id);
			}
		);

		(await pb.collection('icons').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('icons').delete(rec.id);
			}
		);
	}

	if (resetVote) {
		(await pb.collection('votes').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('votes').delete(rec.id);
			}
		);

		(await pb.collection('candidates').getFullList({ requestKey: null })).forEach(
			async (rec: RecordModel) => {
				await pb.collection('candidates').update(rec.id, {
					votes: 0
				});
			}
		);
	}

	Deleting.set(false);
}
