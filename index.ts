import express, { Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import NodeCache from "node-cache";
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const cacheTTL = 24 * 60 * 60 * 15; // cache expires every 15 days
const cache = new NodeCache({ stdTTL: cacheTTL });

type apiData = {
  keyword: string;
  url: string;
};

const fetchAndCacheData = async () => {
  try {
    const response = await fetch("https://api.npoint.io/a7e72efdfccea4a55af0");
    const data = await response.json();
    cache.set("apiData", data, cacheTTL);
    console.log("Data fetched from API and cached");
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const refreshInterval = 60 * 60 * 1000 * 24 * 15; // refresh interval is 15 days
setInterval(fetchAndCacheData, refreshInterval);

// fetchAndCacheData();

app.get("/", (req: Request, res: Response) => {
  res.json("Hello World!");
});

app.get("/:id", (req: Request, res: Response) => {
  const id: string = req.params.id;
  const data: apiData[] | undefined = cache.get("apiData");
  const result: apiData | undefined = data?.find(
    (item) => item.keyword === id.toLowerCase()
  );

  if (result) res.status(301).redirect(result.url);
  else res.status(404).json({ error: "Data not found" });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
