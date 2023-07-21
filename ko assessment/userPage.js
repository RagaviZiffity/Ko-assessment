require.config({
    baseUrl: 'customFolder',
    paths: {
        'Knockout': 'knockout',
    },
});

require(['knockout'], function(ko){
    function AppViewModel(){
        var userData = localStorage.getItem('newData');
        userData = JSON.parse(userData);
        this.firstName= ko.observable(userData.firstName);
        this.lastName= ko.observable(userData.lastName);
        this.email= ko.observable(userData.emailId);
        this.passWord= ko.observable(userData.Password);
        this.dob= ko.observable(userData.dob);
        this.city= ko.observable(userData.city);
        this.state= ko.observable(userData.state);
        this.Logout= function(){
            window.location.href = 'homePage.html';
        }
        this.getlastname= ko.observable();
        this.validateForm = function() {
            var name = /^[A-Z]{1}[a-z]+$/;

            if (!name.test(this.getlastname())) {
                alert('Please enter a valid first name.');
                return false;
            }

            return true;
        };
        this.editlastname = function() {
            if (this.validateForm()) {
                userData.lastName = this.getlastname();
                localStorage.setItem('newData', JSON.stringify(userData));
                $('.container .user-details .lastName').text(userData.lastName);
            }
        };
        this.getOldPassword= ko.observable();
        this.enterNewPass= ko.observable();
        this.conformNewPass= ko.observable();

        this.validatepass=function(){
            var Pass = /^[A-Za-z0-9+]{8,15}$/;
            if (!Pass.test(this.enterNewPass())) {
                alert('Password must contain 8 to 15 charachters with atleast one uppercase, lowercase and digits');
                return false;
            }
            if (this.getOldPassword() != userData.Password) {
                alert('Incorrect old password');
                return false;
            }
            else if (this.enterNewPass() != this.conformNewPass()) {
                alert('New password and confirm password do not match');
                return false;
            }
            else if (this.getOldPassword() == this.conformNewPass()){
                alert('Don\'t give old password again');
                return false;
            }else {
                return true;
            }
        }

        this.editpassword= function(){
            if(this.validatepass()){
                userData.Password = this.conformNewPass();
                localStorage.setItem('newData', JSON.stringify(userData));
                alert('Password updated successfully');
                $('.container .user-details .passWord').text(userData.Password);
            }
        }

        this.Logout= function(){
            window.location.href= "homePage.html"
        }
    }
    ko.applyBindings(new AppViewModel());
});