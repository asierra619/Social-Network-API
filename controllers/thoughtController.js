const { User, Thought } = require("../models");

module.exports = {
  // Get All Thoughts - GET
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (error) {
      return res.status(500).json(err);
    }
  },

  //Get Single Thought - GET
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.userId });
      if (!thought) {
        return res.status(404).json({ message: "No Thought Found!" });
      }
      res.json(thought);
    } catch (error) {
      res.json(500).json(error);
    }
  },

  // Create Thought - POST
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      const user = await User.findByIdAndUpdate(
        req.body.userId,
        {
          $addToSet: {
            thoughts: thought._id,
          },
        },
        { new: true }
      );
      res.json(thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Update Thought - PUT
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      if (!thought) {
        res.status(404).json({ message: "No Thought Found!" });
      }
      res.json(Thought);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Delete Thought - DELETE
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });
      if (!thought) {
        res.status(404).json({ message: "No Thought Found!" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Add a Reaction to a Thought - POST
  async addReaction(req, res) {
    console.log('Woah, just take it easy, man.');
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { assignments: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No Brain Activity for :(' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  // Remove Reaction from a Thought - DELETE
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { assignment: { assignmentId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No Brain Activity for :(' });
      }

      res.json(student);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
