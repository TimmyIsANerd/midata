/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/

  "/": { action: "home" },
  "POST /api/v1/user/signup": { action: "auth/signup" },
  "POST /api/v1/user/login": { action: "auth/login" },
  "GET /api/v1/user/verify/email/:token": { action: "verify/email" },
  "GET /api/v1/user/verify/email/resend": { action: "verify/resend_email" },

  // User Profile
  "GET /api/v1/user/profile": { action: "user/profile" },

  // Upload Image
  "POST /api/v1/user/profile/avatar": { action: "profile/upload-picture" },

  // Webhook
  "POST /api/v1/webhook/paystack": { action: "webhook/paystack" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
