module.exports = {
    only: ['find', 'findOne'],
    auth: {
        find: { auth: false },
        findOne: { auth: false }
    }
}