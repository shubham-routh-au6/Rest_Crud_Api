import User from "../model/user.mjs";
import _ from "lodash";
const controller = {};

//To create user
controller.createUser = (req, res) => {
  console.log(req.body.address);
  var body = _.pick(req.body, [
    "email",
    "password",
    "mobile",
    "address",
    "name",
  ]);
  var user = new User(body);

  user
    .save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      console.log(user);
      res.header("x-auth", token).json(user);
    })
    .catch((err) => {
      if (err.message.includes("Random.users index: mobile_1 dup key:")) {
        res
          .status(400)
          .send("Phone number already exist, please provide an unique number.");
      }
      res.status(400).send(err.message);
    });
};

// TO get all users
controller.allUsers = (req, res) => {
  User.find({})
    .then((data) => res.status(200).json(data))
    .catch((err) => res.send(err.message));
};

// To update a user by id (id need to be passed as param)
controller.updateUser = (req, res) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body)
    .then(function () {
      User.findOne({ _id: req.params.id }).then((updatedData) => {
        res.status(200).json(updatedData);
      });
    })
    .catch((err) => res.send(err.message));
};

// To delete a user by id (id need to be passed as param)
controller.deleteUser = (req, res) => {
  User.findByIdAndRemove({ _id: req.params.id })
    .then(function (data) {
      res.status(200).json(`User id ${data._id} has been deleted successfully`);
    })
    .catch((err) => {
      if (
        err.message === "Cannot read property '_id' of null" ||
        err.message.includes("Cast to ObjectId failed for value")
      ) {
        return res.status(400).json("User id does not exist in database");
      }
      res.json(err.message);
    });
};

// To get user by coordinates passed in param
controller.sortByCoordinate = (req, res) => {
  const point = {
    type: "Point",
    coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
  };
  User.aggregate(
    [
      {
        $geoNear: {
          near: point,
          spherical: true,
          distanceField: "dist.calculated",
          maxDistance: 10000,
          includeLocs: "dist.location",
        },
      },
    ],
    function (err, results) {
      if (err) {
        return res.status(400).json(err.message);
      } else if (results.length === 0) {
        return res.status(200).json({ message: "No results found" });
      }
      console.log(results);
      res.status(200).json(results);
    }
  );
};

// To get user sorted by createdAt timestamp and pagination.
// Pagination: limit={any number that is passed as query param} will show only that many count on postman.
//             skip={any number that is passed as query param} will skip to the next count.
// sort(timestamp): createdAt {-1} will get all users in a descending order and for ascending order we can change the value to positive 1, since all our users are saved in ascending order, I used negative 1 to show up in descinding order
controller.UserSortedByCreatedAt = (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 1;
  User.find({})
    .sort({ createdAt: -1 })
    .skip((skip - 1) * limit)
    .limit(limit)
    .find(function (err, docs) {
      if (err) {
        return res.status(500).json(err.message);
      }
      res.status(200).send(docs);
    });
};

export default controller;
