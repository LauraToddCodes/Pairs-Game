// PAIRS GAME

var x = window.matchMedia("(max-width: 36em)")
screenResponse(x)
x.addListener(screenResponse)

function screenResponse(x) {
    if (x.matches) {
        // MOBILE SCREEN
        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }

        let pair1 = "https://lauratoddcode.github.io/Pairs-Game/images/book.svg"
        let pair2 = "https://lauratoddcode.github.io/Pairs-Game/images/globe.svg"
        let pair3 = "https://lauratoddcode.github.io/Pairs-Game/images/mortarboard.svg"
        let pair4 = "https://lauratoddcode.github.io/Pairs-Game/images/pen.svg"
        let pair5 = "https://lauratoddcode.github.io/Pairs-Game/images/pencil.svg"
        let pair6 = "https://lauratoddcode.github.io/Pairs-Game/images/physics.svg"
        let pair7 = "https://lauratoddcode.github.io/Pairs-Game/images/schoolBag.svg"
        let pair8 = "https://lauratoddcode.github.io/Pairs-Game/images/schoolBell.svg"
        let pair9 = "https://lauratoddcode.github.io/Pairs-Game/images/scissors.svg"
        let pair10 = "https://lauratoddcode.github.io/Pairs-Game/images/testTubes.svg"
        let arr = [pair1, pair1, pair2, pair2, pair3, pair3, pair4, pair4, pair5, pair5, pair6, pair6, pair7, pair7, pair8, pair8, pair9, pair9, pair10, pair10];
        shuffle(arr);
        
        function assignCards(){
            $(".img1").attr("src", arr[0]);
            $(".img2").attr("src", arr[1]);
            $(".img3").attr("src", arr[2]);
            $(".img4").attr("src", arr[3]);
            $(".img5").attr("src", arr[4]);
            $(".img6").attr("src", arr[5]);
            $(".img7").attr("src", arr[6]);
            $(".img8").attr("src", arr[7]);
            $(".img9").attr("src", arr[8]);
            $(".img10").attr("src", arr[9]);
            $(".img11").attr("src", arr[10]);
            $(".img12").attr("src", arr[11]);
            $(".img13").attr("src", arr[12]);
            $(".img14").attr("src", arr[13]);
            $(".img15").attr("src", arr[14]);
            $(".img16").attr("src", arr[15]);
            $(".img17").attr("src", arr[16]);
            $(".img18").attr("src", arr[17]);
            $(".img19").attr("src", arr[18]);
            $(".img20").attr("src", arr[19]);
        }
        
        assignCards();

        let timer = null;
        let time = 0;

        // declare startTimer function
        function startTimer(){
        $("#timer").text(time);
        time += 1;
        }

        // if the timer is not started, start timer
        $(".back, .front").on("click", function(){
        if(timer == null){
            timer = setInterval(startTimer, 1000);
        }
        })



        let bestTimeInt = 100000000;

        $(".back, .front").on("click", function () {
            
            let foundAllPairs = $(".pairMatched").length;
            // if player has found all but last pair
            // foundAlPairs should be 18
            if (time > 0 && foundAllPairs == 18) {
                // the next card they flip will have gameComplete class added to it
                $(this).addClass("gameComplete");
                let gameComplete = $(".gameComplete").length;
            
                $(".back, .front").on("click", function(){
                    // the next card they flip will stop the timer
                    if(gameComplete == 1){
                    clearInterval(timer);
                    
                    
                    // high score
                    let currentTime = $("#timer").text();
                    let currentTimeInt = parseInt(currentTime);
                    console.log(`The current time is ${currentTimeInt}`)
                    
                    let bestTime = $("#bestTime").text();
                    let bestTimeInt = parseInt(bestTime);
                    console.log(`The best time is ${bestTimeInt}`)
                    
                    $("#pairsResult").text(`Your time was ${currentTimeInt} seconds`);
                    
                    if(currentTimeInt < bestTimeInt || bestTimeInt == 0){
                        $("#bestTime").text(currentTime);
                    }
                    
                    if(currentTimeInt < bestTimeInt && bestTimeInt != 0){
                        $("#highScore").html("<span>You beat your </br> best time!</span>");
                        $("#highScore").animate({
                        "font-size": "3em"
                        }, 2500)
                    }
                    
                    $("div#pairsModal")
                    .delay(1000)
                    .queue(function (next) {
                        $(this).css({
                        "opacity": "1",
                        "pointer-events": "auto"
                        });
                        
                        gameComplete = null;
                        timer = null;
                        time = 0;
                        $("#timer").text(time);
                        next();  
                    });
                    }
                });
            }
        });


        $(".back, .front").on("click", function() { 
            // find the class of the card that's been selected
            let cardFlipped = $(this).parent().attr("class");
            
            // if the card isn't flipped, then flip it
            if(cardFlipped == "card" || cardFlipped == "card returnCard") {
                
                // give the card the 'flipCard' class and remove the 'returnCard' class if needed
                $(this).parent().toggleClass("flipCard").removeClass("returnCard");
                
                
                let flippedCards = $(".flipCard").length;
                
                if (flippedCards % 2 == 1) {
                // give the front-side of the selected card the id of selectedCard1
                $(this).siblings().attr("id", "selectedCard1").addClass("selectedCard");
                }
                else if (flippedCards % 2 == 0) {
                // give the front-side of the selected card the id of selectedCard2
                $(this).siblings().attr("id", "selectedCard2").addClass("selectedCard");
                
                $(".card:not(.selectedCard)").addClass("notSelected");
                
                let src1 = $("#selectedCard1").children().attr("src");
                let src2 = $("#selectedCard2").children().attr("src");
                
                if(src1 == src2){
                    $("#selectedCard1").parent().addClass("pairMatched");
                    $("#selectedCard2").parent().addClass("pairMatched");
                    $("#selectedCard1").removeAttr("id").removeClass("selectedCard");
                    $("#selectedCard2").removeAttr("id").removeClass("selectedCard");
                    $(".notSelected").removeClass("notSelected");
                
                }
                else {
                    // to stop player selecting a new card before this has played out
                    setTimeout(function(){
                    $("#selectedCard1").parent().toggleClass("returnCard").removeClass("flipCard");
                    $("#selectedCard2").parent().toggleClass("returnCard").removeClass("flipCard");
                    $("#selectedCard1").removeAttr("id");
                    $("#selectedCard2").removeAttr("id");
                    $(".notSelected").removeClass("notSelected");
                    }, 1500);
                }
                
                }
                
                
            }
            // if the card is flipped, then return it to back-side facing up
            else if(cardFlipped == "card flipCard"){
                
                // give the card the 'returnCard' class and remove the 'flipCard' class
                $(this).parent().toggleClass("returnCard").removeClass("flipCard");
                
                // remove the id of 'selectedCard1' from the front-side of the card
                $(this).removeAttr("id");
                
            }
        
        
        });


        // reset button

        $("#resetBtn").on("click", function(){
            $(".card").removeClass("flipCard").removeClass("pairMatched").removeClass("returnCard");
            $(".back").removeClass("gameComplete");
            $(".front").removeClass("selectedCard");
            $("#highScore").css({"font-size": "0.25em"}).text("");
            $("div#pairsModal").css({
                "opacity": "0",
                "pointer-events": "none"
            })
            time = 0
            shuffle(arr);
            assignCards();
            let gameComplete = 0;
        });

        $("#gamesNav").on("click", function(){
            $("#gamesList").slideToggle(1000);
        })



    }
    else {
        // TABLET & DESKTOP SCREEN

        function shuffle(array) {
            array.sort(() => Math.random() - 0.5);
        }
        
        let pair1 = "https://lauratoddcode.github.io/Pairs-Game/images/book.svg"
        let pair2 = "https://lauratoddcode.github.io/Pairs-Game/images/globe.svg"
        let pair3 = "https://lauratoddcode.github.io/Pairs-Game/images/mortarboard.svg"
        let pair4 = "https://lauratoddcode.github.io/Pairs-Game/images/pen.svg"
        let pair5 = "https://lauratoddcode.github.io/Pairs-Game/images/pencil.svg"
        let pair6 = "https://lauratoddcode.github.io/Pairs-Game/images/physics.svg"
        let pair7 = "https://lauratoddcode.github.io/Pairs-Game/images/schoolBag.svg"
        let pair8 = "https://lauratoddcode.github.io/Pairs-Game/images/schoolBell.svg"
        let pair9 = "https://lauratoddcode.github.io/Pairs-Game/images/scissors.svg"
        let pair10 = "https://lauratoddcode.github.io/Pairs-Game/images/testTubes.svg"
        let arr = [pair1, pair1, pair2, pair2, pair3, pair3, pair4, pair4, pair5, pair5, pair6, pair6, pair7, pair7, pair8, pair8, pair9, pair9, pair10, pair10];
        shuffle(arr);
        
        function assignCards(){
            $(".img1").attr("src", arr[0]);
            $(".img2").attr("src", arr[1]);
            $(".img3").attr("src", arr[2]);
            $(".img4").attr("src", arr[3]);
            $(".img5").attr("src", arr[4]);
            $(".img6").attr("src", arr[5]);
            $(".img7").attr("src", arr[6]);
            $(".img8").attr("src", arr[7]);
            $(".img9").attr("src", arr[8]);
            $(".img10").attr("src", arr[9]);
            $(".img11").attr("src", arr[10]);
            $(".img12").attr("src", arr[11]);
            $(".img13").attr("src", arr[12]);
            $(".img14").attr("src", arr[13]);
            $(".img15").attr("src", arr[14]);
            $(".img16").attr("src", arr[15]);
            $(".img17").attr("src", arr[16]);
            $(".img18").attr("src", arr[17]);
            $(".img19").attr("src", arr[18]);
            $(".img20").attr("src", arr[19]);
        }
        
        assignCards();

        let timer = null;
        let time = 0;

        // declare startTimer function
        function startTimer(){
            $("#timer").text(time);
            time += 1;
        }

        // if the timer is not started, start timer
        $(".back, .front").on("click", function(){
            if(timer == null){
                timer = setInterval(startTimer, 1000);
            }
        })



        let bestTimeInt = 100000000;

        $(".back, .front").on("click", function () {
        
            let foundAllPairs = $(".pairMatched").length;
            // if player has found all but last pair
            // foundAlPairs should be 18
            if (time > 0 && foundAllPairs == 18) {
                // the next card they flip will have gameComplete class added to it
                $(this).addClass("gameComplete");
                let gameComplete = $(".gameComplete").length;
            
                $(".back, .front").on("click", function(){
                    // the next card they flip will stop the timer
                    if(gameComplete == 1){
                    clearInterval(timer);
                    
                    
                    // high score
                    let currentTime = $("#timer").text();
                    let currentTimeInt = parseInt(currentTime);
                    console.log(`The current time is ${currentTimeInt}`)
                    
                    let bestTime = $("#bestTime").text();
                    let bestTimeInt = parseInt(bestTime);
                    console.log(`The best time is ${bestTimeInt}`)
                    
                    $("#pairsResult").text(`Your time was ${currentTimeInt} seconds`);
                    
                    if(currentTimeInt < bestTimeInt || bestTimeInt == 0){
                        $("#bestTime").text(currentTime);
                    }
                    
                    if(currentTimeInt < bestTimeInt && bestTimeInt != 0){
                        $("#highScore").html("<span>You beat your </br> best time!</span>");
                        $("#highScore").animate({
                        "font-size": "4em"
                        }, 2500)
                    }
                    
                    $("div#pairsModal")
                    .delay(1000)
                    .queue(function (next) {
                        $(this).css({
                        "opacity": "1",
                        "pointer-events": "auto"
                        });
                        
                        gameComplete = null;
                        timer = null;
                        time = 0;
                        $("#timer").text(time);
                        next();  
                    });
                    }
                });
            }
        });


        $(".back, .front").on("click", function() { 
            // find the class of the card that's been selected
            let cardFlipped = $(this).parent().attr("class");
            
            // if the card isn't flipped, then flip it
            if(cardFlipped == "card" || cardFlipped == "card returnCard") {
                
                // give the card the 'flipCard' class and remove the 'returnCard' class if needed
                $(this).parent().toggleClass("flipCard").removeClass("returnCard");
                
                
                let flippedCards = $(".flipCard").length;
                
                if (flippedCards % 2 == 1) {
                // give the front-side of the selected card the id of selectedCard1
                $(this).siblings().attr("id", "selectedCard1").addClass("selectedCard");
                }
                else if (flippedCards % 2 == 0) {
                // give the front-side of the selected card the id of selectedCard2
                $(this).siblings().attr("id", "selectedCard2").addClass("selectedCard");
                
                $(".card:not(.selectedCard)").addClass("notSelected");
                
                let src1 = $("#selectedCard1").children().attr("src");
                let src2 = $("#selectedCard2").children().attr("src");
                
                if(src1 == src2){
                    $("#selectedCard1").parent().addClass("pairMatched");
                    $("#selectedCard2").parent().addClass("pairMatched");
                    $("#selectedCard1").removeAttr("id").removeClass("selectedCard");
                    $("#selectedCard2").removeAttr("id").removeClass("selectedCard");
                    $(".notSelected").removeClass("notSelected");
                
                }
                else {
                    // to stop player selecting a new card before this has played out
                    setTimeout(function(){
                    $("#selectedCard1").parent().toggleClass("returnCard").removeClass("flipCard");
                    $("#selectedCard2").parent().toggleClass("returnCard").removeClass("flipCard");
                    $("#selectedCard1").removeAttr("id");
                    $("#selectedCard2").removeAttr("id");
                    $(".notSelected").removeClass("notSelected");
                    }, 1500);
                }
                
                }
                
                
            }
            // if the card is flipped, then return it to back-side facing up
            else if(cardFlipped == "card flipCard"){
                
                // give the card the 'returnCard' class and remove the 'flipCard' class
                $(this).parent().toggleClass("returnCard").removeClass("flipCard");
                
                // remove the id of 'selectedCard1' from the front-side of the card
                $(this).removeAttr("id");
                
            }
        
        
        });


        // reset button

        $("#resetBtn").on("click", function(){
            $(".card").removeClass("flipCard").removeClass("pairMatched").removeClass("returnCard");
            $(".back").removeClass("gameComplete");
            $(".front").removeClass("selectedCard");
            $("#highScore").css({"font-size": "0.25em"}).text("");
            $("div#pairsModal").css({
                "opacity": "0",
                "pointer-events": "none"
            })
            time = 0
            shuffle(arr);
            assignCards();
            let gameComplete = 0;
        });

    }
}
