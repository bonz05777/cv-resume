// Initialize DataTables for both tables with consistent options
const options = {
  ajax: "/js/datasource.txt",
  paging: true,
  scrollY: "200px", // Add vertical scrolling
  dom: '<"d-flex justify-content-center"p><"table"t><"bottom"l i><"clear">', // Custom positioning
  initComplete: function () {
    this.api()
      .columns()
      .every(function () {
        const column = this;
        const title = column.footer().textContent;

        // Create input element for individual column search
        const input = document.createElement("input");
        input.placeholder = title;
        column.footer().replaceChildren(input);

        // Event listener for column input search
        input.addEventListener("keyup", function () {
          if (column.search() !== input.value) {
            column.search(input.value).draw();
          }
        });
      });
  },
};

// Initialize both tables with the same options
const table1 = new DataTable("#example1", options);
const table2 = new DataTable("#example2", options);

// Row selection functionality for both tables
function handleRowSelection(table) {
  table.on("click", "tbody tr", (e) => {
    const classList = e.currentTarget.classList;

    if (classList.contains("selected")) {
      classList.remove("selected");
    } else {
      table
        .rows(".selected")
        .nodes()
        .each((row) => row.classList.remove("selected"));
      classList.add("selected");
    }
  });
}

handleRowSelection(table1);
handleRowSelection(table2);

// Function to get the active table (based on the active tab)
function getActiveTable() {
  // Check which tab is active by looking at the "show active" class
  if (document.querySelector("#tab-table1").classList.contains("active")) {
    return table1; // Return the DataTable instance for table 1
  } else {
    return table2; // Return the DataTable instance for table 2;
  }
}

// Delete selected row functionality
document.querySelector("#button").addEventListener("click", function () {
  const activeTable = getActiveTable(); // Get the active table
  activeTable.row(".selected").remove().draw(false); // Remove the selected row in the active table
});

// Column visibility toggle functionality (only for the active table)
document.querySelectorAll("a.toggle-vis").forEach((el) => {
  el.addEventListener("click", function (e) {
    e.preventDefault();

    const columnIdx = e.target.getAttribute("data-column");
    const activeTable = getActiveTable(); // Get the active table

    const column = activeTable.column(columnIdx); // Get the column for the active table
    column.visible(!column.visible()); // Toggle visibility for the active table only
  });
});

// Trigger table redraw when switching tabs to ensure correct column widths
document.querySelectorAll('button[data-bs-toggle="tab"]').forEach((tab) => {
  tab.addEventListener("shown.bs.tab", function (e) {
    const targetId = e.target.getAttribute("data-bs-target");
    if (targetId === "#tab-table1") {
      table1.columns.adjust().draw(false); // Adjust and redraw table1 when tab 1 is shown
    } else if (targetId === "#tab-table2") {
      table2.columns.adjust().draw(false); // Adjust and redraw table2 when tab 2 is shown
    }
  });
});
