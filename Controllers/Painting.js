import Painting from "../Models/Painting.js";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dn3cziusx",
  api_key: "631247149279177",
  api_secret: "kAMfgwF-GOcbLqMo1cSSta-WNx0",
});

// get all paintings
export const getAllPaintings = async (req, res) => {
  try {
    const paintings = await Painting.find()
      .populate("categoryId")
      .exec();
    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get a painting by id
export const getPaintngById = async (req, res) => {
  const { id } = req.params;
  try {
    const painting = await Painting.findById(id)
      .populate("categoryId")
      .exec();
    if (!painting) {
      res.status(404).json({ message: "Painting not found" });
    } else {
      res.status(200).json(painting);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get paintings by categoryId
export const getAllPaintingsByCategory = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;

    const paintings = await Painting.find({ categoryId })
      .populate("categoryId")
      .exec();

    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get paintings by userId
export const getAllPaintingsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;

    const paintings = await Painting.find({ userId })
      .populate("categoryId")
      .exec();

    res.status(200).json(paintings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// add painting
export const createPainting = async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, description, categoryId, price, size } = req.body;

    // Upload the image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    const painting = new Painting({
      userId,
      title,
      description,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      categoryId,
      price,
      size,
    });

    const savedPainting = await painting.save();

    res.status(201).json({
      message: "Painting added successfully",
      painting: savedPainting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// update a painting
export const updatePainting = async (req, res) => {
  try {
    const paintingId = req.params.id;
    const { title, description, categoryId, price, size } = req.body;
    let image;

    // Upload the image to cloudinary (if needed)
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      image = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    const updatedPainting = await Painting.findByIdAndUpdate(
      paintingId,
      {
        title,
        description,
        image,
        categoryId,
        price,
        size,
      },
      { new: true }
    );

    if (!updatedPainting) {
      return res.status(404).json({ message: "Painting not found" });
    }

    res.status(200).json({
      message: "Painting updated successfully",
      painting: updatedPainting,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

//delete a painting by id
export const deletePainting = async (req, res) => {
  const { id } = req.params;
  try {
    const painting = await Painting.findOne({ _id: id });

    if (!painting) {
      res.status(404).json({ message: "Painting not found" });
    } else {
      await painting.deleteOne();
      res.status(200).json({ message: "Painting deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
