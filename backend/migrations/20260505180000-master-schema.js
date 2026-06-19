'use strict';

exports.up = async function(db) {
  console.log('--- STARTING COMPREHENSIVE SCHEMA SYNC ---');
  await db.runSql('SET FOREIGN_KEY_CHECKS = 0');

  // 1. USERS
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      full_name VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(50) DEFAULT 'admin',
      is_active TINYINT DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // 2. CATEGORIES
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS categories (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // 3. PRODUCTS
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS products (
      id INT AUTO_INCREMENT PRIMARY KEY,
      category_id INT NULL,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      image_url VARCHAR(255),
      image_thumb_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_products_category_id (category_id),
      INDEX idx_products_created_at (created_at)
    ) ENGINE=InnoDB;
  `);

  // 4. PRODUCT_IMAGES (Multiple images per product)
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS product_images (
      id INT AUTO_INCREMENT PRIMARY KEY,
      product_id INT NOT NULL,
      image_url VARCHAR(255) NOT NULL,
      image_thumb_url VARCHAR(255),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_product_images_pid (product_id)
    ) ENGINE=InnoDB;
  `);
  
  // 5. CONTENT
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS content (
      id INT AUTO_INCREMENT PRIMARY KEY,
      key_name VARCHAR(255) NOT NULL UNIQUE,
      value TEXT,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB;
  `);

  // 6. SETTINGS
  await db.runSql(`
    CREATE TABLE IF NOT EXISTS settings (
      setting_key VARCHAR(255) PRIMARY KEY,
      setting_value LONGTEXT
    ) ENGINE=InnoDB;
  `);

  // --- REPAIR & SYNC ---
  const repairs = [
    { tbl: 'products',     col: 'category_id',      sql: 'ALTER TABLE products ADD COLUMN category_id INT NULL AFTER id' },
    { tbl: 'products',     col: 'image_url',        sql: 'ALTER TABLE products ADD COLUMN image_url VARCHAR(255) AFTER description' },
    { tbl: 'products',     col: 'image_thumb_url',  sql: 'ALTER TABLE products ADD COLUMN image_thumb_url VARCHAR(255) AFTER image_url' }
  ];

  for (const r of repairs) {
    const [check] = await new Promise((resolve) => {
      db.connection.query('SELECT COUNT(*) AS cnt FROM information_schema.columns WHERE table_schema = DATABASE() AND table_name = ? AND column_name = ?', [r.tbl, r.col], (err, rows) => resolve(rows));
    });
    if (check && check.cnt === 0) {
      console.log(`  + Repairing ${r.tbl}: adding column ${r.col}`);
      await db.runSql(r.sql);
    }
  }

  // Ensure settings value is LONGTEXT for QR codes
  await db.runSql('ALTER TABLE settings MODIFY COLUMN setting_value LONGTEXT');

  // 10. FOREIGN KEYS
  await db.runSql('ALTER TABLE products ADD CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL').catch(() => {});
  await db.runSql('ALTER TABLE product_images ADD CONSTRAINT fk_product_images_pid FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE').catch(() => {});

  await db.runSql('SET FOREIGN_KEY_CHECKS = 1');
  console.log('--- COMPREHENSIVE SCHEMA SYNC COMPLETED ---');
};

exports.down = function(db, callback) {
  callback();
};
