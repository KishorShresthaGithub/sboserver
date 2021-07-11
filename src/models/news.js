import cryptoRandomString from "crypto-random-string";
import { Model, DataTypes } from "sequelize";
import slugify from "slugify";
import sqlize from "../database";

class News extends Model {}

News.init(
  {
    title: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false, unique: false },
    image: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize: sqlize,
    paranoid: true,
    tableName: "news",
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
  }
);

const addSlug = (news, options) => {
  let slug = slugify(news.title, { replacement: "-", lower: true });

  slug +=
    "-" +
    cryptoRandomString({
      length: 5,
    });

  news.slug = slug;
};

News.beforeCreate(addSlug);
News.beforeUpdate(addSlug);

// News.sync({ force: true });

export default News;
