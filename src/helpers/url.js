const url = `${process.env.HOST}${
  process.env.PORT ? `:${process.env.PORT}` : "80"
}`;

export default url;
