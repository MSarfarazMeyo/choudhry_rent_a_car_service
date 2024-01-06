var express = require("express");
const { setResponse } = require("../../helpers/response.helper");
const { verifyAdmin, adminOnly } = require("../../middleware/verify");

const {
  CREATE_ADMIN,
  LOGIN_ADMIN,
  FIND_ALL_CARS,

  DELETE_CAR_BY_ID,
  CREATE_NEW_CAR,

  UPDATE_CAR_BY_ID,
  CREATE_CONTACT_INFO,
  GET_CONTECT_INFO,
  UPDATE_CONTACT_INFO,
} = require("./service");
var router = express.Router();

// auth

router.post("/create", async (req, res) => {
  try {
    const response = await CREATE_ADMIN(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.post("/login", async (req, res) => {
  try {
    const response = await LOGIN_ADMIN(req);
    setResponse(res, response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

// cars

router.post("/cars", verifyAdmin, adminOnly, async (req, res) => {
  try {
    const response = await CREATE_NEW_CAR(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.get("/cars", async (req, res) => {
  try {
    const users = await FIND_ALL_CARS(req);
    res.send(users);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.delete("/cars/:id", verifyAdmin, adminOnly, async (req, res) => {
  try {
    const response = await DELETE_CAR_BY_ID(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.patch("/cars/:id", verifyAdmin, adminOnly, async (req, res) => {
  try {
    const response = await UPDATE_CAR_BY_ID(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

//contact info
router.get("/contactInfo", async (req, res) => {
  try {
    const response = await GET_CONTECT_INFO(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "serverError", data: error.stack });
  }
});

router.patch("/contactInfo/:id", verifyAdmin, adminOnly, async (req, res) => {
  try {
    const response = await UPDATE_CONTACT_INFO(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

router.post("/contactInfo", async (req, res) => {
  try {
    const response = await CREATE_CONTACT_INFO(req);
    res.send(response);
  } catch (error) {
    setResponse(res, { type: "Error", data: error.stack });
  }
});

module.exports = router;
