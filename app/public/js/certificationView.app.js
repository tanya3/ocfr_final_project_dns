var certificationViewApp = new Vue({
  el: '#certificationViewApp',
  data: {
    certifications: [],
    cert: null,
    deleteCert: {},
    recordCert: {},
  },
  methods: {
    fetchCertifications() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { certificationViewApp.certifications = json })
    },
    handleSubmit(event) {
      fetch('api/certifications/certPost.php', {
        method:'POST',
        body: JSON.stringify(this.recordCert),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => { certificationViewApp.certifications.push(json[0]) })
      .catch( err => {
        console.error('RECORD POST ERROR:');
        console.error(err);
      })
      this.handleReset();
    },
    handleRowClick(certification) {
      this.certification=certification;
    },
    handleReset() {
          this.recordCert = {
            certId: '',
            certName: '',
            certAgency: '',
            stdExp: '',
          }
          this.editCert = null
          this.deleteCert = {
            certId: '',
            certName: '',
            certAgency: '',
            stdExp: '',

          }
          this.cert=null
        },

    handleDeleteCert(c) {
      this.deleteCert=c;
      fetch('api/certifications/certDelete.php', {
        method:'POST',
        body: JSON.stringify(this.deleteCert),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(response => response.json())
      .then(json => { certificationViewApp.certifications = json })
      .then(response => {alert('Deleted!')})
      this.handleReset();
    }

},
  created() {
    this.fetchCertifications();
  }
});
