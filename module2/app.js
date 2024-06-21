const childProcess = require("child_process");
const fs = require("fs");
const os = require("os");

const refreshRate = 100;
const writingRate = 60_000;
const logfileName = "activityMonitor.log";

let commandOutput = "";

const getCommand = () => {
    let command = "";
    if (os.type().startsWith("Windows")) {
        command =
            "powershell \"Get-Process | Sort-Object CPU -Descending \
		| Select-Object -Property Name, CPU, WorkingSet -First 1 \
		| ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }\"";
    } else {
        command = "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1";
    }
    return command;
};

const runMonitor = () => {
    command = getCommand();
    return new Promise((resolve, reject) => {
        childProcess.exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(stderr);
            } else {
                resolve(stdout);
            }
        });
    });
};

const writeOutputToFile = (fileName) => {
    fs.appendFile(fileName, commandOutput.toString(), (err) => {
        if (err) throw console.error("Error during appending file");
    });
    commandOutput = "";
};

setInterval(() => {
    runMonitor()
        .then((result) => {
            console.clear();
            commandOutput += result;
            console.log(result);
        })
        .catch((err) => console.error(err));
}, refreshRate);

setInterval(() => {
    writeOutputToFile(logfileName);
}, writingRate);
