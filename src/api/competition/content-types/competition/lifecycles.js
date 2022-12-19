module.exports = {
  afterCreate(event) {
    const { data } = event.params;

    // Creates the controls for the competition
    if (data.numberOfControls) {
      for (let i = 1; i <= data.numberOfControls; i++) {
        strapi.db.query('api::control.control').create({
          data: {
            number: i,
            mistake: true,
            competition: event.result.id
          }
        });
      }
    }
  },
  afterDelete(event) {

  }
};
