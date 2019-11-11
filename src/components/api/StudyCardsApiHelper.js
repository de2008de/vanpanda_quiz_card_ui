export const convertConceptCardsArrayToMap = conceptCards => {
    const conceptCardMap = {};
    conceptCards.forEach(card => {
        const id = card.id;
        conceptCardMap[id] = card;
    });
    return conceptCardMap;
};
