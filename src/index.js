module.exports = function check(str, bracketsConfig) {
    let stack = [];

    if (str.length <= 1) { return false };
    for (let i = 0; i < str.length; i++) {
        // находим положение скобки в bracketsConfig
        let idSymbol = bracketsConfig.reduce((acc, item, index) => item.indexOf(str[i]) >= 0 ? acc = [index, item.indexOf(str[i])] : acc, []);
        //console.log('symbol ' + str[i] + ' id ' + idSymbol);
        //если idSymbol[1] = 0 - это открывающая скобка, иначе закрывающая
        if (idSymbol[1] === 0 && bracketsConfig[idSymbol[0]][1] !== str[i]) {
            //записываем скобку в stack где хранятся открывающие скобки
            stack.push(str[i]);
            //console.log ('if 1');
        } else if (idSymbol[1] === 0 && bracketsConfig[idSymbol[0]][1] === str[i] && stack[stack.length - 1] !== str[i]) {
            stack.push(str[i]);
            //console.log ('else if 1');
        } else if (idSymbol[1] === 0 && bracketsConfig[idSymbol[0]][1] === str[i] && stack[stack.length - 1] === str[i]) {
            stack.pop(str[i]);
            // console.log ('else if 2');
            //проверяем является ли текущая закрывающая скобка парой для последней записанной в stack  
        } else if (bracketsConfig[idSymbol[0]][0] === stack[stack.length - 1] && stack.length !== 0) {
            //console.log('bracketsConfig[idSymbol[0]][0]: ' + bracketsConfig[idSymbol[0]][0] + ' stack[stack.length-1]: ' + stack[stack.length-1] )
            stack.pop(str[i]);
            //console.log ('else if 3');
        } else if (idSymbol[1] === 1 && stack.length === 0) {
            //console.log('bracketsConfig[idSymbol[0]][0]: ' + bracketsConfig[idSymbol[0]][0] + ' stack[stack.length-1]: ' + stack[stack.length-1] )
            // console.log ('else if 4');
            return false;
        }
        //console.log('stack' + stack);
    }
    return (stack.length === 0) ? true : false;
}