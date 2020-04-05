

function processOpnFrmData(event){
    event.preventDefault();
    const inputs = document.getElementById("opnForm").elements;
    const noFname = inputs[0].value.trim();
    const noSname = inputs[1].value.trim();
    const noEmail = inputs[2].value.trim();
    const noImg = inputs[3].value.trim();
    const noMale = inputs[4].checked;
    const noFemale = inputs[5].checked;
    const noOther = inputs[6].checked;
    const noMarried =inputs[7].checked;
    const noSingle = inputs[8].checked;
    const noFavorite = inputs[9].value.trim();
    const noEurope = inputs[10].checked;
    const noNorthA = inputs[11].checked;
    const noSouthA = inputs[12].checked;
    const noAsia = inputs[13].checked;
    const noAfrica = inputs[14].checked;
    const noOceania = inputs[15].checked;
    const noComment = inputs[16].value.trim();
    const nopWillReturn = inputs[17].checked;


    const newComment =
        {
            firstName: noFname,
            secondName: noSname,
            email: noEmail,
            img: noImg,
            male: noMale,
            female: noFemale,
            other: noOther,
            married: noMarried,
            single: noSingle,
            europe: noEurope,
            north: noNorthA,
            south: noSouthA,
            asia: noAsia,
            africa: noAfrica,
            oceania: noOceania,
            comment: noComment,
            favorite: noFavorite,
            willReturn: nopWillReturn,
            created: new Date()
        };

    comments.push(newComment);
    localStorage.myTreesComments = JSON.stringify(comments);
    commentsElm.innerHTML+=comment2html(newComment);
    myFrmElm.reset();
}

function getOrigin(europe, northA, southA, asia, africa, oceania) {
    let from = "";
    let a = 0;

    if (europe) {
        from += " Europe";
        a++;
    }
    if (northA) {
        from += " North America";
        a++;
    }
    if (southA) {
        from += " South America";
        a++;
    }
    if (asia) {
        from += " Asia";
        a++;
    }
    if (africa) {
        from += " Africa";
        a++;
    }
    if(oceania) {
        from += " Oceania";
        a++;
    }
    if (a === 0)
        from += "unspecified";
    if(a > 1) {
        from = "undefined";
    }
    from += ";";
    return from;
}
function getGender(male, female){
    return (male === true) ? "male;" : (female === true) ? "female;": "unspecified;";
}

function getStatus(married, single) {
    return (married === true) ? "married;" : (single === true) ? "single;" : "unspecified;";
}

function getImage(img) {
    return (img  === "") ? "./media/por.jpg" : img;
}



function comment2html(comment){
    const commentView = {
        FName: comment.firstName,
        SName: comment.secondName,
        Email: comment.email,
        Img: getImage(comment.img),
        Sex: getGender(comment.male, comment.female),
        Stat: getStatus(comment.married, comment.single),
        Orig: getOrigin(comment.europe,comment.north,comment.south,comment.asia,comment.africa, comment.oceania),
        Com: comment.comment,
        Fav: (comment.favorite === "") ? "unspecified;" : comment.favorite,
        Date: (new Date(comment.created)).toDateString(),
        willReturnMessage: comment.willReturn?"I will return to this page.":"Sorry, one visit was enough."
    };

    const specimen = document.getElementById("mTmplOneOpinion").innerHTML;
    return Mustache.render(specimen, commentView);
}

function commentArray2html(sourceData){
    let htmlWithComments="";
    for(const com of sourceData){
        htmlWithComments += comment2html(com);
    }

    return htmlWithComments;
}


let comments=[];
const commentsElm=document.getElementById("opinionsContainer");
if(localStorage.myTreesComments){
    comments=JSON.parse(localStorage.myTreesComments);
}

commentsElm.innerHTML=commentArray2html(comments);
console.log(comments);
let myFrmElm=document.getElementById("opnForm");
myFrmElm.addEventListener("submit",processOpnFrmData);




