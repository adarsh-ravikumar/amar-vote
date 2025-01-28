import type { RecordModel } from 'pocketbase';
import type PocketBase from 'pocketbase';
import { Machine } from './state';
import { get } from 'svelte/store';

export interface VoterData {
	id: string | undefined;
	name: string;
	class: string;
	section: string;
	house: string;
}

export async function CreateVoter(pb: PocketBase, data: VoterData): Promise<VoterData> {
	// create a voter object with name class section and house
	const voter = await pb.collection('votes').create(data);
	data.id = voter.id;

	return data;
}

export async function WaitForVVM(pb: PocketBase): Promise<void> {
	let freeMachine: RecordModel | undefined = undefined;

	Machine.set({ id: undefined, machine_num: '0' });
	await pb.collection('vvm').subscribe('*', (e) => {
		if (e.action == 'update' && e.record.session_active == false) {
			freeMachine = e.record;
			Machine.set({ id: freeMachine!.id, machine_num: freeMachine!.machine_num });
		}
	});
}

export async function GetVVM(pb: PocketBase): Promise<void> {
	let freeMachine: RecordModel | undefined = undefined;

	freeMachine = (
		await pb.collection('vvm').getList(1, 50, {
			fitler: 'session_active = false'
		})
	).items[0];

	if (!freeMachine.session_active) {
		Machine.set({ id: freeMachine!.id, machine_num: freeMachine!.machine_num });
	} else {
		await WaitForVVM(pb);
	}
}

export async function SendVoterData(pb: PocketBase, data: VoterData): Promise<void> {
	let machine = get(Machine);

	if (!machine) return;
	await pb.collection('vvm').update(machine.id!, {
		voter: data.id,
		session_active: true
	});

	await pb.collection('votes').update(data.id!, {
		machine_id: machine.id,
		machine_num: machine.machine_num
	});
}

