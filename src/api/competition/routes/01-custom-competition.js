module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/competitions/:id/controls',
            handler: 'competition.controls',
        },
    ]
}