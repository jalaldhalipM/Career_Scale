// Mapping buckets to career paths
const careerMap = {
  T: ["Software Developer", "Cloud Engineer", "Cybersecurity Specialist", "AI/ML Engineer"],
  C: ["UI/UX Designer", "Graphic Designer", "Content Creator", "Game Designer"],
  M: ["Product Manager", "Project Manager", "Business Development Manager", "Operations Manager"],
  A: ["Data Analyst", "Business Analyst", "Financial Analyst", "Research Analyst"]
};

// Handle form submit
if (document.getElementById("careerForm")) {
  document.getElementById("careerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    let scores = { T: 0, C: 0, M: 0, A: 0 };
    let formData = new FormData(this);

    for (let [q, value] of formData.entries()) {
      scores[value]++;
    }

    // Sort scores
    let sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
    let primary = sorted[0][0];
    let secondary = sorted[1][0];

    // Save result in localStorage
    localStorage.setItem("primary", primary);
    localStorage.setItem("secondary", secondary);

    window.location.href = "result.html";
  });
}

// Show results on result.html
if (document.getElementById("primary")) {
  let primary = localStorage.getItem("primary");
  let secondary = localStorage.getItem("secondary");

  document.getElementById("primary").innerHTML =
    `<strong>Primary Path:</strong> ${careerMap[primary][0]} (${careerMap[primary].join(", ")})`;

  document.getElementById("secondary").innerHTML =
    `<strong>Secondary Path:</strong> ${careerMap[secondary][0]} (${careerMap[secondary].join(", ")})`;
}
// Progress bar update
const questions = document.querySelectorAll('.question');
const totalQuestions = questions.length;

document.querySelectorAll("input[type=radio]").forEach(radio => {
  radio.addEventListener("change", () => {
    let answered = new Set();
    questions.forEach((q, i) => {
      if (q.querySelector("input[type=radio]:checked")) {
        answered.add(i);
      }
    });
    let progressPercent = (answered.size / totalQuestions) * 100;
    document.getElementById("progress-bar").style.width = progressPercent + "%";
  });
});
