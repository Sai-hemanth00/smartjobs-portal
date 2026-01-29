document.addEventListener("DOMContentLoaded", () => {

  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  const jobForm = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");
  const appliedList = document.getElementById("appliedList");
  const searchInput = document.getElementById("search");
  const catFilter = document.getElementById("catFilter");

  async function fetchApiJobs(searchText = "", category = "") {
    try {
      const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const data = await res.json();

      return data.data
        .filter(job => {
          const textMatch =
            job.title?.toLowerCase().includes(searchText.toLowerCase()) ||
            job.company_name?.toLowerCase().includes(searchText.toLowerCase());

          const catMatch = category
            ? job.category?.toLowerCase().includes(category.toLowerCase())
            : true;

          return textMatch && catMatch;
        })
        .map(job => ({
          title: job.title || "No title",
          company: job.company_name || "Unknown company",
          location: job.location || "Remote",
          salary: job.salary || "",
          exp: "",
          category: job.category || "General",
          description: job.description || "",
          source: "api",
          applyUrl: job.url && job.url.startsWith("http") ? job.url : null
        }));

    } catch (e) {
      console.error("API Error", e);
      return [];
    }
  }

  if (jobForm) {
    jobForm.addEventListener("submit", e => {
      e.preventDefault();

      jobs.push({
        title: title.value,
        company: company.value,
        location: location.value,
        salary: salary.value,
        exp: exp.value,
        category: category.value,
        description: description.value,
        skills: skills.value,
        source: "local"
      });

      localStorage.setItem("jobs", JSON.stringify(jobs));
      location.href = "jobs.html";
    });
  }

 function renderJobs(data) {
  if (!jobList) return;

  jobList.innerHTML = "";

  if (data.length === 0) {
    jobList.innerHTML = "<p style='text-align:center;'>No jobs found</p>";
    return;
  }

  data.forEach((job, index) => {

    let applyBtn = "";

    if (job.source === "api") {
      if (job.applyUrl) {
        applyBtn = `<button class="apply-btn" onclick="window.open('${job.applyUrl}','_blank')">Apply</button>`;
      } else {
        applyBtn = `<button class="apply-btn disabled" disabled>No Link</button>`;
      }
    } else {
      applyBtn = `<button class="apply-btn" onclick="applyJob(${index})">Apply</button>`;
    }

    jobList.innerHTML += `
      <div class="job-card">
        <h3>${job.title}</h3>
        <p>${job.company} • ${job.location}</p>

        ${job.salary ? `<p><b>Salary:</b> ${job.salary}</p>` : ""}
        ${job.category ? `<p><b>Category:</b> ${job.category}</p>` : ""}

        <p style="color:#666;">
          ${job.description ? job.description.substring(0,120) : "No description"}...
        </p>

        ${applyBtn}
      </div>
    `;
  });
}

  async function loadJobs(searchText = "", category = "") {
    const apiJobs = await fetchApiJobs(searchText, category);

    const localJobs = jobs.filter(j => {
      const textMatch =
        j.title.toLowerCase().includes(searchText.toLowerCase()) ||
        j.company.toLowerCase().includes(searchText.toLowerCase());

      const catMatch = category ? j.category === category : true;
      return textMatch && catMatch;
    });

    renderJobs([...localJobs, ...apiJobs]);
  }

  if (jobList) loadJobs();

  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      loadJobs(searchInput.value, catFilter.value);
    });
  }

  if (catFilter) {
    catFilter.addEventListener("change", () => {
      loadJobs(searchInput.value, catFilter.value);
    });
  }

  window.applyJob = function (index) {
    if (!user) {
      alert("Login first");
      return;
    }

    const job = jobs[index];

    if (appliedJobs.some(a => a.title === job.title && a.applicant === user.email)) {
      alert("Already applied");
      return;
    }

    appliedJobs.push({
      ...job,
      applicant: user.email,
      status: "Applied"
    });

    localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
    alert("Applied successfully");
  };

  if (appliedList) {
    const myJobs = appliedJobs.filter(j => j.applicant === user?.email);

    if (myJobs.length === 0) {
      appliedList.innerHTML = "<p>No applied jobs</p>";
    } else {
      myJobs.forEach(j => {
        appliedList.innerHTML += `
          <div class="job-card">
            <h3>${j.title}</h3>
            <p>${j.company}</p>
            <p>Status: ${j.status}</p>
          </div>
        `;
      });
    }
  }

});

