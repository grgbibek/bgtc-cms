import pool from '../config/db.js';

// ─── GET all submissions (admin/manager) ─────────────────────────────────────
export const getSubmissions = async (req, res) => {
  try {
    const { status, subject, page = 1, limit = 50 } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let where = 'WHERE 1=1';
    const params = [];

    if (status) {
      where += ' AND status = ?';
      params.push(status);
    }
    if (subject) {
      where += ' AND subject = ?';
      params.push(subject);
    }

    const [rows] = await pool.query(
      `SELECT * FROM contact_submissions ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      [...params, parseInt(limit), offset]
    );

    const [[{ total }]] = await pool.query(
      `SELECT COUNT(*) AS total FROM contact_submissions ${where}`,
      params
    );

    // Stats
    const [[stats]] = await pool.query(`
      SELECT
        COUNT(*) AS total,
        SUM(status = 'new') AS new_count,
        SUM(status = 'contacted') AS contacted_count,
        SUM(status = 'enrolled') AS enrolled_count,
        SUM(status = 'rejected') AS rejected_count
      FROM contact_submissions
    `);

    res.json({ submissions: rows, total, stats, page: parseInt(page), limit: parseInt(limit) });
  } catch (error) {
    if (error.code === 'ER_NO_SUCH_TABLE') return res.json({ submissions: [], total: 0, stats: {}, page: 1, limit: 50 });
    console.error('getSubmissions error:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── GET single submission ────────────────────────────────────────────────────
export const getSubmissionById = async (req, res) => {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM contact_submissions WHERE id = ?',
      [req.params.id]
    );
    if (rows.length === 0) return res.status(404).json({ message: 'Submission not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── PATCH status ─────────────────────────────────────────────────────────────
export const updateSubmissionStatus = async (req, res) => {
  const { status } = req.body;
  const allowed = ['new', 'contacted', 'enrolled', 'rejected'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ message: `Invalid status. Must be one of: ${allowed.join(', ')}` });
  }
  try {
    await pool.query(
      'UPDATE contact_submissions SET status = ? WHERE id = ?',
      [status, req.params.id]
    );
    res.json({ id: req.params.id, status });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// ─── DELETE submission ────────────────────────────────────────────────────────
export const deleteSubmission = async (req, res) => {
  try {
    await pool.query('DELETE FROM contact_submissions WHERE id = ?', [req.params.id]);
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
