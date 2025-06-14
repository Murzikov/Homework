function appeal(name) {
    return `Hello, "${name}"`
}

const message = appeal("Saveliy")

console.log (message)

const array = [1, 2, 9, 10, 16, 17];

function pick(sorting) {
    for (let i = 0; i < sorting.length; i++) {
        if (sorting[i] > 10) {
            console.log(sorting[i]);
        }
    }
}
pick(array)

function calculator(a, b, operator) {
    if (operator === 'plus') {
        return a + b;
    } else if (operator === 'minus') {
        return a - b;
    } else if (operator === 'multi') {
        return a * b;
    } else if (operator === 'delenie') {
        if (b === 0) {
            return 'ты чё епт это же первый класс';
        }
        else if (a === 0) {
            return 'окак';
        }
        return a / b;
    } else {
        return 'нормально же общались...';
    }
}

const result1 = calculator(1, 3, 'plus')
const result2 = calculator(2, 1, 'minus')
const result3 = calculator(7, 6, 'multi')
const result4 = calculator(4, 2, 'delenie')

console.log(result1)
console.log(result2)
console.log(result3)
console.log(result4)


