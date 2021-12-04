const base = 'http://localhost:8080';

export const endpoints = {
    register: base + '/api/user/new',
    login: base + '/login',
    getCategories: base + '/api/recipe/categories',
    getCuisines: base + '/api/recipe/cuisines',
}


