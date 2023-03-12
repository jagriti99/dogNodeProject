"use strict";

function adapt(item) {
  return Object.assign(item, {
    number: +item.number,
    name: item.name,
    breed: item.breed,
    length: +item.length,
    birth: +item.birth,
  });
}

module.exports = { adapt };
