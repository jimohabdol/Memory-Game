/*
 * Create a list that holds all of your cards
 */
 let deck = document.querySelector(".deck");
 let card = document.getElementsByClassName("card");
 //let cards = [...card];
 let cards = Array.from(card);

 var openCards = [];
 var cardCounter = [];
 let matchedCard = document.getElementsByClassName("match");

 let move = document.querySelector(".moves");
 let num = 0;

 var second = 0, min = 0, hour = 0, interval;
 var timer = document.querySelector(".timer");

 var modal = document.querySelector(".modal");

 let star = document.getElementsByClassName("fa fa-star");

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

  document.body.onload = startGame();
  document.querySelector(".restart").addEventListener("click", startGame);

  //method to start Game
  function startGame(){
    let newCard = shuffle(cards);
    deck.innerHTML = "";
    for (var i = 0; i < cards.length; i++){
      deck.appendChild(newCard[i]);
      cards[i].classList.remove('match','open','show','disable')
    }
    num = 0;
    move.innerHTML = num;
    console.log(num);
    timer.innerHTML = "Timer: 0 hrs 0 mins 0 secs";
    clearInterval(interval);
    cardCounter = [];
    for(let i = 0; i <=2; i++){
      star[i].style.visibility = "visible";
    }
  }

  for(var x = 0; x < cards.length; x++){
    cards[x].addEventListener("click", function(){
      /*
      *Loop through and add addEventListener to the card when clicked!
      */
      this.classList.toggle("open")
      this.classList.toggle("disable")
      this.classList.toggle("show")
    });
    cards[x].addEventListener("click", cardOpened);
    //loop through, addEventListener to openCards
  }

  //moves counter funtion
  function moves(){
      num++;
      move.innerHTML = num;
      starRating();
      console.log("i was called" + num);
      if(num == 1){
        time();
      }
  }//moves method ends here!!!

  function cardOpened() {
    openCards.push(this);
    moves();
    let numberOfOpenedCard = openCards.length;
    if (numberOfOpenedCard === 2) {
      if (openCards[0].isEqualNode(openCards[1])){//check if the two indexs have same nodes.
        //matchedCard
        matched();
        console.log('matched');
        congrat();
      }else{
        //unmatch....
        unmatched();
        console.log('unmatch');
      }
    }
  }

  function matched() {
    openCards[0].classList.add("match", "disable");
    openCards[1].classList.add("match", "disable");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.remove("show", "open");
    for (var j = 0; j < openCards.length; j++){
      cardCounter.push(openCards[x]);
    }
    openCards = [];
    console.log("matched method completed");
    //openCards = [];

  }//matched method ends here!!!
  function unmatched() {
    openCards[0].classList.add("unmatched", "show");
    openCards[1].classList.add("unmatched", "show");
    for(let i = 0; i < cards.length; i++){
      card[i].classList.add("disable"); //this is to disable the cards to aviod strange behaviour when cards are clicked.
    }

    /*
    * setTimeout methodis called to delay the time taken to remmove the classes
    * from the clicked cards. i notice that without the setTimeout when two unmatched cards are clicked
    * the second card dosen't show. thanks to setTimeout
    */
    setTimeout(function(){
      openCards[0].classList.remove("unmatched", "show", "disable", "open");
      openCards[1].classList.remove("unmatched", "show", "disable", "open");
      for(let i = 0; i < cards.length; i++){
      card[i].classList.remove("disable"); //this is to remove disable class from the cards.
      }
      for(let i = 0; i < matchedCard.length; i++){
      matchedCard[i].classList.add("disable"); //this is to remove disable class from the cards expected matched cards.
    }
      openCards = [];
    }, 300);
    console.log("unmatched method completed");
  }//unmatched method ends here!!!

  function time() {
      interval = setInterval(function () {
        timer.innerHTML = "Timer: "+ hour + "hrs :" + min + "mins :" + second + "secs";
        second++
        if(second==60){
          min++;
          second = 0;
        }
        if(min==60){
          hour++;
          min = 0;
        }
      }, 1000);
  }//end of time function

  function congrat() {
     if(cardCounter.length === 16){
      clearInterval(interval);
      document.querySelector("#lastMove").innerHTML = num + "moves ";
      document.querySelector("#finish").innerHTML = hour + "hrs :" + min + "mins :" + second + "secs";
      document.querySelector("#star").innerHTML = "Rating: "+document.querySelector(".stars").innerHTML;
      modal.style.display = "block";
      console.log("congratulations...!!!");
    }
  }//emd of congrat function

  window.onclick = function (event) {
    if(event.target === modal) {
      modal.style.display = "none";
      startGame();
    }
  }

  document.querySelector(".close").addEventListener("click", function() {
        modal.style.display = "none";
        startGame();
  });

  //starRating
  //let starUL = document.getElementsByClassName("stars")
  //const starList = [...starUL]

  function starRating(){
      if (num > 8 && num < 25){
        for( i= 0; i < 3; i++){
            if(i > 1){
                star[i].style.visibility = "collapse";
            }
        }
    }
    else if (num > 26){
        for( i= 0; i < 3; i++){
            if(i > 0){
                star[i].style.visibility = "collapse";
            }
        }
    }
  }
