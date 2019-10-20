var expCertApp = new Vue({
  el: '#expCertApp',
  data: {
    member_cert: [],
    filter: {
      cert: ''
    },
    certifications: []
  },
  methods: {
    fetchExpCert() {
      fetch('api/members/fetchExpCert.php')
      .then(response => response.json())
      .then(json => { expCertApp.member_cert = json });
    },
    fetchCert() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { expCertApp.certifications = json })
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
