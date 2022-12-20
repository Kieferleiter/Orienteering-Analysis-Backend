const { ValidationError } = require('@strapi/utils').errors;

module.exports = {
    async beforeCreate(control) {
        const { data } = control.params;

        if(!data.number){
            //Gets the highest control-number of the chosen competition
            const { number } = await strapi.db.query('api::control.control')
                .findOne({
                    where: { competition: data.competition },
                    orderBy: { id: 'desc' }
                });

            data.number = number + 1;
        }
        else{
            const controlInDB = await strapi.db.query('api::control.control')
                .findOne({
                    where: {
                        $and: [
                            { number: { $gte: data.number } },
                            { competition: data.competition }
                        ]
                }});
            if(controlInDB)
                throw new ValidationError('Control already exists')
        }
    }
}