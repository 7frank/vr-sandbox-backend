'use strict';

/**
 * Patch.js controller
 *
 * @description: A set of functions called "actions" for managing `Patch`.
 */

module.exports = {

  /**
   * Retrieve patch records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.patch.fetchAll(ctx.query);
  },

  /**
   * Retrieve a patch record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.patch.fetch(ctx.params);
  },

  /**
   * Count patch records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.patch.count(ctx.query);
  },

  /**
   * Create a/an patch record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.patch.add(ctx.request.body);
  },

  /**
   * Update a/an patch record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.patch.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an patch record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.patch.remove(ctx.params);
  }
};
