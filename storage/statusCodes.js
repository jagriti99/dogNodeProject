"use strict";

const CODES = {
  PROGRAM_ERROR: 0,
  NOT_FOUND: 1,
  INSERT_OK: 2,
  NOT_INSERTED: 3,
  ALREADY_IN_USE: 4,
  UPDATE_OK: 5,
  NOT_UPDATED: 6,
  REMOVE_OK: 7,
  NOT_REMOVED: 8,
};

const MESSAGES = {
  PROGRAM_ERROR: () => ({
    message: "Sorry! Error in our program",
    code: CODES.PROGRAM_ERROR,
    type: "error",
  }),
  NOT_FOUND: (number) => ({
    message: `No dog found with number`,
    code: CODES.NOT_FOUND,
    type: "error",
  }),
  INSERT_OK: (number) => ({
    message: `Dog number ${number} was inserted`,
    code: CODES.INSERT_OK,
    type: "info",
  }),
  NOT_INSERTED: () => ({
    message: "Dog number not inserted.",
    code: CODES.NOT_INSERTED,
    type: "error",
  }),
  ALREADY_IN_USE: (number) => ({
    message: `Dog number ${number} was already in use`,
    code: CODES.ALREADY_IN_USE,
    type: "error",
  }),
  UPDATE_OK: (number) => ({
    message: `Dog ${number} was updated`,
    code: CODES.UPDATE_OK,
    type: "info",
  }),
  NOT_UPDATED: () => ({
    message: "Dog data was not updated",
    code: CODES.NOT_UPDATED,
    type: "error",
  }),
  REMOVE_OK: (number) => ({
    message: `Dog${number} was removed`,
    code: CODES.REMOVE_OK,
    type: "info",
  }),
  NOT_REMOVED: (number) => ({
    message: `No dog found .Nothing removed`,
    code: CODES.NOT_REMOVED,
    type: "error",
  }),
};

module.exports = { CODES, MESSAGES };
