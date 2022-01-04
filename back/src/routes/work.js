import Router from "koa-router";
import Photo from "../models/Photo";
import Event from "../models/Event";
import multer from "koa-multer";
import fs from "fs";
import path from "path";
import moment from"moment";
import Couple from "../models/Couple";
const work = new Router();

work.get("/", (ctx) => {
  ctx.body = "서버온";
});

fs.readdir("src/uploads", (error) => {
  if (error) {
    fs.mkdirSync("src/uploads");
  }
});

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "src/uploads/");
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

work.post("/photos", upload.single("file"), async (ctx) => {
try {
  

 await Couple.update({ $or : [

    { authCode1:ctx.req.body.authCode }
    
    , { authCode2: ctx.req.body.authCode}
    
    ] }, { $push: { image:ctx.req.file.filename } })
  }
    catch (error) {
    }
    ctx.body={success:true}
})

work.post('/gallery', async (ctx) => {
  const user = await Couple.findOne({ $or : [

    { authCode1:ctx.request.body.authCode }
    
    , { authCode2: ctx.request.body.authCode}
    
    ] });
 ctx.body=user.image
})


work.get("/photos/:id", async (ctx) => {
  try {
    const result = await Photo.findById(ctx.req.params.id);
    ctx.set("Content-Type", "image/jpeg");
    ctx.body = result.photo;
  } catch (error) {
    ctx.body = { get_error: "파일을 불러오던 중 오류가 발생하였습니다" };
  }
});

work.post("/create-event", (ctx) => {
  
  const event = new Event(ctx.request.body);
event.save();
  // res.sendStatus(201);
});

work.get("/get-events", async (ctx) => {
  
  const events = await Event.find({
    start: { $gte: moment(ctx.req.query.start).toDate() },
    end: { $lte: moment(ctx.req.query.end).toDate() },
  });

  ctx.body = events;
});

export default work;
