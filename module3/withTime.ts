import {EventEmitter} from "./emitter";

class WithTime extends EventEmitter {
    async execute(asyncFunc, ...args) {
        this.emit("begin");

        console.time(asyncFunc);
        const result = await asyncFunc(...args)
        console.timeEnd(asyncFunc);
        this.emit('data', result);

        this.emit("end");
    }
}

const fetchFromUrl = (url: string): Promise<string> => {
    return fetch(url)
        .then(response => response.json())
        .then(data => JSON.stringify(data, undefined, 2));
}


const withTime = new WithTime();

withTime.on('begin', () => console.log('About to execute'));
withTime.on('end', () => console.log('Done with execute'));
withTime.on('data', (data, code) => console.log(`Emitted data ${data}`))

withTime.execute(fetchFromUrl, 'https://jsonplaceholder.typicode.com/posts/1');

console.log(withTime.rawListeners("end"));

