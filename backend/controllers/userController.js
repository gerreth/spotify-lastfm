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
}

module.exports = new UserController();
