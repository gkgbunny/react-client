const getRandomNumber = (max) => {
  const rand = Math.floor(Math.random() * max);
  return rand;
};

const getNextRoundRobin = (total, current) => {
  if (current === total - 1) {
    return 0;
  }
  return (current + 1);
};

export { getRandomNumber, getNextRoundRobin };
