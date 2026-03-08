import terser from '@rollup/plugin-terser';

export default {
    input: 'index.js',
    output: [
        {
            file: 'dist/tg-frontend-lib.js',
            format: 'umd',
            name: 'TabulaGames',
        },
        {
            file: 'dist/tg-frontend-lib.min.js',
            format: 'umd',
            name: 'TabulaGames',
            plugins: [terser()],
        },
    ],
};
