// Fetch JSON data and dynamically populate the character profiles
const characterContainer = document.getElementById("character-container");

fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((character, index) => {
      // Create the character card dynamically
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="card-inner">
          <!-- Front Side -->
          <div class="card-front" style="background: ${character.background}">
            <img src="${character.image}" alt="${character.name}" />
            <h2 class="rank">${character.rank}</h2>
            <h3 class="name">${character.name}</h3>
            <p class="description">${character.description}</p>
            <button class="btn">ABOUT</button>
          </div>

          <!-- Back Side -->
          <div class="card-back">
            <h3>Additional Info</h3>
            <p>More about ${character.name} goes here...</p>
          </div>
        </div>
      `;

      characterContainer.appendChild(card);
    });

    addCardAnimations(); // Trigger animations after cards are created
  })
  .catch((error) => console.error("Error loading JSON data:", error));

// GSAP Animations for cards
function addCardAnimations() {
  gsap.from(".card", {
    duration: 1,
    y: 100,
    opacity: 0,
    stagger: 0.3,
    ease: "power2.out",
  });
}

// Smooth Scroll for Navigation
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Particle Effects with tsParticles
const particleCardEffect = (selector) => {
  const targets = document.querySelectorAll(selector);

  targets.forEach((target) => {
    target.addEventListener("mouseenter", () => {
      tsParticles.load(target.id || "hover-particles", {
        particles: {
          number: { value: 20 },
          color: { value: "#ffc300" },
          shape: { type: "circle" },
          opacity: { value: 0.4 },
          size: { value: 5 },
          move: { speed: 3, outMode: "bounce" },
        },
        fpsLimit: 60,
      });
    });

    target.addEventListener("mouseleave", () => {
      tsParticles.dom().forEach((particleContainer) => particleContainer.destroy());
    });
  });
};
particleCardEffect(".card");