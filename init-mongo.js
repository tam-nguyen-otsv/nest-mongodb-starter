db.createUser({
  user: 'root',
  pwd: 'example',
  roles: [
    {
      role: 'readWrite',
      db: 'nest_app',
    },
  ],
});
db.createCollection('nest_app');
