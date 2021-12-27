const base = 'http://localhost:8080';

export const endpoints = {
    register: base + '/api/user',
    login: base + '/login',
    getCategories: base + '/api/recipe/categories',
    getCuisines: base + '/api/recipe/cuisines',
    getRecipes: base + '/api/recipes/',
    getAllergens: base + '/api/allergens',
    newRecipe: base + '/api/recipe',
    allRecipes: base + '/recipes/',
    getUsername: base + '/api/username/',
    getRecipe: base + '/api/recipe/',
    getFavouriteRecipes: base + '/api/favourite-recipes/',
    likeRecipe: base + '/api/like-recipe/',
    dislikeRecipe: base + '/api/dislike-recipe/',
    adminGetUsers: base + '/api/admin/users',
    adminGetRecipes: base + '/api/admin/recipes',
    adminChangeRole: base + '/api/admin/user-role',
    adminDeleteUser: base + '/api/admin/user',
    adminDeleteRecipe: base + '/api/admin/recipe/',
    getRecipesQuery: base + '/api/recipe/query',
    editRecipe: base + '/api/recipe',
    deleteRecipe: base + '/api/recipe/',
    getRecipesWithIngredients: base + '/api/recipes-with-ingredients?ingredients=',
    newProduct: base + '/api/product',
    allProducts: base + '/api/products?',
    deleteProduct: base + '/api/product/',
    getProduct: base + '/api/product/'
}


