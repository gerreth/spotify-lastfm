import User from '../models/user';

class UserController {
  create(name, source, top) {
    const user = new User({ name });
    user.bands.top[source] = top;
    user.save();
  }

  read() {}

  update(user, source, type, bands) {
    user.bands[type][source] = bands;
    user.save();
  }

  delete() {}

  top(source, topBands) {
    const top = topBands.map(band => band.name);

    User.findOne({ name: 'gereeet' }, (err, user) => {
      if (err) return console.error(err);

      if (user === null) {
        this.create('gereeet', source, 'top', top);
      } else {
        this.update(user, source, 'top', top);
      }
    });
  }

  similar(source, similarBands) {
    const similar = similarBands.map(band => band.name);

    User.findOne({ name: 'gereeet' }, (err, user) => {
      if (user === null) {
        if (err) return console.error(err);
      } else {
        this.update(user, source, 'similar', similar);
      }
    });
  }

  like(band) {
    User.findOne({ name: 'gereeet' }, (err, user) => {
      if (user === null) {
        if (err) return console.error(err);
      } else {
        const likes = user.likes.find(like => like.id === band.id);

        if (likes == undefined) {
          user.likes.push(band);
        } else {
        }

        user.save();
        console.log(user.likes);
        console.log(user.dislikes);
      }
    });
  }

  dislike(band) {
    User.findOne({ name: 'gereeet' }, (err, user) => {
      if (user === null) {
        if (err) return console.error(err);
      } else {
        const dislikes = user.dislikes.find(dislike => dislike.id === band.id);

        if (dislikes == undefined) {
          user.dislikes.push(band);
        } else {
        }

        user.save();
        console.log(user.likes);
        console.log(user.dislikes);
      }
    });
  }
}

module.exports = new UserController();
