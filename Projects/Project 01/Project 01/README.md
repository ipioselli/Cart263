# Project 01: Night at the movies
Ratatouille

I based my project 1 on the film Ratatouille. To briefly summarize, the main character, Remi, is a rat living in Paris who wants to become a chef. He meets a human named Linguini that helps him live his dream. I included some scenes from the movie as fun minigames. I also included songs from the movie to create an interactive soundscape.

The user is living the film through Remi. You start the experience on the start state which includes floating ingredients needed to make ratatouille which alludes to one of the minigames. Then once you enter, there is a menu state that looks like a restaurant menu since the film takes place in a restaurant. You can click on `help` to get a brief description of what the game is about or click on `game` to get straight into the story. The first state in game shows Remi eating fruits and cheese with background effects. I used responsive voice so that when you click on the screen you get a short backstory. The responsive voice has a French accent since Remi is from Paris. I included the background effects since there are multiple scenes in the movie where he is eating fruits and cheese and there are fireworks in the background to show how much he loves the flavours. The next state shows a TV with his favourite chef "Gusteau". If you click on the tv knob there is another short backstory. I included this scene since Gusteau is the main reason he wants to become a chef.

The next part of the story includes the first minigame. Once he makes his way into Gusteau kitchen, he gets caught and the chefs in the kitchen try to take him out with a knife. The user must dodge all the knifes and make it the other end of the screen to win. Once you win, you meet Linguini who saves your life and helps you live your dreams of becoming a chef. This brings you to the main game. On the screen there are all the ratatouille ingredients floating around the page. Using handpose, you must use your index finger to move the wooden spoon around hover over the veggies to place them into the cooking pot. On the left of the screen you will see the ingredients list. Once all the ingredients have been placed into the pot, the ingredients will say "READY" and you win the game and become a chef. There is also one rat poison floating around. If you tap it, you lose the game since you ruined the meal and cannot become a chef. If you also do not manage to place all the veggies in the pot before the timer runs out then you lose .

To meet the requirements I used responsiveVoice and ml5 handpose. I used responsive voice to tell the backstory at the beginning of the game since I thought it would be more interesting to listen than read out the whole text. Its also more interactive since you get to click on the buttons/screen to activate the voice. I also used handpose for the main game since I really enjoyed the handpose exercise and wanted to create something similar but more interactive and complex.

Sources :
========
-  Playlist to all the songs: https://www.youtube.com/watch?v=0xJoNV8rq84&list=PLB3CC5B614BD280E1&index=15&ab_channel=121UniversalCritic
- ml5 handpose camera issue: https://editor.p5js.org/pippinbarr/sketches/wAqNc_PUs
- fade animation : https://editor.p5js.org/remarkability/sketches/rtM08miUD
- 2d elements drawn by me
- Fonts:
    - Copperplate
    - Disney font
    - Dancing script
