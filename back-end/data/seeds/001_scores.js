
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scores')
  .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('scores').insert([
        {date: '06/04/19', score: 70},
        {date: '06/11/19', score: 60},
        {date: '06/15/19', score: 75},
        {date: '06/19/19', score: 80},
      ]);
    });
};
