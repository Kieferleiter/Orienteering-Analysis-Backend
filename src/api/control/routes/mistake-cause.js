'use strict';

const config = require('./config/mistake-route-config');

/**
 * mistake-cause router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::control.mistake-cause', config);
