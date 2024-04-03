function validate(Validatableinput) {
    var isValid = true;
    if (Validatableinput.required) {
        isValid = isValid && Validatableinput.value.toString().trim().length !== 0;
    }
    if (Validatableinput.minLength != null && typeof Validatableinput.value === "string") {
        isValid = isValid && Validatableinput.value.length >= Validatableinput.minLength;
    }
    if (Validatableinput.maxLength != null && typeof Validatableinput.value === "string") {
        isValid = isValid && Validatableinput.value.length <= Validatableinput.maxLength;
    }
    if (Validatableinput.regexp && typeof Validatableinput.value === 'string') {
        isValid = isValid && Validatableinput.regexp.test(Validatableinput.value);
    }
    return isValid;
}
var Project = /** @class */ (function () {
    function Project() {
        this.template = document.getElementById('form_valid');
        this.element = document.importNode(this.template.content, true);
        this.host = document.getElementById('app');
        this.host.appendChild(this.element);
        this.form = this.host.querySelector('form');
        this.usernameInput = this.form.querySelector("#username");
        this.usertypeInput = this.form.querySelector("#type");
        this.contactInput = this.form.querySelector("#contactnumber");
        this.emailInput = this.form.querySelector("#email");
        this.cityInput = this.form.querySelector("#city");
        this.stateInput = this.form.querySelector("#state");
        this.usernameError = document.getElementById('username-error');
        this.usertypeError = document.getElementById('usertype-error');
        this.contactError = document.getElementById('contact-error');
        this.emailError = document.getElementById('email-error');
        this.cityError = document.getElementById('city-error');
        this.stateError = document.getElementById('state-error');
        this.finalError = document.getElementById('final-error');
        this.configure();
    }
    Project.prototype.submitHandler = function (event) {
        event.preventDefault();
        var userInput = this.userinputs();
        if (Array.isArray(userInput)) {
            var name_1 = userInput[0], type = userInput[1], contactno = userInput[2], emailid = userInput[3], c_city = userInput[4], s_state = userInput[5];
            console.log(name_1, type, contactno, emailid, c_city, s_state);
        }
    };
    Project.prototype.configure = function () {
        this.form.addEventListener('submit', this.submitHandler.bind(this));
    };
    Project.prototype.userinputs = function () {
        var username = this.usernameInput.value;
        var usertype = this.usertypeInput.value;
        var contact = this.contactInput.value;
        var email = this.emailInput.value;
        var city = this.cityInput.value;
        var state = this.stateInput.value;
        var namevalidatable = {
            value: username,
            required: true,
            minLength: 8
        };
        var typevalidatable = {
            value: usertype,
            required: true
        };
        var contactvalidatable = {
            value: contact,
            required: true,
            minLength: 10
        };
        var emailvalidatable = {
            value: email,
            required: true,
            regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        };
        var cityvalidatable = {
            value: city,
            required: true,
            minLength: 4
        };
        var statevalidatable = {
            value: state,
            required: true,
            minLength: 4
        };
        var isValid = true;
        this.usernameError.textContent = "";
        this.usertypeError.textContent = "";
        this.contactError.textContent = "";
        this.emailError.textContent = "";
        this.cityError.textContent = "";
        this.stateError.textContent = "";
        this.finalError.textContent = "";
        if (!validate(namevalidatable)) {
            this.usernameError.textContent = "Username is required and must be at least 8 characters";
            isValid = false;
        }
        if (!validate(typevalidatable) || (usertype === "Select One" || usertype === "usertype")) {
            this.usertypeError.textContent = "Please select a user type.";
            isValid = false;
        }
        if (!validate(contactvalidatable)) {
            this.contactError.textContent = "Contact is required and must be atleast 10 characters";
            isValid = false;
        }
        if (!validate(emailvalidatable)) {
            this.emailError.textContent = "Enter valid email";
            isValid = false;
        }
        if (!validate(cityvalidatable)) {
            this.cityError.textContent = "City is required and must contain atleast 4 characters";
            isValid = false;
        }
        if (!validate(statevalidatable)) {
            this.stateError.textContent = "State is required and must contain atleast 4 characters";
            isValid = false;
        }
        if (!validate(statevalidatable) || !validate(cityvalidatable) || !validate(emailvalidatable) ||
            !validate(contactvalidatable) || !validate(typevalidatable) || !validate(namevalidatable)) {
            this.finalError.textContent = "Fill all fields to continue";
            isValid = false;
        }
        if (!isValid) {
            return undefined;
        }
        return [username, usertype, contact, email, city, state];
    };
    return Project;
}());
var proj = new Project();
