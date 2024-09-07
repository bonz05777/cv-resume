// Smooth Scrolling for Header Tabs with Offset
document.querySelectorAll(".header nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const section = document.querySelector(this.getAttribute("href"));
    const offset = 80;

    const sectionPosition = section.offsetTop - offset;

    window.scrollTo({
      top: sectionPosition,
      behavior: "smooth",
    });
  });
});

// sections view port when tab is clicked
document.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(
    ".section, .profile-section, .summary-section, .personal-details, .work-experience, .education, .technical-skills, .certification, .projects"
  );

  elements.forEach((element) => {
    const position = element.getBoundingClientRect();

    if (position.top < window.innerHeight && position.bottom >= 0) {
      element.classList.add("in-view");
    } else {
      element.classList.remove("in-view");
    }
  });
});

// popup images
document
  .querySelectorAll(".view-project-btn, .view-image-btn")
  .forEach((button) => {
    button.addEventListener("click", function () {
      const imageSrc = this.getAttribute("data-image");
      const popupImage = document.getElementById("popupImage");
      popupImage.src = imageSrc;

      document.getElementById("imagePopup").style.display = "block";
    });
  });

// Close Popup
document.querySelector(".popup .close").onclick = function () {
  document.getElementById("imagePopup").style.display = "none";
};

window.onclick = function (event) {
  if (event.target == document.getElementById("imagePopup")) {
    document.getElementById("imagePopup").style.display = "none";
  }
};

//name animation
document
  .querySelector(".profile-info h2")
  .addEventListener("mouseover", function () {
    this.classList.add("typing");
  });

document
  .querySelector(".profile-info h2")
  .addEventListener("mouseout", function () {
    setTimeout(() => {
      this.classList.remove("typing");
    }, 100);
  });

function sendMail() {
  const email = "bonimaelaluna21@gmail.com";
  const subject = "Job Opportunity";
  const body = `Hello Bonimae,

I hope this message finds you well. We are thrilled to offer you a position as [Job Title] at [Company Name]. 

Your expertise and background are precisely what we need, and we believe your background aligns well with our requirements.

Position: 
Location: [Office Location or Remote]
Salary: [Salary Range]
Job Type: [Full-Time/Part-Time/Contract]

Key Responsibilities:
. 
. 
Qualifications:
.
.

If you are interested in this opportunity, please reply to this email. We would love to schedule a time to discuss your application further.

Thank you for considering this opportunity with [Company Name]. We look forward to hearing from you soon!

Best,
[Your Name]
[Your Job Title]
[Company Name]
[Phone Number]
[Email Address]`;

  const mailtoLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    email
  )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const confirmSend = confirm(
    `Do you confirm that you would like to send this job offer email to ${email}?`
  );

  if (confirmSend) {
    window.open(mailtoLink, "_blank");
  }
}
