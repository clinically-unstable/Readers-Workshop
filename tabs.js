const circleInsights = {
  limbo: {
    title: "Excellence is not salvation",
    paragraphs: [
      "Limbo marks the line between human achievement and divine salvation. Even virtuous people remain trapped here if they were never baptized, regardless of how exemplary their lives may have been.",
      "The circle demonstrates the limits of human reason: intelligence and moral effort alone cannot bring a soul to salvation. Although these inhabitants receive no active torment, they suffer the eternal awareness that they can never reach God."
    ],
  },
  lust: {
    title: "Desire that overrules judgment",
    paragraphs: [
      "Lust is concerned with the force behind desire, not merely forbidden sexual acts. Dante presents it as an excessive impulse that overwhelms reason and self-control.",
      "The souls are driven by the same restless wind that carries them through the circle. Their aimless motion reflects how passion can confuse judgment and divert people from what truly matters."
    ],
  },
  gluttony: {
    title: "Appetite beyond restraint",
    paragraphs: [
      "Gluttony depicts selfish and uncontrolled consumption. Dante is concerned not only with what individuals eat or desire, but with how a community's appetites can grow without limit.",
      "His criticism of Florence makes this political as well as moral. Dante suggests that insatiable greed and excess have weakened civic life, while unchecked appetite continues to cloud judgment and spiritual purpose."
    ],
  },
  greed: {
    title: "Wealth stripped of meaning",
    paragraphs: [
      "Avarice is an extreme attachment to material wealth, and Dante treats it as both hoarding and reckless spending. In the fourth circle, hoarders and squanderers endlessly collide and shove, with neither side ever winning.",
      "Their futile struggle mirrors an economic obsession that brings no peace. After years of torment, their faces are disfigured, reflecting how greed has stripped away the individuality of those consumed by it."
    ],
  },
  wrath: {
    title: "Anger outward and inward",
    paragraphs: [
      "The fifth circle shows wrathful anger in two forms. The Wrathful attacked and tore at others during life and now repeat that violence for eternity.",
      "The Sullen remained silent and withdrew their joy and gratitude, allowing resentment to consume them. Now they gurgle beneath the swamp, unable to express the words they refused to speak.",
      "Like the sins of the previous circles, wrath is a failure to restrain natural impulses. It represents souls allowing emotion to govern judgment and action."
    ],
  },
  heresy: {
    title: "Belief closed against eternity",
    paragraphs: [
      "Heresy begins the level of sins that involve deliberately rejecting right belief or order. Heretics hold opinions, especially about religion, that oppose accepted truth and common expectations.",
      "Inside the sixth circle, they lie in stone tombs heated by flames. Because they denied the afterlife, they are imprisoned in these graves forever, with the tombs remaining open until the Last Judgment and closing after the resurrection."
    ],
  },
  violence: {
    title: "Violence against creation",
    paragraphs: [
      "The seventh circle divides violence into attacks against other people, oneself, and God or the natural order.",
      "Those who harmed others stand submerged in boiling blood, echoing the rage and bloodshed that defined their lives. Suicides become trees whose branches are endlessly torn by harpies, while squanderers are pursued and ripped apart by hounds just as they destroyed their own wealth.",
      "In the final ring, blasphemers, sodomites, and usurers endure burning rain in a barren desert. Having rejected God's natural order, they remain in a sterile wasteland suited to acts Dante presents as unnatural."
    ],
  },
  fraud: {
    title: "Intelligence turned against truth",
    paragraphs: [
      "Fraud occupies the eighth circle and consists of ten subdivisions called bolgias. It is the misuse of human intelligence, God's gift, to deceive, manipulate, and conceal the truth.",
      "Most of the sinners' punishments involve the destruction or concealment of identity and appearance. Their distorted bodies mirror the disguises and broken truths that allowed them to hide malice while depending on other people's trust."
    ],
  },
  treachery: {
    title: "Cold indifference at the end",
    paragraphs: [
      "Treachery lies at the bottom of Hell and is divided into four frozen regions. The ice replaces fire because complete betrayal means moving farthest from God's warmth and love.",
      "Dante presents evil as cold indifference rather than uncontrolled passion. In the lowest region, sin has destroyed the capacity for human connection: the sinners are deprived of speech and movement.",
      "Lucifer himself is immobile and mute, another victim of his own sin. Unable to speak God's words, he chews on history's greatest traitors. By stripping evil of grandeur and action, Dante reveals Lucifer and treachery as the absence of good."
    ],
  }
};

function addCircleTabs(article) {
  const key = article.dataset.circle;
  const insight = circleInsights[key];
  const layer = article.querySelector(".circle-content");
  const hero = article.querySelector(".circle-hero");
  if (!insight || !layer || !hero) return;

  const id = `circle-${key}`;
  const tabs = document.createElement("div");
  tabs.className = "circle-tabs";
  tabs.setAttribute("role", "tablist");
  tabs.setAttribute("aria-label", "Circle information");
  tabs.innerHTML = `
    <button class="circle-tab" id="${id}-layer-tab" type="button" role="tab" aria-selected="true" aria-controls="${id}-layer" tabindex="0">The layer</button>
    <button class="circle-tab" id="${id}-insight-tab" type="button" role="tab" aria-selected="false" aria-controls="${id}-insight" tabindex="-1">Meaning &amp; insight</button>
  `;

  const layerPanel = document.createElement("section");
  layerPanel.className = "circle-tab-panel";
  layerPanel.id = `${id}-layer`;
  layerPanel.setAttribute("role", "tabpanel");
  layerPanel.setAttribute("aria-labelledby", `${id}-layer-tab`);
  layerPanel.tabIndex = 0;
  layer.parentNode.insertBefore(tabs, layer);
  layerPanel.append(layer);
  tabs.insertAdjacentElement("afterend", layerPanel);

  const insightPanel = document.createElement("section");
  insightPanel.className = "circle-tab-panel";
  insightPanel.id = `${id}-insight`;
  insightPanel.setAttribute("role", "tabpanel");
  insightPanel.setAttribute("aria-labelledby", `${id}-insight-tab`);
  insightPanel.tabIndex = 0;
  insightPanel.hidden = true;

  const insightContent = document.createElement("div");
  insightContent.className = "circle-content";
  const copy = document.createElement("div");
  copy.className = "insight-copy";
  copy.innerHTML = `<p class="insight-kicker">A second reading</p><h2>${insight.title}</h2>`;
  insight.paragraphs.forEach((paragraph) => {
    const p = document.createElement("p");
    p.textContent = paragraph;
    copy.append(p);
  });
  const prompt = document.createElement("aside");

  const promptText = document.createElement("p");
  promptText.textContent = insight.prompt;
  prompt.append(promptText);

  const sources = document.createElement("p");
  insightContent.append(copy, prompt, sources);
  insightPanel.append(insightContent);
  layerPanel.insertAdjacentElement("afterend", insightPanel);

  const buttons = Array.from(tabs.querySelectorAll('[role="tab"]'));
  buttons.forEach((button, index) => {
    button.addEventListener("click", () => selectTab(index));
    button.addEventListener("keydown", (event) => {
      let nextIndex;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % buttons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + buttons.length) % buttons.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = buttons.length - 1;
      if (nextIndex !== undefined) {
        event.preventDefault();
        selectTab(nextIndex);
        buttons[nextIndex].focus();
      }
    });
  });

  function selectTab(selectedIndex) {
    buttons.forEach((button, index) => {
      const selected = index === selectedIndex;
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    layerPanel.hidden = selectedIndex !== 0;
    insightPanel.hidden = selectedIndex !== 1;
  }
}

document.querySelectorAll(".level-placeholder[data-circle]").forEach(addCircleTabs);
