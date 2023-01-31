// Combination Matrix, essentially my implementation of the rotors from the original enigma
class ComMat {
    constructor(array) {
        this.Oarray = [...array];
        this.array = [...array];
    }

    encode(i) {
        return this.array[i];
    }

    decode(i) {
        return this.array.indexOf(i);
    }

    rotate() {
        let store = this.array.shift();
        this.array.push(store);
    }

    setKey(key) {
        this.array = [...this.Oarray];
        for(let i = 1; i<key; i++) {
            this.rotate();
        }
    }
}

// Making the three rotors and their matrices
var CM1 = new ComMat([20,10,18,1,12,5,17,23,11,24,0,6,9,4,22,21,2,7,14,25,13,8,16,3,15,19]);
var CM2 = new ComMat([4,1,7,18,12,2,16,23,24,3,6,10,22,9,13,25,20,8,17,19,5,0,14,21,15,11]);
var CM3 = new ComMat([11,1,2,5,20,13,19,7,4,14,12,8,3,6,9,18,22,23,21,0,17,16,15,24,25,10]);
var CMR = new ComMat([25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0])
var key1 = 1;
var key2 = 1;
var key3 = 1;


/*

> character is entered
> encoded in CM1
> result from CM1 is encoded in CM2
> result from CM2 is encoded in CM3
> result from CM3 is passed back into CM3
> result from CM3 decode is decoded in CM2
> result from CM2 decode is decoded in CM1
> result from CM1 decode is final answer

*/

function update(CM) {
    switch (CM.id) {
        case "CM1Key":
            CM1.setKey(CM.value);
            key1=CM.value;
            break;
        case "CM2Key":
            CM2.setKey(CM.value);
            key2=CM.value;
            break;
        case "CM3Key":
            CM3.setKey(CM.value);
            key3=CM.value;
            break;
    }
}


function enigma() {
    CM1.setKey(document.getElementById("CM1Key").value);
    CM2.setKey(document.getElementById("CM2Key").value);
    CM3.setKey(document.getElementById("CM3Key").value);
    let input = document.getElementById("inputBox").value;
    let output = ""
    for (let i = 0; i < input.length ; i++) {
        //convert input[i] into 0-25 charcode
        let charcode = input[i].toLowerCase().charCodeAt(0);
        charcode -= 97;
        charcode = CM1.encode(charcode);
        charcode = CM2.encode(charcode);
        charcode = CM3.encode(charcode);
        charcode = CMR.encode(charcode);
        charcode = CM3.decode(charcode);
        charcode = CM2.decode(charcode);
        charcode = CM1.decode(charcode);
        charcode += 97;
        output += String.fromCharCode(charcode);
        CM1.rotate()
    }
    document.getElementById("outputBox").innerHTML = output;
}