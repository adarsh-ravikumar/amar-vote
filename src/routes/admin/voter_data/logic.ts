import PocketBase from 'pocketbase';

export async function FetchVoterDataLength(pb: PocketBase): Promise<number> {
    return (await pb.collection("voter_data").getFullList()).length;    
}