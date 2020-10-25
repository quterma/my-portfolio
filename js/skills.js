let skills = [];
let startIndex = 0;

function createSkillsArray(array) {
  const result = [];
  array.forEach(element => {
    result.push(`<i class="${element.icon} main__about__skills__item" onmouseover="showPopup(this);" onmouseout="hidePopup(this);">
        <h4 class="main__about__skills__item__popup noselect" style="opacity: 0;">${element.title}</h4>
      </i>`);
  });
  skills = result;
  return result;
}

function displaySkills(arrayOfDivs, start) {
  const skillsContainer = document.querySelector(".main__about__skills__items__container");
  skillsContainer.innerHTML = arrayOfDivs.slice(start, start + 3).join('');
  // skillsContainer.innerHTML += `<i class="fas fa-angle-double-right main__about__skills__items__arrow" onmousedown="scrolling();"></i>`;
}

async function fillSkills() {
  try {
    const response = await fetch("js/skills.json");
    if (response.ok) {
      const jsonResponse = await response.json();
      const skillsArray = jsonResponse.skills;
      displaySkills(createSkillsArray(skillsArray), startIndex);
    }
  } catch (error) {
    console.log(error);
  }
}

function showPopup(element) {
  element.firstElementChild.classList.add("visible");
}

function hidePopup(element) {
  element.firstElementChild.classList.remove("visible");
}

function scrolling() {
  document.querySelectorAll(".main__about__skills__item").forEach(element => {
    element.classList.add("invisible");
  });
  if (startIndex < skills.length - 3) {
    startIndex += 3;
  } else {
    startIndex = 0;
  }
  setTimeout(() => {
    displaySkills(skills, startIndex);
  }, 250);
  
}

window.onload = fillSkills;