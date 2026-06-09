const menuItems = [
  ["seafood", "Sea Food Heaven", "Plateau marin généreux avec poissons, crevettes et garnitures fraîches.", "Prix sur demande", "icon/Seafood Platter with Golden Butter Sauce.jpg"],
  ["seafood", "Fish Marinated", "Poisson mariné aux herbes, citron et épices de la côte.", "Prix sur demande", "icon/Sauce tomate avec poisson carpe frais.jpg"],
  ["seafood", "Sole Grillée", "Sole grillée simplement, servie avec une touche de citron.", "Prix sur demande", "icon/Grilled Fish with Crispy Fries 🍤🍟.jpg"],
  ["seafood", "Sole Braisée", "Sole braisée accompagnée de pommes de terre sautées à l'ail.", "Prix sur demande", "icon/The Most Juicy Grilled Fish in Foil.jpg"],
  ["seafood", "Navarin de la Mer", "Ragoût marin raffiné aux notes aromatiques et légumes fondants.", "Prix sur demande", "icon/Seafood Platter with Golden Butter Sauce (1).jpg"],
  ["seafood", "Assiettes du Pêcheur", "Sélection signature inspirée des arrivages du jour.", "Prix sur demande", "icon/91972017388066975.jpg"],
  ["seafood", "Panier des Pêcheurs", "Panier croustillant de produits de mer à partager.", "Prix sur demande", "icon/Crispy Seafood & Snack Basket Delight.jpg"],
  ["seafood", "Gambas Royales", "Gambas généreuses, grillées et relevées avec finesse.", "Prix sur demande", "icon/poisson braisé.jpg"],
  ["seafood", "Tartare de Thon Rouge aux Crudités", "Thon rouge frais, crudités croquantes et assaisonnement léger.", "Prix sur demande", "icon/Seafood Platter with Golden Butter Sauce (1).jpg"],
  ["seafood", "Écrevisses Béninoises", "Écrevisses locales préparées dans l'esprit du littoral béninois.", "Prix sur demande", "icon/Recette Famille.jpg"],
  ["seafood", "Brochettes de Lote et Frites", "Brochettes de lote servies avec frites dorées.", "Prix sur demande", "icon/brochette.jpg"],
  ["seafood", "Mi-cuit de Thon Rouge", "Thon rouge mi-cuit accompagné de ses bananes frites.", "Prix sur demande", "icon/Seafood Platter with Golden Butter Sauce.jpg"],
  ["pizza", "Pizza 4 Saisons", "Classique savoureuse aux légumes, fromage et garnitures de saison.", "Prix sur demande", "icon/38421403068560087.jpg"],
  ["pizza", "Pizza Campione", "Pizza généreuse, gourmande et parfaitement gratinée.", "Prix sur demande", "icon/72902087714017172.jpg"],
  ["drinks", "Mojito", "Cocktail frais à la menthe, citron vert et glace pilée.", "Prix sur demande", "icon/This Mojito Setup Looks So Refreshing 😍🍹.jpg"],
  ["drinks", "Malta", "Boisson maltée fraîche pour accompagner votre repas.", "Prix sur demande", "icon/malta.jpg"],
  ["drinks", "Jus d'ananas naturel", "Jus d'ananas frais, doux et tropical.", "Prix sur demande", "icon/Jus d'ananas.jpg"],
  ["drinks", "Eau", "Eau fraîche servie à table.", "Prix sur demande", "icon/eau.jpg"],
  ["desserts", "Strawberry Tart", "Tarte aux fraises légère et élégante.", "Prix sur demande", "icon/Strawberry Tart.png"],
  ["desserts", "Mousse au Chocolat", "Mousse onctueuse au chocolat, finale gourmande.", "Prix sur demande", "icon/mousse au chocolat.jpg"]
];

const menuGrid = document.querySelector("#menuGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const loader = document.querySelector(".loader");
const header = document.querySelector(".site-header");
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const backToTop = document.querySelector(".back-to-top");

function renderMenu(filter = "all") {
  menuGrid.innerHTML = menuItems
    .filter(([category]) => filter === "all" || category === filter)
    .map(([category, name, description, price, imagePath]) => `
      <article class="menu-card reveal" data-category="${category}">
        <div class="menu-image">
          <img src="${imagePath}" alt="${name}" loading="lazy">
        </div>
        <div class="menu-content">
          <div class="menu-meta">
            <h3>${name}</h3>
            <span class="price">${price}</span>
          </div>
          <p>${description}</p>
        </div>
      </article>
    `)
    .join("");
  observeReveals();
}

function observeReveals() {
  const revealElements = document.querySelectorAll(".reveal:not(.observed)");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => {
    element.classList.add("observed");
    observer.observe(element);
  });
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.count);
      const isDecimal = !Number.isInteger(target);
      let current = 0;
      const steps = 48;
      const increment = target / steps;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        element.textContent = isDecimal ? current.toFixed(1) : `+${Math.round(current)}`;
      }, 24);
      counterObserver.unobserve(element);
    });
  }, { threshold: 0.5 });

  counters.forEach((counter) => counterObserver.observe(counter));
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    renderMenu(button.dataset.filter);
  });
});

navToggle.addEventListener("click", () => {
  const isOpen = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);
  backToTop.classList.toggle("visible", window.scrollY > 650);
});

backToTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

document.querySelector(".reservation-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const message = encodeURIComponent(
    `Bonjour La Cabane du Pêcheur, je souhaite réserver une table.\nNom: ${form.get("name")}\nTéléphone: ${form.get("phone")}\nDate: ${form.get("date")}\nHeure: ${form.get("time")}\nPersonnes: ${form.get("guests")}\nMessage: ${form.get("message") || "Aucun"}`
  );
  window.location.href = `https://wa.me/2290195550003?text=${message}`;
});

window.addEventListener("load", () => {
  loader.classList.add("hidden");
});

setTimeout(() => {
  loader.classList.add("hidden");
}, 1400);

renderMenu();
observeReveals();
animateCounters();
