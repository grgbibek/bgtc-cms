'use strict';

exports.up = async function(db) {
  console.log('--- ADDING contact_submissions TABLE ---');

  await db.runSql(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) DEFAULT NULL,
      phone VARCHAR(50) DEFAULT NULL,
      gender VARCHAR(20) DEFAULT NULL,
      qualification VARCHAR(255) DEFAULT NULL,
      subject VARCHAR(255) DEFAULT NULL,
      message TEXT DEFAULT NULL,
      status ENUM('new', 'contacted', 'enrolled', 'rejected') DEFAULT 'new',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  console.log('--- contact_submissions TABLE CREATED ---');
};

exports.down = async function(db) {
  await db.runSql('DROP TABLE IF EXISTS contact_submissions');
};
