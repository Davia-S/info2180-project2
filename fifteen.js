let puzzleArea;
let pieces;
let notify;
let timer;
let spaceY;
let spaceX;

window.onload = function ()
{
    puzzleArea = document.getElementById("puzzlearea");
    pieces = puzzleArea.getElementsByTagName("div");
    for (let i = 0; i < pieces.length; i++) {
        pieces[i].className = "puzzlepiece";
        pieces[i].style.left = (i%4*100)+'px'; 
        pieces[i].style.top = (parseInt(i/4)*100) + 'px';
        pieces[i].style.backgroundPosition= '-' + pieces[i].style.left + ' ' + '-' + pieces[i].style.top;   

        pieces[i].onmouseover = mouseHover;
        pieces[i].onmouseout = mouseOut; 
        pieces[i].onclick = moves;

    }

    let shuffle = document.getElementById('shufflebutton'); //initializes the shuffle button
    spaceX = '300px'; 
    spaceY = '300px'; 
    shuffle.onclick = shuffler;
}    


function mouseHover() //applies style changes when a mouse hovers over puzzle piece
{
    if (checkMove(parseInt(this.innerHTML)))
    {
        this.style.border = "2px solid red"; 
        this.style.color = "#006600"; 
        this.style.textDecoration = "underline"; 
        this.style.backgroundImage="url('background.jpg')"; 
    }
}
   

function mouseOut() //applied when mouse moves out of puzzle piece
{
    this.style.border = "2px solid black"; //reverts to its original size border 
    this.style.color = "#000000"; //reverts to original text color
    this.style.textDecoration = "none"; //reverts to original text state
}


function moves() //applied when mouse clicks on a puzzle piece
{
    if (checkMove(parseInt(this.innerHTML))) 
    {
        swap(this.innerHTML-1); 
        if (finish())
        {
            alert('You are a winner!'); 
        }
        return;
    }
}


function shuffler() //activates whenever the shuffle button is clicked
{

    for (let i=0; i<300; i++) 
    {
        let rand = parseInt(Math.random()* 100) %4; //generates a random number for shuffling each piece
        if (rand == 0)
        {
            let temp = up(spaceX, spaceY); 
            if ( temp != -1)
            {
                swap(temp);
            }
        }
        if (rand == 1)
        {
            let temp = down(spaceX, spaceY);
            if ( temp != -1) 
            {
                swap(temp);
            }
        }
        if (rand == 2)
        {
            let temp = left(spaceX, spaceY);
            if ( temp != -1)
            {
                swap(temp);
            }
        }
        if (rand == 3)
        {
            let temp = right(spaceX, spaceY);
            if (temp != -1)
            {
                swap(temp);
            }
        }
    }
}
  

function checkMove(position) // returns true whenever a piece can be moved into an empty space
{
	if (left(spaceX, spaceY) == (position-1))
	{
		return true;
	}
	if (down(spaceX, spaceY) == (position-1))
	{
		return true;
	}
	if (up(spaceX, spaceY) == (position-1))
	{
		return true;
	}
	if (right(spaceX, spaceY) == (position-1))
	{
		return true;
	}
}


function finish() //checks if all puzzle pieces are in the correct position
{
	let flag = true;
	for (let i = 0; i < pieces.length; i++) /{
		let top = parseInt(pieces[i].style.top);
		let left = parseInt(pieces[i].style.left);
		if (left != (i%4*100) || top != parseInt(i/4)*100)
		{
			flag = false;
			break;
		}
	}
	return flag;
}


function left(x, y) //calculates how far to the left a puzzlepiece should move
{
	let cordX = parseInt(x);
	let cordY = parseInt(y);
	if (cordX > 0)
	{
		for (let i = 0; i < pieces.length; i++) 
		{
			if (parseInt(pieces[i].style.left) + 100 == cordX && parseInt(pieces[i].style.top) == cordY)
			{
				return i;
			} 
		}
	}
	else 
	{
		return -1;
	}
}


function right (x, y) //calculates how far to the right a puzzlepiece should move
{
    let cordX = parseInt(x);
	let cordY = parseInt(y);
	if (cordX < 300)
	{
		for (let i =0; i<pieces.length; i++){
			if (parseInt(pieces[i].style.left) - 100 == cordX && parseInt(pieces[i].style.top) == cordY) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}


function up(x, y) //calculates how far up a puzzlepiece should move
{
	let cordX = parseInt(x);
	let cordY = parseInt(y);
	if (cordY > 0)
	{
		for (let i=0; i<pieces.length; i++)
		{
			if (parseInt(pieces[i].style.top) + 100 == cordY && parseInt(pieces[i].style.left) == cordX) 
			{
				return i;
			}
		} 
	}
	else 
	{
		return -1;
	}
}


function down (x, y) //calculates how far down a puzzlepiece should move
{
	let cordX = parseInt(x);
	let cordY = parseInt(y);
	if (cordY < 300)
	{
		for (let i=0; i<pieces.length; i++)
		{
			if (parseInt(pieces[i].style.top) - 100 == cordY && parseInt(pieces[i].style.left) == cordX) 
			{
				return i;
			}
		}
	}
	else
	{
		return -1;
	} 
}


function swap (position) //moves the puzzle piece by switching position with an empty space
{
	let temp = pieces[position].style.top;
	pieces[position].style.top = spaceY;
	spaceY = temp;
	temp = pieces[position].style.left;
	pieces[position].style.left = spaceX;
	spaceX = temp;
}






			