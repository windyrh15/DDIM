const urlProjectName = "api/" + project + projectName;
const versionProjectName = `${urlProjectName}?v=${customTime}`;

async function getProject() {
  try {
    const response = await fetch(versionProjectName);
    if (!response.ok) {
      throw new Error("Failed to fetch project data");
    }
    const data = await response.json();
    return data.dataProjectName;
  } catch (error) {
    console.error("Error fetching project data:", error);
    throw error;
  }
}

async function showProjectSuggestions() {
  const inputProject = document.getElementById("project_name");
  const projectList = document.getElementById("projectList");

  projectList.innerHTML = "";

  try {
    const projects = await getProject();
    const userProject = inputProject.value.toLowerCase();

    const filteredProject = projects.filter((project) =>
      project.project_name.toLowerCase().includes(userProject)
    );

    filteredProject.forEach((project) => {
      const listItem = document.createElement("li");
      listItem.textContent = project.project_name;
      listItem.classList.add("project-item");
      listItem.addEventListener("click", () => {
        inputProject.value = project.project_name;
        document.getElementById("project_name_id").value =
          project.project_name_id;
        projectList.innerHTML = "";
      });
      projectList.appendChild(listItem);
    });

    if (filteredProject.length > 0) {
      projectList.style.display = "block";
    } else {
      projectList.style.display = "none";
    }
  } catch (error) {
    console.error("Error showing project suggestions:", error);
  }
}
