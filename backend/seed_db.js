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
  { key_name: 'announcements', value: JSON.stringify([
    {
      title: 'New Intake Open!',
      text: 'Registration for the upcoming British Gurkha Army selection phase is now open. Register early to secure your spot.',
      image: '',
      enabled: true,
    },
    {
      title: 'Singapore Police Force — Gurkha Contingent',
      text: 'SPF Gurkha Contingent selection is approaching. Join our specialised training program and maximise your chances.',
      image: '',
      enabled: true,
    },
  ]) },
  { key_name: 'services_hero_title', value: 'World-Class Facilities' },
  { key_name: 'services_hero_subtitle', value: 'Everything you need to train, rest, study, and succeed — all in one place in Pokhara.' },
  
  // Facilities
  { key_name: 'service_1_title', value: 'Gym & Training Hall' },
  { key_name: 'service_1_desc', value: 'Fully equipped indoor gym tailored for pre-army physical training. Features battle PT equipment, power bags, circuit training stations, and dedicated zones for heaving, sit-ups, and push-ups.' },
  { key_name: 'service_1_img', value: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_2_title', value: 'Student Hostel' },
  { key_name: 'service_2_desc', value: 'Comfortable and disciplined on-site accommodation for out-of-town students. Our hostel environment fosters brotherhood and ensures students follow a strict daily routine essential for military preparation.' },
  { key_name: 'service_2_img', value: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_3_title', value: 'Education Center' },
  { key_name: 'service_3_desc', value: 'Academic excellence is just as important as physical fitness. We provide dedicated classrooms and experienced tutors to prepare students for the written examinations required by the British and Singapore armies.' },
  { key_name: 'service_3_img', value: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_4_title', value: 'Nutritional Canteen' },
  { key_name: 'service_4_desc', value: 'Our canteen serves high-quality, nutritious meals designed specifically for individuals undergoing intense physical training. We ensure our students get the right balance of proteins, carbs, and hydration.' },
  { key_name: 'service_4_img', value: 'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_5_title', value: 'Swimming Facility' },
  { key_name: 'service_5_desc', value: 'Access to swimming facilities for full-body conditioning, endurance building, and specific aquatic tests that may be part of selection processes.' },
  { key_name: 'service_5_img', value: 'https://images.unsplash.com/photo-1519315901367-f34bf9150f01?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'service_6_title', value: 'Sports Courts' },
  { key_name: 'service_6_desc', value: 'Indoor and outdoor courts for badminton and volleyball. These activities improve agility, teamwork, and reflexes while providing a healthy recreational outlet.' },
  { key_name: 'service_6_img', value: 'https://images.unsplash.com/photo-1628795092040-d124cc2c3dfb?auto=format&fit=crop&q=80&w=800' },

  // Army Programs
  { key_name: 'class_1_title', value: 'British Gurkha Army' },
  { key_name: 'class_1_subtitle', value: 'Most Prestigious Selection' },
  { key_name: 'class_1_desc', value: 'Join the elite British Gurkha Regiment. Training covering all physical tests including heaving, 800m, 1.5-mile run, Doko Race (5.8 KM) and more.' },
  { key_name: 'class_1_badge', value: 'Once a Year' },
  { key_name: 'class_1_frequency', value: 'Open once a year at British Gurkha Army Camp, Pokhara and Dharan.' },
  { key_name: 'class_1_eligibility', value: 'Nepalese youth from all parts of Nepal\nExcept Kathmandu, Bhaktapur, and Lalitpur districts\nAll castes eligible\nAge and height as per BGA requirements\nMinimum Height: 158cm\nBMI: 17.0 - 24.0\nEducation: Minimum SEE with C grade in English & Math' },
  { key_name: 'class_1_selection', value: 'Phase 1: Registration | Initial documentation check and basic physical screening at regional centers.\nPhase 2: Regional Selection | Held in Pokhara and Dharan. Includes English tests, math tests, and initial physicals (Heaving, Sit-ups, 800m run).\nPhase 3: Central Selection | The ultimate test in Pokhara camp. Includes the infamous Doko Race (5.8km carrying 25kg uphill), medicals, and interviews.' },
  { key_name: 'class_1_img', value: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'class_2_title', value: 'Singapore Police Force' },
  { key_name: 'class_2_subtitle', value: 'Gurkha Contingent' },
  { key_name: 'class_2_desc', value: 'Serve as part of the elite Gurkha Contingent of Singapore Police Force — a specialized counter-terrorist and guard force.' },
  { key_name: 'class_2_badge', value: 'Once a Year' },
  { key_name: 'class_2_frequency', value: 'Open once a year at BGT Camp Pokhara and Dharan.' },
  { key_name: 'class_2_eligibility', value: 'Nepalese youth from all parts of Nepal\nExcept Kathmandu Valley districts\nAll castes eligible\nAge and height as per SPF requirements\nMinimum Height: 160cm\nBMI: 18.0 - 25.0\nEducation: Minimum SEE with C grade in English & Math' },
  { key_name: 'class_2_selection', value: 'Phase 1: Registration | Initial documentation check at regional centers.\nPhase 2: Regional Selection | Held in Pokhara and Dharan. Includes physical fitness tests, written tests.\nPhase 3: Central Selection | Final grueling physicals, comprehensive medical examination, and final interview in Pokhara.' },
  { key_name: 'class_2_img', value: 'https://images.unsplash.com/photo-1547036967-23d11aacaee0?auto=format&fit=crop&q=80&w=800' },
  { key_name: 'class_3_title', value: 'Indian Gorkha Army' },
  { key_name: 'class_3_subtitle', value: 'Six Gorkha Regiments' },
  { key_name: 'class_3_desc', value: 'Join one of the six prestigious Gorkha regiments of the Indian Army, established under the 1947 Tripartite Agreement.' },
  { key_name: 'class_3_badge', value: '1–2 Times/Year' },
  { key_name: 'class_3_frequency', value: 'Open 1–2 times per year at regional selection camps.' },
  { key_name: 'class_3_eligibility', value: 'Nepalese youth from all parts of Nepal\nAll castes eligible EXCEPT Chaudhary caste\nAge and height as per IA requirements\nMinimum Height: 157cm\nBMI: Proportionate to height and age\nEducation: Minimum 8th/10th pass depending on the trade applied for' },
  { key_name: 'class_3_selection', value: 'Phase 1: Rally/Registration | Open recruitment rallies held at various regional camps.\nPhase 2: Physical Test | 1.6km run, pull-ups, 9 feet ditch jump, zig-zag balance.\nPhase 3: Medical & Written | Detailed medical examination followed by a Common Entrance Examination (CEE).' },
  { key_name: 'class_3_img', value: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800' },

  // Team
  { key_name: 'team_1_name', value: 'Prakash Gurung' },
  { key_name: 'team_1_role', value: 'Managing Director' },
  { key_name: 'team_1_img', value: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400' },
  { key_name: 'team_2_name', value: 'Kum Prasad Tamang' },
  { key_name: 'team_2_role', value: 'Physical Training Instructor' },
  { key_name: 'team_2_img', value: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400' },
  { key_name: 'team_3_name', value: 'Sajan Pata Magar' },
  { key_name: 'team_3_role', value: 'Physical Training Instructor' },
  { key_name: 'team_3_img', value: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' },

  // Values
  { key_name: 'value_1_title', value: 'Discipline' },
  { key_name: 'value_1_desc', value: 'We instil military-grade discipline from day one. Punctuality, commitment, and respect are non-negotiable.' },
  { key_name: 'value_2_title', value: 'Excellence' },
  { key_name: 'value_2_desc', value: 'Every drill, every session is designed to push you beyond your limits and towards peak performance.' },
  { key_name: 'value_3_title', value: 'Brotherhood' },
  { key_name: 'value_3_desc', value: 'Training together builds bonds stronger than steel. Our graduates carry the BGTC spirit throughout their careers.' },
  { key_name: 'value_4_title', value: 'Proven Track Record' },
  { key_name: 'value_4_desc', value: 'Ranked 2nd best pre-army training centre in Nepal with thousands of successfully placed graduates.' },

  // Trust Indicators
  { key_name: 'trust_1_title', value: 'Ranked 2nd Best in Nepal' },
  { key_name: 'trust_2_title', value: 'Ex-British Army Trainers' },
  { key_name: 'trust_3_title', value: '1000+ Successful Students' },

  // About Bullets
  { key_name: 'about_bullet_1_label', value: 'Physical Training' },
  { key_name: 'about_bullet_1_value', value: 'Daily Drills' },
  { key_name: 'about_bullet_2_label', value: 'Selection Rate' },
  { key_name: 'about_bullet_2_value', value: '80% BGA' },
  { key_name: 'about_bullet_3_label', value: 'Experience' },
  { key_name: 'about_bullet_3_value', value: '20+ Years' },
  { key_name: 'about_bullet_4_label', value: 'Location' },
  { key_name: 'about_bullet_4_value', value: 'Pokhara' },

  // Success Stats
  { key_name: 'success_rate_bga', value: '80%' },
  { key_name: 'success_rate_spf', value: '64%' },
  { key_name: 'success_rate_ia', value: '55%' },
  { key_name: 'students_trained', value: '1000+' },
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
