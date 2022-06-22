import express from 'express';
import resize from '../../utilities/resize';

const route = express.Router();

route.get('/', async(req, res) => {
  // Configure sharp request
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  // check all params have value
  if(filename === "") return res.send('filename parameter is required to resize')
  if(width === "") return res.send('width parameter is required to resize')
  if(height === "") return res.send('height parameter is required to resize')

  let imageStatus 

  if(typeof filename === "string" &&
    typeof width === "string" &&
    typeof height === "string"
  )
    imageStatus = await resize(filename, width, height);
  
  // Check returned image object {created, path}
  // Error is thrown
  if(imageStatus === undefined) {
    res.status(400).send('Please re-check your parameters.')
    console.log("unvalid parameters")
  }

  // Successfully created
  else if(imageStatus.created === true){
    res.status(201).sendFile(imageStatus.path)
    console.log('Image created')
  }

  // Successfully retrieved
  else if(imageStatus.created === false){
    res.status(200).sendFile(imageStatus.path)
    console.log('Image already exists')
  }

  // Non-existent image
  else {
    res.status(400).send('Specified image not found')
    console.log('err')
  }
});

export default route;
