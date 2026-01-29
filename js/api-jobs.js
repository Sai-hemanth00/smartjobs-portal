// ================= EXTERNAL JOBS =================
let apiJobs = [];   // GLOBAL array

async function fetchExternalJobs() {
  try {
    const res = await fetch("https://www.arbeitnow.com/api/job-board-api");
    const data = await res.json();
    apiJobs = data.data || [];
    renderAllJobs();
  } catch (err) {
    console.error("API Error:", err);
  }
}
