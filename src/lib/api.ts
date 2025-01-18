import PocketBase from "pocketbase";
import { PB } from "./state";

export function ConnectPocketBase(url: string): void {
    const pb = new PocketBase(url);
    PB.set(pb);
}
