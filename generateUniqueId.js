export const alphNumericName = () => {
    const id = Number(Math.random().toString() + Date.now().toString().substr(2))
      .toFixed(4)
      .split(".")[1];

    const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    const alpha = () => {
        const firstRandom = Number(Math.random().toString().split(".")[1].toString()[1]);
        const secondRandom = Number(Math.random().toString().split(".")[1].toString()[2]);
        const index = firstRandom + secondRandom > 25 ? firstRandom : firstRandom + secondRandom;
        return alphabet[index].toLocaleLowerCase();

    }
    return alpha().toLocaleUpperCase() + alpha() + alpha() + alpha() + '_' + id;
  };