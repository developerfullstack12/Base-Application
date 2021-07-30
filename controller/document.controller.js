const db = require("../Modal");
const Document = db.Document;
const Op = db.Sequelize.Op;
/**
 * Create document
 * @param {*} req 
 * @param {*} res 
 * @returns Success true if created
 */
exports.create = async (req, res) => {
  if (!req.files || req.files.length > !0) {
    return res.status(res.__("STATUS_BAD_REQUEST")).json(res.__("REQUIRED"));
  }
  try {

    let name = req.files[0].originalname.split('.')[0];
    req.body.name = name;
    req.body.tags = req.body.tags ? req.body.tags : name;
    req.body.url = req.protocol + "://" + req.get('host') + req.files[0].path.replace("public", "");
    let data = await Document.create(req.body);
    if (data) {
      return res.status(res.__("STATUS_CREATED")).json(res.__("USER_CREATED"));
    } else {
      return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
    }
  } catch (err) {
    return res.send(req.files)
  }

};

/**
 * Get all user
 * @param {*} req 
 * @param {*} res 
 * @returns Array of document
 */
exports.getAll = async (req, res) => {
  try {
    let query = `SELECT documents.name, documents.tags, documents.catalog_dimension, documents.url, documents.id as documents_id,reasoncodes.reason_code,reasoncodes.found_count, reasoncodes.not_found_count,reasoncodes.id as reason_code_id
    FROM reasoncodes INNER JOIN documents on reasoncodes.id = documents.reason_code order by reasoncodes.found_count desc`;
    if (req.query.search) {
      query = `SELECT documents.name, documents.tags, documents.catalog_dimension, documents.url, documents.id as documents_id,reasoncodes.reason_code,reasoncodes.found_count, reasoncodes.not_found_count, reasoncodes.id as reason_code_id
      FROM reasoncodes
      INNER JOIN documents on reasoncodes.id = documents.reason_code where reasoncodes.reason_code like :code`;
    }
    let data = await db.sequelize.query(query, {
      replacements: { code: req.query.search + "%" },
      type: db.sequelize.QueryTypes.SELECT
    });
    if (data && data.length > 0) {
      if (req.query.search) {
       await db.ReasonCode.update({ found_count: data[0].found_count + 1 }, { where: { reason_code: req.query.search } });
      }
      return res.status(res.__("STATUS_OK")).json({ success: true, message: res.__("FOUND"), data });

    } else {
      if (req.query.search) {
        let reasonCodes = await db.ReasonCode.findOne({ where: { reason_code: req.query.search }});
        if (reasonCodes) {
          await db.ReasonCode.update({ not_found_count: reasonCodes.not_found_count + 1 }, { where: { reason_code: reasonCodes.reason_code } });
        }

      }
      return res.status(res.__("STATUS_NOT_FOUND")).json(res.__("NOT_FOUND"));

    }

  } catch (err) {
    console.log(err);
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));

  }


}