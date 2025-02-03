import PocketBase from "pocketbase";
import { PB } from "./state";

export const PB_URL = 'http://192.168.1.241:8090'

export function ConnectPocketBase(url: string): void {
    const pb = new PocketBase(url);
    PB.set(pb);
}