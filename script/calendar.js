var monthNameCollection =["January","February","March","April","May","June",
    "July","August","September","October","November","December"];
var weekdayCollection     =["下一顿吃什么好呢？" , "稍微摸会鱼吧...","今天也辛苦了！"];
var weekendCollection     =["想好去哪里玩了吗？",  "好好睡一觉吧...","也有人在想你..."];
var weekdayEmoji          =["img/吃什么.gif" ,"img/摸会鱼.gif","img/辛苦了.gif"];
var weekendEmoji          =["img/去哪玩.gif" ,"img/睡一觉.gif","img/好想你.gif"];

var monthNormal =[31,28,31,30,31,30,31,31,30,31,30,31];
var monthOlympic=[31,29,31,30,31,30,31,31,30,31,30,31];
var ourBegin    = new Date(2025, 8 , 14);

var dateNow = new Date();
var yearNow = dateNow.getFullYear();
var monthNow= dateNow.getMonth();
var dayNow  = dateNow.getDate();

var monthToWrite  = document.getElementById("monthName");
var yearToWrite   = document.getElementById("year");
var dayBox = document.getElementById("days");

var secondHand = document.querySelector(".hand.second");
var minHand = document.querySelector(".hand.min");
var hourHand = document.querySelector(".hand.hour");

var lineOne = document.getElementById("date");
var lineTwo = document.getElementById("day") ;
var lineThree = document.getElementById("sum");
var toHappen = document.getElementById("event");

function isLeapYear(year)
{
    if((year%4==0 && year%100!=0) || year %400 ==0){return true;}
    else return false;
}

function dayStart(month ,year)
{
    var dateTemp = new Date(year,month,1);
    return dateTemp.getDay() ;
}

function dayOfMonth(month,year)
{
    if(isLeapYear(year)) return monthOlympic[month];
    else return monthNormal[month];
}

function refreshDate(){
    var str="";
    var totalDay = dayOfMonth(monthNow,yearNow);
    var firstDay = dayStart(monthNow,yearNow);
    for(var i=1 ; i<=firstDay;i++)
    {
        str += "<li></li>";
    }
    

        for(var i=1; i<=totalDay;i++)
    {
        var dateClass="";
        if(yearNow ===dateNow.getFullYear() && monthNow ===dateNow.getMonth())
        {
            if(i===dateNow.getDate()) dateClass = "class='nowcolor'";
            if(i>dateNow.getDate()) dateClass ="class='futurecolor'";
        }
        else if(yearNow <dateNow.getFullYear() ||(yearNow ===dateNow.getFullYear() && monthNow <dateNow.getMonth()))
        {

        }
        else 
        {
            dateClass="class='futurecolor'";
        }

        str +="<li " + dateClass + ">"+ i +"</li>";
    }
    return str;
}

function updateCalendar(){
    monthToWrite.innerHTML = monthNameCollection[monthNow];
    yearToWrite.innerHTML  = yearNow;
    dayBox.innerHTML = refreshDate();
}

function leftclick(){
    monthNow--;
    if(monthNow<0){
        monthNow =11;
        yearNow--;
    }
    updateCalendar();
}

function rightclick(){
    monthNow++;
    if(monthNow>11){
        monthNow =0;
        yearNow++;
    }
    updateCalendar();
}

function wordload(){
    var numberClass="class='number'";
    let randomNumber = Math.ceil(Math.random()*3);

    lineOne.innerHTML="今天是" + "<li " + numberClass + ">"+ yearNow +"</li>" +"年"
    +"<li " + numberClass + ">"+ (monthNow+1) +"</li>"+"月" 
    +"<li " + numberClass + ">"+ dayNow +"</li>" +"日 ,";

    var dayTemp  = dateNow.getDay();

    if(dayTemp>=1 && dayTemp <=5)
    {
        lineTwo.innerHTML ="工作日的第" +
        "<li " + numberClass + ">"+ dayTemp +"</li>" +"天 。";
        toHappen.innerHTML = weekdayCollection[(randomNumber-1)];
        document.getElementById("gifimage").src = weekdayEmoji[(randomNumber-1)];
    }
    else if (dayTemp===6)
    {
        lineTwo.innerHTML ="双休的第" +
        "<li " + numberClass + ">"+ 1 +"</li>" +"天 。";
        toHappen.innerHTML = weekendCollection[(randomNumber-1)];
        document.getElementById("gifimage").src = weekendEmoji[(randomNumber-1)];
    }
    else 
    {
        lineTwo.innerHTML ="双休的第" +
        "<li " + numberClass + ">"+ 2 +"</li>" + "天 / " +
        "单休日 。";
        toHappen.innerHTML = weekendCollection[(randomNumber-1)];
        document.getElementById("gifimage").src = weekendEmoji[(randomNumber-1)];
    }
    var daySum =Math.ceil( Math.abs(dateNow.getTime() - ourBegin.getTime())/(1000*60*60*24) );


    lineThree.innerHTML="和一帆在一起的第" +
        "<li " + numberClass + ">"+ daySum +"</li>" + "天 。"; 

    if(monthNow===10 && dayNow ===18){
        toHappen.innerHTML = "一帆，生日快乐！";
        document.getElementById("gifimage").src = "img/乐扣.png";
    }



    

}

function updateClock() {

    var dateNow = new Date();
    var hourNow   = dateNow.getHours();
    var minNow    = dateNow.getMinutes();
    var secondNow = dateNow.getSeconds();   

    var secondsDegrees = (secondNow * 6) + 90;
    var minsDegrees = (minNow * 6 ) + (secondNow *0.1) + 90 ;
    var hourDegrees = (hourNow *30) + (minNow * 0.5) + 90;
    
    if (secondNow === 0) {
        secondHand.style.transition = 'none';
    } else {
        secondHand.style.transition = 'transform 0.05s linear';
    }
    
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minHand.style.transform = `rotate(${minsDegrees}deg)`;
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
}

window.onload =function(){
    updateCalendar();
    wordload();
    updateClock();
    this.setInterval(updateClock,1000);

}
