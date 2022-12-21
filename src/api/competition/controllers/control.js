const { NotFoundError } = require('@strapi/utils').errors;

module.exports = {
    async controls (ctx) {
        return strapi.entityService.findMany('api::control.control', {
            filters: { competition: ctx.params.id },
            populate: ['mistakeCause', 'mistakeLocation', 'mistakeSpeed', 'mistakeType'],
            sortBy: { number: 'asc' }
        });
    },

    async addControl(ctx){
        return strapi.entityService.create('api::control.control', {
            data: {
              mistake: true,
              competition: ctx.params.id
            }
        });
    },

    async removeLastControl(ctx){
        const entry = await strapi.db.query('api::control.control').findOne({
            where: { competition: ctx.params.id },
            orderBy: { id: 'desc' }
        });

        if(entry){
            const { id } = entry;
            return strapi.entityService.delete('api::control.control', id)
        }
        else{
            throw new NotFoundError();
        }
    }
}