import PocketBase from 'pocketbase';
import { CurrentPostIndex, PostsList, ShowModal, Voter, Votes, VVM } from './state';
import type { RecordModel } from 'pocketbase';
import { get } from 'svelte/store';
import { FetchCandidates } from './vote/logic';

interface SessionInfo {
	lastSessionNum: number;
	lastSessionID: string | null;
}

async function GetLastSessionInfo(): Promise<SessionInfo> {
	const lastSessionNum = localStorage.getItem('machine_num');
	let lastSessionID = localStorage.getItem('id');

	return {
		lastSessionID: lastSessionID,
		lastSessionNum: lastSessionNum ? JSON.parse(lastSessionNum) : 0
	};
}

function StoreSessionInfo(vvm: RecordModel): void {
	localStorage.setItem('machine_num', JSON.stringify(vvm.machine_num));
	localStorage.setItem('id', vvm.id);

	VVM.set(vvm);
}

async function ValidateMachineNumber(pb: PocketBase, num: number): Promise<number> {
	const nextNumberInList = (await pb.collection('vvm').getFullList()).length + 1;
	if (num === 0) return nextNumberInList;

	try {
		// if the try block executes without errors, that means the record exists and we can't use the
		// previous number. return new number
		const machineWithNum = await pb.collection('vvm').getList(1, 1, {
			filter: `machine_num = ${num}`
		});

		return nextNumberInList;
	} catch {
		// in case of a 404 error (which is the only error possible in this case) we can return the previous
		// number itself as it is not being used by other systems
		return num;
	}
}

export async function ConnectVVM(pb: PocketBase): Promise<void> {
	let { lastSessionNum, lastSessionID } = await GetLastSessionInfo();
	let num = await ValidateMachineNumber(pb, lastSessionNum);
	let vvm = undefined;

	try {
		if (lastSessionID) {
			vvm = await pb.collection('vvm').getOne(lastSessionID!);
		}
	} catch {
		vvm = await pb.collection('vvm').create({
			machine_num: num,
			voter: null,
			session_active: false
		});
	}

	StoreSessionInfo(vvm!);
}

export async function WatchForVoterInfo(pb: PocketBase): Promise<void> {
	const updateInfo = async (rec: any) => {
		VVM.update((e) => {
			e!.session_active = true;
			return e;
		});
		try {
			const voter = await pb
				.collection('votes')
				.getFirstListItem(`id = "${rec.voter}"`, { requestKey: null });

			Voter.set({
				id: rec.voter,
				name: voter.name,
				class: voter.class,
				section: voter.section,
				house: voter.house
			});

			await FetchCandidates(pb, voter.house);
		} catch {
			return;
		}
	};

	VVM.subscribe(async (vvm) => {
		if (!vvm) return;
		if (get(Voter)) return;

		if (vvm.session_active) {
			const voter = await pb.collection('vvm').getFirstListItem(`id="${vvm.id}"`);
			await updateInfo(voter);
		}
	});

	await pb.collection('vvm').subscribe('*', async (e) => {
		if (e.record.id !== get(VVM)!.id) return;

		if (e.action == 'update' && e.record.session_active) {
			await updateInfo(e.record);
		}

		if (e.action == 'update' && !e.record.session_active) {
			VVM.update((e) => {
				e!.session_active = false;
				return e;
			});
			Voter.set(null);
		}
	});
}

export async function LockVVM(pb: PocketBase): Promise<void> {
	await pb.collection('vvm').update(get(VVM)?.id!, {
		voter: [],
		session_active: false
	});

	// reset all states
	Voter.set(null);
	PostsList.set({});
	Votes.set({});
	CurrentPostIndex.set(0);
	ShowModal.set(false);
}
