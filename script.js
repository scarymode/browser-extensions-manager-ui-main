fetch('./data.json')
    .then(response => response.json())
    .then(data => {
      const container = document.querySelector(".grid");

      data.forEach(item => {
        const div = document.createElement("div");
        div.classList.add('grid-item');

        div.innerHTML = `
          <div class="grid-item-top">
            <img src="${item.logo}" alt="${item.name} logo">
            <div class="grid-item-top-text">
              <p class="grid-item-name">${item.name}</p>
              <p class="grid-item-description">${item.description}</p>
            </div>
          </div>
          <div class="btns">
          <button class="grid-item-remove">Remove</button>
          <label class="switch">
            <input type="checkbox" class="switch_input" tabindex="-1"/>
            <div class="switch_control" tabindex="0" role="switch"></div>
          </label>
          </div>
        `;

        const checkbox = div.querySelector(".switch_input")
        checkbox.checked = item.isActive

        container.appendChild(div);
      });
      const switchControls = document.querySelectorAll(".switch_control")

      switchControls.forEach(control => {
        control.addEventListener('keydown', e => {
          if ( e.key === 'Enter') {
            const checkbox = control.previousElementSibling
            checkbox.checked = !checkbox.checked
            checkbox.dispatchEvent(new Event("change"));
          }
        })
        control.addEventListener('click', () => {
          const checkbox = control.querySelector(".switch_input")
          checkbox.checked = !checkbox.checked
          checkbox.dispatchEvent(new Event("change"));
        })
      })
  const buttons = document.querySelectorAll(".top-button button")
  const cards = document.querySelectorAll(".grid-item")

  buttons[0].classList.add("active")

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"))
      btn.classList.add("active")
      const filter = btn.textContent.toLowerCase()

      cards.forEach(card => {
        const checkbox = card.querySelector(".switch_input")
        const isChecked = checkbox.checked

        if (filter === 'all') {
          card.style.display = ''
        }
        else if (filter === 'active' && isChecked) {
          card.style.display = ''
        }
        else if (filter === 'inactive' && !isChecked) {
          card.style.display = ''
        }
        else {
          card.style.display = 'none'
        }
      })
    })
  })
  
  const remove = document.querySelectorAll(".grid-item-remove");

  remove.forEach((rm) => {
    rm.addEventListener("click", () => {
      const card = rm.closest(".grid-item");
      if (card) {
        card.remove();
      }
    });
    rm.addEventListener("keydown", (e) => {
      if(e.key === 'enter') {
        const card = rm.closest(".grid-item");
        if (card) {
          card.remove();
        }
      }
    })
  });
})
.catch(error => console.error('Erreur de chargement du JSON :', error))

function applyFilter(btn) {
  buttons.forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  const filter = btn.textContent.toLowerCase();

  cards.forEach(card => {
    const checkbox = card.querySelector(".switch_input");
    const isChecked = checkbox.checked;

    if (filter === "all") {
      card.style.display = "";
    } else if (filter === "active" && isChecked) {
      card.style.display = "";
    } else if (filter === "inactive" && !isChecked) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

const mode = document.querySelector(".mode")
const modeIcon = document.querySelector(".modeicon");

 function updateModeIcon() {
    if (document.body.classList.contains("dark")) {
      modeIcon.innerHTML = '<img src="./assets/images/icon-sun.svg" alt="Light mode">';
    } else {
      modeIcon.innerHTML = '<img src="./assets/images/icon-moon.svg" alt="Dark mode">';
    }
  }
  
mode.addEventListener("click", () => {
  document.body.classList.toggle("dark")
  const theme = document.body.classList.contains("dark") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    updateModeIcon();
  });

if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark');
}
updateModeIcon()
