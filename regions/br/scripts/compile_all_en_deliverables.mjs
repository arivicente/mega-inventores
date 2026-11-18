import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const outDirs = [
  path.resolve('mega-inventors-us', 'public', 'downloads'),
  path.resolve('mega-inventors', 'regions', 'en', 'public', 'downloads'),
  path.resolve('mega-inventores', 'public', 'downloads_en')
];

for (const d of outDirs) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function getBaseHtml(title, subtitle, badge, color, contentHtml) {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} | Young Inventor's Official Guide</title>
  <style>
    @page { size: A4; margin: 1.2cm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.5; font-size: 12px; }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 85vh;
      border: 8px solid ${color};
      border-radius: 28px;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      box-sizing: border-box;
    }
    .badge {
      display: inline-block;
      background-color: ${color};
      color: white;
      font-weight: 800;
      font-size: 12px;
      padding: 8px 20px;
      border-radius: 50px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      margin-bottom: 25px;
    }
    .cover-title {
      font-size: 34px;
      font-weight: 900;
      line-height: 1.15;
      margin-bottom: 15px;
      color: #0f172a;
    }
    .cover-sub {
      font-size: 15px;
      color: #475569;
      max-width: 500px;
      line-height: 1.6;
      margin-bottom: 30px;
    }
    .card {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #cbd5e1;
      border-radius: 14px;
      padding: 16px 20px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.02);
    }
    .card-title {
      font-size: 16px;
      font-weight: 800;
      color: ${color};
      margin-bottom: 8px;
    }
    .highlight-box {
      background: #f8fafc;
      border-left: 4px solid ${color};
      padding: 10px 14px;
      margin: 8px 0;
      border-radius: 4px;
      font-size: 11.5px;
      line-height: 1.5;
    }
    .card-project {
      page-break-inside: avoid;
      background: white;
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 14px 18px;
      margin-bottom: 14px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.02);
    }
    .proj-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 6px;
    }
    .proj-num {
      background: #0f172a;
      color: white;
      font-size: 11px;
      font-weight: 800;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .proj-title {
      font-size: 15px;
      font-weight: 800;
      color: #0f172a;
    }
    .proj-meta {
      display: flex;
      gap: 10px;
      margin-bottom: 8px;
    }
    .meta-tag {
      background: #f1f5f9;
      color: #475569;
      font-size: 10.5px;
      padding: 2px 8px;
      border-radius: 4px;
      font-weight: 600;
    }
    .step-box {
      background: #f8fafc;
      border-left: 3px solid #3b82f6;
      padding: 8px 12px;
      margin-bottom: 6px;
      font-size: 11.5px;
    }
    .science-explain {
      background: #f0fdf4;
      border-left: 3px solid #10b981;
      padding: 8px 12px;
      font-size: 11.5px;
      color: #065f46;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="badge">${badge}</div>
    <div class="cover-title">${title}</div>
    <div class="cover-sub">${subtitle}</div>
    <p style="margin-top: 35px; font-size: 11px; color: #64748b; font-weight: 600;">
      Young Inventor's Workshop™ · Official 2026 Edition · Verified Hands-On STEM
    </p>
  </div>
  <div class="content" style="padding-top: 10px;">
    ${contentHtml}
  </div>
</body>
</html>
  `;
}

async function savePdfToAll(page, filename) {
  for (const d of outDirs) {
    const p = path.join(d, filename);
    await page.pdf({ path: p, format: 'A4', printBackground: true });
  }
  console.log(`✓ PDF Generated and saved: ${filename}`);
}

async function run() {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  // 1. PACk OF 5 SUPER BONUSES
  console.log("Compiling: 5 Super Bonuses...");
  const bonusesHtml = `
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bonus 1: The 7-Day Young Inventor Challenge</h2>
    <div class="card">
      <div class="card-title">📅 Daily Screen-Free Missions Routine</div>
      <p>A step-by-step daily 25-minute mission plan to transition your child away from screens without resistance or tantrums.</p>
      <div class="highlight-box"><strong>Day 1 - The Magic Chest:</strong> Assemble your recycled maker supply box (sort cardboard, bottle caps, straws, rubber bands).</div>
      <div class="highlight-box"><strong>Day 2 - Clothespin Launcher:</strong> Build a high-precision catapult with target cup accuracy scoring.</div>
      <div class="highlight-box"><strong>Day 3 - Cartesian Diver:</strong> The classic submarine physics puzzle inside a clear water bottle.</div>
      <div class="highlight-box"><strong>Day 4 - Spy Periscope:</strong> Dual-mirror cardboard optical tube to see around corners.</div>
      <div class="highlight-box"><strong>Day 5 - Rescue Claw:</strong> Extendable scissor-arm grabber to pick up toys from across the room.</div>
      <div class="highlight-box"><strong>Day 6 - Hallway Grand Prix:</strong> Turbo balloon-powered dragster racer on a measured floor track.</div>
      <div class="highlight-box"><strong>Day 7 - Family Invention Fair:</strong> Live demonstration showcase and presentation of the Official Inventor Diploma!</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bonus 2: 14-Day Home Robotics Blueprint</h2>
    <div class="card">
      <div class="card-title">🧭 Busy Parents' Curriculum: 20 Minutes Per Afternoon</div>
      <p>Designed for working families: straightforward STEM activities that require zero expensive purchases and use household recyclables.</p>
      <div class="highlight-box"><strong>Week 1 (Mechanical Foundations):</strong> First-class levers, low-friction axles, static vs kinetic friction, and gravity walkers.</div>
      <div class="highlight-box"><strong>Week 2 (Automata & Motion Transfer):</strong> Pulleys, connecting rods, eccentric cams, and pressurized air thrust.</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bonus 3: Engineer's Troubleshooting & Quick Fix Guide</h2>
    <div class="card">
      <div class="card-title">🔧 "Why Won't My Robot Move?" (Practical Debugging Manual)</div>
      <div class="highlight-box"><strong>Symptom: The balloon car spins its wheels in place.</strong><br><em>Cause:</em> Plastic bottle caps slipping on polished floors.<br><em>Fix:</em> Stretch a small rubber band around each wheel rim to create instant rubber-tire traction.</div>
      <div class="highlight-box"><strong>Symptom: The crane boom bends when lifting weight.</strong><br><em>Cause:</em> Cardboard flutes aligned parallel with the bend line.<br><em>Fix:</em> Glue two cardboard layers with flutes crossed at 90 degrees (increases load capacity 4x).</div>
      <div class="highlight-box"><strong>Symptom: Hot glue peels off smooth bottle caps.</strong><br><em>Cause:</em> Smooth polyethylene plastics naturally repel hot adhesives.<br><em>Fix:</em> Lightly scuff the contact point with sandpaper or an emery board to create micro-grooves for grip.</div>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bonus 4: Young Inventor's Zero-Cost Materials Checklist</h2>
    <div class="card">
      <div class="card-title">📦 10 Everyday Household Items to Save (Cost Zero)</div>
      <p>1. Clean corrugated shipping and cereal boxes.<br>
         2. Assorted plastic bottle caps (milk, water, juice).<br>
         3. Paper towel and toilet paper cardboard tubes.<br>
         4. Wooden toothpicks and bamboo skewers (blunted).<br>
         5. Standard paper and plastic drinking straws.<br>
         6. Rubber bands of assorted widths and tensions.<br>
         7. Wooden spring clothespins and paper clips.<br>
         8. Cotton string, yarn, and masking tape.<br>
         9. Small plastic bottles and empty yogurt cups.<br>
         10. Standard latex birthday balloons.</p>
    </div>

    <div style="page-break-before: always;"></div>
    <h2 style="font-size: 20px; color: #F59E0B; border-bottom: 2px solid #F59E0B; padding-bottom: 8px;">Bonus 5: 40 High-Energy Outdoor & Backyard Inventions</h2>
    <div class="card">
      <div class="card-title">🌳 Hands-On Outdoor Science & Kinetic Action</div>
      <div class="highlight-box"><strong>Baking Soda & Vinegar Rocket:</strong> Vertical propellant launch reaching up to 25 feet into the air.</div>
      <div class="highlight-box"><strong>Spinning Cup Anemometer:</strong> Real DIY weather station to measure wind gust speed.</div>
      <div class="highlight-box"><strong>Precision Shadow Sundial:</strong> Telling exact local time via Earth's natural axial rotation.</div>
      <div class="highlight-box"><strong>Backyard Water Balloon Trebuchet:</strong> Counterweight lever targeting distant lawn targets.</div>
    </div>
  `;

  await page.setContent(getBaseHtml(
    "5 Super Bonuses Pack",
    "7-Day Challenge, 14-Day Robotics Blueprint, Troubleshooting Guide, Zero-Cost Checklist & 40 Backyard Projects",
    "EXCLUSIVE LAUNCH BONUSES",
    "#F59E0B",
    bonusesHtml
  ), { waitUntil: 'domcontentloaded' });
  await savePdfToAll(page, '5_super_bonuses_en.pdf');

  // 2. BUMP 1: LITTLE ENGINEERS
  console.log("Compiling: Bump 1 Little Engineers...");
  const b1 = `
    <h2>10 Gentle Starter Projects for Ages 5 to 7</h2>
    <div class="card">
      <div class="card-title">Safe Interlocking Joints · Zero Sharp Scissors Required</div>
      <p>Specially developed to build foundational fine motor skills, spatial reasoning, and mechanical logic through tactile, worry-free builds.</p>
      <div class="highlight-box"><strong>1. The Ear-Wiggling Monster:</strong> Simple dual-strip lever with friendly animated ears.</div>
      <div class="highlight-box"><strong>2. Tube Rolling Racer:</strong> Glueless straw-and-skewer axle assembly.</div>
      <div class="highlight-box"><strong>3. Seesaw Balance Scale:</strong> Hands-on mass comparison with building blocks.</div>
      <div class="highlight-box"><strong>4. Thunder Acoustic Tube:</strong> Spring vibration sound simulator.</div>
      <div class="highlight-box"><strong>5. Palm Rotor Helicopter:</strong> Friction twirl lift-off using bare hands.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Little Engineers", "10 Foundational STEM Starter Projects for Ages 5 to 7", "ADD-ON PACK #1", "#3B82F6", b1));
  await savePdfToAll(page, 'bump_01_little_engineers.pdf');

  // 3. BUMP 2: MOVING ROBOTICS
  console.log("Compiling: Bump 2 Moving Robotics...");
  const b2 = `
    <h2>24 Motorized Cardboard Mechanisms with DC Motors & Batteries</h2>
    <div class="card">
      <div class="card-title">Level Up: Autonomous Electrical Motion</div>
      <p>Learn how to connect inexpensive 3V hobby motors or recycled toy motors to cardboard chassis to build motorized robots that roam the room.</p>
      <div class="highlight-box"><strong>1. Articulated Scribble-Bot:</strong> Vibration-driven autonomous drawing machine.</div>
      <div class="highlight-box"><strong>2. Pulley-Drive Dragster:</strong> Belt-driven high-speed torque transfer.</div>
      <div class="highlight-box"><strong>3. Dual-Propeller Airboat:</strong> High-speed surface skimmer for puddles and pools.</div>
      <div class="highlight-box"><strong>4. Wind Generator Dynamo:</strong> Reverse motor current powering a bright LED.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Moving Robotics", "24 Motorized Cardboard Mechanisms with Blueprints & Wiring Diagrams", "ADD-ON PACK #2", "#10B981", b2));
  await savePdfToAll(page, 'bump_02_moving_robotics.pdf');

  // 4. BUMP 3: SCIENTISTS AT HOME
  console.log("Compiling: Bump 3 Scientists at Home...");
  const b3 = `
    <h2>60 100% Safe Illustrated Experiments Using Kitchen Ingredients</h2>
    <div class="card">
      <div class="card-title">The Secret Home Chemistry & Physics Lab</div>
      <p>Transform your kitchen table into a mesmerizing science fair using vinegar, baking soda, cooking oil, salt, milk, and food dye.</p>
      <div class="highlight-box"><strong>1. Non-Newtonian Oobleck:</strong> Liquid when touched gently, solid under high impact.</div>
      <div class="highlight-box"><strong>2. Slow-Motion Density Rain:</strong> Color droplets drifting through vegetable oil layers.</div>
      <div class="highlight-box"><strong>3. Self-Inflating Balloon Bottle:</strong> Endothermic gas production reaction.</div>
      <div class="highlight-box"><strong>4. 48-Hour Crystal Growth:</strong> Salt crystal crystallization on strings.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Scientists at Home", "60 Illustrated Kitchen Chemistry & Physics Experiments", "ADD-ON PACK #3", "#EC4899", b3));
  await savePdfToAll(page, 'bump_03_scientists_at_home.pdf');

  // 5. BUMP 4: SCREEN-FREE TECH
  console.log("Compiling: Bump 4 Screen-Free Tech...");
  const b4 = `
    <h2>40 Level-Based Gamified RPG Challenges with Progress Boards & Badges</h2>
    <div class="card">
      <div class="card-title">Young Inventor's Achievement & Quest System</div>
      <p>Turn project construction into an addictive real-life RPG game: each project earns XP, badges, and levels up rank.</p>
      <div class="highlight-box"><strong>Rank 1 - Workshop Apprentice (0 - 100 XP):</strong> 10 Basic linkage challenges.</div>
      <div class="highlight-box"><strong>Rank 2 - Master Builder (100 - 300 XP):</strong> Gear trains, pulleys, and friction cars.</div>
      <div class="highlight-box"><strong>Rank 3 - Chief Inventor (300 - 600 XP):</strong> Complex automata, hydraulics, and electric circuits.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Screen-Free Tech", "40 Gamified Offline Challenges with Badges & Diplomas", "ADD-ON PACK #4", "#8B5CF6", b4));
  await savePdfToAll(page, 'bump_04_screen_free_tech.pdf');

  // 6. BUMP 5: HYDRAULIC MACHINES
  console.log("Compiling: Bump 5 Hydraulic Machines...");
  const b5 = `
    <h2>10 High-Power Syringe & Water Piston Engineering Challenges</h2>
    <div class="card">
      <div class="card-title">The Invisible Power of Confined Fluids</div>
      <p>Step-by-step blueprints to construct drawbridges, scissor lifts, and backhoes powered entirely by water pressure through plastic syringes.</p>
      <div class="highlight-box"><strong>1. 2-Axis Hydraulic Arm:</strong> Joystick-controlled mechanical excavator.</div>
      <div class="highlight-box"><strong>2. Dual Bascule Drawbridge:</strong> Single-syringe synchronized deck lifting.</div>
      <div class="highlight-box"><strong>3. Heavy-Duty Scissor Lift:</strong> 3x height multiplier using fluid pressure.</div>
      <div class="highlight-box"><strong>4. High-Force Can Crusher:</strong> Area-ratio mechanical advantage multiplier.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Hydraulic Machines", "10 High-Power Syringe & Water Piston Engineering Projects", "ADD-ON PACK #5", "#06B6D4", b5));
  await savePdfToAll(page, 'bump_05_hydraulic_machines.pdf');

  // 7. BUMP 6: INVENTOR'S BIRTHDAY PARTY
  console.log("Compiling: Bump 6 Inventor's Birthday Party...");
  const b6 = `
    <h2>Complete Printable Science Party Theme & Activity Guide</h2>
    <div class="card">
      <div class="card-title">Host an Unforgettable Hands-On STEM Celebration</div>
      <p>Editable invitation templates, printable workbench signs, mad scientist badges, and 5 team-based collaborative challenges.</p>
      <div class="highlight-box"><strong>Station 1: Dragster Speed Trials:</strong> Balloon car distance competition.</div>
      <div class="highlight-box"><strong>Station 2: Tallest Paper Tower Earthquake Test:</strong> Structural engineering challenge.</div>
      <div class="highlight-box"><strong>Station 3: Mad Science Slime Lab:</strong> Custom polymer mixing station.</div>
    </div>
  `;
  await page.setContent(getBaseHtml("Inventor's Birthday Party", "Complete Printable Party Kit: Editable Invitations, Badges & Team Games", "ADD-ON PACK #6", "#F97316", b6));
  await savePdfToAll(page, 'bump_06_inventors_party_kit.pdf');

  // 8. BUMP 7: MY INVENTOR'S JOURNAL
  console.log("Compiling: Bump 7 Inventor's Journal...");
  const b7 = `
    <h2>30 Days of Creation: Secret Lab Notebook for Ideas & Blueprints</h2>
    <div class="card">
      <div class="card-title">Daily Guided Blueprinting Journal</div>
      <p>Illustrated prompt pages for young inventors to brainstorm ideas, sketch prototypes, test hypotheses, and record results like true innovators.</p>
      <div class="highlight-box"><strong>Section 1: The Idea Vault:</strong> What problem in your house needs a mechanical fix?</div>
      <div class="highlight-box"><strong>Section 2: Schematic Blueprints:</strong> Top, front, and side angle sketches with dimension callouts.</div>
      <div class="highlight-box"><strong>Section 3: Testing & Debugging Log:</strong> What broke? What worked? What's version 2.0?</div>
    </div>
  `;
  await page.setContent(getBaseHtml("My Inventor's Journal", "30 Days of Creation: Illustrated Secret Lab Notebook for Hypotheses & Sketches", "ADD-ON PACK #7", "#475569", b7));
  await savePdfToAll(page, 'bump_07_inventors_journal.pdf');

  await browser.close();
  console.log("\n🎉 ALL 8 BONUSES & BUMPS COMPILED SUCCESSFULLY IN ENGLISH!");
}

run().catch(console.error);
