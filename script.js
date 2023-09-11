function maskpassword(pass){
    let str = ""
    for (let index = 0; index < pass.length; index++) {
        str += "*"
    }
    return str
}
//logic to fill the table
function copyText(txt) {
    navigator.clipboard.writeText(txt).then(
        () => {
// document.querySelector(".alert")
        // alert("copied");
        document.getElementById("alert").style.display="inline"
        setTimeout(()=>{
            document.getElementById("alert").style.display="none"
        },2000)
    },
    () => {
        alert("failed")
    },
    );
    
}
const deletepassword = (website) => {
    let data = localStorage.getItem("passwords")
    let arr = JSON.parse(data);
    arrUpdated = arr.filter((e) => {
        return e.website != website
    })
    localStorage.setItem("passwords", JSON.stringify(arrUpdated))
    alert(`successfully deleted ${website}'s password`)
    showpasswords()
}
//logic to fill the table
const showpasswords = () => {

    let tb = document.querySelector("table")
    let data = localStorage.getItem("passwords")
    if (data == null || JSON.parse(data).length ==0) {
        tb.innerHTML = "no data to show"
    }
    else {
        tb.innerHTML = `<tr>
    <th>website</th>
    <th>username</th>
    <th>password</th>
    <th>delete</th>
</tr>`

        let arr = JSON.parse(data);
        let str = ""
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];

            str += `<tr>
        <td>${element.website} <img onclick=
        "copyText('${element.website}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
        <td>${element.username} <img onclick=
        "copyText('${element.username}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
        <td>${maskpassword(element.password)} <img onclick=
        "copyText('${element.password}')" src="copy.svg" alt="Copy Button" width="10" height="10"></td>
        <td><button class="btnsm" Onclick="deletepassword('${element.website}')">Delete</button></td>
        
        </tr>`
        }
        tb.innerHTML = tb.innerHTML + str

    }
    website.value = ""
    username.value = ""
    password.value = ""
}



console.log("working")
showpasswords()
document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault()//ye krne se form submit ni hoga
    console.log("clicked")
    console.log(username.value, password.value)//agr kisi element ki value password ya username h to hme use document.getelementby id krne ki zarurat ni h
    let passwords = localStorage.getItem("passwords")
    console.log(passwords)
    if (passwords == null) {//agr password kuch ni h
        let json = []
        json.push({ website: website.value, username: username.value, password: password.value })
        // alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(json))//ye ek key value pair lega jha password key and dusra variable ek value hoga
    }
    else {
        let json = JSON.parse(localStorage.getItem("passwords"))
        json.push({ website: website.value, username: username.value, password: password.value })
        // alert("password saved")
        localStorage.setItem("passwords", JSON.stringify(json))
    }
    showpasswords()
})