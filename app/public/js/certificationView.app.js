var certificationViewApp = new Vue({
  el: '#certificationViewApp',
  data: {
    certifications: [],
    cert: null,
    editCert: null,
    deleteCert: {},
    recordCert: {},
    member_cert: [],
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

    handleRowClick(cert) {
      this.cert=cert;
      fetch('api/certifications/fetchMem.php/?certId='+cert.certId)
      .then(response => response.json())
      .then(json => { certificationViewApp.member_cert = json });
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
      handleResetAfterDelete() {
          this.cert = null;
        },

        certActive(endDate) {
          if(moment(endDate)<moment()) {
            return 0;
          }
          else {
            return 1;
          }
        },
        handleEditCertificationClick(c) {
            this.editCert=c;
            this.$refs.cert_address.focus();
          },
      handleEditCertification(event) {
          fetch('api/certifications/certEdit.php', {
            method:'POST',
            body: JSON.stringify(this.editCert),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          }).then(response => {alert('Updated!')})
          this.handleReset();
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
    this.handleReset();
  }
});
