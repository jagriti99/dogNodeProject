"use strict";

const path = require("path");
const express = require("express");
const app = express();

const { port, host, storage } = require("./serverConfig.json");

const Datastorage = require(path.join(
  __dirname,
  storage.storageFolder,
  storage.dataLayer
));

const dataStorage = new Datastorage();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "pages"));

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const menuPath = path.join(__dirname, "menu.html");

app.get("/", (req, res) => res.sendFile(menuPath));

app.get("/all", (req, res) =>
  dataStorage.getAll().then((data) => res.render("allDogs", { result: data }))
);

app.get("/getdog", (req, res) =>
  res.render("getDog", {
    title: "Get",
    header1: "Get",
    action: "/getdog",
  })
);

app.post("/getdog", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  const dogNumber = req.body.number;
  dataStorage
    .getOne(dogNumber)
    .then((dog) => res.render("dogPage", { result: dog }))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/inputform", (req, res) =>
  res.render("form", {
    title: "Add Dog",
    header1: "Add a new Dog",
    action: "/input",
    number: { value: "", readonly: "" },
    name: { value: "", readonly: "" },
    breed: { value: "", readonly: "" },
    length: { value: "", readonly: "" },
    birth: { value: "", readonly: "" },
  })
);

app.post("/input", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .insert(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/updateform", (req, res) =>
  res.render("form", {
    title: "Update Dog",
    header1: "Update dog data",
    action: "/updatedata",
    number: { value: "", readonly: "" },
    name: { value: "", readonly: "readonly" },
    breed: { value: "", readonly: "readonly" },
    length: { value: "", readonly: "readonly" },
    birth: { value: "", readonly: "readonly" },
  })
);

app.post("/updatedata", (req, res) => {
  if (!req.body) return res.sendStatus(500);

  dataStorage
    .getOne(req.body.number)
    .then((dog) =>
      res.render("form", {
        title: "Update Dog",
        header1: "Update dog data",
        action: "/update",
        number: { value: dog.number, readonly: "readonly" },
        name: { value: dog.name, readonly: "" },
        breed: { value: dog.breed, readonly: "" },
        length: { value: dog.length, readonly: "" },
        birth: { value: dog.birth, readonly: "" },
      })
    )
    .catch((error) => sendErrorPage(res, error));
});

app.post("/update", (req, res) => {
  if (!req.body) return res.statusCode(500);

  dataStorage
    .update(req.body)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.get("/removedog", (req, res) =>
  res.render("getDog", {
    title: "Remove",
    header1: "remove",
    action: "/removedog",
  })
);

app.post("/removedog", (req, res) => {
  if (!req.body) return res.statusCode(500);

  const dogNumber = req.body.number;
  dataStorage
    .remove(dogNumber)
    .then((status) => sendStatusPage(res, status))
    .catch((error) => sendErrorPage(res, error));
});

app.listen(port, host, () =>
  console.log(`Server ${host}:${port} listening...`)
);

function sendErrorPage(res, error, title = "Error", header1 = "Error") {
  sendStatusPage(res, error, title, header1);
}

function sendStatusPage(res, status, title = "Status", header1 = "Status") {
  return res.render("statusPage", { title, header1, status });
}
