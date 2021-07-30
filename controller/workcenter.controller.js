const db = require("../Modal");
const Center = db.Center;
// const Op = db.Sequelize.Op;

/**
 * Get all Work Center
 * @param {*} req 
 * @param {*} res 
 * @returns Array of document
 */
exports.getAll = async (req, res) => {
  try {
    let data = await Center.findAll();
    if (data && data.length > 0) {
      return res.status(res.__("STATUS_OK")).json({ success: true, message: res.__("FOUND"), data });

    } else {
      return res.status(res.__("STATUS_NOT_FOUND")).json(res.__("NOT_FOUND"));
    }
  } catch (err) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }

}
exports.getAllSubCenter = async (req, res) => {
  try {
    let data = await db.SubCenter.findAll();
    if (data && data.length > 0) {
      return res.status(res.__("STATUS_OK")).json({ success: true, message: res.__("FOUND"), data });

    } else {
      return res.status(res.__("STATUS_NOT_FOUND")).json(res.__("NOT_FOUND"));
    }
  } catch (err) {
    return res.status(res.__("STATUS_INTERNAL_SERVER_ERROR")).json(res.__('WRONG'));
  }

}