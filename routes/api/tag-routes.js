const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async(req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include:[Product]
    }); 
    res.status(200).json(tagData);;
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.get('/:id', async(req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findOne(req.body, {
      where: {
        id: req.params.id,
      },
      include:[Product]
    });
    if (tagData[0] === 0) {
      res.status(404).json({ message: 'No tag with this id!'});
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.post('/', async(req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body); 
    res.status(200).json(tagData);;
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.put('/:id', async(req, res) => {
  // update a tag's name by its `id` value
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (tagData[0] === 0) {
      res.status(404).json({ message: 'No tag with this id!'});
      return;
    }
    res.json(tagData);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

router.delete('/:id', async(req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag with this id!'});
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json({message: "Something went wrong"});
  }
});

module.exports = router;
