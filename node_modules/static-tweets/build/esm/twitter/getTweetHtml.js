var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { getVideo } from './tweet-html';
import { fetchUserStatus, getEmbeddedTweetHtml, fetchTweetWithPoll } from './api';
import { fetchTweetAst } from '../fetchTweetAst';
import markdownToAst from '../markdown/markdownToAst';
function getVideoData(userStatus) {
    var video = userStatus.extended_entities.media[0];
    var poster = video.media_url_https;
    // Find the first mp4 video in the array, if the results are always properly sorted, then
    // it should always be the mp4 video with the lowest bitrate
    var mp4Video = video.video_info.variants.find(function (v) { return v.content_type === 'video/mp4'; });
    if (!mp4Video)
        return;
    return __assign({ poster: poster }, mp4Video);
}
function getPollData(tweet) {
    var polls = tweet.includes && tweet.includes.polls;
    return polls && polls[0];
}
function getMediaHtml(tweet) {
    return __awaiter(this, void 0, void 0, function () {
        var media, userStatus, video;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    media = tweet.mediaHtml;
                    if (!tweet.hasVideo) return [3 /*break*/, 2];
                    return [4 /*yield*/, fetchUserStatus(tweet.meta.id)];
                case 1:
                    userStatus = _a.sent();
                    video = userStatus && getVideoData(userStatus);
                    media = video ? getVideo(media, video) : null;
                    _a.label = 2;
                case 2: return [2 /*return*/, media];
            }
        });
    });
}
function getQuotedTweetHtml(_a, context) {
    var quotedTweet = _a.quotedTweet;
    return __awaiter(this, void 0, void 0, function () {
        var data, ast;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!quotedTweet)
                        return [2 /*return*/];
                    if (!(process.env.NEXT_PUBLIC_TWITTER_LOAD_WIDGETS === 'true')) return [3 /*break*/, 2];
                    return [4 /*yield*/, getEmbeddedTweetHtml(quotedTweet.url)];
                case 1:
                    data = _b.sent();
                    return [2 /*return*/, data === null || data === void 0 ? void 0 : data.html];
                case 2: return [4 /*yield*/, fetchTweetAst(quotedTweet.id)
                    // The AST of embedded tweets is always sent as data
                ];
                case 3:
                    ast = _b.sent();
                    // The AST of embedded tweets is always sent as data
                    return [2 /*return*/, ast && "<blockquote data-id=\"" + context.add({ ast: ast }) + "\"></blockquote>"];
            }
        });
    });
}
function getPollHtml(tweet, context) {
    return __awaiter(this, void 0, void 0, function () {
        var tweetData, poll, meta;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!tweet.hasPoll)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, fetchTweetWithPoll(tweet.meta.id)];
                case 1:
                    tweetData = _a.sent();
                    poll = tweetData && getPollData(tweetData);
                    if (poll) {
                        meta = {
                            type: 'poll-container',
                            endsAt: poll.end_datetime,
                            duration: poll.duration_minutes,
                            status: poll.voting_status,
                            options: poll.options
                        };
                        return [2 /*return*/, "<div data-id=\"" + context.add(meta) + "\"></div>"];
                    }
                    return [2 /*return*/, null];
            }
        });
    });
}
export default function getTweetHtml(tweet, context) {
    return __awaiter(this, void 0, void 0, function () {
        var meta, md, html, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    meta = __assign(__assign({}, tweet.meta), { type: 'tweet' });
                    return [4 /*yield*/, markdownToAst(tweet.html)];
                case 1:
                    md = _b.sent();
                    _a = [
                        // md.children is the markdown content, which is later added as children to the container
                        "<div data-id=\"" + context.add(meta, md.children) + "\">"];
                    return [4 /*yield*/, getMediaHtml(tweet)];
                case 2:
                    _a = _a.concat([
                        (_b.sent()) || ''
                    ]);
                    return [4 /*yield*/, getQuotedTweetHtml(tweet, context)];
                case 3:
                    _a = _a.concat([
                        (_b.sent()) || ''
                    ]);
                    return [4 /*yield*/, getPollHtml(tweet, context)];
                case 4:
                    html = _a.concat([
                        (_b.sent()) || '',
                        "</div>"
                    ]).join('');
                    return [2 /*return*/, html];
            }
        });
    });
}
//# sourceMappingURL=getTweetHtml.js.map