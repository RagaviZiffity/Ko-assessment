require.config({
    baseUrl: 'customFolder',
    paths: {
        'Knockout': 'knockout',
    },
});

require(['knockout'], function(ko){
    function AppViewModel(){
        var userData = localStorage.getItem('userData');
        userData = JSON.parse(userData);
        var matched = false;
        this.emailId= ko.observable();
        this.passWord= ko.observable();
        this.submitButton = function(){
            for (var i = 0; i < userData.length; i++) {
                var user = userData[i];
                if (user.emailId === this.emailId() && user.Password === this.passWord()) {
                    matched = true;
                    localStorage.setItem('newData', JSON.stringify(user))
                    break;
                }
            }
            if (matched) {
                window.location.href = 'userPage.html';
            } else {
                $('.error-message').text('Invalid email or password.');
            }
        }
    }
    ko.applyBindings(new AppViewModel());

});