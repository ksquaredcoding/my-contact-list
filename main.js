let contacts = []

function addContact(event) {
  event.preventDefault()
  let form = event.target

  let contact = {
    id: generateId(),
    name: form.name.value,
    phone: form.phone.value,
    emergencyContact: form.emergencyContact.checked
  }
  // @ts-ignore
  contacts.push(contact)
  saveContacts()
  form.reset()
}

function saveContacts() {
  window.localStorage.setItem("contacts", JSON.stringify(contacts))
  drawContacts()
}

function loadContacts() {
  // @ts-ignore
  let storedContacts = JSON.parse(window.localStorage.getItem("contacts"))
  if (storedContacts) {
    contacts = storedContacts
  }
}

function drawContacts() {
  let contactListElem = document.getElementById("contact-list")
  let contactsTemplate = ""

  contacts.forEach(contact => {
    contactsTemplate += `
      <div class="contact-card ${contact.emergencyContact ? 'emergency-contact' : ''}">
      <h3>${contact.name}</h3>
      <p>${contact.phone}</p>
      <i class="action fa fa-trash text-danger" onClick="removeContact('${contact.id}')"></i>
      </div>
      `
  })
  // @ts-ignore
  contactListElem.innerHTML = contactsTemplate
}


// @ts-ignore
function removeContact(contactId) {
  let index = contacts.findIndex(contact => contact.id == contactId)
  if (index == -1) {
    throw new Error("Invalid Contact Id")
  }
  contacts.splice(index, 1)
  saveContacts()
}

function toggleAddContactForm() {
  document.getElementById("new-contact-form")?.classList.toggle("hidden")
}

function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}


loadContacts()
drawContacts()