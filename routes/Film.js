const { express, path, multer } = require('../utils/modules.js');

const { renderFilm, renderFilmAdd, saveFilmAdd, renderFilmEdit, saveFilmEdit, deleteFilm, renderFilmView } = require('../controllers/film.js');

const ROOT_DIR = require('../utils/Path.js');
const UPLOADS_DIR = path.join(ROOT_DIR, 'public', 'uploads');

const router = express.Router();

const upload = multer({dest: UPLOADS_DIR});

router.get('/film', renderFilm);

router.get('/film/add', renderFilmAdd);
router.post('/film/add', upload.single('poster'), saveFilmAdd);

router.get('/film/edit/:id', renderFilmEdit);
router.post('/film/edit/:id', upload.single('poster'), saveFilmEdit);

router.get('/film/delete/:id', deleteFilm);

router.get('/film/view/:id', renderFilmView);

module.exports = router;