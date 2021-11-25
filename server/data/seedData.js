const bcrypt = require("bcrypt");

const randomInt = () => {
  return Math.floor(Math.random() * 20);
};

const adminData = [
  { method: "GET", endpoint: "/api/v1/user", requests: randomInt() },
  { method: "PUT", endpoint: "/api/v1/user", requests: randomInt() },
  { method: "DELETE", endpoint: "/api/v1/user", requests: randomInt() },
  { method: "POST", endpoint: "/api/v1/auth/register", requests: randomInt() },
  { method: "POST", endpoint: "/api/v1/auth/login", requests: randomInt() },
  { method: "POST", endpoint: "/api/v1/auth/logout", requests: randomInt() },
  {
    method: "GET",
    endpoint: "/api/v1/admin/endpointStats",
    requests: randomInt(),
  },
  {
    method: "GET",
    endpoint: "/api/v1/admin/seedDatabase",
    requests: randomInt(),
  },
  { method: "GET", endpoint: "/api/v1/plant", requests: randomInt() },
  { method: "GET", endpoint: "/api/v1/plant/:id", requests: randomInt() },
  { method: "POST", endpoint: "/api/v1/plant", requests: randomInt() },
  { method: "PUT", endpoint: "/api/v1/plant", requests: randomInt() },
  { method: "DELETE", endpoint: "/api/v1/plant", requests: randomInt() },
];

const plantData = [
  { name: "beefsteak tomato" },
  { name: "sun gold cherry tomato" },
  { name: "brandywine tomato" },
  { name: "roma tomato" },
];

const userData = [
  {
    email: "user@gmail.com",
    password: "$2b$08$L3IqZnNuDZNifDrjlRmX.up7/RETM3382uM1EqyoAWWsS.lm84z4G",
    plantList: { ids: [1, 4] },
  }, //123123
  {
    email: "admin@gmail.com",
    password: "$2b$08$ZwojdTVx6/gK34GMQcMmleS2Pb9NxTVULTqbexDX/eHY997PadUDi",
    isAdmin: true,
  }, //1234abcd
];

module.exports = {
  adminData,
  plantData,
  userData,
};