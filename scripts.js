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
    document.getElementById('homeContentInput').value = document.getElementById('homeContent').innerHTML.trim().replace(/<br>/g, '\n');
    document.getElementById('membersContentInput').value = document.getElementById('membersContent').innerHTML.trim().replace(/<br>/g, '\n');
    document.getElementById('scheduleContentInput').value = document.getElementById('scheduleContent').innerHTML.trim().replace(/<br>/g, '\n');
    document.getElementById('activitiesContentInput').value = document.getElementById('activitiesContent').innerHTML.trim().replace(/<br>/g, '\n');
    document.getElementById('videosContentInput').value = document.getElementById('videosContent').innerHTML.trim().replace(/<br>/g, '\n');
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
    const inputId = section + 'ImageInput';
    const newImageUrl = document.getElementById(inputId).value;
    if (newImageUrl) {
        document.getElementById(imageId).src = newImageUrl;
        alert(section + 'の画像が更新されました。');
    }
}

function addScheduleRow(button) {
    const row = button.parentElement.parentElement;
    const date = row.children[0].children[0].value;
    const time = row.children[1].children[0].value;
    const place = row.children[2].children[0].value;
    const content = row.children[3].children[0].value;

    if (date && time && place && content) {
        const newRow = document.createElement('tr');
        newRow.setAttribute('data-date', date);

        newRow.innerHTML = `
            <td>${date}</td>
            <td>${time}</td>
            <td>${place}</td>
            <td>${content}</td>
            <td><button onclick="removeScheduleRow(this)">削除</button></td>
        `;

        document.getElementById('scheduleTable').appendChild(newRow);

        row.children[0].children[0].value = '';
        row.children[1].children[0].value = '';
        row.children[2].children[0].value = '';
        row.children[3].children[0].value = '';

        alert('練習日程が追加されました。');
    } else {
        alert('すべての項目を入力してください。');
    }
}

function removeScheduleRow(button) {
    const row = button.parentElement.parentElement;
    row.remove();
    alert('練習日程が削除されました。');
}

function filterScheduleByDate() {
    const year = document.getElementById('yearFilter').value;
    const month = document.getElementById('monthFilter').value;
    const rows = document.querySelectorAll('#scheduleTable tr');

    rows.forEach(row => {
        const date = row.getAttribute('data-date');
        const [rowYear, rowMonth] = date.split('-');

        if ((year === 'all' || rowYear === year) && (month === 'all' || rowMonth === month)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

function uploadFiles(inputId, folder) {
    const files = document.getElementById(inputId).files;
    if (files.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('files[]', files[i]);
        }
        // 仮にバックエンドが用意されている場合の例
        fetch(`/upload/${folder}`, {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert(`${folder}のアップロードが成功しました。`);
            } else {
                alert(`${folder}のアップロードに失敗しました。`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`${folder}のアップロードに失敗しました。`);
        });
    } else {
        alert('アップロードするファイルを選択してください。');
    }
}

document.getElementById('toggleView').addEventListener('click', function() {
    const isMobile = document.body.classList.toggle('mobile-view');
    this.textContent = isMobile ? 'PC版' : 'スマホ版';
});
