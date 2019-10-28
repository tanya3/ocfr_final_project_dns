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
    convertArrayOfObjectsToCSV(args) {                                      //credits: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/
        var result, ctr, keys, columnDelimiter, lineDelimiter, data;

        data = args.data || null;
        if (data == null || !data.length) {
            return null;
        }

        columnDelimiter = args.columnDelimiter || ',';
        lineDelimiter = args.lineDelimiter || '\n';

        keys = Object.keys(data[0]);

        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;

        data.forEach(function(item) {
            ctr = 0;
            keys.forEach(function(key) {
                if (ctr > 0) result += columnDelimiter;

                result += item[key];
                ctr++;
            });
            result += lineDelimiter;
        });

        return result;
    },
    downloadCSV(args) {
        var data, filename, link;

        var csv = this.convertArrayOfObjectsToCSV({
            data: this.member_cert
        });
        if (csv == null) return;

        filename = args.filename || 'export.csv';

        if (!csv.match(/^data:text\/csv/i)) {
            csv = 'data:text/csv;charset=utf-8,' + csv;
        }
        data = encodeURI(csv);

        link = document.createElement('a');
        link.setAttribute('href', data);
        link.setAttribute('download', filename);
        link.click();
    }
  },
  created() {
    this.fetchExpCert();
    this.fetchCert();
  }
});
