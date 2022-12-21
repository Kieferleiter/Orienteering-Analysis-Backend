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

    async find(ctx) {
        const response = await super.find(ctx);

        for(const element of response.data){
            element.attributes.time = sanitizeTimestamp(element.attributes.time);
            element.attributes.winningTime = sanitizeTimestamp(element.attributes.winningTime);
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
}));

function sanitizeTimestamp(timestamp){
    return timestamp.slice(0, timestamp.lastIndexOf('.'))
}
