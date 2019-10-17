var memberViewApp = new Vue({
  el: '#memberViewApp',
  data: {
    members: [],
  },
  methods: {
    fetchMembers() {
      fetch('api/members/')
      .then(response => response.json())
      .then(json => { memberViewApp.members = json })
    },
    handleRowClick(member) {
      this.member=member;
    }
  },
  created() {
    this.fetchMembers();
  }
});
