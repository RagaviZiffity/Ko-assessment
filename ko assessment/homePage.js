require.config({
    baseUrl: 'customFolder',
    paths: {
        'Knockout': 'knockout',
    },
});

require(['Knockout'], function(ko) {
    function AppViewModel() {
        var self = this;

        self.firstName = ko.observable();
        self.lastName = ko.observable();
        self.emailId = ko.observable();
        self.passWord = ko.observable();
        self.city = ko.observable();
        self.state = ko.observable();
        self.dob=ko.observable()
        self.image=ko.observable('')

        // Function to perform form validation
        self.validateForm = function() {
            var name = /^[A-Z]{1}[a-z]+$/;
            var email = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.((com)|(in)|(co\.in))$/;
            var Pass = /^[A-Za-z0-9+]{8,15}$/;
            var city1 = /^[a-zA-Z]+$/;
            var state1 = /^[a-zA-Z]+$/;

            if (!name.test(self.firstName())) {
                alert('Please enter a valid first name.');
                return false;
            }

            if (!name.test(self.lastName())) {
                alert('Please enter a valid Last name.');
                return false;
            }

            if (!email.test(self.emailId())) {
                alert('Please enter a valid email address.');
                return false;
            }

            if (!Pass.test(self.passWord())) {
                alert('Password must contain 8 to 15 characters with at least one uppercase, lowercase, and digits');
                return false;
            }

            if (!city1.test(self.city())) {
                alert('Please enter a valid city');
                return false;
            }

            if (!state1.test(self.state())) {
                alert('Please enter a valid state');
                return false;
            }

            return true;
        };

        self.registerUser = function() {
            if (self.validateForm()) {

                console.log('got validated')
                var existingData = localStorage.getItem('userData');
                var userData = [];

                if (existingData) {
                    userData = JSON.parse(existingData);
                }

                userData.push({
                    firstName: self.firstName(),
                    lastName: self.lastName(),
                    emailId: self.emailId(),
                    Password: self.passWord(),
                    dob: self.dob(),
                    image: self.image(),
                    city: self.city(),
                    state: self.state()
                });

                localStorage.setItem('userData', JSON.stringify(userData));

                self.loginButton();
            }
        };

        self.loginButton = function() {
            window.location.href = 'LoginPage.html';
        };

        self.adminButton = function() {
            window.location.href = 'adminLoginPage.html';
        };
    }

    ko.applyBindings(new AppViewModel());
});

