var certificationViewApp = new Vue({
  el: '#certificationViewApp',
  data: {
    certifications: [],
  },
  methods: {
    fetchCertifications() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { certificationViewApp.certifications = json })
    },
    handleRowClick(certification) {
      this.certification=certification;
    }
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
