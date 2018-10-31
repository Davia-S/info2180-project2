let puzzleArea;
let pieces;

window.onload = function ()
{
    puzzleArea = document.getElementById("puzzlearea");
    pieces = puzzleArea.getElementsByTagName("div");
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].className = "puzzlepiece";
        pieces[i].style.left = (i%4*100)+'px'; 
        pieces[i].style.top = (parseInt(i/4)*100) + 'px';
        
    } 
};
