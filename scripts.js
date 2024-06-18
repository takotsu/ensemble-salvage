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
        loadCurrentContent();
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

function loadCurrentContent() {
    document.getElementById('homeContentInput').value = document.getElementById('homeContent').innerText.trim();
    document.getElementById('membersContentInput').value = document.getElementById('membersContent').innerText.trim();
    document.getElementById('scheduleContentInput').value = document.getElementById('scheduleContent').innerText.trim();
    document.getElementById('activitiesContentInput').value = document.getElementById('activitiesContent').innerText.trim();
    document.getElementById('videosContentInput').value = document.getElementById('videosContent').innerText.trim();
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

function updateImage(section) {
    const imageId = section + 'Image';
    const newImageUrl = prompt("新しい画像のURLを入力してください:");
    if (newImageUrl) {
        document.getElementById(imageId).src = newImageUrl;
        alert(section + 'の画像が更新されました。');
    }
}
