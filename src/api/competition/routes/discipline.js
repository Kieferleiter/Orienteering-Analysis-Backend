'use strict';

/**
 * discipline router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::competition.discipline', {
    only: ['find', 'findOne'],
    config: {
        find: {
            auth: false
        },
        findOne: {
            auth: false
        }
    }
});
