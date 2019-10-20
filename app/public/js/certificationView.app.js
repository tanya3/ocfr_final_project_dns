var certificationViewApp = new Vue({
  el: '#certificationViewApp',
  data: {
    certifications: [],
    deleteMember: {},
  },
  methods: {
    fetchCertifications() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { certificationViewApp.certifications = json })
    },
    handleRowClick(certification) {
      this.certification=certification;
    },
    handleReset() {
          this.recordMember = {
            memberId: '',
            firstName: '',
            lastName: '',
            stationNumber: '',
            radioNumber: ''
          }
          this.editMember = null
          this.deleteMember = {
            memberId: '',
            firstName: '',
            lastName: '',
            stationNumber: '',
            radioNumber: ''
          }
          this.member=null
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
