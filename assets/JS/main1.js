var prices = {
    "plan" : {
        "fit" : 1000,
        "normal" : 2000,
        "family" : 3000,
        "" : 0,
    },
    "area" : {
        "Kalininsky" : 1000,
        "Central" : 2000,
        "VO" : 3000,
        "" : 0,
    },
    "time" : {
        "AM" : 1000,
        "PM" : 2000,
        "" : 0,
    }
}

var options = {
    "plan" : "",
    "area" : "",
    "time" : "",
}

var resultPrice = 0;

function changeStylePlans(element) {
    let planes = [document.getElementById("fit"),
        document.getElementById("normal"),
        document.getElementById("family")];
    planes.forEach(plan => {
        if (plan === element) {
            plan.classList.add("btn-primary");
            options["plan"] = plan.id;
        } else {
            plan.classList.remove("btn-primary");
        }
    });
    showPrice();
}

function changeStyleAreas(element) {
    let areas = [document.getElementById("Kalininsky"),
        document.getElementById("Central"),
        document.getElementById("VO")];
    areas.forEach(area => {
        if (area === element) {
            area.classList.add("btn-primary");
            options["area"] = area.id;
        } else {
            area.classList.remove("btn-primary");
        }
    })
    showPrice();
}

function changeStyleTime(element) {
    let time = [document.getElementById("AM"),
        document.getElementById("PM")];
    time.forEach(time => {
        if (time === element) {
            time.classList.add("btn-primary");
            options["time"] = time.id;
        } else {
            time.classList.remove("btn-primary");
        }
    });
    showPrice();
}

function showPrice () {
    let elem = document.getElementById("resPrice");
    elem.value = prices["plan"][options["plan"]] + prices["area"][options["area"]] + prices["time"][options["time"]];
}