'use strict';

/**
 *  competition controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::competition.competition', ({ strapi }) =>  ({

    async findOne(ctx) {
        const response = await super.findOne(ctx);

        if(response){
            response.data.attributes.time = sanitizeTimestamp(response.data.attributes.time)
            response.data.attributes.winningTime = sanitizeTimestamp(response.data.attributes.winningTime)
        }

        return response;
    },

    async delete(ctx) {
        const response = await super.delete(ctx);

        if(response){
            const controls = await strapi.entityService.findMany('api::control.control', {
                fields: ['id'],
                filters: { competition: response.data.id },
            });

            for (const control of controls) {
                strapi.entityService.delete('api::control.control', control.id);
            }              
        }

        return response;
    },

    async controls (ctx) {
        return strapi.db.query('api::control.control').findMany({
            where: { competition: ctx.params.id },
            populate: ['mistakeCause', 'mistakeLocation', 'mistakeSpeed', 'mistakeType']
        });
    }
}));

function sanitizeTimestamp(timestamp){
    return timestamp.slice(0, timestamp.lastIndexOf('.'))
}
