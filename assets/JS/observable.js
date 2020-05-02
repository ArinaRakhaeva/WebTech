function Observable(value) {
    const subscribtions = []; //array of functions
    return {
        //добавить функцию в массив подписок, чтобы она была вызвана при изменении значения
        subscribe: function (fn) {
            subscribtions.push(fn)
        },
        getSubscribtions: function () {
            return subscribtions;
            },
        //изменить значение и вызвать все подписки
        next: function (value) {
            this.value = value;
            subscribtions.forEach((fn, i) => {
                fn(value);
            })
        },
        value,
        //убрать все подписки
        unsubscribe: function () {
            subscribtions.length = 0;
        }
    }
};