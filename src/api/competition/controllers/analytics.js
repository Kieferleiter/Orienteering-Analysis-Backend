const { ValidationError } = require('@strapi/utils').errors

const mistakeProperties = ['mistakeCause', 'mistakeLocation', 'mistakeSpeed', 'mistakeType'];

module.exports = {
  async mistakes(ctx) {
    const startDate = convertDate(ctx.query.startDate);
    const endDate = convertDate(ctx.query.endDate);

    if (startDate > endDate)
      throw new ValidationError(`startDate can't be later then endDate`)

    const allControls = await strapi.entityService.findMany('api::control.control', {
      filters: {
        competition: {
          date: { $between: [convertToYear(startDate), convertToYear(endDate)] }
        }
      },
    });

    const mistakes = await strapi.entityService.findMany('api::control.control', {
      filters: {
        competition: {
          date: { $between: [convertToYear(startDate), convertToYear(endDate)] }
        },
        mistake: true
      },
      populate: mistakeProperties,
    });

    return {
      mistakePercent: Number((mistakes.length / allControls.length * 100).toFixed(2)),
      numberOfMistakes: mistakes.length,
      numberOfControls: allControls.length,
      analyzedMistakes: analyzeMistakes(mistakes, mistakeProperties)
    }
  },
};

function analyzeMistakes(mistakes, properties){
  const props = {};

  for(const property of properties){
    props[property] = {};
  }

  for (const mistake of mistakes) {
      for(const property of properties){
        if(Object.keys(props[property]).includes(mistake[property].name)){
          props[property][mistake[property].name] += 1
        }
        else{
          props[property][mistake[property].name] = 1
        }
      }
  }

  return props;
}

function convertToYear(date){
  return date.toISOString().split('T')[0];
}

function convertDate(input) {
  const date = new Date(input || Date.now());

  if (date == 'Invalid Date')
    throw new ValidationError(date.toString());
  return date
}



