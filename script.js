document.addEventListener('DOMContentLoaded', () => {
    const contactList = document.getElementById('contact-list'); // רשימת אנשי הקשר
    const addContactBtn = document.getElementById('add-contact'); // כפתור להוספת איש קשר חדש
    const searchInput = document.getElementById('search'); // שדה החיפוש
    const modal = document.getElementById('modal'); // המודל להוספה/עריכה של איש קשר
    const closeButton = document.querySelector('.close-button'); // כפתור סגירת המודל
    const saveContactBtn = document.getElementById('save-contact'); // כפתור לשמירת איש קשר
    const contactNameInput = document.getElementById('contact-name'); // שדה הזנת השם
    const contactEmailInput = document.getElementById('contact-email'); // שדה הזנת האימייל
    const contactLocationInput = document.getElementById('contact-location'); // שדה הזנת המיקום
    const contactPhoneInput = document.getElementById('contact-phone'); // שדה הזנת הטלפון
    const nameError = document.getElementById('name-error'); // הודעת שגיאה לשם
    const phoneError = document.getElementById('phone-error'); // הודעת שגיאה לטלפון
    const clearContactsButton = document.getElementById('clear-contacts'); // כפתור למחיקת כל אנשי הקשר

    let contacts = [
        { name: 'Bertie Yates', email: 'bertie@example.com', location: 'New York', phone: '123-456-7890', img: 'https://via.placeholder.com/50' },
        { name: 'Hester Hogan', email: 'hester@example.com', location: 'Los Angeles', phone: '987-654-3210', img: 'https://via.placeholder.com/50' },
        { name: 'Larry Little', email: 'larry@example.com', location: 'Chicago', phone: '555-555-5555', img: 'https://via.placeholder.com/50' }
    ];
    let currentEditIndex = null; // משתנה לצורך שמירת האינדקס של איש הקשר הנוכחי בעריכה

    // פונקציה להוספת או עריכת איש קשר
    function renderContacts() {
        contactList.innerHTML = ''; // נקה את רשימת אנשי הקשר
        contacts.forEach((contact, index) => {
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact';
            contactDiv.innerHTML = `
                <img src="${contact.img}" alt="${contact.name}">
                <div class="contact-info">
                    <h2>${contact.name}</h2>
                    <p>Phone: ${contact.phone}</p>
                </div>
                <div class="contact-actions">
                    <button class="info" data-index="${index}">i</button>
                    <button class="edit" data-index="${index}">✎</button>
                    <button class="delete" data-index="${index}">🗑</button>
                </div>
            `;
            contactList.appendChild(contactDiv); // הוסף את האלמנט החדש לרשימת אנשי הקשר
        });
    }

    // פונקציה להוספת איש קשר חדש
    function addContact() {
        currentEditIndex = null; // אפס את האינדקס של העריכה הנוכחית
        contactNameInput.value = ''; // אפס את השדות בטופס
        contactEmailInput.value = '';
        contactLocationInput.value = '';
        contactPhoneInput.value = '';
        nameError.textContent = ''; // אפס את הודעת השגיאה לשם
        phoneError.textContent = ''; // אפס את הודעת השגיאה לטלפון
        contactNameInput.classList.remove('error'); // הסר את מחלקת השגיאה משדה השם
        contactPhoneInput.classList.remove('error'); // הסר את מחלקת השגיאה משדה הטלפון
        document.getElementById('modal-title').textContent = 'Add Contact'; // עדכן את כותרת המודל
        modal.style.display = 'block'; // הצג את המודל
    }

    // פונקציה לעריכת איש קשר קיים
    function editContact(index) {
        currentEditIndex = index; // הגדר את האינדקס של העריכה הנוכחית
        const contact = contacts[index]; // קבל את פרטי איש הקשר לעריכה
        contactNameInput.value = contact.name; // מלא את השדות בטופס עם הנתונים של איש הקשר
        contactEmailInput.value = contact.email;
        contactLocationInput.value = contact.location;
        contactPhoneInput.value = contact.phone;
        nameError.textContent = ''; // אפס את הודעת השגיאה לשם
        phoneError.textContent = ''; // אפס את הודעת השגיאה לטלפון
        contactNameInput.classList.remove('error'); // הסר את מחלקת השגיאה משדה השם
        contactPhoneInput.classList.remove('error'); // הסר את מחלקת השגיאה משדה הטלפון
        document.getElementById('modal-title').textContent = 'Edit Contact'; // עדכן את כותרת המודל
        modal.style.display = 'block'; // הצג את המודל
    }

    // פונקציה לשמירת איש קשר (חדש או ערוך)
    function saveContact() {
        const name = contactNameInput.value; // קבל את הנתונים מהשדות בטופס
        const email = contactEmailInput.value;
        const location = contactLocationInput.value;
        const phone = contactPhoneInput.value;

        // בדוק אם השם כבר קיים ברשימה
        if (contacts.some(contact => contact.name === name && contact !== contacts[currentEditIndex])) {
            nameError.textContent = 'Sorry, a contact with that name already exists.';
            contactNameInput.classList.add('error');
            return;
        } else {
            nameError.textContent = '';
            contactNameInput.classList.remove('error');
        }

        // בדוק אם הטלפון כולל רק מספרים ואורכו בין 7 ל-10 תווים
        if (!/^\d{7,10}$/.test(phone)) {
            phoneError.textContent = 'Phone number must be 7 to 10 digits.';
            contactPhoneInput.classList.add('error');
            return;
        } else {
            phoneError.textContent = '';
            contactPhoneInput.classList.remove('error');
        }

        // אם אנו נמצאים במצב עריכה
        if (currentEditIndex !== null) {
            contacts[currentEditIndex] = { name, email, location, phone, img: 'https://via.placeholder.com/50' }; // עדכן את הנתונים של איש הקשר
        } else {
            contacts.push({ name, email, location, phone, img: 'https://via.placeholder.com/50' }); // הוסף איש קשר חדש לרשימה
        }

        modal.style.display = 'none'; // סגור את המודל
        renderContacts(); // עדכן את רשימת אנשי הקשר
    }

    // פונקציה למחיקת איש קשר
    function deleteContact(index) {
        contacts.splice(index, 1); // הסר את איש הקשר מהמערך
        renderContacts(); // עדכן את רשימת אנשי הקשר
    }

    // פונקציה להציג פרטי איש קשר
    function showContactInfo(index) {
        const contact = contacts[index];
        alert(`Name: ${contact.name}\nEmail: ${contact.email}\nLocation: ${contact.location}\nPhone: ${contact.phone}`);
    }

    // פונקציה למחיקת כל אנשי הקשר
    function clearContacts() {
        contacts = []; // רוקן את המערך
        renderContacts(); // עדכן את רשימת אנשי הקשר
    }

    // מאזין לאירועים ברשימת אנשי הקשר (לחיצה על כפתורי עריכה או מחיקה)
    contactList.addEventListener('click', (event) => {
        const index = event.target.getAttribute('data-index'); // קבל את האינדקס של איש הקשר מהכפתור שנלחץ
        if (event.target.classList.contains('delete')) { // אם הכפתור הוא למחיקה
            deleteContact(index); // מחק את איש הקשר
        } else if (event.target.classList.contains('edit')) { // אם הכפתור הוא לעריכה
            editContact(index); // ערוך את איש הקשר
        } else if (event.target.classList.contains('info')) { // אם הכפתור הוא למידע נוסף
            showContactInfo(index); // הצג את פרטי איש הקשר
        }
    });

    // מאזין לאירוע לחיצה על כפתור הוספת איש קשר חדש
    addContactBtn.addEventListener('click', addContact);

    // מאזין לאירוע לחיצה על כפתור שמירת איש קשר
    saveContactBtn.addEventListener('click', saveContact);

    // מאזין לאירוע לחיצה על כפתור סגירת המודל
    closeButton.addEventListener('click', () => modal.style.display = 'none');

    // מאזין לאירועים על חלון הדפדפן (כדי לסגור את המודל בלחיצה מחוץ לו)
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // מאזין לאירוע הזנה בשדה החיפוש
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase(); // קבל את ערך החיפוש
        const filteredContacts = contacts.filter(contact =>
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.email.toLowerCase().includes(searchTerm) ||
            contact.location.toLowerCase().includes(searchTerm) ||
            contact.phone.includes(searchTerm)
        );
        contactList.innerHTML = ''; // נקה את רשימת אנשי הקשר
        filteredContacts.forEach((contact, index) => { // הצג את אנשי הקשר המסוננים
            const contactDiv = document.createElement('div');
            contactDiv.className = 'contact';
            contactDiv.innerHTML = `
                <img src="${contact.img}" alt="${contact.name}">
                <div class="contact-info">
                    <h2>${contact.name}</h2>
                    <p>Phone: ${contact.phone}</p>
                </div>
                <div class="contact-actions">
                    <button class="info" data-index="${index}">i</button>
                    <button class="edit" data-index="${index}">✎</button>
                    <button class="delete" data-index="${index}">🗑</button>
                </div>
            `;
            contactList.appendChild(contactDiv); // הוסף את האלמנט החדש לרשימה
        });
    });

    // מאזין לאירוע לחיצה על כפתור מחיקת כל אנשי הקשר
    clearContactsButton.addEventListener('click', clearContacts);

    renderContacts(); // הצג את רשימת אנשי הקשר על המסך בפעם הראשונה
});
