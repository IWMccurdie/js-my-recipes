
const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', (_, response) => {
    const recipeList = recipes.map(recipe => {
        const { id, title, image, prepTime, difficulty } = recipe
        return { id, title, image, prepTime, difficulty }
    })
    response.send(recipeList)
})

router.post('/recipe/add/', (request, response) => {
    const id = recipes.length + 1
    const recipe = request.body
    const newRecipe = {id, ...recipe}
    recipes.push(newRecipe)
    response.send(newRecipe)
})

router.get('/recipe/:id', (request, response) => {
    const { id } = request.params
    const found = recipes.find(recipe => recipe.id.toString() === id)
    if (found) return response.send(found)
    
    response.status(400).json({ error: `Couldn't find recipe ${id}`
    })
    response.send()
})

module.exports = router