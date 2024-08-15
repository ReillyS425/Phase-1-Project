document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault();
    const generateBtn = document.getElementById('generateBtn');
    const musicElement = document.getElementById("sound");

    //Create an Audio Object
    let audio = new Audio('/sound/hawaii.mp3');

    //Define playAudio Function
    function playAudio() {
        if (!audio.muted) { // Only play if not muted
            audio.play().catch(error => console.error('Error playing Audio:', error));
        }
    }

    
    
    document.addEventListener('scroll', () => {
        audio.muted = false; // Unmute the audio
        playAudio();
    });


    // Attach click event listener to the Generate button
    generateBtn.addEventListener('click', () => {
        initializeFetch();   
    });

    // Function to fetch and display a random Margarita from a specific array
    function initializeFetch() {
        fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
            .then(response => response.json())
            .then(data => {
                const drinksArray = data.drinks; // array of margaritas 
                const randomIndex = Math.floor(Math.random() * drinksArray.length); // Generate a random index
                const randomDrink = drinksArray[randomIndex]; // Select a random margarita from the array
                displayDrinkCard(randomDrink);
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    // Function to display the drink information on the page
    function displayDrinkCard(drink) {
        const cardSection = document.getElementById('cardSection');
        cardSection.textContent = ''; // Clear existing content

        // Create elements for the card
        const cardDiv = document.createElement('div');
        cardDiv.className = 'drink-card'; // STYLE THIS IN CSS DELETE WHEN FINISHED
        cardDiv.dataset.instructions = drink.strInstructions; // Store instructions in a data attribute

        const imgElement = document.createElement('img');
        imgElement.src = drink.strDrinkThumb;
        imgElement.alt = drink.strDrink;

        const nameElement = document.createElement('h2');
        nameElement.textContent = drink.strDrink;

        const ingredientsList = document.createElement('ul');

        // Loops through the ingredients and measurements, assuming they exist up to the 15th ingredient
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient && measure) {
                const listItem = document.createElement('li');
                listItem.textContent = `${measure} ${ingredient}`;
                ingredientsList.appendChild(listItem);
            }
        }

        // Append elements to the card
        cardDiv.appendChild(imgElement);
        cardDiv.appendChild(nameElement);
        cardDiv.appendChild(ingredientsList);

        // Insert the card into the cardSection div
        cardSection.appendChild(cardDiv);

        //Mouse over event to display instructions
        cardDiv.addEventListener('mouseover', () => {
            const instructionsDisplay = document.getElementById('instructions'); // Assuming you have an element with id="instructions" to display the text
            instructionsDisplay.textContent = cardDiv.dataset.instructions;
            instructionsDisplay.style.display = 'block'; // Show the instructions
        });
        //Mouse out event to remove instructions when mouse is moved off the card
        cardDiv.addEventListener('mouseout', () => {
            const instructionsDisplay = document.getElementById('instructions');
            instructionsDisplay.textContent = ''; // Clear the instructions text
            instructionsDisplay.style.display = 'none'; // Hide the instructions
        });
    }
});






