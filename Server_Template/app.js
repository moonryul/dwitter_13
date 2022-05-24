import express from "express";
import "express-async-errors";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import tweetsRouter from "./router/tweets.js";

const app = express();

app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(morgan('tiny'));

app.use('/tweets', tweetsRouter);

// Ctrl + Shift + P -> configure user 검색 후 Preferences: Configure user Snippets 클릭 -> javascript.json 검색 후 엔터
// 자주 작성해 주어야 하는 구문을 특정 키워드를 정의하여 작성할 수 있음
app.use((req, res, next) => {
    res.sendStatus(404);
})

app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
})
app.listen(8080);