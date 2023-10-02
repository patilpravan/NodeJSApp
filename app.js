const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  //   console.log(req.url, req.method, req.headers);
  const url = req.url;
  const method = req.method;
  if (url == "/") {
    res.write("<html>");
    res.write(
      '<head><title>My First Server</title></head><body><form action="/message" method="POST"><input type="text" name="mes"><button type="submit">Submit</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunks", chunk);
      body.push(chunk);
    });
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parsedBody", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("messages.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  res.setHeader("Content-type", "text/html");
  res.write("<html>");
  res.write(
    "<head><title>My First Server</title></head><body><h1>Hello From my first server</h1></body>"
  );
  res.write("</html>");
  res.end();
});

server.listen(3000);
