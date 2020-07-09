var table_row=document.getElementsByTagName('tr');
var table_cell=document.getElementsByTagName('td');
var table_slot=document.querySelectorAll('.slot');
const player_turn=document.querySelector('.player');
const reset=document.querySelector('.reset');
var drop_sound=new Audio('212233__alexthegr81__tapesnare-5.wav');
var victory_sound=new Audio('jc.wav');


while(!player1)
{
    var player1=prompt('Player One: Enter your name.You will be Dark Green');
}

player1_color='#0d7369';

while(!player2)
{
    var player2=prompt('Player Two: Enter your name.You will be black');
}

player2_color='black';

var current_player=1;
player_turn.innerHTML=`${player1}'s Turn`;

Array.prototype.forEach.call(table_cell,(cell)=>
{
    cell.addEventListener('click',change_color);
    cell.style.backgroundColor='white';
})


function change_color(e)
{
    let column=e.target.cellIndex;
    let row=[];
    for(let i=5;i>=0;i--)
    {
        if(table_row[i].children[column].style.backgroundColor=='white')
        {
            row.push(table_row[i].children[column]);
            if(current_player===1)
            {
                row[0].style.backgroundColor=player1_color;
                drop_sound.play();
                if(horizontal_check()|| vertical_check()|| diagonal_check()||diagonal_check2())
                {
                    victory_sound.muted=false;
                    victory_sound.play();
                    player_turn.textContent=`${player1} WINS!`
                    player_turn.style.color=player1_color;
                    return alert(`${player1} WINS!`)
                }
                else if(draw_check())
                {
                    player_turn.textContent="IT'S A DRAW( -_-')";
                    return alert("IT'S A DRAW (-_-')");
                }
                else
                {
                    player_turn.innerHTML=`${player2}'s Turn`;
                    return current_player=2;
                }
            }
            else
            {
                row[0].style.backgroundColor=player2_color;
                drop_sound.play();
                if(horizontal_check()||vertical_check()|| diagonal_check()||diagonal_check2())
                {
                    victory_sound.muted=false;
                    victory_sound.play();
                    player_turn.textContent=`${player2} WINS!`;
                    player_turn.style.color=player2_color;
                    return alert(`${player2} WINS!`);
                }
                else if(draw_check())
                {
                    player_turn.textContent="IT'S A DRAW (-_-')";
                    return alert("IT'S A DRAW (-_-')");
                }
                else
                {
                    player_turn.innerHTML=`${player1}'s Turn`;
                    return current_player=1;
                }
                
            }
        }
    }
}

function match(one,two,three,four)
{
    return (one==two && one==three && one==four && one!=='white');
}

function horizontal_check()
{
    for(let row=0;row<table_row.length;row++)
    {
        for(let col=0;col<4;col++)
        {
            if(match(table_row[row].children[col].style.backgroundColor,
                table_row[row].children[col+1].style.backgroundColor,
                table_row[row].children[col+2].style.backgroundColor,
                table_row[row].children[col+3].style.backgroundColor))
                {
                    return true;
                }
        }
    }
}

function vertical_check()
{
    for(let col=0;col<7;col++)
    {
        for(let row=0;row<3;row++)
        {
            if(match(table_row[row].children[col].style.backgroundColor,
                table_row[row+1].children[col].style.backgroundColor,
                table_row[row+2].children[col].style.backgroundColor,
                table_row[row+3].children[col].style.backgroundColor))
                {
                    return true;
                }
        }
    }
}

function diagonal_check()
{
    for(let col=0;col<4;col++)
    {
        for (let row=0;row<3;row++)
        {
            if (match(table_row[row].children[col].style.backgroundColor,
                table_row[row+1].children[col+1].style.backgroundColor,
                table_row[row+2].children[col+2].style.backgroundColor,
                table_row[row+3].children[col+3].style.backgroundColor))
                {
                    return true;
                }
            }
    }
}

function diagonal_check2(){ 
    for(let col=0;col<4;col++)
    {
        for (let row=5;row>2;row--)
        {
            if (match(table_row[row].children[col].style.backgroundColor,
                table_row[row-1].children[col+1].style.backgroundColor,
                table_row[row-2].children[col+2].style.backgroundColor,
                table_row[row-3].children[col+3].style.backgroundColor))
                {
                    return true;
                }
        }
    }
}

function draw_check()
{
    let full_slot=[];
    for(let i=0;i<table_cell.length;i++)
    {
        if(table_cell[i].style.backgroundColor!=='white')
        {
            full_slot.push(table_cell[i]);
        }
    }
    if(full_slot.length===table_cell.length)
    {
        return true;
    }
}

reset.addEventListener('click',()=>
{
    victory_sound.muted=true;
    table_slot.forEach(slot=>
        {
            slot.style.backgroundColor='white';
        });
    player_turn.style.color='black';
    return (current_player===1 ? player_turn.textContent=`${player1}'s turn`:player_turn.textContent=`${player2}'s turn`);
});
