export type GrauParentesco = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export const GrauParentesco = {
    NUMBER_1: 1 as GrauParentesco,
    NUMBER_2: 2 as GrauParentesco,
    NUMBER_3: 3 as GrauParentesco,
    NUMBER_4: 4 as GrauParentesco,
    NUMBER_5: 5 as GrauParentesco,
    NUMBER_6: 6 as GrauParentesco,
    NUMBER_7: 7 as GrauParentesco,
    NUMBER_8: 8 as GrauParentesco
};

export const grausParentescos: { id: number, description: string }[] = [
    {
        id: 1,
        description: "Mãe"
    },
    {
        id: 2,
        description: "Pai"
    },
    {
        id: 3,
        description: "Irmão(a)"
    },
    {
        id: 4,
        description: "Primo(a)"
    },
    {
        id: 5,
        description: "Sobrinho(a)"
    },
    {
        id: 6,
        description: "Tio(a)"
    },
    {
        id: 7,
        description: "Avo"
    },
    {
        id: 8,
        description: "Filho(a)"
    },
    {
        id: 9,
        description: "Esposo(a)"
    }
];
