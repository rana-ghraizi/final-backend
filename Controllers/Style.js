import Style from "../Models/Style.js";

export const getAllStyles = async (req, res) => {
  try {
    const styles = await Style.find();
    res.status(200).json(styles);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const getStyleById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const style = await Style.findById(id);

    res.status(200).json(style);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};

export const createStyle = async (req, res) => {
  try {
    const newStyle = new Style({
      title: req.body.title,
    });
    await newStyle.save();
    res.status(201).json(newStyle);
    console.log(Style);
  } catch (error) {
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const editStyle = async (req, res) => {
  try {
    const id = req.params.id;
    const updateFields = {};

    if (req.body.title) updateFields.title = req.body.title;
    const styleDoc = await Style.findByIdAndUpdate(
      id,
      {
        $set: updateFields,
      },
      { new: true }
    );

    if (!styleDoc) return res.status(404).send("Document not found");
    res.status(200).json("Document updated successfully.");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating document in the database");
  }
};

export const deleteStyle = async (req, res) => {
  try {
    const id = req.params.id;
    await Style.deleteOne({ _id: id });
    res.status(200).json({ message: "Document deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
