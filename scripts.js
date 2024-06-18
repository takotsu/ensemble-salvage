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
        document.getElementById("adminSection").style.display = "block";
        document.getElementById("adminContent").style.display = "block";
        loadCurrentContent();
    } else {
        alert("ユーザー名またはパスワードが間違っています。");
    }
}

function loadCurrentContent() {
    if (loggedIn) {
        document.getElementById('headerTitleInput').value = document.getElementById('headerTitle').textContent.trim();
        document.getElementById('headerImageInput').value = document.getElementById('headerImage').src;

        const sections = ['home', 'members', 'schedule', 'activities', 'scores', 'recordings', 'videos'];
        sections.forEach(section => {
            const storedContent = localStorage.getItem(section);
            if (storedContent) {
                document.getElementById(section + 'Content').innerHTML = storedContent;
                document.getElementById(section + 'ContentInput').value = storedContent.replace(/<br>/g, '\n');
            }
        });
    }
}

function updateSection(sectionId) {
    const newContent = document.getElementById(sectionId + 'ContentInput').value;
    if (newContent) {
        document.getElementById(sectionId + 'Content').innerHTML = newContent.replace(/\n/g, '<br>');
        localStorage.setItem(sectionId, document.getElementById(sectionId + 'Content').innerHTML);
        alert(sectionId + 'の内容が更新されました。');
    } else {
        alert('更新する内容を入力してください。');
    }
}

function saveDraft(sectionId) {
    const draftContent = document.getElementById(sectionId + 'ContentInput').value;
    localStorage.setItem(sectionId + 'Draft', draftContent);
    alert('下書きが保存されました。');
}

function loadDraft(sectionId) {
    const draftContent = localStorage.getItem(sectionId + 'Draft');
    if (draftContent) {
        document.getElementById(sectionId + 'ContentInput').value = draftContent;
    } else {
        alert('保存された下書きがありません。');
    }
}

function loadAdminSection() {
    if (loggedIn) {
        document.getElementById("adminContent").style.display = "block";
    }
}

function addSchedule() {
    const date = document.getElementById('newScheduleDate').value;
    const startTime = document.getElementById('newScheduleStartTime').value;
    const endTime = document.getElementById('newScheduleEndTime').value;
    const location = document.getElementById('newScheduleLocation').value;
    const content = document.getElementById('newScheduleContent').value.replace(/\n/g, '<br>');

    if (date && startTime && endTime && location && content) {
        const table = document.getElementById('scheduleTable');
        const newRow = table.insertRow();
        newRow.setAttribute('data-date', date);

        const dateCell = newRow.insertCell(0);
        dateCell.textContent = `${date.split('-').join('年')}日`;

        const timeCell = newRow.insertCell(1);
        timeCell.textContent = `${startTime} - ${endTime}`;

        const locationCell = newRow.insertCell(2);
        locationCell.textContent = location;

        const contentCell = newRow.insertCell(3);
        contentCell.innerHTML = content;

        const actionCell = newRow.insertCell(4);
        actionCell.innerHTML = '<button onclick="editSchedule(this)">編集</button> <button onclick="deleteSchedule(this)">削除</button>';

        alert('スケジュールが追加されました。');
    } else {
        alert('全てのフィールドに入力してください。');
    }
}

function deleteSchedule(button) {
    const row = button.parentElement.parentElement;
    row.parentElement.removeChild(row);
    alert('スケジュールが削除されました。');
}

function editSchedule(button) {
    const row = button.parentElement.parentElement;
    const date = row.cells[0].textContent.replace(/年|日/g, '-').replace('月', '-').trim();
    const time = row.cells[1].textContent.split(' - ');
    const location = row.cells[2].textContent;
    const content = row.cells[3].innerHTML.replace(/<br>/g, '\n');

    document.getElementById('newScheduleDate').value = date;
    document.getElementById('newScheduleStartTime').value = time[0];
    document.getElementById('newScheduleEndTime').value = time[1];
    document.getElementById('newScheduleLocation').value = location;
    document.getElementById('newScheduleContent').value = content;

    row.parentElement.removeChild(row);
    alert('スケジュールを編集モードにしました。');
}

function filterScheduleByDate() {
    const yearFilter = document.getElementById('yearFilter').value;
    const monthFilter = document.getElementById('monthFilter').value;

    const rows = document.querySelectorAll('#scheduleTable tr');

    rows.forEach(row => {
        const date = row.getAttribute('data-date');
        const year = date.split('-')[0];
        const month = date.split('-')[1];

        if ((yearFilter === 'all' || yearFilter === year) && (monthFilter === 'all' || monthFilter === month)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

window.onload = function() {
    loadAdminSection();
    loadCurrentContent();
}

function updateFileOnGitHub(path, content, message) {
    fetch('http://localhost:5000/update-file', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            path: path,
            content: btoa(unescape(encodeURIComponent(content))), // Base64エンコード
            message: message
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'File updated successfully') {
            alert('ファイルが更新されました。');
        } else {
            alert('ファイルの更新に失敗しました。');
        }
    })
    .catch(error => console.error('Error:', error));
}

// 例: スケジュールを更新する場合
function saveScheduleChanges() {
    const newContent = document.getElementById('scheduleContent').innerHTML;
    updateFileOnGitHub('schedule.html', newContent, 'Update schedule');
}


