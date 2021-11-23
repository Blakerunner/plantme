const adminData = [
  { method: "GET", endpoint: "/api/v1/user/me" },
  { method: "POST", endpoint: "/api/v1/user" },
  { method: "DELETE", endpoint: "/api/v1/user" },
  { method: "POST", endpoint: "api/v1/auth/register" },
  { method: "POST", endpoint: "/api/v1/auth/login" },
  { method: "POST", endpoint: "/api/v1/auth/logout" },
  { method: "GET", endpoint: "/api/v1/admin/endpointStats" },
  { method: "GET", endpoint: "/api/v1/admin/seedDatabase" },
  { method: "GET", endpoint: "/api/v1/plant" },
  { method: "GET", endpoint: "/api/v1/plant/:id" },
  { method: "POST", endpoint: "/api/v1/plant" },
  { method: "PUT", endpoint: "/api/v1/plant" },
  { method: "DELETE", endpoint: "/api/v1/plant" },
];

module.exports = {
  adminData,
};
