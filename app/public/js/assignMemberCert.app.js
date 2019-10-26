var assignMemberCertApp = new Vue({
  el: '#assignMemberCertApp',
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
    },
    existing_mem_cert: [],
    indicator: {
      flag: '0'
    },
    emc: {}
  },
  methods: {
    fetchMembers() {
      fetch('api/members/')
      .then(response => response.json())
      .then(json => { assignMemberCertApp.members = json })
    },
    fetchCertifications() {
      fetch('api/certifications/')
      .then(response => response.json())
      .then(json => { assignMemberCertApp.certifications = json })
    },
    fetchExistingMemCert() {
      fetch('api/member_cert/fetchMemberCert.php')
      .then(response => response.json())
      .then(json => { assignMemberCertApp.existing_mem_cert = json })
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
      for(m in this.existing_mem_cert) {
        if((this.existing_mem_cert[m].memberId==this.member_cert.memberId) && (this.existing_mem_cert[m].certId==this.member_cert.certId)) {
          this.indicator.flag=1;
          console.log(this.indicator.flag);
        }
      };
      if(this.indicator.flag==1) {
        fetch('api/member_cert/postCertUpdate.php', {
          method:'POST',
          body: JSON.stringify(this.member_cert),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }).then(response => {alert('Assigned!')})
        console.log("done");
        this.handleReset();
        this.indicator.flag=0;
      }
      else {
        fetch('api/member_cert/postCert.php', {
          method:'POST',
          body: JSON.stringify(this.member_cert),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }).then(response => {alert('Assigned!')})
        console.log("done");
        this.handleReset();
        this.indicator.flag=0;
      }
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
    this.fetchExistingMemCert();
  }
});
