

interface Validatable{
    value :string | number;
    required:boolean;
    minLength? :number;
    maxLength? :number;
    regexp?: RegExp;

}

function validate(Validatableinput :Validatable){
    let isValid = true;
    if(Validatableinput.required){
        isValid = isValid && Validatableinput.value.toString().trim().length!==0;
    }
    if (Validatableinput.minLength !=null && typeof Validatableinput.value==="string"){
        isValid = isValid && Validatableinput.value.length>=Validatableinput.minLength;
    }
    if (Validatableinput.maxLength !=null && typeof Validatableinput.value==="string"){
        isValid = isValid && Validatableinput.value.length<=Validatableinput.maxLength;
    }
    
    if (Validatableinput.regexp && typeof Validatableinput.value === 'string') {
        isValid = isValid && Validatableinput.regexp.test(Validatableinput.value);
    }
    
    return isValid;
}



class Project {
    template: HTMLTemplateElement;
    host: HTMLDivElement | undefined;
    form!: HTMLFormElement; 
    usernameInput!: HTMLInputElement;
    usertypeInput!: HTMLSelectElement; 
    contactInput!: HTMLInputElement;
    emailInput!: HTMLInputElement;
    cityInput!: HTMLInputElement;
    stateInput!: HTMLInputElement;
    element!: DocumentFragment;


    usernameError! : HTMLSpanElement;
    usertypeError! : HTMLSpanElement;
    contactError! : HTMLSpanElement;
    emailError! : HTMLSpanElement;
    cityError! : HTMLSpanElement;
    stateError! : HTMLSpanElement;
    finalError!:HTMLSpanElement;


    constructor() {
        this.template = document.getElementById('form_valid')! as HTMLTemplateElement;
        
        this.element = document.importNode(this.template.content, true);
        this.host = document.getElementById('app')! as HTMLDivElement;
      

        this.host.appendChild(this.element);

        this.form = this.host.querySelector('form')!;
        this.usernameInput = this.form.querySelector("#username") as HTMLInputElement;
        this.usertypeInput = this.form.querySelector("#type") as HTMLSelectElement;
        this.contactInput = this.form.querySelector("#contactnumber") as HTMLInputElement;
        this.emailInput = this.form.querySelector("#email") as HTMLInputElement;
        this.cityInput = this.form.querySelector("#city") as HTMLInputElement;
        this.stateInput = this.form.querySelector("#state") as HTMLInputElement;


   

        this.usernameError = document.getElementById('username-error') as HTMLSpanElement;
        this.usertypeError = document.getElementById('usertype-error') as HTMLSpanElement;
        this.contactError = document.getElementById('contact-error') as HTMLSpanElement;
        this.emailError = document.getElementById('email-error') as HTMLSpanElement;
        this.cityError = document.getElementById('city-error') as HTMLSpanElement;
        this.stateError = document.getElementById('state-error') as HTMLSpanElement;
        this.finalError = document.getElementById('final-error') as HTMLSpanElement;


        this.configure();
    }

    private submitHandler(event: Event) {
        event.preventDefault();
        const userInput = this.userinputs();
        if(Array.isArray(userInput)){
            const [name , type , contactno , emailid , c_city , s_state]= userInput;
            console.log(name , type , contactno , emailid , c_city , s_state);
        }
    }

    private configure() {
        this.form.addEventListener('submit', this.submitHandler.bind(this));
    }

    private userinputs():[string , string , string , string , string , string] | undefined{
        const username = this.usernameInput.value;
        const usertype = this.usertypeInput.value;
        const contact = this.contactInput.value;
        const email = this.emailInput.value;
        const city = this.cityInput.value;
        const state = this.stateInput.value;

        const namevalidatable:Validatable={
            value:username,
            required:true,
            minLength:8
        };
        const typevalidatable:Validatable={
            value:usertype,
            required:true
        };
        const contactvalidatable:Validatable={
            value:contact,
            required:true,
            minLength:10
        };
        const emailvalidatable:Validatable={
            value:email,
            required:true,
            regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        };
        const cityvalidatable:Validatable={
            value:city,
            required:true,
            minLength:4
        };
        const statevalidatable:Validatable={
            value:state,
            required:true,
            minLength:4
        };

        let isValid = true;

        
        this.usernameError.textContent = ""; 
        this.usertypeError.textContent = "";
        this.contactError.textContent = "";
        this.emailError.textContent = "";
        this.cityError.textContent = "";
        this.stateError.textContent = "";
        this.finalError.textContent="";


        if (!validate(namevalidatable)) {
            this.usernameError.textContent = "Username is required and must be at least 8 characters";
            isValid = false;
          }

        if (!validate(typevalidatable)||(usertype === "Select One" || usertype === "usertype")) {
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

        if(!validate(statevalidatable) || !validate(cityvalidatable) || !validate(emailvalidatable) ||
            !validate(contactvalidatable) || !validate(typevalidatable) || !validate(namevalidatable)){
                this.finalError.textContent = "Fill all fields to continue";
                isValid = false;
            }

        if(!isValid){
            return undefined;
        }
            return [username , usertype , contact , email , city , state];
    }


}

const proj = new Project();
