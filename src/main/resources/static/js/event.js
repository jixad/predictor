new Vue({
    el: '#event',
    data: {
        currentPage: 1,
        events: [],
        tournaments: [],
        totalPages: 0,
        form: {
            id: '',
            team1: '',
            team2: '',
            scoreTeam1: '',
            scoreTeam2: '',
            date: '',
            tournamentId: ''
        },
        editMode: false
    },
    methods: {
        fetchTournaments: function(){
            this.$http.get('http://localhost:8004/api/admin/tournaments').then(
                function (response) {
                    this.tournaments = response.body;
                    console.log(response.body);
                }
            )
        },
        fetchEvents: function(page){
            let options = {
                params:{
                    page: page-1
                }
            };
            this.$http.get('http://localhost:8004/api/admin/event', options).then(
                function (response) {
                    this.events = response.data.content;
                    this.totalPages = parseInt(response.body.totalPages);
                    this.currentPage = page;
                }, console.log
            )
        },
        addModal: function(){
            this.editMode = false;
            $('#addModal').modal('show');
            this.form.id = '';
            this.form.team1  ='';
            this.form.team2  ='';
            this.form.scoreTeam1 = '';
            this.form.scoreTeam2 = '';
            this.form.date = '';
            this.form.tournamentId = '';
        },
        editModal: function (event) {
            this.editMode = true;
            $('#addModal').modal('show');
            this.form.id = event.id;
            this.form.team1  = event.team1;
            this.form.team2  = event.team2;
            this.form.scoreTeam1 = event.scoreTeam1;
            this.form.scoreTeam2 = event.scoreTeam1;
            this.form.date = event.date;
            this.form.tournamentId = event.tournament.id;
        },
        /*deleteModal: function(tournament){
            $('#deleteModal').modal('show');
            //this.form.id = tournament.id;
        },*/
        updateEvent: function () {
            this.$http.put('http://localhost:8004/api/admin/event/update', {
                id: this.form.id,
                team1: this.form.team1,
                team2: this.form.team2,
                scoreTeam1: this.form.scoreTeam1,
                scoreTeam2: this.form.scoreTeam2,
                date: this.form.date,
                tournamentId: this.form.tournamentId
            }).then(
                function (response) {
                    console.log(response);
                    $('#addModal').modal('hide');
                    this.events(this.currentPage)
                }
            ).catch(
                function (error) {
                    console.log(error)
                }
            )
        },
        addEvent: function () {
            this.$http.post('http://localhost:8004/api/admin/event/add', {
                team1: this.form.team1,
                team2: this.form.team2,
                date: this.form.date,
                tournamentId: this.form.tournamentId
            }).then(
                function (response) {
                    console.log(response);
                    $('#addModal').modal('hide');
                    this.fetchEvents(this.currentPage)
                }
            ).catch(
                function (error) {
                    console.log(error)
                }
            )
        },
        /*deleteTournament: function () {
            this.$http.put('http://localhost:8004/api/admin/tournament/delete', {
                id: this.form.id
            }).then(
                function (response) {
                    console.log(response);
                    $('#deleteModal').modal('hide');
                    this.fetchTournaments(this.currentPage)
                }
            ).catch(
                function (error) {
                    console.log(error)
                }
            )
        }*/
    },
    created: function () {
        this.fetchEvents(this.currentPage);
        this.fetchTournaments();
    }
});