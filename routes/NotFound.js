const { express } = require('../utils/modules.js');

const { renderNotFound } = require('../controllers/notFound.js');

const router = express.Router();

router.all('*', renderNotFound);

module.exports = router;