// ===============================
// LifeLink AI
// PART 1
// ===============================

// ---------- Buttons ----------
const createProfileBtn = document.getElementById("createProfileBtn");
const demoBtn = document.getElementById("demoBtn");
const saveProfile = document.getElementById("saveProfile");
const closeModal = document.getElementById("closeModal");

const generateSummary = document.getElementById("generateSummary");
const generateQR = document.getElementById("generateQR");
const hospitalBtn = document.getElementById("openHospital");
const hospitalMap = document.getElementById("hospitalMap");

// ---------- Modal ----------
const profileModal = document.getElementById("profileModal");

// ---------- Inputs ----------
const userName = document.getElementById("userName");
const nationality = document.getElementById("nationality");
const bloodType = document.getElementById("bloodType");
const diseaseInput = document.getElementById("diseaseInput");
const medicineInput = document.getElementById("medicineInput");
const allergyInput = document.getElementById("allergyInput");
const emergencyContact = document.getElementById("emergencyContact");
const country = document.getElementById("country");

// ---------- Card ----------
const nameCard = document.getElementById("name");
const bloodCard = document.getElementById("blood");
const diseaseCard = document.getElementById("disease");
const medicineCard = document.getElementById("medicine");
const allergyCard = document.getElementById("allergy");

// ---------- Summary ----------
const summaryOutput = document.getElementById("summaryOutput");

// ===============================
// Modal Open
// ===============================

createProfileBtn.onclick = function(){

    profileModal.style.display="flex";

}

// ===============================
// Modal Close
// ===============================

closeModal.onclick=function(){

    profileModal.style.display="none";

}

window.onclick=function(e){

    if(e.target==profileModal){

        profileModal.style.display="none";

    }

}
// ===============================
// Demo Patient
// ===============================

demoBtn.onclick=function(){

    nameCard.textContent="John Smith";

    bloodCard.textContent="O+";

    diseaseCard.textContent="Type 1 Diabetes";

    medicineCard.textContent="Insulin";

    allergyCard.textContent="Penicillin";

}

// ===============================
// Load Demo in Modal
// ===============================

document.getElementById("loadDemo").onclick=function(){

    userName.value="John Smith";

    nationality.value="Korea";

    bloodType.value="O+";

    diseaseInput.value="Type 1 Diabetes";

    medicineInput.value="Insulin";

    allergyInput.value="Penicillin";

    emergencyContact.value="+82-10-1234-5678";

    country.value="Vietnam";

}

// ===============================
// Save Profile
// ===============================

saveProfile.onclick=function(){

    nameCard.textContent=userName.value;

    bloodCard.textContent=bloodType.value;

    diseaseCard.textContent=diseaseInput.value;

    medicineCard.textContent=medicineInput.value;

    allergyCard.textContent=allergyInput.value;

    const profile={

        name:userName.value,

        nationality:nationality.value,

        blood:bloodType.value,

        disease:diseaseInput.value,

        medicine:medicineInput.value,

        allergy:allergyInput.value,

        contact:emergencyContact.value,

        country:country.value

    };

    localStorage.setItem(

        "lifelinkProfile",

        JSON.stringify(profile)

    );

    profileModal.style.display="none";

    alert("Profile Saved Successfully!");

}
// ===============================
// AI SUMMARY
// ===============================

generateSummary.onclick = function () {

    const patientID = new URLSearchParams(location.search).get("id");

let saved;


if(patientID === "001"){

    saved = {

        name:"Kim Junseok",
        nationality:"Korea",
        blood:"O+",
        disease:"Diabetes",
        medicine:"Insulin",
        allergy:"Penicillin",
        contact:"+82-10-1234-5678",
        country:"Vietnam"

    };

}
else{

    saved = JSON.parse(localStorage.getItem("lifelinkProfile"));

}

    if (!saved) {

        summaryOutput.innerHTML = `
            <h3>Please create a profile first.</h3>
        `;

        return;

    }

    summaryOutput.innerHTML = `
        <h3>🤖 AI is analyzing...</h3>
        <br>
        <p>Generating emergency medical summary...</p>
    `;

    setTimeout(function () {

        let risk = "🟢 Low Risk";

        if (
            saved.disease.toLowerCase().includes("diabetes") ||
            saved.allergy.trim() !== ""
        ) {

            risk = "🟡 Medium Risk";

        }

        summaryOutput.innerHTML = `

        <h2>AI Emergency Summary</h2>

        <br>

        <b>Patient :</b> ${saved.name}

        <br><br>

        <b>Blood Type :</b> ${saved.blood}

        <br><br>

        <b>Disease :</b> ${saved.disease}

        <br><br>

        <b>Medication :</b> ${saved.medicine}

        <br><br>

        <b>Allergy :</b> ${saved.allergy}

        <br><br>

        <b>Risk :</b> ${risk}

        <br><br>

        <b>Recommendation</b>

        <ul style="margin-top:10px; padding-left:20px;">

            <li>Monitor patient's condition.</li>

            <li>Provide medication if necessary.</li>

            <li>Contact emergency guardian.</li>

            <li>Share medical information with hospital.</li>

        </ul>

        `;

    },2000);

};



// ===============================
// QR CODE
// ===============================

generateQR.onclick = function () {

   document.getElementById("qrcode").innerHTML = "";

new QRCode(
    document.getElementById("qrcode"),
    {
        text:"https://52zr5w6jh6-cmd.github.io/LifeLink/hospital.html?id=001",
        width:150,
        height:150
    }
);

};