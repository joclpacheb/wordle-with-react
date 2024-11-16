# Wordle Clone using React.js 

This small project was created as a coding challenge to practice after a coding interview as an UI engineer at a games studio, held on Nov 15th.

**Main Goal**: Recreate the functional/interactive aspects from the game programming of Wordle using React.js.


## Implementation notes and functional features/requirements:

- **Commits and Thought Process**: Continuing from the initial exploration, the commit history in this repository shows my personal thought process of implementing the functional aspects of this game from the original files provided in the challenge. I used [Gitmoji](https://gitmoji.dev/) for my commits.

- **Dynamic Config Values**: For each game session, I decided that one word gets randomly chosen from a bank of words that can be expanded in the (ConfigValues file), the Word length and number of attempts can also be configured in the same file.

- **Validated Input** The Input element has been validated to only accept letter characters, no spaces and automatically changes the casing (caps) before evaluation for better data consistency.

- **Submitting Guesses** I decided that for each attempt you can click the "EVALUATE" button or press the "ENTER" key to submit the guessed word for evaluation as requested in the instructions.

- **Game Status Message** The game evaluates the guess and displays the result with a message displayed for winning the game or for getting a game over after using all available attempts. 

- **Styling**: The main goal of this challenge was focused on the interactive and functional aspects of the Wordle game rather than the styling of its elements. The stylesheet uses simple styles with Sass and I moved the styles into a single global *styles.scss* file with its respective selectors and style variables.

## Screenshot:
![Screenshot]("/src/assets/screenshot1.png")
![Screenshot]("/src/assets/screenshot2.png")
![Screenshot]("/src/assets/screenshot3.png")


## Game Rules: 
These rules were given by the interviewer as a reference of the coding challenge.

1. Player has 6 attempts to guess a 5-letter word
2. Guesses are entered by pressing Enter, after which the guess score appears and the following row becomes the active row. Each guess must be a valid word.
2. The scoring is communicated through the background color of each letter:
   - Green (correct): Letter is correct and in right position
   - Yellow (imprecise): Letter is in word but wrong position
   - Gray (incorrect): Letter is not in word
3. The player wins the game once they successfully guess the word. The player loses if they are not able to guess the word within 6 attempts.


As a reference, you can play the original game by visiting: https://www.nytimes.com/games/wordle/index.html



## Deployment:
To deploy this project run:

```bash
  npm run dev
```
- Tools: It was created using React JSX, CSS and Vite (https://vite.dev/).


## Author:

Developed By Jose Luis Pacheco B.

- **Github** (Front-end academic and personal projects): https://github.com/joclpacheb
-  **Games Portfolio** (Unity gameplay focused): https://jose-luis-gamedev.vercel.app/
- **Contact**: https://www.linkedin.com/in/jose-luis-pacheco-boscan/
