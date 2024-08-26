 const searchBox = document.querySelector('.searchBox');
 const searchBtn = document.querySelector('.searchBtn');
 const recipeContainer = document.querySelector('.recipe-container');
 const recipeDetailsContent = document.querySelector('.recipe-details-content');
 const recipeCloseBtn = document.querySelector('.recipe-close-btn');

 //fucntion to get recipes
const fetchRecipes = async (query) =>{
    recipeContainer.innerHTML="<h2>Fetching Recipes....</h2>";          
    const data =  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
               const response = await  data.json();
            recipeContainer.innerHTML="";
               response.meals.forEach( meal =>{
                        const recipeDiv = document.createElement('div');
                        recipeDiv.classList.add('recipe');
                        recipeDiv.innerHTML = `
                         <img src="${meal.strMealThumb}">
                         <h3>${meal.strMeal}</h3>
                         <p><span>${meal.strArea} </span> Dish</p>
                         <p><span>${meal.strCategory}<span> Category</p>
                        `
                        const button = document.createElement('button');
                        button.textContent = "view recipe";
                        recipeDiv.appendChild(button);
                    /*addign eventlisterner to rexipe button*/
                    button.addEventListener('click',()=>{
                        openRecipePopup(meal);
                    })
                        recipeContainer.appendChild(recipeDiv);
                          
               });
               //console.log(response.meals[0]);

}

const fetchIngredients = (meal) => {
    let IngredieantsList = "";
    for (let i = 1; i <= 20; i++) {
      const Ingredient = meal[`strIngredient${i}`];
      if (Ingredient) {
        const measure = meal[`strMeasure${i}`];
        IngredieantsList += `<li>${measure} ${Ingredient}</li>`;
      } else {
        break;
      }
    }
    return IngredieantsList;  // Move return statement outside the loop
  };
  
const openRecipePopup = (meal) =>{
        recipeDetailsContent.innerHTML=`
        <h2 class ="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="IngredientsList">${fetchIngredients(meal)}</ul>
        <div>
        <h3>
        Instruction:
        </h3>
        <p class="recipeInstructions">
        ${meal.strInstructions}
        </p>
        </div>
        `
        recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display="none";

});
 searchBtn.addEventListener('click',(e)=>{
       e.preventDefault();
       const searchInput = searchBox.value.trim();
       fetchRecipes(searchInput);
       //console.log("button clicked");
 });



 