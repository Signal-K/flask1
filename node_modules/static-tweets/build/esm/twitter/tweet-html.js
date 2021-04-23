import path from 'path';
import cheerio from 'cheerio';
import { URL } from 'url';
var TWEET_VIDEO_URL = 'https://video.twimg.com/tweet_video';
// Could we use rehype directly and remove cheerio?
function getTweetContent($, tweet, isMainTweet) {
    if (isMainTweet === void 0) { isMainTweet = true; }
    if (!tweet.length)
        return;
    var meta = {};
    var content = { meta: meta };
    var tweetContent = tweet.children('.js-tweet-text-container').children('p');
    var actions = tweet
        .children('.stream-item-footer')
        .children('.ProfileTweet-actionCountList')
        .children();
    var hasCard = tweet.children('.js-tweet-details-fixer').children('.card2').length > 0;
    var quotedTweet;
    var mediaHtml;
    var hasVideo = false;
    // Add the user avatar and date to the tweet only if it's the main tweet
    if (isMainTweet) {
        var avatar = tweet.find('.account-group').children('.avatar');
        var time = tweet.find('a.tweet-timestamp').children('span');
        meta.avatar = { bigger: avatar.attr('src') };
        meta.createdAt = Number(time.attr('data-time-ms'));
    }
    tweetContent.children('img').each(function () {
        var props = this.attribs;
        // Handle emojis inside the text
        if (props["class"] && props["class"].includes('Emoji--forText')) {
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
        var el = $(this);
        if (props['data-expanded-url']) {
            var url = props['data-expanded-url'];
            var quotedTweetPath = tweet
                .children('.QuoteTweet')
                .find('.QuoteTweet-link')
                .attr('href');
            // Embedded Tweet
            if (quotedTweetPath && url.endsWith(quotedTweetPath)) {
                quotedTweet = { url: url };
                el.remove();
                return;
            }
            // If Twitter is hiding the link, it's because it's adding a card with a preview
            var isLinkPreview = props["class"] && props["class"].includes('u-hidden');
            if (isLinkPreview) {
                // In the case of a preview we only add a line break between the link and the paragraph.
                // TODO: Add the preview HTML and remove the link
                el.before('<br>');
            }
            // Handle normal links
            var text = { type: 'text', data: url };
            // Replace the link with plain text and markdown will take care of it
            el.replaceWith(text);
            return;
        }
        // Embedded media
        if (props['data-pre-embedded'] === 'true') {
            var adaptiveMedia = tweet
                .children('.AdaptiveMediaOuterContainer')
                .children('.AdaptiveMedia');
            var isVideo = adaptiveMedia.hasClass('is-video');
            var media_1 = $('<div>');
            // Videos and gifs
            if (isVideo) {
                var img = adaptiveMedia
                    .find('.PlayableMedia-player')
                    .css('background-image');
                var url = new URL(img.slice(4, -1).replace(/['"]/g, ''));
                var fileName = path.basename(url.pathname);
                var ext = path.extname(fileName);
                var videoUrl = TWEET_VIDEO_URL + "/" + fileName.replace(ext, '.mp4');
                // Gifs
                if (url.pathname.startsWith('/tweet_video_thumb')) {
                    var video = $("<video poster=\"" + url.href + "\" controls playsinline autoplay muted loop>").append("<source src=\"" + videoUrl + "\" type=\"video/mp4\">");
                    media_1.attr('data-type', 'gif-container').append(video);
                }
                else {
                    // Custom videos require a call to the Twitter API to get the URL of the video
                    hasVideo = true;
                    media_1.attr('data-type', 'video-container');
                }
            }
            else {
                var images = adaptiveMedia.find('img');
                images.each(function () {
                    var img = $(this);
                    var src = img.attr('src');
                    var alt = img.attr('alt');
                    this.attribs = { 'data-type': 'media-image', src: src };
                    if (alt) {
                        this.attribs.alt = alt;
                    }
                    // Move the media img to a new container
                    media_1.append(img);
                });
                media_1.attr('data-type', "image-container " + images.length);
            }
            mediaHtml = $('<div>').append(media_1).html();
            el.remove();
            return;
        }
        var asTwitterLink = function (type) {
            _this.attribs = {
                'data-type': type,
                href: props.href
            };
            // Replace custom tags inside the anchor with text
            el.text(el.text());
        };
        // @mention
        if (props['data-mentioned-user-id']) {
            return asTwitterLink('mention');
        }
        // #hashtag
        if (props['data-query-source'] === 'hashtag_click') {
            return asTwitterLink('hashtag');
        }
        // $cashtag
        if (props['data-query-source'] === 'cashtag_click') {
            return asTwitterLink('cashtag');
        }
        console.error('An anchor with the following props is not being handled:', props);
    });
    actions.each(function () {
        var el = $(this);
        var className = this.attribs["class"];
        var is = function (name) { return className.includes("ProfileTweet-action--" + name); };
        var count = Number(el.children('span').attr('data-tweet-stat-count'));
        if (Number.isNaN(count))
            return;
        if (is('reply')) {
            meta.replies = count;
        }
        else if (is('retweet')) {
            meta.retweets = count;
        }
        else if (is('favorite')) {
            meta.likes = count;
        }
    });
    content.html = tweetContent.html();
    if (quotedTweet)
        content.quotedTweet = quotedTweet;
    if (mediaHtml)
        content.mediaHtml = mediaHtml;
    if (hasVideo)
        content.hasVideo = true;
    // If a card is detected, it's a Poll
    if (hasCard)
        content.hasPoll = true;
    return content;
}
function addTweetMetadata(data, tweet) {
    Object.assign(data.meta, {
        id: tweet.attr('data-tweet-id'),
        username: tweet.attr('data-screen-name'),
        name: tweet.attr('data-name')
    });
    return data;
}
export function getVideo(html, _a) {
    var poster = _a.poster, url = _a.url;
    var $ = cheerio.load(html, {
        decodeEntities: false,
        xmlMode: false
    });
    var container = $('[data-type=video-container]');
    var video = $("<video poster=\"" + poster + "\" controls preload=\"none\" playsinline>").append("<source src=\"" + url + "\" type=\"video/mp4\">");
    return $('<div>').append(container.append(video)).html();
}
export function getTweetData(html, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.thread, thread = _c === void 0 ? null : _c;
    var $ = cheerio.load(html, {
        decodeEntities: false,
        xmlMode: false
    });
    var tweet = $('.permalink-tweet-container > .permalink-tweet');
    var tweetContent = tweet.length && getTweetContent($, tweet, true);
    if (!tweetContent)
        return null;
    tweetContent.meta.mainTweet = true;
    var selfThread = [addTweetMetadata(tweetContent, tweet)];
    if (!thread)
        return selfThread;
    var replies = $('#stream-items-id');
    replies
        .children('.ThreadedConversation--selfThread')
        .children('ol')
        .children()
        .each(function () {
        var selfTweet = $(this).children('li').children('.tweet');
        var selfTweetContent = getTweetContent($, selfTweet.children('.content'));
        if (selfTweetContent) {
            selfThread.push(addTweetMetadata(selfTweetContent, selfTweet));
        }
    });
    return selfThread;
}
//# sourceMappingURL=tweet-html.js.map