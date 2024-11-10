let eggs = document.querySelector(".eggs");
let isRunning = false;
let bowl = document.querySelector(".bowl");
let score = document.querySelector(".span");
let level = document.querySelector("span.l");
let missedCount = document.querySelector(".missed .num");
let missedText = document.querySelector(".missed .text");
let form = document.querySelector(".form");
let button = document.querySelector("button");
let user = document.querySelector(".user");
let input = document.querySelector("input");
let count = 0;
let miss = 5;
score.textContent = count;

document.addEventListener("mousemove", (event) => {
  bowl.style.left = `${event.clientX - bowl.offsetWidth / 2}px`;
});

document.addEventListener(
  "touchmove",
  (event) => {
    event.preventDefault();
    const touch = event.touches[0];
    bowl.style.left = `${touch.clientX - bowl.offsetWidth / 2}px`;
  },
  { passive: false }
);

function checkCollision(egg, bowl) {
  const eggRect = egg.getBoundingClientRect();
  const bowlRect = bowl.getBoundingClientRect();
  return !(
    eggRect.right < bowlRect.left ||
    eggRect.left > bowlRect.right ||
    eggRect.top > bowlRect.bottom ||
    eggRect.bottom < bowlRect.top
  );
}
function breakTheEgg(egg, bowl) {
  const eggRect = egg.getBoundingClientRect();
  const bowlRect = bowl.getBoundingClientRect();
  return !(eggRect.bottom <= bowlRect.top);
}

button.onclick = () => {
  form.style.display = "none";
  bowl.style.display = "block";
  user.textContent = input.value || "Unknown";
  miss = 5;
  count = 0;
  score.textContent = count;
  missedCount.textContent = miss;
  isRunning = true;

  let fallDown = setInterval(() => {
    setTimeout(() => {
      const eggBottomPosition = egg.getBoundingClientRect().bottom;
      const screenHeight = window.innerHeight;
      if (parseInt(eggBottomPosition) >= screenHeight) {
        miss--;
        missedCount.textContent = miss;
        egg.remove();
        clearInterval(collisionCheck);
      }
      if (miss <= 1) {
        missedText.textContent = "Mistake Left";
      }
      if (miss <= 0) {
        clearInterval(fallDown);
        isRunning = false;
        missedCount.textContent = 0;
        form.style.display = "flex";
        bowl.style.display = "none";
        button.textContent = "New Game";
        return;
      }
    }, 4100);

    let egg = document.createElement("img");
    egg.setAttribute("src", "https://openclipart.org/image/800px/240227");
    egg.setAttribute("class", "egg");
    egg.style.position = "absolute";
    egg.style.left = `${Math.random() * (eggs.clientWidth - 100)}px`;
    egg.style.top = "0px";
    eggs.appendChild(egg);

    setTimeout(() => {
      if (count > 150) {
        egg.style.transition = "top 1.2s linear";
        level.textContent = "Expert";
        level.className = "l expert";
      } else if (count > 120) {
        egg.style.transition = "top 1.5s linear";
        level.textContent = "Senior";
        level.className = "l senior";
      } else if (count > 90) {
        egg.style.transition = "top 1.7s linear";
        level.textContent = "Experienced";
        level.className = "l experienced";
      } else if (count > 60) {
        egg.style.transition = "top 1.9s linear";
        level.textContent = "Talented";
        level.className = "l talented";
      } else if (count > 20) {
        egg.style.transition = "top 2s linear";
        level.textContent = "Rookie";
        level.className = "l rookie";
      } else {
        egg.style.transition = "top 2.5s linear";
        level.textContent = "Newbie";
        level.className = "l newbie";
      }
      if (window.innerWidth <= 900) {
        egg.style.top = "88vh";
      } else {
        egg.style.top = "95vh";
      }
    }, 10);

    let collisionCheck = setInterval(() => {
      if (checkCollision(egg, bowl)) {
        count++;
        score.textContent = count;
        egg.remove();
        clearInterval(collisionCheck);
      }
      if (breakTheEgg(egg, bowl)) {
        egg.setAttribute(
          "src",
          "https://th.bing.com/th/id/R.0296a4fd022d6b92cda045f295e5f3fc?rik=ot30E0z7dRqUHA&pid=ImgRaw&r=0"
        );
      }
    }, 50);
  }, 2000);
};
