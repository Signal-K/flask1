"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.getTweetData = void 0;
var cheerio_1 = __importDefault(require("cheerio"));
function getTweetContent($) {
    var container = $('.EmbeddedTweet-tweetContainer');
    if (!container.length)
        return;
    var meta = {};
    var content = { meta: meta };
    // This is the blockquote with the tweet
    var subject = container.find('[data-scribe="section:subject"]');
    // Tweet header with the author info
    var header = subject.children('.Tweet-header');
    var avatar = header.find('[data-scribe="element:avatar"]');
    var author = header.find('[data-scribe="component:author"]');
    var name = author.find('[data-scribe="element:name"]');
    var screenName = author.find('[data-scribe="element:screen_name"]');
    // Tweet body
    var tweet = subject.children('[data-scribe="component:tweet"]');
    var tweetContent = tweet.children('p');
    var card = tweet.children('.Tweet-card');
    var tweetInfo = tweet.children('.TweetInfo');
    var fullTimestamp = tweetInfo.find('[data-scribe="element:full_timestamp"]');
    var heartCount = tweetInfo.find('[data-scribe="element:heart_count"]');
    // Tweet footer
    var callToAction = container.children('[data-scribe="section:cta component:news"]');
    var profileText = callToAction.children('[data-scribe="element:profile_text"]');
    var conversationText = callToAction.children('[data-scribe="element:conversation_text"]');
    var quotedTweet;
    var mediaHtml;
    meta.id = subject.attr('data-tweet-id');
    meta.avatar = {
        normal: avatar.attr('data-src-1x')
    };
    meta.name = name.text();
    meta.username = screenName.text().substring(1); // Omit the initial @
    meta.createdAt = new Date(fullTimestamp.attr('data-datetime')).getTime();
    meta.heartCount = heartCount.text();
    meta.ctaType = profileText.length ? 'profile' : 'conversation';
    if (conversationText.length) {
        // Get the formatted count and skip the rest
        meta.ctaCount = conversationText.text().match(/^[^\s]+/)[0];
    }
    // If some text ends without a trailing space, it's missing a <br>
    tweetContent.contents().each(function () {
        var el = $(this);
        var type = el[0].type;
        if (type !== 'text')
            return;
        var text = el.text();
        if (text.length && text.trim() === '') {
            if (el.next().children().length) {
                el.after($('<br>'));
            }
        }
        else if (!/\s$/.test(el.text()) &&
            el.next().children().length &&
            !/^[#@]/.test(el.next().text())) {
            el.after($('<br>'));
        }
    });
    card.children().each(function () {
        var props = this.attribs;
        var scribe = props['data-scribe'];
        var el = $(this);
        if (scribe === 'section:quote') {
            var tweetCard = el.children('a');
            var id = tweetCard.attr('data-tweet-id');
            var url = tweetCard.attr('href');
            quotedTweet = { id: id, url: url };
            return;
        }
        var media = $('<div>');
        if (scribe === 'component:card') {
            var photo = el.children('[data-scribe="element:photo"]');
            var photoGrid = el.children('[data-scribe="element:photo_grid"]');
            var photos = photo.length ? photo : photoGrid;
            if (photos.length) {
                var images = photos.find('img');
                images.each(function () {
                    var img = $(this);
                    var alt = img.attr('alt');
                    var url = img.attr('data-image');
                    var format = img.attr('data-image-format');
                    var height = img.attr('height');
                    var width = img.attr('width');
                    this.attribs = {
                        'data-type': 'media-image',
                        src: url + "?format=" + format,
                        height: height,
                        width: width
                    };
                    if (alt) {
                        this.attribs.alt = alt;
                    }
                    // Move the media img to a new container
                    media.append(img);
                });
                media.attr('data-type', "image-container " + images.length);
                mediaHtml = $('<div>').append(media).html();
            }
        }
    });
    tweetContent.children('img').each(function () {
        var _a;
        var props = this.attribs;
        // Handle emojis inside the text
        if ((_a = props["class"]) === null || _a === void 0 ? void 0 : _a.includes('Emoji--forText')) {
            this.attribs = {
                'data-type': 'emoji-for-text',
                src: props.src,
                alt: props.alt
            };
            return;
        }
        console.error('An image with the following props is not being handled:', props);
    });
    tweetContent.children('a').each(function () {
        var _this = this;
        var props = this.attribs;
        var scribe = props['data-scribe'];
        var el = $(this);
        var asTwitterLink = function (type) {
            _this.attribs = {
                'data-type': type,
                href: props.href
            };
            // Replace custom tags inside the anchor with text
            el.text(el.text());
        };
        // @mention
        if (scribe === 'element:mention') {
            return asTwitterLink('mention');
        }
        // #hashtag
        if (scribe === 'element:hashtag') {
            // A hashtag may be a $cashtag too
            var type = props['data-query-source'] === 'cashtag_click' ? 'cashtag' : 'hashtag';
            return asTwitterLink(type);
        }
        if (scribe === 'element:url') {
            var url = props['data-expanded-url'];
            // const quotedTweetId = props['data-tweet-id']
            // Remove link to quoted tweet to leave the card only
            // if (quotedTweetId && quotedTweetId === quotedTweet?.id) {
            //   el.remove();
            //   return;
            // }
            // Handle normal links
            var text = { type: 'text', data: url };
            // Replace the link with plain text and markdown will take care of it
            el.replaceWith(text);
        }
    });
    content.html = tweetContent.html();
    if (quotedTweet)
        content.quotedTweet = quotedTweet;
    if (mediaHtml)
        content.mediaHtml = mediaHtml;
    return content;
}
function getTweetData(html) {
    var $ = cheerio_1["default"].load(html, {
        decodeEntities: false,
        xmlMode: false
    });
    var tweetContent = getTweetContent($);
    return tweetContent;
}
exports.getTweetData = getTweetData;
//# sourceMappingURL=tweet-html.js.map