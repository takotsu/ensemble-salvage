function checkPassword(inputId, contentId) {
    const password = document.getElementById(inputId).value;
    const validPassword = "yamashin"; // パスワードを設定

    if (password === validPassword) {
        document.getElementById(contentId).style.display = "block";
    } else {
        alert("パスワードが間違っています。");
    }
}

function adminLogin() {
    const username = document.getElementById("adminUsername").value;
    const password = document.getElementById("adminPassword").value;
    const validUsername = "1234";
    const validPassword = "yamashin";

    if (username === validUsername && password === validPassword) {
        document.getElementById("adminContent").style.display = "block";
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

function updateSection(section) {
    const contentId = section + "Content";
    const newContent = document.getElementById(contentId).value;

    if (newContent) {
        document.getElementById(section).innerHTML = newContent;
        alert(section + "の内容が更新されました。");
    } else {
        alert("更新する内容を入力してください。");
    }
}
