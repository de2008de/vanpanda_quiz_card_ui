export type StudyCard = {
    [index: string],
    id?: number,
    title: string,
    description: string | null,
    school?: string | null,
    userId?: number,
    username?: string,
    conceptCards: ConceptCard[],
};

export type ConceptCard = {
    [index: string],
    id?: number,
    term: string,
    definition: string,
    img?: string | null
};
