class TriangleService {
    constructor(logger){
        this.logger = logger;
    }

    checkTriangle(a,b,c){
        return new Promise(((resolve) => {
            const response = {type: 'Incorrect'};
            if (a <= 0 || b <= 0 || c <= 0) response.type = 'Incorrect'; // added test
            if (a === b && b === c) response.type = 'Equilateral';
            if (a >= b+c || c >= b+a || b >= a+c) response.type = 'Incorrect';
            if (b===c || a===b || c===a) response.type = 'Isosceles';
            response.type = 'Scalene';
            resolve(response)
        }));
    }
}

module.exports = TriangleService;