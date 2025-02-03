// 비동기 함수 에러 처리하기 위해 사용

module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}