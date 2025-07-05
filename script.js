const desktopLayout = document.getElementById('desktopLayout');
const mobileLayout = document.getElementById('mobileLayout');
const desktopBook = document.getElementById('desktopBook');
const mobileBook = document.getElementById('mobileBook');
const nextButton = document.getElementById('nextButton');
const backToCoverButton = document.getElementById('backToCoverButton');


const coverPage = {
  title: `A Lion's Adventure`,
  subtitle: `A Medieval Journey Through Time`
};

const introPage = {
  text: `Welcome to "A Lion's Adventure"\nA poetic journey through time, history, and transformation.\nBegin the story by flipping the pages.`
};

const poemStanzas = [
 `From ancient mold, a lion sleeps,\nBronze and still, his vigil keeps.\nOn Burgplatz old, his story waits,\nFor time to turn and open gates.`,
  `A whisper stirs, a magic wakes,\nThe lion's heart, it barely breaks.\nA golden spark, ignites his gaze,\nHe stirs from dreams of bygone days.`,
  `With heavy step, he leaves his stand,\nA metal paw on ancient land.\nThe square transforms, the world anew,\nA different age comes into view.`,
  `Through market streets, he starts to roam,\nWhere medieval Braunschweig makes its home.\nA metal giant in a world unknown,\nHis ancient heart, it beats alone.`,
  `The cathedral's form, a welcome sight,\nIts Romanesque arches, bathed in light.\nA piece of home, in this strange place,\nA moment's peace upon his face.`,
  `A duke appears, with lion's name,\nHenry the Lion, full of fame.\nA silent nod, a shared domain,\nTwo mighty lions, in sun and rain.`,
  `He walks through time, a silent guest,\nObserving life, put to the test.\nFrom feasts of joy to battles won,\nThe Lion sees what man has done.`,
  `But time moves on, the world transforms,\nA sudden shift, a change of forms.\nThe ancient streets, now paved with tar,\nA different age, both near and far.`,
  `The Lion stands at Schloss Arkaden's gate,\nA gleaming glass and steel estate.\nBright lights flash, loud sounds abound,\nA modern palace, all around.`,
  `Inside the mall, where people stride,\nHe sees reflections, side by side.\nOf hurried steps and whispered talks,\nLost in these bright, consumer walks.`,
  `A metal beast, in aisles so bright,\nThe meat counter, a strange new sight.\nHe sees his kin, in plastic wrapped,\nA modern world, completely trapped.`,
  `Beyond the clamor, and the rush,\nA quiet echo, in the hush.\nA different call, a different way,\nTo find the past, in present day.`,
  `At Herzog Anton Ulrich's stately hall,\nOld friends and foes, rise from the wall.\nTheir painted eyes, a silent plea,\nA memory of what used to be.`,
  `Through ancient halls, he softly treads,\nWhere painted battles, minds misled.\nHe sees the faces, stark and grand,\nOf those who ruled, this Brunswick land.`,
  `Within the castle, walls arise,\nA modern echo, meets his eyes.\nThe ancient stones, a memory faint,\nA different world, without restraint.`,
  `A glowing screen, with words so small,\nTells of his tale, and his downfall.\nA legend told, in digital light,\nHis ancient roar, lost in the night.`,
  `The city roars, a metal stream,\nA world of noise, a waking dream.\nThe ancient peace, now far away,\nHe longs for dusk, and yesterday.`,
  `A copy stands, upon his place,\nA hollow shell, a cold embrace.\nHe sees his form, but feels no pride,\nA part of him, has truly died.`,
  `With heavy heart, he turns to go,\nBack to the place, he used to know.\nThis future world, he can't embrace,\nHe seeks his past, his time, his space.`,
  `He climbs the stone, with weary sigh,\nHis bronze grows cold, beneath the sky.\nThe magic fades, the spell undone,\nHis journey ends, where it begun.`,
  `The lion sleeps, once more in stone,\nHis tale untold, his journey done.\nA guardian still, for all to see,\nA timeless legend, wild and free.`
];

let currentPage = 0;
const pagesDesktop = [];
const pagesMobile = [];

const addPage = (bookElement, text, imgIndex, isCover = false, isIntro = false) => {
  const page = document.createElement('div');
  page.className = 'page' + (isCover ? ' cover' : '') + (isIntro ? ' intro' : '');

  if (isCover) {
    page.innerHTML = `<h1>${coverPage.title}</h1><h3>${coverPage.subtitle}</h3>`;
  } else if (isIntro) {
    if (bookElement === desktopBook) {
        page.innerHTML = `
            <div class="text-section">${text.replace(/\n/g, '<br>')}</div>
            <div class="text-section" style="text-align: center; justify-content: center; height: 90%;">
                Created by: <br> Fine, Nicole, Nastia and Maddy, <br> with help of the programs:<br>Gemini, Chat GPT and Midjourney
            </div>
        `;
    } else { // Mobile intro page
        page.innerHTML = `
            <div class="text-section">${text.replace(/\n/g, '<br>')}</div>
            <div class="text-section" style="text-align: center;">
                 Created by: <br> Fine, Nicole, Nastia and Maddy, <br> with help of the programs:<br>Gemini, Chat GPT and Midjourney
            </div>
        `;
    }
  } else {
    const stanzaHTML = text.replace(/\n/g, "<br>");
    // **Wichtige Änderung hier: .jpg zu .png geändert**
    const imgSrc = `images/${String(imgIndex + 1).padStart(2, '0')}.png`;
    if (bookElement === desktopBook) {
      page.innerHTML = `
        <div class="image-section"><img src="${imgSrc}" alt="Image ${imgIndex + 1}" /></div>
        <div class="text-section">${stanzaHTML}</div>
      `;
    } else {
      page.innerHTML = `
        <div class="image-section"><img src="${imgSrc}" alt="Image ${imgIndex + 1}" /></div>
        <div class="text-section">${stanzaHTML}</div>
      `;
    }
  }
  bookElement.appendChild(page);
  return page;
};

// Add cover and intro pages for both desktop and mobile
pagesDesktop.push(addPage(desktopBook, null, null, true));
pagesDesktop.push(addPage(desktopBook, introPage.text, null, false, true));

pagesMobile.push(addPage(mobileBook, null, null, true));
pagesMobile.push(addPage(mobileBook, introPage.text, null, false, true));


poemStanzas.forEach((stanza, i) => {
  pagesDesktop.push(addPage(desktopBook, stanza, i));
  pagesMobile.push(addPage(mobileBook, stanza, i));
});

function showPage(index) {
  pagesDesktop.forEach((p, i) => p.classList.toggle('visible', i === index));
  pagesMobile.forEach((p, i) => p.classList.toggle('visible', i === index));

  // Control button visibility
  if (index === pagesDesktop.length - 1) { // Last page
    nextButton.style.display = 'none';
    backToCoverButton.style.display = 'block';
  } else {
    nextButton.style.display = 'block';
    backToCoverButton.style.display = 'none';
  }
}

function flipNext() {
  if (currentPage < pagesDesktop.length - 1) {
    currentPage++;
    showPage(currentPage);
  }
}

function flipPrev() {
  if (currentPage > 0) {
    currentPage--;
    showPage(currentPage);
  }
}

function goToCover() {
    currentPage = 0;
    showPage(currentPage);
}

function updateLayout() {
  const useMobile = window.innerWidth < 768;
  desktopLayout.classList.toggle('active', !useMobile);
  mobileLayout.classList.toggle('active', useMobile);
  showPage(currentPage);
}

window.addEventListener('resize', updateLayout);
window.addEventListener('load', () => {
  updateLayout();
  showPage(currentPage);
});