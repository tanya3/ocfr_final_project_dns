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
  },
  created() {
    this.fetchExpCert();
    this.fetchCert();
  }
});
