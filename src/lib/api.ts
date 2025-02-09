import PocketBase from "pocketbase";
import { PB } from "./state";

export const PB_URL = 'https://amar-vote.pockethost.io'

export function ConnectPocketBase(url: string): void {
    const pb = new PocketBase(url);
    PB.set(pb);
}