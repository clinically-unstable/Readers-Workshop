const circleInsights = {
  limbo: {
    title: "The Boundary",
    paragraphs: [
      "The first circle, Limbo, represents the boundary between excellence and salvation. Those who are not baptized, no matter if they were a good person or not, end up in Hell.",
      "It is the limit of human reason, and it displays that reason alone cannot achieve salvation. Those who have not sinned, however, are not punished with active suffering. Rather, their punishment is knowing that they are in Limbo forever."
    ],
  },
  lust: {
    title: "A story that argues for itself",
    paragraphs: [
      "Francesca tells her story with the polished language of romance: love appears to act by itself, leaving the lovers little agency. But the scene also makes us hear what her account leaves out. The book, the kiss, and the storm form a chain of choices even as her words recast them as fate.",
      "Dante the pilgrim is moved to pity; Dante the poet has placed the episode in a moral map. Holding those responses together makes the canto more unsettling than a simple lesson against desire."
    ],
  },
  gluttony: {
    title: "When appetite becomes a civic metaphor",
    paragraphs: [
      "Ciacco's encounter begins in the mud of bodily excess, then turns toward Florence: the city itself is described through images of overflowing appetite and envy. The shift suggests that the poem is interested not only in what a person consumes, but in how a community's desires can become insatiable.",
      "Ciacco is also a political voice, not just an example of a sin. His prediction makes the afterlife a place where Florence's present conflicts are remembered and judged."
    ],
  },
  greed: {
    title: "Two extremes, one loss of measure",
    paragraphs: [
      "Dante places hoarders and spendthrifts in opposing teams, but the collision does not make one side a winner. Both have let wealth set the terms of their lives. Their endless exchange turns possession and disposal into equally empty motions.",
      "This pairing is more subtle than a warning simply to spend less. Read beside Virgil's account of Fortune, the episode asks how to live with goods that change hands—and whether judgment and moderation can matter more than accumulation."
    ],
  },
  wrath: {
    title: "Anger above, anger below",
    paragraphs: [
      "The marsh gives anger two forms: visible violence on the surface and resentment buried beneath it. The pairing is not a claim that every quiet person is secretly wrathful; within Dante's moral vocabulary, it distinguishes destructive outburst from a life closed in bitterness.",
      "The episode also changes the journey's scale. Across the Styx stands Dis, a threshold after which the poem increasingly examines deliberate choices and the misuse of reason."
    ],
  },
  heresy: {
    title: "The limits of knowing",
    paragraphs: [
      "The burning tombs make a belief about death into a physical setting. Yet the canto's deeper unease comes from knowledge: the shades can see distant events but cannot see the present clearly. Their intellectual confidence has not given them the whole truth they sought.",
      "Farinata's political pride and Cavalcante's fear for his son interrupt one another in the same cemetery. The result is not an abstract debate alone; ideas about the soul remain entangled with family, memory, and Florence."
    ],
  },
  violence: {
    title: "What violence does to the self",
    paragraphs: [
      "The three rings classify violence by what it damages: another person, oneself, or the order Dante associates with God, nature, and human work. This is a medieval Christian framework, and its categories should be read in that historical context rather than mistaken for a neutral modern taxonomy.",
      "The wood of the suicides is especially difficult: a person's body and voice are transformed, and the pilgrim must wound a branch before he understands who is speaking. The scene makes recognition itself painful, asking what it means to treat a suffering person as an object."
    ],
  },
  fraud: {
    title: "A landscape built to mislead",
    paragraphs: [
      "Malebolge is not wild terrain but an engineered maze of ditches and bridges. Its built order suits fraud: deception is planned, varied, and adapted to its victims. The neatly divided landscape makes wrongdoing look almost administrative.",
      "Geryon prepares this descent before the travelers reach the ditches: his courteous face and dangerous body make appearance itself part of the warning. Here, intelligence is not condemned; its use to manipulate trust is."
    ],
  },
  treachery: {
    title: "The coldest form of isolation",
    paragraphs: [
      "At the bottom of Hell, fire gives way to ice. The reversal makes treachery feel less like a sudden blaze of passion than a refusal of human warmth: the deepest wrongs violate relationships that should have made trust possible.",
      "The frozen lake also answers the storm of the second circle. Paolo and Francesca are swept together by motion; the traitors are immobilized and cut off. The poem's geography turns emotional and moral distance into a physical condition."
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
  sources.className = "circle-sources-link";
  sources.innerHTML = `<a href="sources.html#circle-${key}">View sources here</a>`;
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
