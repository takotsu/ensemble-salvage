let loggedIn = false;

function checkPassword(inputId, contentId) {
    const password = document.getElementById(inputId).value;
    const validPassword = "yamashin";

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
        loggedIn = true;
        document.getElementById("adminContent").style.display = "block";
        loadCurrentContent();
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

function loadCurrentContent() {
    if (loggedIn) {
        document.getElementById('aboutContentInput').value = document.getElementById('aboutContent').innerHTML.trim().replace(/<br>/g, '\n');
    }
}

function updateSection(sectionId) {
    const newContent = document.getElementById(sectionId + 'Input').value;
    if (newContent) {
        document.getElementById(sectionId).innerHTML = newContent.replace(/\n/g, '<br>');
        alert(sectionId + 'の内容が更新されました。');
    } else {
        alert('更新する内容を入力してください。');
    }
}

function loadAdminSection() {
    if (loggedIn) {
        document.getElementById("adminContent").style.display = "block";
    }
}

window.onload = function() {
    loadAdminSection();
}
