var memberViewApp = new Vue({
  el: '#memberViewApp',
  data: {
    members: [],
    member: null,
    recordMember: {},
    deleteMember: {},
    editMember: null,
    member_cert: [],
  },
  methods: {
    fetchMembers() {
      fetch('api/members/')
      .then(response => response.json())
      .then(json => { memberViewApp.members = json })
    },
    handleSubmit(event) {
      fetch('api/members/post.php', {
        method:'POST',
        body: JSON.stringify(this.recordMember),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then( response => response.json() )
      .then( json => { memberViewApp.members.push(json[0]) })
      .catch( err => {
        console.error('RECORD POST ERROR:');
        console.error(err);
      })
      this.handleReset();
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
      this.member= null;
    },
    handleResetAfterDelete() {
      this.member = null;
    },
    handleRowClick(member) {
      this.member=member;
      fetch('api/members/fetchCert.php/?memberId='+member.memberId)
      .then(response => response.json())
      .then(json => { memberViewApp.member_cert = json });
    },
    certActive(endDate) {
      if(moment(endDate)<moment()) {
        return 0;
      }
      else {
        return 1;
      }
    },
    handleEditMemberClick(m) {
      this.editMember=m;
      this.$refs.member_address.focus();
    },
    handleEditMember(event) {
      fetch('api/members/postEdit.php', {
        method:'POST',
        body: JSON.stringify(this.editMember),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      }).then(response => {alert('Updated!')})
      this.handleReset();
    },
    handleDeleteMember(m) {
      this.deleteMember=m;
      this.member=null;
      fetch('api/members/postDelete.php', {
        method:'POST',
        body: JSON.stringify(this.deleteMember),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(response => response.json())
      .then(json => { memberViewApp.members = json })
      .then(response => {alert('Deleted!')})
    }
  },
  created() {
    this.fetchMembers();
    this.handleReset();
  }
});
