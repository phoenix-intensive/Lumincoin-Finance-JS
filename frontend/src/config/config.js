const host = process.env.HOST;
const config = {
    host: host,
    api: host + '/api',


    type: {
        income: 'income',
        expense: 'expense',
    },
}

export default config;