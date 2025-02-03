// 사용자가 정의한 에러를 명확하게 만들 수 있음음
// 비동기 함수에서 발생하는 에러를 자동으로 처리 못함함

class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}

module.exports = ExpressError;