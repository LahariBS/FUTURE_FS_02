const API_URL = "http://localhost:5000/api/leads";

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const sourceInput = document.getElementById("source");
const notesInput = document.getElementById("notes");
const addBtn = document.getElementById("add-lead");
const leadsContainer = document.getElementById("leads-container");

async function fetchLeads() {
  const res = await fetch(API_URL);
  const leads = await res.json();
  renderLeads(leads);
}


function renderLeads(leads) {
  leadsContainer.innerHTML = "";
  leads.forEach(lead => {
    const div = document.createElement("div");
    div.classList.add("lead-box");

    div.innerHTML = `
      <h3>${lead.name}</h3>
      <p>${lead.email}</p>
      <p>Source: ${lead.source}</p>
      <p>Status: <b>${lead.status}</b></p>
      <p>Notes: ${lead.notes}</p>

      <button class="status-btn status-new" onclick="updateStatus('${lead._id}','New')">New</button>
      <button class="status-btn status-contacted" onclick="updateStatus('${lead._id}','Contacted')">Contacted</button>
      <button class="status-btn status-converted" onclick="updateStatus('${lead._id}','Converted')">Converted</button>
      <button class="status-btn status-delete" onclick="deleteLead('${lead._id}')">Delete</button>
    `;

    leadsContainer.appendChild(div);
  });
}

async function addLead() {
  const lead = {
    name: nameInput.value,
    email: emailInput.value,
    source: sourceInput.value,
    notes: notesInput.value
  };
  
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lead)
  });
  nameInput.value = "";
  emailInput.value = "";
  sourceInput.value = "";
  notesInput.value = "";
  fetchLeads();
}


async function updateStatus(id, status) {
  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status })
  });
  fetchLeads();
}

async function deleteLead(id) {
  const confirmDelete = confirm("Are you sure you want to delete this lead?");
  if (!confirmDelete) return;

  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  const data = await res.json();

  if (data.success) {
    alert("Lead deleted successfully!");
    fetchLeads(); // refresh the list
  } else {
    alert("Failed to delete lead.");
  }
}
addBtn.addEventListener("click", addLead);
fetchLeads();