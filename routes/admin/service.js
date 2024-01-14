const {
  VIDEO_MODEL,
  PLAYLIST_MODEL,
  USER_MODEL,
  ADMIN_MODEL,
  CATEGORY_MODEL,
  CARS_MODEL,
  CONTACT_INFO_MODEL,
  MESSAGES_MODEL,
} = require("../../models");

const stytch = require("stytch");
const {
  hashPassword,
  generarteToken,
  comparewPassword,
} = require("../../helpers/user");

const client = new stytch.Client({
  project_id: process.env.STYTCH_PROJECT_ID,
  secret: process.env.STYTCH_SECRET,
  env:
    process.env.STYTCH_ENVIRONMENT === "development"
      ? stytch.envs.test
      : stytch.envs.live,
});

module.exports = {
  //...........................................................auth..................................................

  CREATE_ADMIN: async ({ body }) => {
    try {
      const reqData = body;

      if (reqData.password) {
        reqData.password = await hashPassword(reqData.password);
      }
      const user = await ADMIN_MODEL.findOne({ email: reqData.email });

      if (!user) {
        const data = await ADMIN_MODEL.create(reqData);
        return {
          type: "success",
          message: `Account created successfully`,
          data,
        };
      }

      return { type: "bad", message: `email already exist!` };
    } catch (error) {
      throw error;
    }
  },

  LOGIN_ADMIN: async ({ body }) => {
    try {
      const reqData = body;

      console.log("email", reqData.email);
      console.log("password", reqData.password);

      const user = await ADMIN_MODEL.findOne({ email: reqData.email });

      console.log("user", user);

      if (!user) {
        return { type: "bad", message: `Invalid email or password!` };
      }

      const isPaswordCompared = comparewPassword(
        reqData.password,
        user.password
      );

      console.log("isPaswordCompared", isPaswordCompared);

      // if (!isPaswordCompared) {
      //   return { type: "bad", message: `Invalid email or password!` };
      // }

      user.password = undefined;
      const account = JSON.parse(JSON.stringify(user));

      return {
        type: "success",
        message: `Login successfully`,
        data: { ...account, access_token: generarteToken(user) },
      };
    } catch (error) {
      throw error;
    }
  },

  //...........................................................users..................................................

  FIND_ALL_CARS: async (req) => {
    try {
      const cars = await CARS_MODEL.find();

      if (cars.length >= 1)
        return {
          type: "success",
          message: `users found`,
          data: cars,
        };

      return { type: "bad", message: `No Data Available`, data: [] };
    } catch (error) {
      throw error;
    }
  },

  UPDATE_CAR_BY_ID: async ({ params, body }) => {
    try {
      const { id } = params;
      const car = await CARS_MODEL.findOneAndUpdate({ _id: id }, body, {
        new: true,
      });

      if (user) return { type: "success", message: `user update`, data: car };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  DELETE_CAR_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const car = await CARS_MODEL.findByIdAndDelete({ _id: id });

      if (car) return { type: "success", message: `user deleted`, data: car };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  CREATE_NEW_CAR: async ({ body }) => {
    try {
      const car = new CARS_MODEL(body);
      const savedcar = await car.save();
      return {
        type: "success",
        message: `car created successfully`,
        data: savedcar,
      };
    } catch (error) {
      throw error;
    }
  },

  //.........................................contact info.........................

  UPDATE_CONTACT_INFO: async ({ params, body }) => {
    try {
      const { id } = params;
      const contactInfo = await CONTACT_INFO_MODEL.findOneAndUpdate(
        { _id: id },
        body,
        {
          new: true,
          upsert: true,
        }
      );

      if (contactInfo)
        return { type: "success", message: `user update`, data: contactInfo };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },

  GET_CONTECT_INFO: async (req) => {
    try {
      const contactInfo = await CONTACT_INFO_MODEL.find();

      if (contactInfo.length >= 1)
        return {
          type: "success",
          message: `contactInfo found`,
          data: contactInfo,
        };

      return { type: "bad", message: `No Data Available`, data: [] };
    } catch (error) {
      throw error;
    }
  },

  CREATE_CONTACT_INFO: async ({ body }) => {
    try {
      const info = new CONTACT_INFO_MODEL(body);
      const savedinfo = await info.save();
      return {
        type: "success",
        message: `car created successfully`,
        data: savedinfo,
      };
    } catch (error) {
      throw error;
    }
  },

  //...........................................................messages..................................................

  FIND_ALL_MESSAGES: async (req) => {
    try {
      const messages = await MESSAGES_MODEL.find();

      if (messages.length >= 1)
        return {
          type: "success",
          message: `Messages found`,
          data: messages,
        };

      return { type: "bad", message: `No Data Available`, data: [] };
    } catch (error) {
      throw error;
    }
  },

  CREATE_NEW_MESSAGE: async ({ body }) => {
    try {
      const newMessage = await MESSAGES_MODEL.create(body);
      const savedMessage = await newMessage.save();
      return {
        type: "success",
        message: `Message created successfully`,
        data: savedMessage,
      };
    } catch (error) {
      throw error;
    }
  },

  DELETE_MESSAGE_BY_ID: async ({ params }) => {
    try {
      const { id } = params;
      const message = await MESSAGES_MODEL.findByIdAndDelete({ _id: id });

      if (message)
        return { type: "success", message: `Message deleted`, data: message };

      return { type: "bad", message: `No Data Available` };
    } catch (error) {
      throw error;
    }
  },
};
