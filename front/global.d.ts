// Inside global.d.ts
interface Ethereum {
  isMetaMask?: boolean;
  request<T = any>(args: { method: string; params?: Array<any> }): Promise<T>;
  // Add any other properties or methods you use from the ethereum object
}

interface Window {
  ethereum?: Ethereum;
}
