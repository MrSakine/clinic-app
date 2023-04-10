import { SuccessMessage } from "../_interfaces/success-message";

export const SUCCESS_MESSAGES: SuccessMessage[] = [
    {
        relatedTo: 'service',
        added: 'Une nouvelle prestation a été ajoutée avec succès',
        edited: 'La prestation (%1$) a été modifiée avec succès',
        deleted: 'La prestation (%1$) a été supprimée avec succès'
    },
    {
        relatedTo: 'service-provider',
        added: 'Une nouvelle personne (prestatire) a été ajoutée avec succès',
        edited: 'Le prestatire (%1$) a été modifié avec succès',
        deleted: 'Le prestatire (%1$) a été supprimée avec succès'
    },
    {
        relatedTo: 'insurance'
    }
];