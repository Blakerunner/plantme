//const domain = "https://plantme.blakerunner/";
const domain = "http://localhost:8080/";
const endPointRoot = "api/v1/user";

const addRow = (data, rowCounter, responseTable) => {
    let newRow = `<tr>
      <th scope="row">${rowCounter}</th>
      <td>${data.name}</td>
    </tr>`;
    responseTable.innerHTML += newRow;
};

// Functions
const readPlants = () => {
  let url = new URL(domain + endPointRoot);
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
      const responseTable = document.getElementById("response_table_body");
      let rowCounter = 0;
      data.forEach((data) => {
        addRow(data, ++rowCounter, responseTable);
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

// Listener
document.addEventListener("DOMContentLoaded", readPlants);
