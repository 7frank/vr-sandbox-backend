'use strict';

/**
 * Asset.js controller
 *
 * @description: A set of functions called "actions" for managing `Asset`.
 */

module.exports = {

  /**
   * Retrieve asset records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    return strapi.services.asset.fetchAll(ctx.query);
  },

  /**
   * Retrieve a asset record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.asset.fetch(ctx.params);
  },

  /**
   * Count asset records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.asset.count(ctx.query);
  },

  /**
   * Create a/an asset record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.asset.add(ctx.request.body);
  },

  /**
   * Update a/an asset record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.asset.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an asset record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.asset.remove(ctx.params);
  }
};
