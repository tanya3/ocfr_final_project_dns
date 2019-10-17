var certificationViewApp = new Vue({
  el: '#certificationViewApp',
  data: {
    certifications: [],
  },
  methods: {
    fetchCertifications() {
      fetch('api/certifications/view_cert.php')
      .then(response => response.json())
      .then(json => { certificationViewApp.certifications = json })
    },
    handleRowClick(certification) {
      this.certification=certification;
    }
  },
  created() {
    this.fetchCertifications();
  }
});
