export const getRandomDate = (): string => new Date(new Date().getTime() * Math.random()).toISOString();
