import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const sampleCategories = [
  { name: 'British Gurkha', description: 'British Gurkha Army Selection' },
  { name: 'Singapore Police', description: 'Singapore Police Force (Gurkha Contingent)' },
  { name: 'Indian Army', description: 'Indian Gorkha Army Regiments' },
];

const sampleProducts = [
  { categoryIndex: 0, name: 'BGA Full Training', description: 'Comprehensive pre-army physical training for British Gurkha selection including heaving, doko race, and written exam prep.', image_url: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=800' },
  { categoryIndex: 1, name: 'SPF Guard Training', description: 'Specialized training for the Singapore Police Force Gurkha Contingent selection process.', image_url: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800' },
  { categoryIndex: 2, name: 'Indian Army Regiments', description: 'Physical and academic preparation for Indian Gorkha Army recruitment rallies.', image_url: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800' },
];

const sampleContent = [
  { key_name: 'hero_title', value: 'Discipline Today,\nStrength Tomorrow' },
  { key_name: 'hero_subtitle', value: 'Quality pre-army physical training for youth aspiring to join the British Gurkha Army, Singapore Police Force, Indian Army, and more — guided by Ex-British Army PTIs.' },
  { key_name: 'about_us', value: 'A team of professionals with high experience in pre-Army training. BGTC has successfully trained thousands of students, achieving remarkable results in selection. Ranked 2nd best pre-army training centre across Nepal based on selection success rate.' },
  { key_name: 'contact_address', value: 'Kantipur Marga-15, Near Ban Campus, Pokhara' },
  { key_name: 'contact_phone', value: '9803402460' },
  { key_name: 'contact_email', value: 'bgtcentre@gmail.com' },
  { key_name: 'announcement_enabled', value: 'true' },
  { key_name: 'announcement_title', value: "New Intake Open!" },
  { key_name: 'announcement_text', value: "Registration for the upcoming British Gurkha Army selection phase is now open. Register early to secure your spot." },
  { key_name: 'services_hero_title', value: 'Catering & Custom Orders' },
  { key_name: 'services_hero_subtitle', value: 'Elevating your special moments and corporate events with artisanal excellence.' },
  { key_name: 'service_1_title', value: 'Gym Hall' },
  { key_name: 'service_1_desc', value: 'Fully equipped indoor gym tailored for pre-army physical training.' },
  { key_name: 'service_1_img', value: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_2_title', value: 'Student Hostel' },
  { key_name: 'service_2_desc', value: 'Comfortable and disciplined on-site accommodation for out-of-town students.' },
  { key_name: 'service_2_img', value: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_3_title', value: 'Education Center' },
  { key_name: 'service_3_desc', value: 'Dedicated classrooms and experienced tutors to prepare students for the written examinations.' },
  { key_name: 'service_3_img', value: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' }
];

async function seedDB() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'bgtc_cms',
    });

    console.log('Connected to the database. Clearing existing data...');
    await connection.query('SET FOREIGN_KEY_CHECKS = 0');
    await connection.query('DELETE FROM product_images');
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM categories');
    await connection.query('DELETE FROM content');
    await connection.query('DELETE FROM settings');
    await connection.query('DELETE FROM users');
    await connection.query('SET FOREIGN_KEY_CHECKS = 1');

    console.log('Inserting sample users...');
    const hashedAdminPassword = await bcrypt.hash('admin123', 10);

    await connection.query(
      'INSERT INTO users (username, full_name, password, role) VALUES (?, ?, ?, ?)',
      ['superadmin', 'Super Administrator', hashedAdminPassword, 'super_admin']
    );

    console.log('Inserting sample categories...');
    const catIds = [];
    for (const cat of sampleCategories) {
      const [res] = await connection.query(
        'INSERT INTO categories (name, description) VALUES (?, ?)',
        [cat.name, cat.description]
      );
      catIds.push(res.insertId);
    }

    console.log('Inserting sample products...');
    for (const product of sampleProducts) {
      const thumbUrl = product.image_url.replace('w=800', 'w=200');
      await connection.query(
        'INSERT INTO products (category_id, name, description, image_url, image_thumb_url) VALUES (?, ?, ?, ?, ?)',
        [catIds[product.categoryIndex], product.name, product.description, product.image_url, thumbUrl]
      );
    }

    console.log('Inserting sample content...');
    for (const content of sampleContent) {
      await connection.query(
        'INSERT INTO content (key_name, value) VALUES (?, ?)',
        [content.key_name, content.value]
      );
    }

    console.log('Inserting default settings...');
    await connection.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)',
      ['cake_types', JSON.stringify([{ name: 'Normal' }, { name: 'Eggless' }])]
    );
    await connection.query(
      'INSERT INTO settings (setting_key, setting_value) VALUES (?, ?)',
      ['max_cake_pounds', '10']
    );

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDB();
