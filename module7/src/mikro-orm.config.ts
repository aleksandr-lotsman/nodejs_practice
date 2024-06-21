module.exports = {
    dbName: 'node_gmp',
    user: 'node_gmp',
    type: 'postgresql',
    password: 'password123',
    debug: process.env.NODE_ENV !== 'production',
    entities: ['./dist/**/schemas/*'],
    entitiesTs: ['./src/**/schemas/*'],
    allowGlobalContext: true,
    module: 'commonjs',
    seeder: {
        path: './dist/seeder/',
        pathTs: './src/seeder/',
        defaultSeeder: 'DBSeeder',
        glob: '!(*.d).{js,ts}', // how to match seeder files (all .js and .ts files, but not .d.ts)
        emit: 'ts', // seeder generation mode
    }
}
