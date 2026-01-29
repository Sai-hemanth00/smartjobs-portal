// // Get Data
// let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
// let applied = JSON.parse(localStorage.getItem("appliedJobs")) || [];
// let user = JSON.parse(localStorage.getItem("loggedInUser"));

// // Get Elements
// let jobForm = document.getElementById("jobForm");
// let jobList = document.getElementById("jobList");
// let appliedList = document.getElementById("appliedList");
// let appList = document.getElementById("appList");
// let detail = document.getElementById("detail");
// let search = document.getElementById("search");
// let catFilter = document.getElementById("catFilter");

// // ---------------- POST JOB ----------------
// if (jobForm) {
//     jobForm.addEventListener("submit", function (e) {
//         e.preventDefault();

//             jobs.push({
//                 title: title.value,
//                 company: company.value,
//                 location: location.value,
//                 salary: salary.value || "",
//                 exp: exp.value || "",
//                 category: category.value || "",
//                 description: description.value,
//                 skills: skills.value,
//                 recruiter: user.email
//             });

//         localStorage.setItem("jobs", JSON.stringify(jobs));
//         location = "jobs.html";
//     });
// }

// // ---------------- SHOW JOBS ----------------
// function show(data) {
//     if (!jobList) return;

//     jobList.innerHTML = "";

//     data.forEach((job, i) => {
//         jobList.innerHTML += `
//         <div class="job-card" onclick="view(${i})">
//             <h3>${job.title}</h3>

//             <p>${job.company} • ${job.location}</p>

//             ${job.salary ? `<p><b>Salary:</b> ₹ ${job.salary} / month</p>` : ""}
//             ${job.exp ? `<p><b>Experience:</b> ${job.exp} years</p>` : ""}

//             ${job.category ? `<p><b>Category:</b> ${job.category}</p>` : ""}

//             ${job.description ? `<p style="color:#666;">
//                 ${job.description.substring(0, 100)}...
//             </p>` : ""}
//         </div>
//         `;
//     });
// }



// // Render on load
// if (jobList) {
//     show(jobs);
// }

// // ---------------- VIEW JOB ----------------
// function view(i) {
//     localStorage.setItem("selectedJob", JSON.stringify(jobs[i]));
//     location = "job-details.html";
// }

// // ---------------- JOB DETAILS ----------------
// if (detail) {
//     const j = JSON.parse(localStorage.getItem("selectedJob"));

//     const index = jobs.findIndex(job =>
//         job.title === j.title &&
//         job.company === j.company &&
//         job.location === j.location
//     );

//     detail.innerHTML = `
//         <h2>${j.title}</h2>
//         <p><b>${j.company}</b> — ${j.location}</p>

//         <p><b>Salary:</b> ₹ ${j.salary}</p>
//         <p><b>Experience:</b> ${j.exp} years</p>
//         <p><b>Category:</b> ${j.category}</p>

//         <h3>Job Description</h3>
//         <p>${j.description}</p>

//         <h3>Required Skills</h3>
//         <p>${j.skills}</p>

//         <button onclick="apply(${index})">Apply Now</button>
//     `;
// }

// // ---------------- APPLY JOB ----------------
// function apply(i) {
//     if (!user.resume) {
//         alert("Upload resume in Profile first!");
//         return;
//     }

//     if (applied.some(a => a.applicant === user.email && a.title === jobs[i].title)) {
//         alert("Already Applied!");
//         return;
//     }

//     applied.push({
//         ...jobs[i],
//         applicant: user.email,
//         status: "Applied",
//         resume: user.resume
//     });

//     localStorage.setItem("appliedJobs", JSON.stringify(applied));
//     alert("Applied Successfully!");
// }

// // ---------------- SEARCH ----------------
// if (search) {
//     search.addEventListener("keyup", function () {
//         let key = search.value.toLowerCase();
//         let filtered = jobs.filter(j =>
//             j.title.toLowerCase().includes(key) ||
//             j.company.toLowerCase().includes(key) ||
//             j.location.toLowerCase().includes(key)
//         );
//         show(filtered);
//     });
// }

// // ---------------- CATEGORY FILTER ----------------
// if (catFilter) {
//     catFilter.addEventListener("change", function () {
//         let cat = catFilter.value;
//         let filtered = cat ? jobs.filter(j => j.category === cat) : jobs;
//         show(filtered);
//     });
// }

// // ---------------- APPLIED LIST ----------------
// if (appliedList) {
//     applied.forEach(a => {
//         appliedList.innerHTML += `
//             <div class="job-card">
//                 ${a.title} - ${a.status}
//             </div>
//         `;
//     });
// }

// // ---------------- RECRUITER PANEL ----------------
// if (appList) {
//     applied.forEach(a => {
//         appList.innerHTML += `
//             <div class="job-card">
//                 ${a.applicant}<br>
//                 <a href="${a.resume}" target="_blank">View Resume</a>
//             </div>
//         `;
//     });
// }









// ---------------- APPLIED LIST (FIXED) ----------------
// if (appliedList) {

//     appliedList.innerHTML = ""; // CLEAR FIRST

//     const userAppliedJobs = applied.filter(
//         job => job.applicant === user.email
//     );

//     if (userAppliedJobs.length === 0) {
//         appliedList.innerHTML = `
//             <p style="text-align:center; margin-top:30px;">
//                 No applied jobs yet
//             </p>
//         `;
//     } else {
//         userAppliedJobs.forEach((a, index) => {
//             appliedList.innerHTML += `
//                 <div class="job-card applied-box">
//                     <h3>${a.title}</h3>
//                     <p><b>Company:</b> ${a.company}</p>
//                     <p><b>Location:</b> ${a.location}</p>
//                     <p><b>Status:</b> ${a.status}</p>
//                 </div>
//             `;
//         });
//     }
// }




// const APP_ID = "YOUR_APP_ID";
// const APP_KEY = "YOUR_APP_KEY";

// async function fetchExternalJobs() {
//   const url = `https://api.adzuna.com/v1/api/jobs/in/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&results_per_page=10&what=developer`;

//   const res = await fetch(url);
//   const data = await res.json();

//   showExternalJobs(data.results);
// }

// function showExternalJobs(jobs) {
//   const jobList = document.getElementById("jobList");

//   jobs.forEach(job => {
//     jobList.innerHTML += `
//       <div class="job-card">
//         <h3>${job.title}</h3>
//         <p>${job.company.display_name} • ${job.location.display_name}</p>
//         <p>${job.description.substring(0,100)}...</p>

//         <a href="${job.redirect_url}" target="_blank" class="nav-btn">
//           Apply on Company Site
//         </a>
//       </div>
//     `;
//   });
// }

// fetchExternalJobs();



// ---------------- FETCH EXTERNAL JOBS ----------------
// async function fetchExternalJobs() {
//   try {
//     const response = await fetch("https://www.arbeitnow.com/api/job-board-api");
//     const data = await response.json();

//     // The API returns jobs in data.data array
//     const jobs = data.data || [];

//     showExternalJobs(jobs);
//   } catch (err) {
//     console.error("Error fetching jobs:", err);
//   }
// }

// function showExternalJobs(jobs) {
//   const jobList = document.getElementById("jobList");
//   if (!jobList) return;

//   // Add a section title
//   jobList.innerHTML += `<h2 style="text-align:center; margin:20px 0; color:#1e3c72;">
//         External Jobs from API
//     </h2>`;

//   jobs.forEach((job) => {
//     jobList.innerHTML += `
//       <div class="job-card">
//         <h3>${job.title}</h3>
//         <p><b>Company:</b> ${job.company ?? "Unknown"}</p>
//         <p><b>Location:</b> ${job.location ?? "Remote / Not Specified"}</p>
//         <p>${job.description?.substring(0, 120) ?? ""}...</p>
//         ${job.url ? `<a href="${job.url}" target="_blank" class="nav-btn">Apply</a>` : ""}
//       </div>
//     `;
//   });
// }

// function showApiJobs(data) {
//   if (!jobList) return;

//   data.forEach(job => {
//     jobList.innerHTML += `
//       <div class="job-card">
//         <h3>${job.title}</h3>
//         <p>${job.company || "Unknown"} • ${job.location || "Remote"}</p>
//         <p>${job.description.substring(0,120)}...</p>
//         <a href="${job.url}" target="_blank" class="nav-btn">Apply</a>
//       </div>
//     `;
//   });
// }


// // auto fetch on page load
// fetchExternalJobs();











// ===================== GET DATA =====================
// let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
// let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
// let user = JSON.parse(localStorage.getItem("loggedInUser"));

// // ===================== GET ELEMENTS =====================
// const jobForm = document.getElementById("jobForm");
// const jobList = document.getElementById("jobList");
// const appliedList = document.getElementById("appliedList");
// const search = document.getElementById("search");
// const catFilter = document.getElementById("catFilter");
// const detail = document.getElementById("detail");

// // ===================== POST JOB =====================
// if (jobForm) {
//   jobForm.addEventListener("submit", function (e) {
//     e.preventDefault();

//     const job = {
//       title: title.value,
//       company: company.value,
//       location: location.value,
//       salary: salary.value,
//       exp: exp.value,
//       category: category.value,
//       description: description.value,
//       skills: skills.value,
//       recruiter: user.email
//     };

//     jobs.push(job);
//     localStorage.setItem("jobs", JSON.stringify(jobs));
//     window.location.href = "jobs.html";
//   });
// }

// // ===================== SHOW JOBS =====================
// function showJobs(data) {
//   if (!jobList) return;

//   jobList.innerHTML = "";

//   data.forEach((job, index) => {
//     jobList.innerHTML += `
//       <div class="job-card">
//         <h3>${job.title}</h3>
//         <p>${job.company} • ${job.location}</p>
//         <p><b>Category:</b> ${job.category}</p>
//         <p>${job.description.substring(0, 100)}...</p>
//         <button onclick="viewJob(${index})">View</button>
//       </div>
//     `;
//   });
// }

// if (jobList) {
//   showJobs(jobs);
// }

// // ===================== VIEW JOB =====================
// function viewJob(index) {
//   localStorage.setItem("selectedJobIndex", index);
//   window.location.href = "job-details.html";
// }

// // ===================== JOB DETAILS =====================
// if (detail) {
//   const index = localStorage.getItem("selectedJobIndex");
//   const job = jobs[index];

//   detail.innerHTML = `
//     <h2>${job.title}</h2>
//     <p>${job.company} • ${job.location}</p>
//     <p><b>Salary:</b> ₹${job.salary}</p>
//     <p><b>Experience:</b> ${job.exp} years</p>
//     <p>${job.description}</p>
//     <button onclick="applyJob(${index})">Apply Now</button>
//   `;
// }

// // ===================== APPLY JOB =====================
// function applyJob(index) {
//   if (!user || !user.email) {
//     alert("Please login first");
//     return;
//   }

//   const alreadyApplied = appliedJobs.some(
//     a => a.applicant === user.email && a.title === jobs[index].title
//   );

//   if (alreadyApplied) {
//     alert("You already applied for this job");
//     return;
//   }

//   appliedJobs.push({
//     ...jobs[index],
//     applicant: user.email,
//     status: "Applied"
//   });

//   localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
//   alert("Applied successfully!");
// }

// // ===================== SEARCH =====================
// if (search) {
//   search.addEventListener("keyup", () => {
//     const key = search.value.toLowerCase();
//     const filtered = jobs.filter(j =>
//       j.title.toLowerCase().includes(key) ||
//       j.company.toLowerCase().includes(key) ||
//       j.location.toLowerCase().includes(key)
//     );
//     showJobs(filtered);
//   });
// }

// // ===================== CATEGORY FILTER =====================
// if (catFilter) {
//   catFilter.addEventListener("change", () => {
//     const cat = catFilter.value;
//     const filtered = cat ? jobs.filter(j => j.category === cat) : jobs;
//     showJobs(filtered);
//   });
// }

// // ===================== APPLIED JOBS PAGE =====================
// if (appliedList && user) {
//   appliedList.innerHTML = ""; // 🔥 VERY IMPORTANT

//   const myApplications = appliedJobs.filter(
//     job => job.applicant === user.email
//   );

//   if (myApplications.length === 0) {
//     appliedList.innerHTML = "<p style='text-align:center'>No applied jobs</p>";
//   }

//   myApplications.forEach(job => {
//     appliedList.innerHTML += `
//       <div class="job-card">
//         <h3>${job.title}</h3>
//         <p>${job.company} • ${job.location}</p>
//         <p>Status: <b>${job.status}</b></p>
//       </div>
//     `;
//   });
// }





// document.addEventListener("DOMContentLoaded", () => {

//   /***********************
//    * GLOBAL DATA
//    ***********************/
//   let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
//   let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
//   let user = JSON.parse(localStorage.getItem("loggedInUser"));

//   /***********************
//    * ELEMENTS
//    ***********************/
//   const jobForm = document.getElementById("jobForm");
//   const jobList = document.getElementById("jobList");
//   const appliedList = document.getElementById("appliedList");
//   const searchInput = document.getElementById("search");
//   const catFilter = document.getElementById("catFilter");

//   /***********************
//    * FETCH EXTERNAL JOBS (NO API KEY)
//    ***********************/
//   async function fetchApiJobs(searchText = "", category = "") {
//     try {
//       const res = await fetch("https://remotive.com/api/remote-jobs");
//       const data = await res.json();

//       return data.jobs
//         .filter(job => {
//           const textMatch =
//             job.title.toLowerCase().includes(searchText.toLowerCase()) ||
//             job.company_name.toLowerCase().includes(searchText.toLowerCase());

//           const catMatch = category
//             ? job.category.toLowerCase().includes(category.toLowerCase())
//             : true;

//           return textMatch && catMatch;
//         })
//         .map(job => ({
//           title: job.title,
//           company: job.company_name,
//           location: "Remote",
//           salary: job.salary || "",
//           exp: "",
//           category: job.category,
//           description: job.description,
//           source: "api"
//         }));
//     } catch (e) {
//       console.error("API Error", e);
//       return [];
//     }
//   }

//   /***********************
//    * POST JOB
//    ***********************/
//   if (jobForm) {
//     jobForm.addEventListener("submit", e => {
//       e.preventDefault();

//       jobs.push({
//         title: title.value,
//         company: company.value,
//         location: location.value,
//         salary: salary.value,
//         exp: exp.value,
//         category: category.value,
//         description: description.value,
//         skills: skills.value,
//         source: "local"
//       });

//       localStorage.setItem("jobs", JSON.stringify(jobs));
//       location.href = "jobs.html";
//     });
//   }

//   /***********************
//    * RENDER JOBS
//    ***********************/
//   function renderJobs(data) {
//     if (!jobList) return;

//     jobList.innerHTML = "";

//     if (data.length === 0) {
//       jobList.innerHTML = "<p style='text-align:center;'>No jobs found</p>";
//       return;
//     }

//     data.forEach((job, index) => {
//       jobList.innerHTML += `
//         <div class="job-card">
//           <h3>${job.title}</h3>
//           <p>${job.company} • ${job.location}</p>
//           ${job.salary ? `<p><b>Salary:</b> ${job.salary}</p>` : ""}
//           ${job.category ? `<p><b>Category:</b> ${job.category}</p>` : ""}
//           <p style="color:#666;">${job.description.substring(0,120)}...</p>

//           ${
//             job.source === "api"
//               ? `<button onclick="window.open('https://remotive.com','_blank')">Apply</button>`
//               : `<button onclick="applyJob(${index})">Apply</button>`
//           }
//         </div>
//       `;
//     });
//   }

//   /***********************
//    * LOAD JOBS
//    ***********************/
//   async function loadJobs(searchText = "", category = "") {
//     const apiJobs = await fetchApiJobs(searchText, category);

//     const localJobs = jobs.filter(j => {
//       const textMatch =
//         j.title.toLowerCase().includes(searchText.toLowerCase()) ||
//         j.company.toLowerCase().includes(searchText.toLowerCase());

//       const catMatch = category ? j.category === category : true;
//       return textMatch && catMatch;
//     });

//     renderJobs([...localJobs, ...apiJobs]);
//   }

//   /***********************
//    * INIT
//    ***********************/
//   if (jobList) loadJobs();

//   /***********************
//    * SEARCH
//    ***********************/
//   if (searchInput) {
//     searchInput.addEventListener("keyup", () => {
//       loadJobs(searchInput.value, catFilter.value);
//     });
//   }

//   /***********************
//    * FILTER
//    ***********************/
//   if (catFilter) {
//     catFilter.addEventListener("change", () => {
//       loadJobs(searchInput.value, catFilter.value);
//     });
//   }

//   /***********************
//    * APPLY JOB
//    ***********************/
//   window.applyJob = function (index) {
//     if (!user) {
//       alert("Login first");
//       return;
//     }

//     const job = jobs[index];

//     if (appliedJobs.some(a => a.title === job.title && a.applicant === user.email)) {
//       alert("Already applied");
//       return;
//     }

//     appliedJobs.push({
//       ...job,
//       applicant: user.email,
//       status: "Applied"
//     });

//     localStorage.setItem("appliedJobs", JSON.stringify(appliedJobs));
//     alert("Applied successfully");
//   };

//   /***********************
//    * APPLIED JOBS PAGE
//    ***********************/
//   if (appliedList) {
//     const myJobs = appliedJobs.filter(j => j.applicant === user?.email);

//     if (myJobs.length === 0) {
//       appliedList.innerHTML = "<p>No applied jobs</p>";
//     } else {
//       myJobs.forEach(j => {
//         appliedList.innerHTML += `
//           <div class="job-card">
//             <h3>${j.title}</h3>
//             <p>${j.company}</p>
//             <p>Status: ${j.status}</p>
//           </div>
//         `;
//       });
//     }
//   }

// });

document.addEventListener("DOMContentLoaded", () => {

  /***********************
   * GLOBAL DATA
   ***********************/
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  let appliedJobs = JSON.parse(localStorage.getItem("appliedJobs")) || [];
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  /***********************
   * ELEMENTS
   ***********************/
  const jobForm = document.getElementById("jobForm");
  const jobList = document.getElementById("jobList");
  const appliedList = document.getElementById("appliedList");
  const searchInput = document.getElementById("search");
  const catFilter = document.getElementById("catFilter");

  /***********************
   * FETCH EXTERNAL JOBS (NO API KEY)
   ***********************/
  async function fetchApiJobs(searchText = "", category = "") {
    try {
      const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
      const data = await res.json();

      // ✅ correct API structure = data.data
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

  /***********************
   * POST JOB (LOCAL)
   ***********************/
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

  /***********************
   * RENDER JOBS
   ***********************/
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


  /***********************
   * LOAD JOBS (LOCAL + API)
   ***********************/
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

  /***********************
   * INIT
   ***********************/
  if (jobList) loadJobs();

  /***********************
   * SEARCH
   ***********************/
  if (searchInput) {
    searchInput.addEventListener("keyup", () => {
      loadJobs(searchInput.value, catFilter.value);
    });
  }

  /***********************
   * FILTER
   ***********************/
  if (catFilter) {
    catFilter.addEventListener("change", () => {
      loadJobs(searchInput.value, catFilter.value);
    });
  }

  /***********************
   * APPLY LOCAL JOB
   ***********************/
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

  /***********************
   * APPLIED JOBS PAGE
   ***********************/
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

