const en_messages = {
    'INTERNAL_SERVER_ERROR': 'Internal server error',
    'BAD_REQUEST': 'Bad request',
    'UNAUTHORIZED': 'Unauthorized',
    'FORBIDDEN': 'Forbidden',
    'NOT_FOUND': 'Not found',
    'METHOD_NOT_ALLOWED': 'Method not allowed',
    'NOT_ACCEPTABLE': 'Not acceptable',
    'REQUEST_TIMEOUT': 'Request timeout',
    'CONFLICT': 'Conflict',
    'GONE': 'Gone',
    'LENGTH_REQUIRED': 'Length required',
    'PRECONDITION_FAILED': 'Precondition failed',
    'PAYLOAD_TOO_LARGE': 'Payload too large',
    'UNSUPPORTED_MEDIA_TYPE': 'Unsupported media type',
    'UNPROCESSABLE_ENTITY': 'Unprocessable entity',
    'TOO_MANY_REQUESTS': 'Too many requests',
    'DELETE_SUCCESS': 'Deleted successfully',
    'UPDATE_SUCCESS': 'Updated successfully',
    'CREATE_SUCCESS': 'Created successfully',
    'FETCH_SUCCESS': 'Fetched successfully',
    'LOGIN_SUCCESS': 'Logged in successfully',
    'LOGOUT_SUCCESS': 'Logged out successfully',
    'REGISTER_SUCCESS': 'Registered successfully',
    'INVALID_EMAIL': 'Invalid email',
    'INVALID_PASSWORD': 'Invalid password',
    'EMAIL_REQUIRED': 'Email is required',
    'PASSWORD_REQUIRED': 'Password is required',
    'CONFIRM_PASSWORD_REQUIRED': 'Confirm Password is required',
    'PASSWORD_MISMATCH': 'Password does not match',
    'EMAIL_EXISTS': 'Email already exists',
    'USERID_EXISTS': 'User ID already exists',
    'USER_NOT_FOUND': 'User not found',
    'INVALID_CREDENTIALS': 'Invalid credentials',
    'TOKEN_REFRESH': 'User found successfully',
    'TASK_CREATED': 'Task created successfully',
    'TASK_UPDATED': 'Task updated successfully',
    'TASK_DELETED': 'Task deleted successfully',
    'TASK_FETCHED': 'Task fetched successfully',
    'TASK_NOT_FOUND': 'Task not found',
}

const fr_messages = {
    'INTERNAL_SERVER_ERROR': 'Erreur interne du serveur',
    'BAD_REQUEST': 'Mauvaise demande',
    'UNAUTHORIZED': 'Non autorisé',
    'FORBIDDEN': 'Interdit',
    'NOT_FOUND': 'Non trouvé',
    'METHOD_NOT_ALLOWED': 'Méthode non autorisée',
    'NOT_ACCEPTABLE': 'Pas acceptable',
    'REQUEST_TIMEOUT': 'Délai de demande',
    'CONFLICT': 'Conflit',
    'GONE': 'Disparu',
    'LENGTH_REQUIRED': 'Longueur requise',
    'PRECONDITION_FAILED': 'Précondition échouée',
    'PAYLOAD_TOO_LARGE': 'Charge utile trop grande',
    'UNSUPPORTED_MEDIA_TYPE': 'Type de support non pris en charge',
    'UNPROCESSABLE_ENTITY': 'Entité non traitable',
    'TOO_MANY_REQUESTS': 'Trop de demandes',
    'DELETE_SUCCESS': 'Supprimé avec succès',
    'UPDATE_SUCCESS': 'Mis à jour avec succès',
    'CREATE_SUCCESS': 'Créé avec succès',
    'FETCH_SUCCESS': 'Récupéré avec succès',
    'LOGIN_SUCCESS': 'Connecté avec succès',
    'LOGOUT_SUCCESS': 'Déconnecté avec succès',
    'REGISTER_SUCCESS': 'Enregistré avec succès',
    'INVALID_EMAIL': 'Email invalide',
    'INVALID_PASSWORD': 'Mot de passe invalide',
    'EMAIL_REQUIRED': 'Email est requis',
    'PASSWORD_REQUIRED': 'Mot de passe requis',
    'CONFIRM_PASSWORD_REQUIRED': 'Confirmer le mot de passe est requis',
    'PASSWORD_MISMATCH': 'Le mot de passe ne correspond pas',
    'EMAIL_EXISTS': 'Email existe déjà',
    'USER_NOT_FOUND': 'Utilisateur non trouvé',
    'INVALID_CREDENTIALS': 'Informations de connexion invalides',
    'TOKEN_REFRESH': 'Utilisateur trouvé avec succès',
}


const message = (lang, key) => {
    if (lang == 'fr') {
        return fr_messages[key] || key;
    }
    return en_messages[key] || key;
}

module.exports = { message };