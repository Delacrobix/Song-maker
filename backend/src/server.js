import app from "./index";

const PORT = process.env.PORT || 8080;

app.listen(PORT, (err) => {
  if(err){
    console.error(err)
  } else {
    console.log("Server listening on port " + PORT);
  }
});