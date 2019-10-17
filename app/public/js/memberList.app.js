// Vue.prototype.$editMember='0'

var memberListApp = new Vue({
  el: '#memberListApp',
  data: {
    members: [],
    member: {},
    recordMember: {},
    editMemberClick: null,
    editMember: {}
  },
  methods: {
    fetchMembers() {
      fetch('api/members/')
      .then(response => response.json())
      .then(json => { memberListApp.members = json })
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
      .then( json => { memberListApp.members.push(json[0]) })
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
      this.editMember = {
        memberId: '',
        firstName: '',
        lastName: '',
        stationNumber: '',
        radioNumber: ''
      }
    },
    handleRowClick(member) {
      this.member=member;
    },
    handleEditMemberClick(m) {
      this.editMemberClick=m;
    },
    handleEditMember(event)
    {
      fetch('api/members/postEdit.php', {
        method:'POST',
        body: JSON.stringify(this.editMember),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      this.handleReset();
    }
  },
  created() {
    this.fetchMembers();
    this.handleReset();
  }
});
