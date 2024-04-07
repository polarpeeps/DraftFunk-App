import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import authRoutes from './routes/auth.js'
import postRoutes from './routes/post.js'
import commentRoutes from './routes/comment.js'
import logger,{morganMiddleware} from './logger/index.js'
import cookieParser from 'cookie-parser'
import {connectDB} from './utils/db.utils.js'
dotenv.config();
import FormData from "form-data";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morganMiddleware);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

app.get("/", (req, res) => {
  res.send(`Server is running `);
});

app.get("/seed-db", async (req, res) => {
  const imageCount = 50;
  const imageWidths = Array.from(
    { length: imageCount },
    () => Math.floor(Math.random() * 1000) + 200
  );
  const imageHeights = Array.from(
    { length: imageCount },
    () => Math.floor(Math.random() * 1000) + 200
  );
  const imageUrls = Array.from(
    { length: imageCount },
    (_, i) => `https://picsum.photos/${imageWidths[i]}/${imageHeights[i]}`
  );

  const dataArr = [];
  for (let i = 0; i < imageCount; i++) {
    const response = await axios.get(imageUrls[i], {
      responseType: "arraybuffer",
    });
    const buffer = Buffer.from(response.data, "binary");
    const fd = new FormData();
    fd.append(`image`, buffer, { filename: `image-${i}.jpg` });
    fd.append(`title`, `Random Image ${i}`);
    dataArr.push(fd);
  }

  const postPromises = [];
  for (let i = 0; i < imageCount; i++) {
   const fd = dataArr[i];
    postPromises.push(axios.post("http://localhost:8080/post", fd, {}));
  }

  Promise.all(postPromises)
    .then(() => {
      res.send("Posts created successfully");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error creating posts");
    });
});

app.listen(PORT, () => {
  logger.info(`Server is listening on port ${PORT}`);
  console.log(`Server is listening on port ${PORT}`);
});