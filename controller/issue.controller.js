const db = require("../Modal");
const Issue = db.Issue;
const Op = db.Sequelize.Op;
/**
 * Create Issue
 * @param {*} req 
 * @param {*} res 
 * @returns Success true if created
 */
exports.create = async (req, res) => {

  try {

    let data = await Issue.create(req.body);
    if (data) {
      return res.status(res.__("STATUS_CREATED")).json(res.__("SAVED"));
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
    let query = `SELECT 
    centers.work_center_type,subcenters.work_sub_center_type,
    reasoncodes.reason_code,issues.stoppage_start_time,issues.stoppage_end_time, issues.isRejected,issues.feedback
    FROM issues 
    left JOIN centers on centers.id = issues.work_center_type
    left JOIN subcenters on subcenters.id = issues.work_sub_center_type
    left JOIN reasoncodes on reasoncodes.id = issues.stop_reason_code`;
    if (req.query.search) {
      query = `SELECT 
    centers.work_center_type,subcenters.work_sub_center_type,
    reasoncodes.reason_code,issues.stoppage_start_time,issues.stoppage_end_time, issues.isRejected,issues.feedback
    FROM issues 
    left JOIN centers on centers.id = issues.work_center_type
    left JOIN subcenters on subcenters.id = issues.work_sub_center_type
    left JOIN reasoncodes on reasoncodes.id = issues.stop_reason_code where reasoncodes.reason_code like :code`;
    }
    let data = await db.sequelize.query(query, {
      replacements: { code: req.query.search + "%" },
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

