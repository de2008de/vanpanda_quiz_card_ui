import { getRandomNumber } from "./mathHelper";

export const shuffleArray = array => {
    const newArray = array.slice(0);
    const length = newArray.length;
    const low = 0;
    for (let i = length - 1; i >= 0; i--) {
        const element = newArray[i];
        const randomIndex = getRandomNumber(low, i);
        newArray[i] = newArray[randomIndex];
        newArray[randomIndex] = element;
    }
    return newArray;
};
