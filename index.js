
document.getElementById('formInput').addEventListener('submit', saveIssue);

// Fetch All Issues from local storage
function fetchIssues() {
    let allItems = JSON.parse(localStorage.getItem('issues'));
    let issuesList = document.getElementById('issuesList');

    for (let i = 0; i < allItems.length; i++) {
        let id = allItems[i].id;
        let desc = allItems[i].desc;
        let severity = allItems[i].severity;
        let assignedTo = allItems[i].assignedTo;
        let status = allItems[i].status;

        issuesList.innerHTML += `<div class="bg-light" align="center">
                                <p><span>${id}</span></p>
                                <p><span>${severity}</spn></p>
                                <p><span>${status}</span></p>
                                <p><span class="fas fa-user px5">${assignedTo}</span></p>
                                <p><span>${desc}</span></p>
                                <a href="#" onclick="setStatusClose('`+ id + `')" class="btn btn-warning btn-lg btn-block">Close</a>
                                <a href="#" onclick="deleteIssue('`+ id + `')"    class="btn btn-danger btn-lg btn-block" >Delete</a>
                                </div><hr/>`
    }
}

// Save Issue to the local storage
function saveIssue(e) {

    let descInput = document.getElementById('issueDescInput').value;
    let severityInput = document.getElementById('issueSeverityInput').value;
    let assignedToInput = document.getElementById('issueAssignedToInput').value;
    let statusInput = 'Open';
    let idInput = chance.guid();

    let issue = {
        id: idInput,
        desc: descInput,
        severity: severityInput,
        assignedTo: assignedToInput,
        status: statusInput
    }

    if (localStorage.getItem('issues') === null) {
        let allItems = [];
        allItems.push(issue);
        localStorage.setItem('issues', JSON.stringify(allItems));
    } else {
        let allItems = JSON.parse(localStorage.getItem('issues'));
        allItems.push(issue);
        localStorage.setItem('issues', JSON.stringify(allItems));
    }

    document.getElementById('formInput').reset();

    fetchIssues();
    e.preventDefault();
}

// Close the Issue
function setStatusClose(id) {
    let allItems = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id === id) {
            allItems[i].status = 'Closed'
        }
    }

    localStorage.setItem('issues', JSON.stringify(allItems));
    fetchIssues();
}

// Delete the Issue
function deleteIssue(id) {
    let allItems = JSON.parse(localStorage.getItem('issues'));

    for (let i = 0; i < allItems.length; i++) {
        if (allItems[i].id === id) {
            allItems.splice(i, 1);
        }
    }

    localStorage.setItem('issues', JSON.stringify(allItems));
    fetchIssues();
}