
function processOpnFrmData(event){
 event.preventDefault();
  const nopName = document.getElementById("fname").value.trim();
    const noSurname = document.getElementById("sname").value.trim();
    const noEmail = document.getElementById("email").value.trim();
    const noImg = document.getElementById("photo").value.trim();

    const noFemale = document.getElementById("Female").checked;
    const noOther = document.getElementById("Other").checked;
    const noMale = document.getElementById("Male").checked;

    const noMarried =document.getElementById("Married").checked;
    const noSingle=document.getElementById("Unmarried").checked;

    const noFavorite = document.getElementById("FavoriteList").value.trim();

    const noEurope = document.getElementById("Europe").checked;
    const noNorthA = document.getElementById("NorthA").checked;
    const noSouthA = document.getElementById("SouthA").checked;
    const noAsia = document.getElementById("Asia").checked;
    const noAfrica = document.getElementById("Africa").checked;
    const noOceania = document.getElementById("Oceania").checked;

    const noComment = document.getElementById("comment").value.trim();


    const nopWillReturn = document.getElementById("willReturnElm").checked;

    if(nopName===""|| noSurname==="" || noComment==="" || noSurname===""){
        window.alert("Please, enter both your name and opinion");
        return;
    }

    const newOpinion =
        {
            name: nopName,
            surname: noSurname,
            email: noEmail,
            img: getImage(noImg),

            sex: getGender(noMale, noFemale),
            status: getStatus(noMarried, noSingle),
            origin: getOrigin(noEurope, noNorthA, noSouthA, noAsia, noAfrica, noOceania),

            comment: noComment,
            favorite: noFavorite,
            willReturn: nopWillReturn,
            created: new Date()

        };


    let opinions = [];
    if(localStorage.myTreesComments){
        opinions=JSON.parse(localStorage.myTreesComments);
    }

    opinions.push(newOpinion);
    localStorage.myTreesComments = JSON.stringify(opinions);

    console.log("New opinion:\n "+JSON.stringify(newOpinion));
    console.log(opinions);


    window.location.hash="#Comments";

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
