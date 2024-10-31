import dns from 'dns';

const getHostIP = async (domain) => {
  return new Promise((resolve, reject) => {
    dns.lookup(domain, (err, address) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(address);
      }
    });
  });
};

export default getHostIP;