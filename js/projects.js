function displayProjects(array) {
  let projects = '';
  let labs = '';
  array.forEach(element => {
    const currentDiv = `
      <a href="${element.link}" class="project__item" target="_blank">
        <img src="${element.image}" alt="${element.title}" class="project__item__inner">
        <h4 class="project__item__title">${element.title}</h4>
      </a>
      `;
    if (element.isFinished) {
      projects += currentDiv;
    } else {
      labs += currentDiv;
    }
  });
  projects, labs += `
    <div class="margin"></div>
  `;
  const projectsContainer = document.querySelector(".main__projects__container");
  const labsContainer = document.querySelector(".main__labs__container");
  if (projectsContainer) {
    projectsContainer.innerHTML = projects;
  } else if (labsContainer) {
    labsContainer.innerHTML = labs;
  }
}

async function fillProjects() {
  try {
    const response = await fetch("js/projects.json");
    if (response.ok) {
      const jsonResponse = await response.json();
      const projectsArray = jsonResponse.projects;
      displayProjects(projectsArray);
    }
  } catch (error) {
    console.log(error);
  }
}

window.onload = fillProjects;