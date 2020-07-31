const { default: Kretes, response, routing } = require('kretes');
const { OK } = response;
const { Route } = routing;

const contacts = require('./contacts.json');
const stories = require('./stories.json');
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const app = new Kretes();

const routes = [
  Route.GET("/", _ => "Flutter in Practice"),
  Route.GET("/contacts", async ({ params: { q } }) => {
    let r = contacts;

    if (q) {
      if (q === "le") await delay(2000);

      r = contacts.filter(({ name }) => name.match(q));
    }

    return OK(r)
  }),
  Route.GET("/stories", async ({ params: { q } }) => {
    let r = stories;

    if (q) {
      r = stories.filter(({ title }) => title.toLowerCase().match(q.toLowerCase()));
    }

    return OK(r)
  }),
];


app.start({ routes, port: 5544 });
