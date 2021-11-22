class StatReport {
  static statsObj = {
    // Counter for @Route api/v1/auth/register
    "POST:/api/v1/auth/register": 0,

    // Counter for @Route api/v1/auth/login
    "POST:/api/v1/auth/login": 0,

    // Counter for @Route api/v1/admin
    "GET:/api/v1/admin": 0,

    // Counter for @Route api/v1/admin/seed
    "GET:/api/v1/admin/seed": 0,

    // Counter for @Route api/v1/admin/create
    "POST:/api/v1/admin/create": 0,

    // Counter for @Route api/v1/user
    "GET:/api/v1/user": 0,

    // Counter for @Route api/v1/user/seed
    "GET:/api/v1/user/seed": 0,

    // Counter for @Route api/v1/user/create
    "POST:/api/v1/user/create": 0,

    // Counter for @Route api/v1/plant/plantId
    "GET:/api/v1/plant/plantId": 0,

    // Counter for @Route api/v1/plant/plantId
    "POST:/api/v1/plant/plantId": 0,

    // Counter for @Route api/v1/plant/plantId
    "DELETE:/api/v1/plant/plantId": 0,

    // Counter for @Route api/v1/plant/plantId
    "PUT:/api/v1/plant/plantId": 0,
  };
}

module.exports = StatReport;
