/**
 * @fix by NTKhang
 * update as Thursday, 10 February 2022
 * do not remove the author name to get more updates
 */

"use strict";

var utils = require("../utils");
var log = require("npmlog");

function formatData(resData) {
  return {
    viewer_feedback_reaction_info: resData.feedback_react.feedback.viewer_feedback_reaction_info,
    supported_reactions: resData.feedback_react.feedback.supported_reactions,
    top_reactions: resData.feedback_react.feedback.top_reactions.edges,
    reaction_count: resData.feedback_react.feedback.reaction_count
  };
}

module.exports = function(defaultFuncs, api, ctx) {
  return function setPostReaction(postID, type, callback) {
    var resolveFunc = function(){};
    var rejectFunc = function(){};
    var returnPromise = new Promise(function (resolve, reject) {
      resolveFunc = resolve;
      rejectFunc = reject;
    });

    if (!callback) {
      if (utils.getType(type) === "Function" || utils.getType(type) === "AsyncFunction") {
        callback = type;
        type = 0;
      }
      else {
        callback = function (err, data) {
          if (err) {
            return rejectFunc(err);
          }
          resolveFunc(data);
        };
      }
    }

    var map = {
      unlike: 0,
      like: 1,
      heart: 2,
      love: 16,
      haha: 4,
      wow: 3,
      sad: 7,
      angry: 8
    };

    if (utils.getType(type) !== "Number" && utils.getType(type) === "String") {
      type = map[type.toLowerCase()];
    }

    if (utils.getType(type) !== "Number" && utils.getType(type) !== "String") {
      throw {
        error: "setPostReaction: Invalid reaction type"
      };
    }

    if (type != 0 && !type) {
      throw {
        error: "setPostReaction: Invalid reaction type"
      };
    }

    var form = {
      av: ctx.userID,
      fb_api_caller_class: "RelayModern",
      fb_api_req_friendly_name: "CometUFIFeedbackReactMutation",
      doc_id: "4769042373179384",
      variables: JSON.stringify({
        input: {
          actor_id: ctx.userID,
          feedback_id: (new Buffer("feedback:" + postID)).toString("base64"),
          feedback_reaction: type,
          feedback_source: "OBJECT",
          is_tracking_encrypted: true,
          tracking: [],
          session_id: /*"f7dd50dd-db6e-4598-8cd9-561d5002b423"*/ pangetmo(),
          client_mutation_id: Math.round(Math.random() * 19).toString()
        },
        useDefaultActor: false,
        scale: 3
      })
    };

    defaultFuncs
      .post("https://www.facebook.com/api/graphql/", ctx.jar, form)
      .then(utils.parseAndCheckLogin(ctx, defaultFuncs))
      .then(function(resData) {
        if (resData.errors) {
          throw resData;
        }
        return callback(null, formatData(resData.data));
      })
      .catch(function(err) {
        //log.error("setPostReaction", err);
        return callback(err);
      });

    return returnPromise;
  };
};

function pangetmo() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
                                   }