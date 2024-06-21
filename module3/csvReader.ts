import csv from 'csvtojson/v2';
import * as fs from 'fs';


const inputFile = './csv/nodejs-hw1-ex1.csv';
const outputFile = './txt/output.txt';

csv()
    .fromFile(inputFile)
    .subscribe((json) => {
        return new Promise((resolve, reject) => {
            fs.appendFile(outputFile, JSON.stringify(json) + '\n', (err) => {
                if (err) {
                    console.error('There was an error writing the file', err);
                    reject(err);
                } else {
                    console.log('File has been written');
                    resolve();
                }
            });
        });
    });
