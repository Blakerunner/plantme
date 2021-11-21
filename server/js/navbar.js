document.getElementById("navhead").innerHTML = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand m-1 h1" href="./index.html">PlantMe</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <a class="nav-link ${
            window.location.pathname == "/index.html" ? "active" : ""
          }" aria-current="page" href="./index.html">Index</a>
          <a class="nav-link ${
            window.location.pathname == "/login.html" ? "active" : ""
          }" href="./login.html">Login</a>
          <a class="nav-link ${
            window.location.pathname == "/user.html" ? "active" : ""
          }" href="./user.html">User</a>
          <a class="nav-link ${
            window.location.pathname == "/admin.html" ? "active" : ""
          }" href="./admin.html">Admin</a>
        </div>
      </div>
    </div>
  </nav>`;

let noStorageMessage =
  "Web Storage is not supported in this browser.\r This page will not function as intended.";
if (typeof Storage === "undefined") {
  window.alert(noStorageMessage);
}
