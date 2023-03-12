"use strict";

const { CODES, MESSAGES } = require("./statusCodes");

const {
  getAllFromStorage,
  getFromStorage,
  addToStorage,
  updateStorage,
  removeFromStorage,
} = require("./storageLayer");

module.exports = class Datastorage {
  get CODES() {
    return CODES;
  }

  getAll() {
    return getAllFromStorage();
  }

  getOne(number) {
    return new Promise(async (resolve, reject) => {
      if (!number) {
        reject(MESSAGES.NOT_FOUND("---empty---"));
      } else {
        const result = await getFromStorage(number);
        if (result) {
          resolve(result);
        } else {
          reject(MESSAGES.NOT_FOUND(number));
        }
      }
    });
  }

  insert(dog) {
    return new Promise(async (resolve, reject) => {
      if (dog) {
        if (!dog.number) {
          reject(MESSAGES.NOT_INSERTED());
        } else if (await getFromStorage(dog.number)) {
          reject(MESSAGES.ALREADY_IN_USE(dog.number));
        } else if (await addToStorage(dog)) {
          resolve(MESSAGES.INSERT_OK(dog.number));
        } else {
          reject(MESSAGES.NOT_INSERTED());
        }
      } else {
        reject(MESSAGES.NOT_INSERTED());
      }
    });
  }

  update(dog) {
    return new Promise(async (resolve, reject) => {
      if (dog) {
        if (await updateStorage(dog)) {
          resolve(MESSAGES.UPDATE_OK(dog.number));
        } else {
          reject(MESSAGES.NOT_UPDATED());
        }
      } else {
        reject(MESSAGES.NOT_UPDATED());
      }
    });
  }

  remove(number) {
    return new Promise(async (resolve, reject) => {
      if (!number) {
        reject(MESSAGES.NOT_FOUND("not found"));
      } else if (await removeFromStorage(number)) {
        resolve(MESSAGES.REMOVE_OK(number));
      } else {
        reject(MESSAGES.NOT_REMOVED(number));
      }
    });
  }
};
