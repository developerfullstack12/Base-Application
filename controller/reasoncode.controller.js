const db = require("../Modal");
const ReasonCode = db.ReasonCode;
// const Op = db.Sequelize.Op;

/**
 * Get all reasoncode
 * @param {*} req 
 * @param {*} res 
 * @returns Array of ReasonCode
 */
exports.getAll = async (req, res) => {
  try {
    let data = await ReasonCode.findAll();
    if (data && data.length > 0) {
      return res.status(res.__("STATUS_OK")).json({ success: true, message: res.__("FOUND"), data });

    } else {
      return res.status(res.__("STATUS_NOT_FOUND")).json(res.__("NOT_FOUND"));
    }
  } catch (err) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }

}



exports.getCount = async (req, res) => {
  try {
    let query = `SELECT reasoncodes.reason_code, reasoncodes.found_count, reasoncodes.not_found_count,sum(issues.isRejected) as isRejected FROM issues RIGHT JOIN reasoncodes on issues.stop_reason_code=reasoncodes.id GROUP BY reasoncodes.reason_code`;
    
    let data = await db.sequelize.query(query, {
      // replacements: { code: req.query.search + "%" },
      type: db.sequelize.QueryTypes.SELECT
    });
    if (data && data.length > 0) {
      return res.status(res.__("STATUS_OK")).json({ success: true, message: res.__("FOUND"), data });

    } else {
      return res.status(res.__("STATUS_NOT_FOUND")).json(res.__("NOT_FOUND"));
    }
  } catch (err) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }

}