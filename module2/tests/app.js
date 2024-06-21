const createServer = () => {
  const https = require("https");
  const url = require("url");
  const fs = require("fs");
  const options = {
    key: fs.readFileSync("module2/tests/key.pem"),
    cert: fs.readFileSync("module2/tests/cert.pem"),
  };
  const port = 4000;

  const server = https.createServer(options, (req, res) => {
    res.setHeader("Content-Type", "text/html");
    const { query } = url.parse(req.url, true);
    const date = query.year + " " + query.month;

    res.end(date);
  });

  server.listen(port, () => {
    console.log(`Server running 🚀 at https://localhost:${port}/`);
  });
};

//-------------------------------------------------------
const makeNasaRequest = () => {
  const https = require("https");

  https
    .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", (response) => {
      let data = "";

      // A chunk of data has been receisved.
      response.on("data", (chunk) => {
        data += chunk;
      });

      // The whole response has been received. Print out the result.
      response.on("end", () => {
        console.log(JSON.parse(data).explanation);
      });
    })
    .on("error", (error) => {
      console.log("Error: " + error.message);
    });
};

//-------------------------------------------------------
const callbackFunc = (err, result) => {
  if (err) {
    console.error(err);
    return;
  }

  console.log(result);
};

function square(num, callback) {
  if (typeof callback !== "function") {
    throw new TypeError(`Callback must be a function. Got: ${typeof callback}`);
  }

  // simulate async operation
  setTimeout(() => {
    if (typeof num !== "number") {
      // if an error occurs, it is passed as the first argument to the callback
      callback(new TypeError(`Expected number but got: ${typeof num}`));
      return;
    }

    const result = num * num;
    // callback is invoked after the operation completes with the result
    callback(null, result);
  }, 100);
}

//------------------------------------------------------
function squarePromise(num) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof num !== "number") {
        reject(new TypeError(`Expected number but got: ${typeof num}`));
      }

      const result = num * num;
      resolve(result);
    }, 100);
  });
}

//------------------------------------------------------
const { EventEmitter } = require("events");

function emitCount() {
  const emitter = new EventEmitter();

  let count = 0;
  // Async operation
  const interval = setInterval(() => {
    count++;
    if (count % 4 == 0) {
      emitter.emit(
        "error",
        new Error(`Something went wrong on count: ${count}`)
      );
      return;
    }
    emitter.emit("success", count);

    if (count === 10) {
      clearInterval(interval);
      emitter.emit("end");
    }
  }, 1000);

  return emitter;
}

// createServer();
// makeNasaRequest();
// square("8", "s");
// squarePromise(8)
//   .then((result) => console.log(result))
//   .catch((err) => console.error(err));
const counter = emitCount();

counter.on("success", (count) => {
  console.log(`Count is: ${count}`);
});

counter.on("error", (err) => {
  console.error(err.message);
});

counter.on("end", () => {
  console.info("Counter has ended");
});
