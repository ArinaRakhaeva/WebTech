const plansList = document.querySelector('#plans');
const areasList = document.querySelector('#areas');
const pricesList = document.querySelector('#prices');

let filteredData = JSON.parse(JSON.stringify(data));

const domManipulator = (function () {
    return {
        generateList: function (array) {
//let объявдяем переменную html-пустая строка
            let html = '';
            //на вход-массив, на выход-строчка
            array.forEach(li => {
                html += '<li>'.concat(li).concat('</li>');
            });
            return html;
        },
        //обновляя страничку, вставляем li
        updateNode: function (node, content, where = "afterBegin") {
            node.insertAdjacentHTML(where, content);
        },
        clearNodes: function (...nodes) {
            nodes.forEach(el => {
                el.innerHTML = '';
            })
        }
    }
})();

const dataManipulator = (function (data) {
    return {
        data: data.plans,
        getAllShops: function (data) {
            //возвращает массив магазинов
            const plans = data && data.plans || this.data;
            return plans.map(el => el.name);
        },
        getAllFlowers: function (data) {
            const areas = [];
            const plans = data && data.plans || this.data;
            plans.forEach(shop => {
                shop.areas.forEach(area => areas.push(area.name))
            });
            //set делает объекты уникальными
            return [...new Set(areas)];
        },
        getAllColors: function (data) {
            const prices = [];
            const plans = data && data.plans || this.data;
            plans.forEach(shop => {
                shop.areas.forEach(area => {
                    area.prices.forEach(price => prices.push(price));
                })
            });
            return [...new Set(prices)];
        }
    }
    //?
})(data);

function initLists(data) {
    const plansHtml = dataManipulator.getAllPlans(data);
    const areasHtml = dataManipulator.getAllAreas(data);
    const pricesHtml = dataManipulator.getAllPrices(data);
    domManipulator.updateNode(plansList, domManipulator.generateList(plansHtml));
    domManipulator.updateNode(areasList, domManipulator.generateList(areasHtml));
    domManipulator.updateNode(pricesList, domManipulator.generateList(pricesHtml));

}

domManipulator.clearNodes(plansList, areasList, pricesList);
initLists();
//объекты, на к-ые можно подписаться
const planObservable = Observable('');
const areaObservable = Observable('');
const priceObservable = Observable('');

planObservable.subscribe((value) => {
    //filteredData = JSON.parse(JSON.stringify(data));
    filteredData = filter(filteredData, value, planObservable.value, areaObservable.value);
    domManipulator.clearNodes(plansList, areasList, pricesList);
    initLists(filteredData);
});

areaObservable.subscribe((value) => {
    //filteredData = JSON.parse(JSON.stringify(data));
    filteredData = filter(filteredData, planObservable.value, value, priceObservable.value);
    domManipulator.clearNodes(plansList, areasList, pricesList);
    initLists(filteredData);
});

priceObservable.subscribe((value) => {
    //filteredData = JSON.parse(JSON.stringify(data));
    filteredData = filter(filteredData, planObservable.value, areaObservable.value, value);
    domManipulator.clearNodes(plansList, areasList, pricesList);
    initLists(filteredData);
});

plansList.addEventListener('click', function (e) {
        const plan = e.target.innerText;
        planObservable.next(plan);
        //?
        e.stopImmediatePropagation();
    }
);

areasList.addEventListener('click', function (e) {
        const area = e.target.innerText;
        areaObservable.next(area);
        e.stopImmediatePropagation();
    }
);

pricesList.addEventListener('click', function (e) {
        const price = e.target.innerText;
        priceObservable.next(price);
        e.stopImmediatePropagation();
    }
);

function clearFilters() {
    planObservable.next('');
    areaObservable.next('');
    priceObservable.next('');
    filteredData = JSON.parse(JSON.stringify(data));
    initLists(data);
}

function filter(currentData, planFilter, areaFilter, priceFilter) {
    let data = {};
    if (currentData) data.plans = currentData.planss.map(plan => {
        plan.areas = plan.areas.map(area => {
            area.prices = area.prices.filter(price => {
                return price.includes(priceFilter)
            });
            return area;
        }).filter(area => {
            return area.name.includes(areaFilter) && area.prices.length > 0;
        });
        return plan;
    }).filter(plan => {
        return plan.name.includes(planFilter)
    });
    return data;
}