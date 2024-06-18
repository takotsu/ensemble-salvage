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
        document.getElementById('headerTitleInput').value = document.getElementById('headerTitle').textContent.trim();
        document.getElementById('headerImageInput').value = document.getElementById('headerImage').src;
        document.getElementById('aboutContentInput').value = document.getElementById('aboutContent').innerHTML.trim().replace(/<br>/g, '\n');
    }
}

function updateHeader() {
    const newTitle = document.getElementById('headerTitleInput').value;
    const newImage = document.getElementById('headerImageInput').value;

    if (newTitle) {
        document.getElementById('headerTitle').textContent = newTitle;
    }
    if (newImage) {
        document.getElementById('headerImage').src = newImage;
    }
    alert('ヘッダーが更新されました。');
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

function saveDraft(sectionId) {
    const draftContent = document.getElementById(sectionId + 'Input').value;
    localStorage.setItem(sectionId + 'Draft', draftContent);
    alert('下書きが保存されました。');
}

function loadDraft(sectionId) {
    const draftContent = localStorage.getItem(sectionId + 'Draft');
    if (draftContent) {
        document.getElementById(sectionId + 'Input').value = draftContent;
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

        alert('スケジュールが追加されました。');
    } else {
        alert('全てのフィールドに入力してください。');
    }
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
}
