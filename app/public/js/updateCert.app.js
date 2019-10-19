var updateCertApp = new Vue({
  el: '#updateCertApp',
  data: {
    members: [],
    certifications: [],
    member: {},
    cert: {},
    member_cert: {
      memberId: '',
      certId: '',
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    fetchMembers() {
      fetch('api/members/')
      .then(response => response.json())
      .then(json => { updateCertApp.members = json })
    },
    fetchCertifications() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { updateCertApp.certifications = json })
    },
    handleRowClickMember(member) {
      this.member=member;
    },
    handleRowClickCert(cert) {
      this.cert=cert;
    },
    handleSubmit(event) {
      this.member_cert.memberId=this.member.memberId;
      this.member_cert.certId=this.cert.certId;
      this.member_cert.endDate=this.calculateEndDate(this.member_cert.startDate, this.cert.stdExp);
      console.log(this.member_cert.endDate);
      fetch('api/members/postCert.php', {
        method:'POST',
        body: JSON.stringify(this.member_cert),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(response => {alert('Assigned!')})
      console.log("done");
      this.handleReset();
    },
    calculateEndDate(startDate, stdExp) {
      return moment(startDate).add(stdExp, 'years').format('YYYY-MM-DD')
    },
    handleReset() {
      this.member = {
        memberId: '',
        firstName: '',
        lastName: '',
        stationNumber: '',
        radioNumber: ''
      }
      this.cert = {
        certId: '',
        certName: '',
        certAgency: '',
        stdExp: ''
      },
      this.member_cert = {
        memberId: '',
        certId: '',
        startDate: '',
        endDate: ''
      }
    }
  },
  created() {
    this.fetchMembers();
    this.fetchCertifications();
  }
});
