'use strict';
/* Shiyu Li*/

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

class Contact {
    #fullName;
    #city;
    #email;

    constructor(fullName, city, email) {
        this.#fullName = fullName;
        this.#city = city;
        this.#email = email
    }

    set fullName (fullName) {
        if(fullName.length > 0) {
            this.#fullName = fullName;
        } 
    }
    get fullName() {
        return this.#fullName;
    }

    set city (city) {
        if(city.length > 0) {
            this.#city = city;
        } 
    }
    get city() {
        return this.#city;
    }

    set email (email) {
        if(email.length > 0) {
            this.#email = email;
        } 
    }
    get email() {
        return this.#email;
    }
}

const btn = select('.btn');
const input = select('.input');
const output = select('.output');
const repo = select('.repository');
const countNum = select('.count');

const array = [];
const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;          


let count = 0;
onEvent('click', btn, function() {

    let entry = input.value.trim().split(",", 3);
    let name = entry.slice(0,1).toString().trim();
    let city = entry.slice(1,2).toString().trim();
    let email = entry.slice(2,3).toString().trim();
    let contactBox = document.createElement('div');
    let contact = new Contact(name, city, email);
    //let entryInfo = [name, city, email];   array
    //let contact = new Contact (...entryInfo); adding array to class

    if (entry.length !== 1) {
        if (array.length < 9) {
            if (emailRegex.test(email)) {
                output.innerText = 'Contact Submitted';
                array.push(contact);
                addContact(contactBox, contact);
                count++;
                countNum.innerHTML = `<p>Saved Contact: ${count}</p>`;
            } else {
                output.innerText = `Email is invalid`;
            }
        } else {
            output.innerText = `Contact list is full!`;
        }
    } else {    
        output.innerText = `Please enter information`;
    };
    input.value = '';

    onEvent('click', contactBox,() => {
        contactBox.remove();
        count--;
        countNum.innerHTML = `<p>Saved Contact: ${count}</p>`;
        output.innerText = `Contact has been deleted`;
    });
});

function addContact(contactBox, obj) {

    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    let p3 = document.createElement('p');

    contactBox.classList.add("grid");
    p1.innerHTML = `<p>Name: <span>${obj.fullName}</span></p>`;
    p2.innerHTML = `<p>City: <span>${obj.city}</span></p>`;
    p3.innerHTML = `<p>Email: <span>${obj.email}</span></p>`;
    contactBox.append(p1, p2, p3);
    repo.append(contactBox);
}
