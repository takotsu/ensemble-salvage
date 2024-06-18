let loggedIn = false;

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
        loggedIn = true;
        document.getElementById("adminContent").style.display = "block";
        loadCurrentContent();
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

function loadCurrentContent() {
    if (loggedIn) {
        document.getElementById('homeContentInput').value = document.getElementById('homeContent').innerHTML.trim().replace(/<br>/g, '\n');
        for (let i = 0; i < 20; i++) {
            document.getElementById(`member${i}Name`).value = document.querySelector(`#member${i} h3`).textContent;
            document.getElementById(`member${i}Image`).value = document.querySelector(`#member${i} img`).src;
        }
    }
}

function updateSection(section) {
    const contentId = section + 'Content';
    const inputId = section + 'ContentInput';
    const newContent = document.getElementById(inputId).value;

    if (newContent) {
        document.getElementById(contentId).innerHTML = newContent.replace(/\n/g, '<br>');
        alert(section + 'の内容が更新されました。');
    } else {
        alert('更新する内容を入力してください。');
    }
}

function updateMembers() {
    for (let i = 0; i < 20; i++) {
        const name = document.getElementById(`member${i}Name`).value;
        const imageUrl = document.getElementById(`member${i}Image`).value;

        if (name) {
            document.querySelector(`#member${i} h3`).textContent = name;
        }
        if (imageUrl) {
            document.querySelector(`#member${i} img`).src = imageUrl;
        }
    }
    alert('メンバー情報が更新されました。');
}

function loadAdminSection() {
    if (loggedIn) {
        document.getElementById("adminContent").style.display = "block";
    }
}

window.onload = function() {
    loadAdminSection();
}
