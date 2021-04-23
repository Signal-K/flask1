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
import fetch from '../fetch';
var API_URL = 'https://api.twitter.com';
var SYNDICATION_URL = 'https://syndication.twitter.com';
function twitterLabsEnabled(expansions) {
    if (process.env.TWITTER_LABS_ENABLED !== 'true')
        return false;
    if (!expansions)
        return true;
    var exp = process.env.TWITTER_LABS_EXPANSIONS || '';
    return exp.includes(expansions);
}
export function fetchTweetsHtml(ids) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch(SYNDICATION_URL + "/tweets.json?ids=" + ids)];
                case 1:
                    res = _a.sent();
                    if (res.ok)
                        return [2 /*return*/, res.json()];
                    if (res.status === 404)
                        return [2 /*return*/, {}];
                    throw new Error("Fetch for the embedded tweets of \"" + ids + "\" failed with code: " + res.status);
            }
        });
    });
}
export function fetchTweetHtml(id) {
    return __awaiter(this, void 0, void 0, function () {
        var html;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetchTweetsHtml(id)];
                case 1:
                    html = _a.sent();
                    return [2 /*return*/, html[id]];
            }
        });
    });
}
export function fetchUserStatus(tweetId) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    // If there isn't an API token don't do anything, this is only required for videos.
                    if (!process.env.TWITTER_ACCESS_TOKEN)
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch(API_URL + "/1.1/statuses/show/" + tweetId + ".json?include_entities=true&tweet_mode=extended", {
                            headers: {
                                authorization: "Bearer " + process.env.TWITTER_ACCESS_TOKEN
                            }
                        })];
                case 1:
                    res = _a.sent();
                    console.log('Twitter x-rate-limit-limit:', res.headers.get('x-rate-limit-limit'));
                    console.log('Twitter x-rate-limit-remaining:', res.headers.get('x-rate-limit-remaining'));
                    console.log('Twitter x-rate-limit-reset:', res.headers.get('x-rate-limit-reset'));
                    if (res.ok)
                        return [2 /*return*/, res.json()];
                    if (res.status === 404)
                        return [2 /*return*/];
                    throw new Error("Fetch to the Twitter API failed with code: " + res.status);
            }
        });
    });
}
export function fetchTweetWithPoll(tweetId) {
    return __awaiter(this, void 0, void 0, function () {
        var expansions, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    expansions = 'attachments.poll_ids';
                    // If there isn't an API token or Twitter Labs is not enabled, don't do anything,
                    // this is only required for Polls.
                    if (!process.env.TWITTER_ACCESS_TOKEN || !twitterLabsEnabled(expansions))
                        return [2 /*return*/];
                    return [4 /*yield*/, fetch(API_URL + "/labs/1/tweets?format=compact&expansions=" + expansions + "&ids=" + tweetId, {
                            headers: {
                                authorization: "Bearer " + process.env.TWITTER_ACCESS_TOKEN
                            }
                        })];
                case 1:
                    res = _a.sent();
                    console.log('Twitter Labs x-rate-limit-limit:', res.headers.get('x-rate-limit-limit'));
                    console.log('Twitter Labs x-rate-limit-remaining:', res.headers.get('x-rate-limit-remaining'));
                    console.log('Twitter Labs x-rate-limit-reset:', res.headers.get('x-rate-limit-reset'));
                    if (res.ok)
                        return [2 /*return*/, res.json()];
                    if (res.status === 404)
                        return [2 /*return*/];
                    throw new Error("Fetch to the Twitter Labs API failed with code: " + res.status);
            }
        });
    });
}
export function getEmbeddedTweetHtml(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fetch("https://publish.twitter.com/oembed?url=" + url)];
                case 1:
                    res = _a.sent();
                    if (res.ok)
                        return [2 /*return*/, res.json()];
                    if (res.status === 404)
                        return [2 /*return*/];
                    throw new Error("Fetch for embedded tweet failed with code: " + res.status);
            }
        });
    });
}
//# sourceMappingURL=api.js.map