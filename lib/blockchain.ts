import { Alchemy, Network } from "alchemy-sdk";
import { keccak256, toUtf8Bytes, toBigInt, formatUnits } from "ethers";

const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

const blockCount = 10;
const alchemy = new Alchemy(settings);

const tokenAddress = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
const transferTopic = keccak256(toUtf8Bytes("Transfer(address,address,uint256)"));

export async function getChart1() {
  try {
    const latestBlockNumber = await alchemy.core.getBlockNumber();
    const firstBlockNumber = latestBlockNumber - blockCount + 1;

    const logPromises = Array.from({ length: blockCount }, (_, i) => {
      const blockNumber = firstBlockNumber + i;
      return alchemy.core.getLogs({
        address: tokenAddress,
        topics: [transferTopic],
        fromBlock: blockNumber,
        toBlock: blockNumber,
      }).then(logs => ({ blockNumber, logs }));
    });

    const logsPerBlock = await Promise.all(logPromises);

    return logsPerBlock.map(({ blockNumber, logs }) => {
      const totalVolume = logs.reduce((sum, log) => {
        return sum + toBigInt(log.data);
      }, BigInt(0));

      return {
        x: blockNumber,
        y: Math.round(Number(formatUnits(totalVolume, 6)) * 100) / 100,
      };
    });
  } catch (error) {
    console.error("Error in getChart1:", error);
    return [];
  }
}

export async function getChart2AndChart3() {
    const latestBlockNumber = await alchemy.core.getBlockNumber();
    const firstBlockNumber = latestBlockNumber - blockCount + 1;

    // Generate block numbers in ascending order (from smallest to latest)
    const blockNumbers = Array.from({ length: blockCount }, (_, i) => firstBlockNumber + i);

    // Fetch blocks ONCE in parallel
    const blocks = await Promise.all(blockNumbers.map(num => alchemy.core.getBlock(num)));

    // Chart 2: Extract (x, y) -> (blockNumber, baseFeePerGas)
    const chart2 = blocks.map(block => ({
        x: block.number, 
        y: Math.round((Number(block.baseFeePerGas) / 1e9) * 1000) / 1000 // Convert Wei to Gwei
    }));

    // Chart 3: Extract (blockNumber, y, baseFeeGwei, baseFeeIncrease, gasUsageIncrease)
    const chart3 = blocks.map((block, index) => {
        const gasUsageRatio = Math.round((Number(block.gasUsed) / Number(block.gasLimit)) * 100 * 100) / 100; // Gas Usage Ratio in %
        const baseFeeGwei = Math.round((Number(block.baseFeePerGas) / 1e9) * 1000) / 1000; // Base Fee in Gwei

        // **Fix**: Directly reference `blocks` instead of `chart3`
        const previousBaseFee = index > 0 
            ? Math.round((Number(blocks[index - 1].baseFeePerGas) / 1e9) * 1000) / 1000 
            : baseFeeGwei;

        return {
            x: block.number, 
            y: gasUsageRatio, // Gas Usage Ratio in %
            baseFeeGwei, // Base Fee in Gwei
            baseFeeIncrease: baseFeeGwei <= previousBaseFee, // True if Base Fee increased or stayed the same
            gasUsageIncrease: gasUsageRatio <= 50 // True if Gas Usage Ratio is >= 50%
        };
    });

    return { chart2, chart3 }; // Return as an object
}