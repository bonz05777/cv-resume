$(document).ready(function () {
  // Load data from datasource.txt using AJAX
  $.ajax({
    url: "datasource.txt",
    dataType: "json",
    success: function (data) {
      // Initialize DataTables for both tables with consistent options
      const options = {
        data: data.data,
        paging: true,
        scrollY: "200px",
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

      // Delete selected row in both tables
      document.querySelector("#button").addEventListener("click", function () {
        const selectedRowData1 = table1.row(".selected").data();
        const selectedRowData2 = table2.row(".selected").data();

        if (selectedRowData1) {
          table1.row(".selected").remove().draw(false);
          table2.rows().every(function () {
            if (this.data().toString() === selectedRowData1.toString()) {
              this.remove();
            }
          });
          table2.draw(false);
        }

        if (selectedRowData2) {
          table2.row(".selected").remove().draw(false);
          table1.rows().every(function () {
            if (this.data().toString() === selectedRowData2.toString()) {
              this.remove();
            }
          });
          table1.draw(false);
        }
      });

      // Column visibility toggle functionality
      document.querySelectorAll("a.toggle-vis").forEach((el) => {
        el.addEventListener("click", function (e) {
          e.preventDefault();
          const columnIdx = e.target.getAttribute("data-column");

          table1.column(columnIdx).visible(!table1.column(columnIdx).visible());
          table2.column(columnIdx).visible(!table2.column(columnIdx).visible());
        });
      });

      // Trigger table redraw when switching tabs to ensure correct column widths
      document
        .querySelectorAll('button[data-bs-toggle="tab"]')
        .forEach((tab) => {
          tab.addEventListener("shown.bs.tab", function (e) {
            table1.columns.adjust().draw();
            table2.columns.adjust().draw();
          });
        });
    },
    error: function (xhr, status, error) {
      console.error("Failed to load data:", error);
    },
  });
});
