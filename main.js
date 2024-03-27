document.addEventListener("DOMContentLoaded", function() {
    let tableCreated = false; // identifier to check if theres a table already

    document.getElementById("loadAPI").addEventListener("click", function() {
        if (!tableCreated) {
            
            fetch('https://jsonplaceholder.typicode.com/todos/')
            .then(response => response.json())
            .then(data => {
                // get keys for table header
                var keys = ['userId', 'id', 'title', 'completed'];

                // create the table
                var table = document.createElement("table");

                // create the table header row
                var tableHeaderRow = document.createElement("tr");
                keys.forEach(function(key) {
                    var th = document.createElement("th");
                    if (key === 'userId') th.textContent = "User ID";
                    else if (key === 'id') th.textContent = "Task ID";
                    else if (key === 'title') th.textContent = "Title";
                    else if (key === 'completed') th.textContent = "Status";
                    tableHeaderRow.appendChild(th);
                });
                table.appendChild(tableHeaderRow);

                // create the table body rows
                data.forEach(function(item) {
                    var row = document.createElement("tr");
                    keys.forEach(function(key) {
                        var cell = document.createElement("td");
                        // set status
                        if (key === 'completed') {
                            cell.textContent = item[key] ? 'Completed' : 'Not yet Completed';
                        } else {
                            cell.textContent = item[key];
                        }
                        
                        if (key === 'completed') {
                            cell.style.color = item[key] ? 'green' : 'red';
                        }
                        row.appendChild(cell);
                    });
                    table.appendChild(row);
                });

                // add the table to the container
                var tableContainer = document.getElementById("tableContainer");
                tableContainer.innerHTML = ""; // clear previous table
                tableContainer.appendChild(table);
                tableCreated = true; // update table identifier to true
            })
            .catch(error => console.error('Error fetching data:', error));
        } else {
            alert("Table Already Exists!!");
        }
    });

    // clear table
    document.getElementById("clearTable").addEventListener("click", function() {
        var tableContainer = document.getElementById("tableContainer");
        tableContainer.innerHTML = ""; // clear the table content
        tableCreated = false; // reset the table identifier
    });
});