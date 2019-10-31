export const getRandomNumber = (low, high) => {
    return Math.floor(Math.random() * Math.floor(high + 1 - low) + low);
};
