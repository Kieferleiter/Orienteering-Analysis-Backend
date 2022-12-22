module.exports = {
    routes: [
        {
            method: 'GET',
            path: '/competitions/:id/controls',
            handler: 'control.controls',
            config: {
                policies: ['competition-exists']
            }
        },
        {
            method: 'POST',
            path: '/competitions/:id/controls',
            handler: 'control.addControl',
            config: {
                policies: ['competition-exists']
            }
        },
        {
            method: 'DELETE',
            path: '/competitions/:id/controls',
            handler: 'control.removeLastControl',
            config: {
                policies: ['competition-exists']
            }
        },
        {
            method: 'GET',
            path: '/analytics/mistakes',
            handler:'analytics.mistakes'
        }
    ]
}