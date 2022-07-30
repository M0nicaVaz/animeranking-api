const knex = require('../database/knex');

class MoviesController {
  async create(req, res) {
    const { title, description, rating, tags } = req.body;
    const user_id = req.user.id;

    const movie_id = await knex('movies').insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = tags.map((name) => {
      return {
        movie_id,
        name,
        user_id,
      };
    });

    await knex('tags').insert(tagsInsert);

    return res.json();
  }

  async show(req, res) {
    const { id } = req.params;

    const movie = await knex('movies').where({ id }).first();

    const tags = await knex('tags').where({ movie_id: id }).orderBy('name');

    return res.json({
      ...movie,
      tags,
    });
  }

  async index(req, res) {
    const { title } = req.query;
    const user_id = req.user.id;

    let movies = await knex('movies')
      .where({ user_id })
      .whereLike('title', `%${title}%`)
      .orderBy('title');

    const userTags = await knex('tags').where({ user_id });

    const movieWithTags = movies.map((movie) => {
      const movieTags = userTags.filter((tag) => tag.movie_id === movie.id);

      return {
        ...movie,
        tags: movieTags,
      };
    });

    return res.json(movieWithTags);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex('movies').where({ id }).delete();

    return res.json();
  }
}

module.exports = MoviesController;
