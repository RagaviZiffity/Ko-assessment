require.config({
    baseUrl: 'customFolder',
    paths: {
        'Knockout': 'knockout',
    },
});

require(['knockout'], function(ko){
    function AppViewModel(){
        this.emailId= ko.observable();
        this.passWord= ko.observable();
        console.log(this.emailId);
        this.submitValue= function(){
            if (this.emailId() === 'admin' && this.passWord() === 'admin@123') {
                window.location.href = 'adminPage.html';
            } else {
                $('.error-message').text('Invalid email or password.');
            }
        }
    }
    ko.applyBindings(new AppViewModel());
})
