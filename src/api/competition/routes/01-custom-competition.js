module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/competitions/:id/controls',
            handler: 'competition.controls',
        },
        {
            method: 'POST',
            path: '/competitions/:id/controls',
            handler: 'competition.addControl'
        },
        {
            method: 'DELETE',
            path: '/competitions/:id/controls',
            handler: 'competition.removeLastControl'
        }
    ]
}