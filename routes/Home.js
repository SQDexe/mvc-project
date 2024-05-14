const { express } = require('../utils/modules.js');

const { renderHomePage } = require('../controllers/home.js');

const router = express.Router();

router.get('/', renderHomePage);

module.exports = router;