import PocketBase from 'pocketbase';
import { NumCandidates, NumPosts, NumVotes, NumVVMS } from './state';


export async function GetStaticData(pb: PocketBase) {
	NumPosts.set((await pb.collection('posts').getFullList()).length);
	NumCandidates.set((await pb.collection('candidates').getFullList()).length);
}

export async function GetDynamicData(pb: PocketBase) {
	// load first time
	NumVotes.set((await pb.collection('votes').getFullList()).length);

	await pb.collection('votes').subscribe('*', async () => {
		NumVotes.set((await pb.collection('votes').getFullList()).length);
	});

	try {
		NumVVMS.set((await pb.collection('vvm').getFullList()).length);
	} catch {}

	await pb.collection('vvm').subscribe('*', async () => {
		NumVVMS.set((await pb.collection('vvm').getFullList()).length);
	});
}

export async function UnsubscribeDynamic(pb: PocketBase) {
	pb.collection('votes').unsubscribe();
	pb.collection('vvm').unsubscribe();
}
