module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/competitions/:id/controls',
            handler: 'control.controls',
        },
        {
            method: 'POST',
            path: '/competitions/:id/controls',
            handler: 'control.addControl'
        },
        {
            method: 'DELETE',
            path: '/competitions/:id/controls',
            handler: 'control.removeLastControl'
        }
    ]
}