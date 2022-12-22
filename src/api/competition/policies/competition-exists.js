module.exports = async (policyContext, config, { strapi }) => {
    if(await strapi.entityService.findOne('api::competition.competition', policyContext.params.id)){
      return true;
    }
  
    return false;
};
