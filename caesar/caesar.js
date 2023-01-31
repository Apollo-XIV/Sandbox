function caesar() {
    const input = document.getElementById("inputBox").value;
    const key = parseInt(document.getElementById("key").value);
    console.log('running')
    console.log(input)
    var converted = "";
    for (let i = 0; i < input.length ; i++) {
        let code = (input.charCodeAt(i));
        if (code >= 65 && code <= 90) {
            code -= 65
            code += key
            code = code % 26
            code += 65
        } else if (code >= 97 && code <= 122) {
            code -= 97
            code += key
            code = code % 26
            console.log(code)
            code += 97
        } else {
            code += key
        }
        console.log(`converted ${code}`)
        converted += String.fromCharCode(code)
    }
    document.getElementById("outputBox").innerHTML = converted;
}