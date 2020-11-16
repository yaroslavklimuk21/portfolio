function shuffle(array) {
  let shuffleDone = 0;
  while (shuffleDone === 0) {
    array.sort(() => Math.random() - 0.5);
    let sum = 0;

    for (let i = 0; i < 14; i += 1) {
      const firstValue = array[i] + 1;
      for (let j = i + 1; j <= 14; j += 1) {
        const secondValue = array[j] + 1;
        if (firstValue > secondValue) {
          sum += 1;
        }
      }
    }
    sum += 4;
    if (sum % 2 === 0) {
      shuffleDone = 1;
    }
  }
}
export default shuffle;
