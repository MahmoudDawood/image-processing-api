import express from 'express';
import resize from '../../utilities/resize';

const route = express.Router();

route.get('/', async (req, res) => {
  // Configure sharp request params
  const filename = req.query.filename;
  const width = req.query.width;
  const height = req.query.height;

  // Asser that all params have values
  // if(!filename || !width || !height)
  if (filename === '')
    return res.status(400).send('filename parameter value is required');
  if (width === '')
    return res.status(400).send('width parameter value is required');
  if (height === '')
    return res.status(400).send('height parameter value is required');

  let imageStatus;

  if (
    typeof filename === 'string' &&
    typeof width === 'string' &&
    typeof height === 'string'
  )
    imageStatus = await resize(filename, width, height);

  // Check returned image object {created, path}
  // Error is thrown
  if (imageStatus === undefined) {
    res.status(400).send('Please re-check your parameters.');
  }

  // Non-existent image
  else if (imageStatus.created === 0) {
    res.status(404).send('Specified image not found');
  }

  // Successfully created
  else if (imageStatus.created === 1) {
    res.status(201).sendFile(imageStatus.path);
  }

  // Successfully retrieved
  else if (imageStatus.created === 2) {
    res.status(200).sendFile(imageStatus.path);
  }

  // Default
  else res.status(400).send('Please re-check your parameters.');
});

export default route;
