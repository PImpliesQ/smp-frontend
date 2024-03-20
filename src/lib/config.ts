const dev = process.env.NODE_ENV !== 'production';

export const server = dev ? 'http://localhost:3000' : 'https://sustain-a-meal.willfp.com';

export const apiEndpoint = process.env.API_ENDPOINT!
