const http = require('http')
const path = require('path')
const fs = require('fs')
const fsPromises = require('fs').promises

const logEvents = require("./logEvent");
const EventEmitter = require("events");
class MyEmitter extends EventEmitter{};

const myEmitter = new MyEmitter();

const PORT = process.env.PORT || 3500;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(filePath, !contentType.includes("image") ? "utf8" : "");
        const data = contentType === "application/json"
            ? JSON.parse(rawData) : rawData;
        response.writeHead(
            filePath.includes("404.html") ? 404 : 200, 
            {"ContentType": contentType}); // this is by convention and standard and browser understands it and then parses the type of file accordingly (MIME - Multipurpose Internet Mail Extensions)
        response.end( contentType === "application/json" ? JSON.stringify(data) : data );
    } catch (er) {
        console.error(er);
        response.statusCode = 500; // server error
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";
    }

    let filePath = 
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, "views", "index.html")
            : contentType === "text/html" && req.url.slice(-1) === "/"
                ? path.join(__dirname, "views", req.url, "index.html")
                : contentType === "text/html"
                    ? path.join(__dirname, "views", req.url)
                    : path.join(__dirname, req.url);

    if (!extension && req.url.slice(-1) !== "/") filePath += ".html";

    const fileExists = fs.existsSync(filePath);
    if (fileExists) {
        //serve the file
        serveFile(filePath, contentType, res);

    } else {
        // 404(not found) or 301(redirect)
        // console.log(path.parse(filePath));
        switch (path.parse(filePath).base) {
            case "oldPage.html":
                res.writeHead(301, {"Location": "/newPage.html"});
                res.end();
                break;
            case "wwwPage.html":
                res.writeHead(301, {"Location": "/"});
                res.end();
                break;
            default:
                serveFile(path.join(__dirname, "views", "404.html"), "text/html", res);
        }
    }
});

server.listen(PORT, () => console.log(`Server is running at the port ${PORT}.`)) // At the end of server file


// myEmitter.on("log", (msg) => {logEvents(msg)});
// myEmitter.emit("log", "Log event emitted...");