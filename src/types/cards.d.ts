export type StudyCard = {
    id: number,
    title: string,
    description: string | null,
    school?: string | null,
    userId: number,
    username: string,
    conceptCards: ConceptCard,
};

export type ConceptCard = {
    id: number,
    term: string,
    definition: string
};
