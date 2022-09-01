const HOUR = 60 * 60;
const BLOCK_TIME = 14;

function blocksToHours(blocks: number): number {
  return Math.floor((blocks * BLOCK_TIME) / HOUR);
}

function hoursToBlocks(hours: number): number {
  return Math.floor((hours * HOUR) / BLOCK_TIME);
}

export { blocksToHours, hoursToBlocks };
