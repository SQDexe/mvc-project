const { express, bodyParser, path } = require('./utils/modules.js');

const routes = {
    home: require('./routes/Home.js'),
    film: require('./routes/Film.js'),
    notFound: require('./routes/NotFound.js')
    }

const ROOT = require('./utils/Path.js');
const PORT = 3000;

const app = express();

app.use(express.static(path.join(ROOT, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.set('view engine', 'ejs');

app.use(routes.home);
app.use(routes.film);
app.use(routes.notFound);

app.listen(PORT, console.log(`App started on port: ${PORT}`));