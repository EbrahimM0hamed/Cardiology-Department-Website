// Scroll effect on header
window.addEventListener('scroll', () => {
    const headerName = document.querySelector('.name');
    if (window.scrollY > 50) {
        headerName.classList.add('name-scroll');
    } else {
        headerName.classList.remove('name-scroll');
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // 🔐 Sign In Logic
    const signInButton = document.querySelector(".submit button");

    if (signInButton) {
        signInButton.addEventListener("click", () => {
            const username = document.getElementById("username").value.trim();
            const password = document.getElementById("password").value.trim();
            const msg = document.querySelector(".msg");
            if (username === "doctor" && password === "2028") {
                msg.textContent = "✅ Login successful!";
                msg.style.color = "green";

                // Optional redirect after login
                setTimeout(() => {
                window.location.href = "../../html/appointments/appointment.html";
                }, 1000);
            } else {
                msg.textContent = "❌ Invalid username or password.";
                msg.style.color = "red";
            }
        });
    }

    // 📅 Appointment Booking Logic
    const form = document.getElementById("appointment-form");
    const message = document.getElementById("booking-message");

    if (form) {
        form.addEventListener("submit", function (e) {
            e.preventDefault();

            const name = document.getElementById("appointment-name").value.trim();
            const type = document.getElementById("appointment-type").value;
            const date = document.getElementById("appointment-date").value;
            const time = document.getElementById("appointment-time").value;

            if (date && time) {
                message.textContent = `✅ Your ${type} has been booked on ${date} at ${time}.`;
                message.style.color = "green";

                const appointment = {
                patient: name,
                type: type,
                date: date,
                time: time,
                checked: false 
                };
                let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
                appointments.push(appointment);
                localStorage.setItem("appointments", JSON.stringify(appointments));

            } else {
                message.textContent = "❌ Please fill in all fields.";
                message.style.color = "red";
            }
        });
    }

    // 🚪 Sign Out Logic
    const signOutButton = document.getElementById("signout-button");
    const signOutMessage = document.getElementById("signout-message");

    if (signOutButton) {
        signOutButton.addEventListener("click", () => {
            if (signOutMessage) {
                signOutMessage.textContent = "✅ You have been signed out.";
                signOutMessage.style.color = "green";
            }

            // Redirect after 2 seconds
            setTimeout(() => {
                window.location.href = "../signin/SingIn.html";
            }, 1000);
        });
    }


    ///////////////////////////////////////////
    // 🗓️ Appointments Table Logic

    const patientsTable = document.querySelector(".patients");

    if (patientsTable) {
    const appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    // ✅ Sort by date and time
    appointments.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

    appointments.forEach((app, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
        <td>${app.patient}</td>
        <td>${app.type === "appointment" ? "Regular" : "Surgery"}</td>
        <td>${app.date}</td>
        <td>${app.time}</td>
        <td><input type="checkbox" ${app.checked ? "checked" : ""} data-index="${index}"></td>
        `;

        patientsTable.appendChild(row);
    });

    patientsTable.addEventListener("change", function (e) {
    if (e.target.type === "checkbox") {
        const index = e.target.getAttribute("data-index");
        const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        if (e.target.checked) {

            appointments.splice(index, 1);
            localStorage.setItem("appointments", JSON.stringify(appointments));


            location.reload();
        } else {

            appointments[index].checked = e.target.checked;
            localStorage.setItem("appointments", JSON.stringify(appointments));
        }
    }
    });
}
});

