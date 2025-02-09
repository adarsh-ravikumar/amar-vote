import { spawn } from 'child_process';
import os from 'os';

const isWindows = os.platform() === 'win32';
const pbExec = isWindows ? 'pocketbase.exe' : 'pocketbase';
const pbPath = `./backend/${pbExec}`
const command: string = 'serve --http="192.168.1.241:8090"'; 

const pocketbaseProcess = spawn(pbPath, [command], {
  stdio: 'inherit',
  shell: true 
});

pocketbaseProcess.on('error', (error: { message: any; }) => {
  console.error(`Error starting Pocketbase: ${error.message}`);
});

pocketbaseProcess.on('exit', (code: string) => {
  console.log(`Pocketbase process exited with code ${code}`);
});
