 
const MYFORM = document.getElementById('form');
MYFORM.addEventListener('submit', test);

class Bigboy {
    constructor (formData) {
    this.name = formData.name;
    this.ssn = formData.ssn;
    this.date_dob = formData.date_dob;
    this.email = formData.email;
    }
}

function validateStringLength(str) {
    const re = /^[a-zA-Z0-9_ ]{2,20}$/
    return re.test(str);
}

function validateSsnLength(str) {
    const re = /^[0-9]{9}$/
    return re.test(str);
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    return re.test(String(email).toLowerCase());
}

function validateDate(date) {
    const re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    return re.test(String(date));
}

function displayClassColor (id, class_name) {
    const SELECT = document.querySelector(id);
    SELECT.className = class_name;
}

function displayMessageError (id, idError, class_name, text) {
    const MESSAGE = document.querySelector(idError);

    if(MESSAGE != null) {
        MESSAGE.remove();
    }
    
    const PARENT = document.querySelector(id);
    const TEXTELEMENT = document.createElement("p");    
    TEXTELEMENT.className = class_name;
    TEXTELEMENT.textContent = text; 
    PARENT.appendChild(TEXTELEMENT);
}

function deleteClassColor (id) {
    const SELECT = document.querySelector(id);
    SELECT.className = "";
}

function deleteMessageError (id) {
    const SELECT = document.querySelector(id);
    if(SELECT != null) {
        SELECT.remove();
    }
    
}

const BIGBOYS = [];

function test (event) {
    event.preventDefault();

    const FORMLABELS = ["name", "ssn", "date_dob", "email"];
    const FORMDATA = {};
    const FORMELEMENTS = event.target.elements;

    for(let i = 0; i < FORMELEMENTS.length - 1; i++) {
        FORMDATA[FORMLABELS[i]] = FORMELEMENTS[i].value;
    }

    let error = false;
    if (!validateStringLength(FORMDATA.name)) {
        error = true;
        displayClassColor("#name", "red");
        displayMessageError(".box1", ".box1 p", "alert", "Your name must be between 2 and 20 characters. No long names allowed!");               
    } else {
        deleteMessageError(".box1 p");
        deleteClassColor("#name");
    }

    if (!validateSsnLength(FORMDATA.ssn)) {
        error = true;
        displayClassColor("#ssn", "red");
        displayMessageError(".box2", ".box2 p", "alert", "Your SSN must be 9 digits. No dashes!");      
    } else {
        deleteMessageError(".box2 p");
        deleteClassColor("#ssn");
    }

    if (!validateDate(FORMDATA.date_dob)) {
        error = true;
        displayClassColor("#dob", "red");
        displayMessageError(".box3", ".box3 p", "alert", "Your DOB must be entered in MM/DD/YYYY format.");                 
    } else {
        deleteMessageError(".box3 p");
        deleteClassColor("#dob");        
    }

    if (!validateEmail(FORMDATA.email)) {
        error = true;
        displayClassColor("#email", "red");
        displayMessageError(".box4", ".box4 p", "alert", "Invalid email address!");              
    } else {
        deleteMessageError(".box4 p");
        deleteClassColor("#email");
    }
    
    if(!error) {
        BIGBOYS.push(new Bigboy(FORMDATA));      
        const TR = document.createElement('tr');
        for (let key in FORMDATA) {
            const TD = document.createElement('td');
            TD.textContent = FORMDATA[key];
            TR.appendChild(TD);
        }
        
        const ELT = document.querySelector('tbody');
        ELT.appendChild(TR);
    }
 }

