var stationRadioReportApp = new Vue({
  el: '#stationRadioReportApp',
  data: {
    members: [],
    stations: []
  },
  methods: {
    fetchMembers() {
      fetch('api/station_radio_report/')
      .then(response => response.json())
      .then(json => { stationRadioReportApp.members = json })
    },
    fetchStation() {
      fetch('api/station_radio_report/fetchStation.php')
      .then(response => response.json())
      .then(json => { stationRadioReportApp.stations = json })
    },
  },
  created() {
    this.fetchMembers();
    this.fetchStation();
  }
});
