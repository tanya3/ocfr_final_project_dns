var expCertReportApp = new Vue({
  el: '#expCertReportApp',
  data: {
    member_cert: [],
    filter: {
      cert: ''
    },
    certifications: []
  },
  methods: {
    fetchExpCert() {
      fetch('api/exp_cert_report/fetchExpCert.php')
      .then(response => response.json())
      .then(json => { expCertReportApp.member_cert = json });
    },
    fetchCert() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { expCertReportApp.certifications = json })
    },
    certActive(endDate) {
      if(moment(endDate)<moment()) {
        return 0;
      }
      else {
        return 1;
      }
    },
    //code taken from CodexWorld https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
    downloadCSV(csv, filename) {
    var csvFile;
    var downloadLink;

    // CSV file
    csvFile = new Blob([csv], {type: "text/csv"});

    // Download link
    downloadLink = document.createElement("a");

    // File name
    downloadLink.download = filename;

    // Create a link to the file
    downloadLink.href = window.URL.createObjectURL(csvFile);

    // Hide download link
    downloadLink.style.display = "none";

    // Add the link to DOM
    document.body.appendChild(downloadLink);

    // Click download link
    downloadLink.click();
  },
  //code taken from CodexWorld https://www.codexworld.com/export-html-table-data-to-csv-using-javascript/
  exportTableToCSV(filename) {
    var csv = [];
    var rows = document.querySelectorAll("table tr");

    for (var i = 0; i < rows.length; i++) {
        var row = [], cols = rows[i].querySelectorAll("td, th");

        for (var j = 0; j < cols.length; j++)
            row.push(cols[j].innerText);

        csv.push(row.join(","));
    }

    // Download CSV file
    downloadCSV(csv.join("\n"), filename);
  }
  },
  created() {
    this.fetchExpCert();
    this.fetchCert();
  }
});
