module.exports.config = {
  name: "post",
  version: "1.0.0",
  role: 2,
  credits: "NTKhang",
  // Modified by Kenneth Aceberos
  // Designed for AutoBot
  description: "Create a new post in acc bot",
};


module.exports.run = async ({ event, api, prefix, botname, args, outro}) => {
  const {
    threadID,
    messageID,
    senderID } = event;
  
  const conte = event.messageReply.body;
  const arggh = args[0];
  const priva = arggh.replace("public", "everyone").replace("friends", "friends").replace("onlyme", "self");

 if (event.type !== "message_reply" || !conte || !arggh == "public" || !arggh == "friends" || !arggh == "onlyme"){
    api.sendMessage(`❌ Invalid arguments.\nReply to the message that you want to post then reply using the usage below 👇\nUsage: ${prefix}post [privacy]\n\nPrivacy types:\npublic, friends, onlyme`, threadID, messageID);
    return;
  }
 const editzz = await new Promise(resolve => {
   api.setMessageReaction("⏳", messageID, () => {}, true);
   api.sendMessage(`⏳ Please wait...`, threadID, (err, info1) => {
    resolve(info1);
   }, messageID);
  });
  const info = await api.getUserInfo(senderID);
  const name = info[senderID].name
     
  const uuid = getGUID();
  const formData = {
    "input": {
      "composer_entry_point": "inline_composer",
      "composer_source_surface": "timeline",
      "idempotence_token": uuid + "_FEED",
      "source": "WWW",
      "attachments": [],
      "audience": {
        "privacy": {
          "allow": [],
          "base_state": priva.toUpperCase(),
          "deny": [],
          "tag_expansion_state": "UNSPECIFIED"
        }
      },
      "message": {
        "ranges": [],
        "text": `📢 Announcement Post by ${name}:\n\n${conte}\n\n🤖 Created by ${botname} on PROJECT BOTIFY\n${outro}`
      },
      "with_tags_ids": [],
      "inline_activities": [],
      "explicit_place_id": "0",
      "text_format_preset_id": "0",
      "logging": {
        "composer_session_id": uuid
      },
      "tracking": [
        null
      ],
      "actor_id": api.getCurrentUserID(),
      "client_mutation_id": Math.floor(Math.random()*17)
    },
    "displayCommentsFeedbackContext": null,
    "displayCommentsContextEnableComment": null,
    "displayCommentsContextIsAdPreview": null,
    "displayCommentsContextIsAggregatedShare": null,
    "displayCommentsContextIsStorySet": null,
    "feedLocation": "TIMELINE",
    "feedbackSource": 0,
    "focusCommentID": null,
    "gridMediaWidth": 230,
    "groupID": null,
    "scale": 3,
    "privacySelectorRenderLocation": "COMET_STREAM",
    "renderLocation": "timeline",
    "useDefaultActor": false,
    "inviteShortLinkKey": null,
    "isFeed": true,
    "isFundraiser": false,
    "isFunFactPost": false,
    "isGroup": false,
    "isTimeline": true,
    "isSocialLearning": false,
    "isPageNewsFeed": false,
    "isProfileReviews": false,
    "isWorkSharedDraft": false,
    "UFI2CommentsProvider_commentsKey": "ProfileCometTimelineRoute",
    "hashtag": null,
    "canUserManageOffers": false
  };

        const form = {
          av: api.getCurrentUserID(),
          fb_api_req_friendly_name: "ComposerStoryCreateMutation",
          fb_api_caller_class: "RelayModern",
          doc_id: "7711610262190099",
          variables: JSON.stringify(formData)
        };

        
api.editMessage(`⏳ Posting...`, editzz.messageID);
  api.httpPost('https://www.facebook.com/api/graphql/', form, (e, info) => {
           try {
          if (e) throw e;
          if (typeof info == "string") info = JSON.parse(info.replace("for (;;);", ""));
          const postID = info.data.story_create.story.legacy_story_hideable_id;
          const urlPost = info.data.story_create.story.url;
          if (!postID) throw info.errors;
          api.setMessageReaction("✅", messageID, () => {}, true);
api.editMessage(`» Post created successfully\n» postID: ${postID}\n» urlPost: ${urlPost}\n\n🤖 PROJECT BOTIFY 🤖`, editzz.messageID);
         return;
        }
        catch (e) {
          //console.log(e)
          api.setMessageReaction("❌", messageID, () => {}, true);
          return api.editMessage(`Post creation failed, please try again later\n\nError data: ${e.toString()}`, editzz.messageID);
        }
  
});
  
};

function getGUID() {
  var sectionLength = Date.now();
  var id = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = Math.floor((sectionLength + Math.random() * 16) % 16);
    sectionLength = Math.floor(sectionLength / 16);
    var _guid = (c == "x" ? r : (r & 7) | 8).toString(16);
    return _guid;
  });
  return id;
                                   }