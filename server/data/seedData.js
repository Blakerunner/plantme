const adminData = [
  { method: 'GET', endpoint: '/api/v1/user' },
  { method: 'PUT', endpoint: '/api/v1/user' },
  { method: 'DELETE', endpoint: '/api/v1/user' },
  { method: 'POST', endpoint: '/api/v1/auth/register' },
  { method: 'POST', endpoint: '/api/v1/auth/login' },
  { method: 'POST', endpoint: '/api/v1/auth/logout' },
  { method: 'GET', endpoint: '/api/v1/admin/endpointStats' },
  { method: 'GET', endpoint: '/api/v1/admin/seedDatabase' },
  { method: 'GET', endpoint: '/api/v1/plant' },
  { method: 'GET', endpoint: '/api/v1/plant/:id' },
  { method: 'POST', endpoint: '/api/v1/plant' },
  { method: 'PUT', endpoint: '/api/v1/plant' },
  { method: 'DELETE', endpoint: '/api/v1/plant' },
];

const plantData = [
  { name: 'beefsteak tomato' },
  { name: 'sun gold cherry tomato' },
  { name: 'brandywine tomato' },
  { name: 'roma tomato' },
];

const userData = [
  {
    email: 'user@gmail.com',
    password: '$2b$08$L3IqZnNuDZNifDrjlRmX.up7/RETM3382uM1EqyoAWWsS.lm84z4G',
    plantList: { ids: [1, 4] },
  }, //123123
  {
    email: 'admin@gmail.com',
    password: '$2b$08$ZwojdTVx6/gK34GMQcMmleS2Pb9NxTVULTqbexDX/eHY997PadUDi',
    isAdmin: true,
  }, //1234abcd
];

module.exports = {
  adminData,
  plantData,
  userData,
};
