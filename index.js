"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const node_cache_1 = __importDefault(require("node-cache"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
const cacheTTL = 24 * 60 * 60 * 15; // cache expires every 15 days
const cache = new node_cache_1.default({ stdTTL: cacheTTL });
const fetchAndCacheData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(process.env.JSON_URL);
        const data = yield response.json();
        cache.set("apiData", data, cacheTTL);
        console.log("Data fetched from API and cached");
    }
    catch (error) {
        console.error("Error fetching data:", error);
    }
});
const refreshInterval = 60 * 60 * 1000 * 24 * 15; // refresh interval is 15 days
setInterval(fetchAndCacheData, refreshInterval);
fetchAndCacheData();
app.get("/", (req, res) => {
    res.json("Hello World!");
});
app.get("/:id", (req, res) => {
    const id = req.params.id;
    const data = cache.get("apiData");
    const result = data === null || data === void 0 ? void 0 : data.find((item) => item.keyword === id.toLowerCase());
    if (result)
        res.status(301).redirect(result.url);
    else
        res.status(404).json({ error: "Data not found" });
});
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
