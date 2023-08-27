function sleep(ms) { // why is this in here? good question buddy
  return new Promise(resolve => setTimeout(resolve, ms));
}