import net from "net"
import chalk from "chalk";

async function scanPorts(target, ports) {
  console.log(`[${chalk.green.bold('INFO')}] Scanning Ports...`)
    for (const port of ports) {
      await scanTcpPort(target, port);
    }
  }
  
  function scanTcpPort(target, port) {
    return new Promise((resolve) => {
      const socket = new net.Socket();
      socket.setTimeout(1000); // 1-second timeout
  
      socket.on('connect', () => {
        console.log(`[${chalk.greenBright.bold('INFO')}] TCP Port ${chalk.yellow.bold(port)} is open`);
        socket.destroy();
        resolve();
      });
  
      socket.on('timeout', () => {
        socket.destroy();
        resolve();
      });
  
      socket.on('error', () => resolve());
      socket.connect(port, target);
    });
  }

export default scanPorts