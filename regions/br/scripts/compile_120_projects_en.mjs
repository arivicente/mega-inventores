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

// 6 Modules of 20 projects each translated into English
const modulesEn = [
  {
    name: "Module 1: Cardboard Robots, Walkers & Mechanical Automata",
    desc: "Projects focused on bringing cardboard, straws, and recyclable packaging to life with realistic movement.",
    color: "#2563EB",
    projects: [
      { id: 1, title: "Bionic Articulated Cardboard Claw", time: "30 min", age: "5-9 yrs", mats: "Cardboard, string, drinking straws, tape", how: "Pulling string rings attached to your fingers curls the mechanical joints in unison.", sci: "Class 3 mechanical levers converting linear pull into angular flexion." },
      { id: 2, title: "Gravity-Powered Walking Robot", time: "40 min", age: "6-10 yrs", mats: "Cardboard, toothpicks, metal washer counterweight", how: "Place on a gentle ramp and watch the weighted legs swing in an alternating stride.", sci: "Gravitational potential energy converted into oscillatory kinetic motion." },
      { id: 3, title: "Flapping Wing Bird Automaton", time: "45 min", age: "7-11 yrs", mats: "Cardboard, craft wire, bottle caps", how: "Turn the hand crank to drive an eccentric cam that smoothly elevates both wings.", sci: "Continuous rotary motion converted into vertical reciprocal oscillation." },
      { id: 4, title: "Articulated T-Rex Snapping Jaw", time: "25 min", age: "5-8 yrs", mats: "Cardboard, rubber band, wooden clothespin", how: "Squeeze the trigger to snap the ferocious dinosaur jaws shut with elastic snap.", sci: "Scissor linkage mechanism with spring-loaded elastic return." },
      { id: 5, title: "Telescoping Robotic Extension Arm", time: "35 min", age: "7-12 yrs", mats: "Popsicle sticks, brass paper fasteners", how: "Push the scissor handles to instantly extend the arm 3x its closed length.", sci: "Pantograph linkage mechanism using deformable rhomboid geometry." },
      { id: 6, title: "Desk-Bouncing Bobblehead Bot", time: "20 min", age: "5-8 yrs", mats: "Paper cup, wire spring, cardboard features", how: "Tap the tabletop to send the robot's head into a hilarious rhythmic wobble.", sci: "Natural resonant frequency and simple harmonic motion damping." },
      { id: 7, title: "Peristaltic Cardboard Caterpillar", time: "30 min", age: "6-10 yrs", mats: "Accordioned corrugated cardboard, skewers, paper clips", how: "Push and pull the central control rod to inch the caterpillar across the floor.", sci: "Directional friction treads and bio-inspired peristaltic crawling." },
      { id: 8, title: "360° High Bar Acrobat Gymnast", time: "30 min", age: "6-10 yrs", mats: "Cardboard figure, thick twine, twin support sticks", how: "Squeeze the bottom sticks to twist the strings and send the gymnast spinning over the bar.", sci: "Torsional elastic energy and rotational angular momentum." },
      { id: 9, title: "Precision Cross-Pin Pincer Claw", time: "25 min", age: "5-9 yrs", mats: "Corrugated cardboard, brads, rubber band", how: "Fine-tipped tweezer jaws designed to pick up marbles and small Lego blocks.", sci: "Mechanical advantage multiplier in precision forceps." },
      { id: 10, title: "Steerable Steamroller Bot", time: "40 min", age: "7-11 yrs", mats: "Cardboard tube, twin tin lids, skewer axle", how: "Features an oversized front rolling drum with smooth steering lever.", sci: "Ackermann steering geometry and weight distribution across rolling axles." },
      { id: 11, title: "Mini Cardboard Backhoe with Bucket", time: "50 min", age: "8-12 yrs", mats: "Shoebox chassis, twin cardboard linkages, string", how: "Two separate string levers control boom elevation and bucket dumping.", sci: "Coordinated multi-degree-of-freedom (DOF) mechanical linkages." },
      { id: 12, title: "Cam-Driven Butterfly Flutterer", time: "35 min", age: "6-10 yrs", mats: "Matchbox base, oval cam disc, wire pushrod", how: "Turning the axle lifts and lowers the wings in a lifelike flutter.", sci: "Camshaft profile timing commonly found in automotive engines." },
      { id: 13, title: "Synchronized Jumping Jack Sentinel", time: "40 min", age: "7-11 yrs", mats: "Cardboard limbs, split pins, pull cord", how: "Pulling the central cord flings arms and legs upward simultaneously.", sci: "Classical pantograph bell-crank linkage with synchronized levers." },
      { id: 14, title: "Snap-Trap Monster Coin Gobbler", time: "25 min", age: "5-8 yrs", mats: "Tissue box, cardboard teeth, rubber band latch", how: "Drop a coin down the chute and the weighted trapdoor snaps shut with a click.", sci: "Impact-triggered kinetic tripwire with elastic reset." },
      { id: 15, title: "Mini Spool Forklift with Mast Guides", time: "45 min", age: "8-12 yrs", mats: "Tall box, wooden rails, thread spool winch", how: "Crank the side winch to slide the pallet forks up and down the vertical mast.", sci: "Linear sliding guides and mechanical effort reduction via winches." },
      { id: 16, title: "Puppy Automaton with Wagging Tail", time: "30 min", age: "5-9 yrs", mats: "Cardboard body, pivot pins, flexible bamboo stick", how: "Nudge the collar to wag the head and tail in opposite synchronized motions.", sci: "First-class fulcrum rocking lever with central pivot." },
      { id: 17, title: "Punching Boxer with Retractable Fist", time: "35 min", age: "6-10 yrs", mats: "Cardboard arm, heavy rubber bands, guide slot", how: "Pull back the finger trigger to release a rapid cushioned punch that retracts instantly.", sci: "Elastic potential energy storage and instantaneous ballistic release." },
      { id: 18, title: "Ocean Wave Surfer Automaton", time: "45 min", age: "7-12 yrs", mats: "Shoebox sea, 3 offset crank shafts, cardboard waves", how: "Spin the master handle to make cardboard waves roll realistically beneath the surfboard.", sci: "Crankshaft mechanical timing with 120-degree phase shifts." },
      { id: 19, title: "Glowing Skeleton Hand Linkage", time: "35 min", age: "7-11 yrs", mats: "White straws, black thread, matte cardboard base", how: "Pulling five individual rings mimics the real human tendon structure.", sci: "Comparative biomechanical anatomy of mammalian hands." },
      { id: 20, title: "Secret Agent Dual-Mirror Periscope", time: "40 min", age: "7-12 yrs", mats: "Milk carton, two pocket mirrors set at 45°", how: "Peer over couches, walls, and around doorways completely undetected.", sci: "Geometric optics: Law of Reflection across parallel 45-degree mirrors." }
    ]
  },
  {
    name: "Module 2: Simple Machines & Mechanical Levers",
    desc: "Understanding the physics of real cranes, pulleys, and torque multipliers through hands-on builds.",
    color: "#F59E0B",
    projects: [
      { id: 21, title: "Ratchet-Lock Cable Crane", time: "45 min", age: "7-12 yrs", mats: "Shoebox tower, spool, paperclip ratchet pawl", how: "Lifts over a pound of toys and locks firmly in midair without slipping backward.", sci: "Mechanical advantage of block-and-tackle plus directional ratchet braking." },
      { id: 22, title: "Siege Tabletop Catapult", time: "25 min", age: "5-9 yrs", mats: "Wooden clothespins, plastic spoon, rubber bands", how: "Launches soft paper balls across the living room into numbered scoring cups.", sci: "Parabolic trajectory and angular projectile ballistic kinematics." },
      { id: 23, title: "Dual Bascule Drawbridge with Winch", time: "40 min", age: "6-10 yrs", mats: "Double-wall cardboard, cotton string, skewer shafts", how: "Winding the twin winch towers smoothly hoists both bridge halves for toy ships.", sci: "Counterbalanced bascule bridge mechanics and cable tension distribution." },
      { id: 24, title: "Precision Roman Steelyard Balance", time: "30 min", age: "6-11 yrs", mats: "Plastic hanger, twin paper cups, calibrated coins", how: "Measures small toys by sliding a calibrated counterweight along the graduated arm.", sci: "Static torque equilibrium: Force × Distance = Equilibrium (Torque)." },
      { id: 25, title: "Manual Paper-Strip Lathe & Spooler", time: "35 min", age: "7-12 yrs", mats: "Cardboard V-blocks, bent wire hand crank", how: "Enables fast, even rolling of decorative paper ribbons and tight coils.", sci: "Wheel and axle mechanical advantage creating continuous rotational torque." },
      { id: 26, title: "Twin Toothed-Drum Paper Shredder", time: "45 min", age: "8-12 yrs", mats: "Two toilet paper tubes with glued teeth, crank", how: "Feeding scrap paper between counter-rotating rollers grips and crushes sheets.", sci: "Frictional counter-rotating gear teeth and continuous material intake." },
      { id: 27, title: "Guided Tower Elevator with Cage", time: "50 min", age: "7-12 yrs", mats: "Tall shipping box, inner box cage, spool winch", how: "The elevator car glides along vertical skewer rails with zero wobble.", sci: "Linear guided motion with calibrated tolerance and reduced sliding friction." },
      { id: 28, title: "Counterweight Medieval Trebuchet", time: "45 min", age: "8-12 yrs", mats: "Sturdy cardboard A-frame, coin counterweight basket, fabric sling", how: "Dropping the heavy short arm whips the long arm over at supersonic tip speed.", sci: "Asymmetrical class 1 lever and sling release angular velocity acceleration." },
      { id: 29, title: "Screw-Drive Playdough Press", time: "35 min", age: "7-11 yrs", mats: "Long bolt with wingnut, cardboard pressing plate", how: "Twisting the wingnut crushes clay and damp paper with effortless power.", sci: "Helical inclined plane: the screw as a colossal mechanical force multiplier." },
      { id: 30, title: "Manual Planetary Hand Whisk", time: "30 min", age: "6-10 yrs", mats: "Cardboard gear template with triangular teeth", how: "One slow turn of the master handle produces 4 rapid rotations of the central whisk.", sci: "Gear ratio speed multiplication and torque-to-RPM exchange." },
      { id: 31, title: "Centrifugal Marble Spinner Arena", time: "25 min", age: "5-9 yrs", mats: "Cardboard plate, curved straw tracks, glass marbles", how: "Spinning the platter flings marbles outward against the raised banked rim.", sci: "Apparent centrifugal force and rotational inertia in circular reference frames." },
      { id: 32, title: "Heavy Book Single-Finger Lever Lift", time: "20 min", age: "5-8 yrs", mats: "Rigid wooden ruler, eraser fulcrum, 5 heavy hardcovers", how: "With just one pinky finger on the long end, lift a heavy stack of encyclopedia books.", sci: "Archimedes' law of the lever: give me a lever long enough and I will move the Earth." },
      { id: 33, title: "Steam Locomotive Slider-Crank Mechanism", time: "40 min", age: "7-12 yrs", mats: "Eccentric pin wheel, connecting rod, sliding cardboard piston", how: "Sliding the piston back and forth in a straight line drives the big drive wheel in a continuous circle.", sci: "Kinematic conversion of reciprocating linear motion into rotary motion." },
      { id: 34, title: "Spiral Spring Bottle-Cap Launcher", time: "30 min", age: "6-10 yrs", mats: "Plastic bottle base, coiled craft wire spring", how: "Compress the spring and release to fling lightweight foam balls across the room.", sci: "Hooke's Law: elastic spring displacement and instantaneous force restoration." },
      { id: 35, title: "Loop-the-Loop Gravitational Coaster Track", time: "40 min", age: "6-11 yrs", mats: "Split foam pipe or curved cardboard strips, glass marble", how: "Release the marble from the starting drop to watch it loop upside down without falling.", sci: "Conservation of mechanical energy and minimum critical centripetal velocity." },
      { id: 36, title: "Right-Angle Bevel Gear Windmill", time: "35 min", age: "6-10 yrs", mats: "Paper pinwheel, central axle, bottle-cap crown gear", how: "Front wind turns the propeller, which turns an upward-facing vertical spindle at 90°.", sci: "90-degree rotational plane transfer via intersecting bevel gears." },
      { id: 37, title: "2-Speed Cardboard Manual Gearbox", time: "50 min", age: "8-12 yrs", mats: "Sliding shaft, 4 interlocking gears of different diameters", how: "Slide the gear selector lever between high-speed cruising and high-torque pulling.", sci: "Torque vs RPM trade-offs in modern automotive transmissions." },
      { id: 38, title: "Ballistic Impact Pendulum Scale", time: "30 min", age: "7-11 yrs", mats: "Hanging box target on 4 threads, millimeter index card", how: "Shooting a foam dart into the catcher box swings the pendulum up a measured scale.", sci: "Conservation of linear momentum in inelastic impact collisions." },
      { id: 39, title: "Kumihimo 3-Spool Cord Braiding Loom", time: "35 min", age: "6-10 yrs", mats: "Notched cardboard disc, 3 yarn strands", how: "Sequentially moving yarn strands through slots weaves dense, unbreakable friendship ropes.", sci: "Mechanical topology and ancient automated textile manufacturing." },
      { id: 40, title: "Double-Pincer Pantograph Extension Grabber", time: "35 min", age: "7-11 yrs", mats: "6 wooden craft sticks with pivot brads, rubber-tipped jaws", how: "Opens and closes with a 16-inch reach to snatch objects from high shelves.", sci: "Proportional stroke transmission through articulated diamond lattices." }
    ]
  },
  {
    name: "Module 3: Propelled Vehicles & High-Speed Racers",
    desc: "Cars, boats, rockets, and hovercrafts powered by air, water, and elastic energy.",
    color: "#10B981",
    projects: [
      { id: 41, title: "Pneumatic Turbo Balloon Dragster", time: "20 min", age: "5-10 yrs", mats: "4 drilled bottle caps, balloon, straw, milk carton chassis", how: "Inflate balloon via the straw and release on tile to zoom 20+ feet across the room.", sci: "Newton's 3rd Law: Air expelled backward exerts an equal forward reaction thrust." },
      { id: 42, title: "Frictionless CD Air-Cushion Hovercraft", time: "15 min", age: "5-9 yrs", mats: "Scrap CD, push-pull bottle cap valve, balloon", how: "Escaping air forms a micro-cushion underneath the disc, letting it glide effortlessly.", sci: "Ground effect aerodynamics and boundary layer friction elimination." },
      { id: 43, title: "Rubber-Band Driven Land Dragster", time: "30 min", age: "6-10 yrs", mats: "Long cardboard rails, rubber band hooked to rear axle", how: "Roll wheels backward to wind up tension; release for an explosive burnout takeoff.", sci: "Elastic potential energy storage and direct rear-wheel drive traction." },
      { id: 44, title: "Safe Thermodynamic Pop-Pop Steam Boat", time: "35 min", age: "8-12 yrs", mats: "Foam tray hull, sealed aluminum mini-boiler tube", how: "A small warm heat pack causes water to expand and pulse noisily out the twin exhaust pipes.", sci: "Cyclic thermodynamic phase change expansion and condensation." },
      { id: 45, title: "Rubber-Band Propeller Airplane Car", time: "25 min", age: "6-10 yrs", mats: "Plastic bottle, hand-cut plastic propeller blade, rubber motor", how: "Wind propeller 50 turns; release to let the spinning wind-blade drive the car forward.", sci: "Aerodynamic forward thrust created by propeller blade attack angles." },
      { id: 46, title: "Paddle-Wheel River Catamaran", time: "30 min", age: "5-9 yrs", mats: "Twin plastic bottles, wooden paddle blade, rubber band", how: "In the bathtub or pool, the wound paddle blades chop through the water with steady speed.", sci: "Hydrodynamic paddle propulsion modeled after historic Mississippi steamboats." },
      { id: 47, title: "High-Velocity Straw Rocket Launcher", time: "15 min", age: "5-8 yrs", mats: "Two straws (one sealed cap over the other), paper fins", how: "Blow sharply into the base straw to launch the rocket 25 feet into the air.", sci: "Concentrated pneumatic pressure and aerodynamic fin flight stabilization." },
      { id: 48, title: "Monster-Truck Cardboard Obstacle Crawler", time: "35 min", age: "6-10 yrs", mats: "Oversized cocoa-can lid wheels, articulated high chassis", how: "Climbs easily over textbooks, pencils, and floor pillows without stalling.", sci: "Wheel radius to obstacle height ratio and high ground clearance geometry." },
      { id: 49, title: "Adjustable Center-of-Gravity Glider", time: "30 min", age: "7-11 yrs", mats: "Foam grocery tray, paperclip nose ballast", how: "Sliding the paperclip forward or back switches between straight glides and loop acrobatics.", sci: "Aerodynamic Center of Pressure vs Center of Gravity relationship." },
      { id: 50, title: "Overhead Zip-Line Sky Tram Monorail", time: "25 min", age: "5-9 yrs", mats: "Suspended cardboard gondola on 2 paperclips, taut nylon cord", how: "Tilt the line or pull a tow string to send the aerial tram racing across the room.", sci: "Aerial cableway transit mechanics with low rolling friction." },
      { id: 51, title: "Land Sailing Yacht with Adjustable Rigging", time: "25 min", age: "5-8 yrs", mats: "Cardboard tri-wheel cart, skewer mast, parchment paper sail", how: "Point a fan or hair dryer at the sail to cruise into crosswinds using tacking angles.", sci: "Aerodynamic airfoil lift and sailing against the wind on land." },
      { id: 52, title: "Continuous Tread Crawler Tank", time: "45 min", age: "8-12 yrs", mats: "Fabric belt with glued track cleats over 3 rollers per side", how: "Manual crank crawls smoothly over soft bedsheets and deep couch canyons.", sci: "Ground pressure distribution over wide surface area (Pressure = Force / Area)." },
      { id: 53, title: "Autorotating Maple-Seed Helicopter", time: "15 min", age: "5-8 yrs", mats: "Paper strip with two opposite slit folds, paperclip base", how: "Drop from 6 feet to watch it spin gracefully downward like a maple seed pod.", sci: "Aerodynamic autorotation and ascending airflow lift." },
      { id: 54, title: "Waterjet Balloon Speedboat", time: "20 min", age: "5-9 yrs", mats: "Cut plastic bottle hull, submersed nozzle tube attached to water balloon", how: "Pressurized water escaping out the stern propels the boat across the tub.", sci: "Hydraulic water-jet reaction thrust with high-density fluid discharge." },
      { id: 55, title: "Unstoppable Flip-Over Stunt Car", time: "35 min", age: "6-10 yrs", mats: "Symmetrical chassis with wheels taller than the body", how: "Hits a wall, flips completely upside down, and keeps driving forward seamlessly.", sci: "Double-sided symmetrical chassis design around the wheel axle plane." },
      { id: 56, title: "Self-Balancing 2-Wheel Gyro Cart", time: "40 min", age: "7-12 yrs", mats: "In-line tandem wheels, weighted high-speed spinning CD gyro", how: "As long as the flywheel spins at high RPM, the 2-wheeled cart stays upright.", sci: "Gyroscopic rigidity in space and conservation of angular momentum vector." },
      { id: 57, title: "Compressed-Air Water Rocket", time: "45 min", age: "8-12 yrs", mats: "2-liter soda bottle, rubber stopper with tire valve, bicycle pump", how: "Pumping air pressurizes water; releasing the latch blasts the rocket 50 feet high.", sci: "Gas thermodynamics and momentum conservation in reaction mass expulsion." },
      { id: 58, title: "Electric Desk Hovercraft with Cooler Fan", time: "40 min", age: "8-12 yrs", mats: "Foam board disc, 12V PC fan or USB fan, 9V battery", how: "Fan forces high-pressure air through perimeter holes in the plastic skirt.", sci: "Fluid dynamics: static plenum chamber pressure creating a frictionless cushion." },
      { id: 59, title: "Independent Double-Wishbone Suspension Racer", time: "45 min", age: "7-11 yrs", mats: "Articulated A-arms with pen springs on all four wheels", how: "Each wheel climbs obstacles independently while keeping the main frame level.", sci: "Scale automotive kinematics of independent double-wishbone suspension." },
      { id: 60, title: "Ballast-Controlled Soda Bottle Submarine", time: "35 min", age: "7-11 yrs", mats: "Plastic bottle, coin ballast weight, long air hose", how: "Blowing air empties the ballast tank to surface; venting air submerges it.", sci: "Archimedes' principle and hydrostatic buoyancy regulation via ballast tanks." }
    ]
  },
  {
    name: "Module 4: Basic Electricity & Battery Circuits",
    desc: "Safe 3V and 9V hands-on circuits, vibration motors, lights, and electromagnetism.",
    color: "#EF4444",
    projects: [
      { id: 61, title: "Scuttle Beetle Bristle-Bot", time: "25 min", age: "6-10 yrs", mats: "Angled toothbrush head, coin vibration motor, button cell battery", how: "Motor vibration causes angled bristles to scurry rapidly across any smooth table.", sci: "Eccentric rotating mass (ERM) creating directional resonant vibration." },
      { id: 62, title: "Paperclip Tactical Flashlight", time: "20 min", age: "5-9 yrs", mats: "Cardboard tube, ultra-bright white LED, 2 AA batteries, paperclip switch", how: "Slide the paperclip to bridge the metal gap and cast a focused beam.", sci: "Closed series electrical circuit and Light-Emitting Diode (LED) polarity." },
      { id: 63, title: "Steady-Hand Wire Loop Buzzer Game", time: "30 min", age: "6-11 yrs", mats: "Bent copper wire track, wire wand loop, 3V buzzer or LED, battery", how: "Navigate the wand along the bendy wire; if you touch the wire, the buzzer screams!", sci: "Normally-open touch circuit triggered by momentary metallic contact." },
      { id: 64, title: "High-Power Nail Electromagnet", time: "25 min", age: "7-12 yrs", mats: "Large iron nail, 3 feet of enameled magnet wire, D-cell battery", how: "Connect to the battery to pick up paperclips and washers like a magical magnet.", sci: "Ampère's Law: electric current through a coiled solenoid generates a concentrated magnetic field." },
      { id: 65, title: "Personal Handheld Desk Fan", time: "30 min", age: "6-10 yrs", mats: "3V hobby motor, plastic fan blade, cardboard ergonomic grip", how: "Delivers a cooling breeze at the push of a thumb-actuated switch.", sci: "Conversion of electrical energy into rotary mechanical power via Lorentz forces." },
      { id: 66, title: "Persistence-of-Vision Glowing Top", time: "35 min", age: "7-11 yrs", mats: "Spinning jar lid, lithium coin cell, multi-color radial LEDs", how: "Spin the top in the dark to watch individual LED dots fuse into glowing concentric circles.", sci: "Human retinal persistence of vision (POV) creating the illusion of continuous light rings." },
      { id: 67, title: "Belt-Drive Electric Car with Reduction Pulley", time: "45 min", age: "8-12 yrs", mats: "Cardboard chassis, 3V motor, small rubber band drive belt to large axle pulley", how: "High-speed motor RPM is geared down into powerful wheel torque to conquer carpet.", sci: "Mechanical pulley transmission with speed-to-torque amplification." },
      { id: 68, title: "Saltwater Conductivity Tester", time: "30 min", age: "7-11 yrs", mats: "Two pencil graphite probe leads, LED indicator, water cup, table salt", how: "Dipping leads into tap water stays dim; adding salt makes the LED burn bright.", sci: "Electrolyte dissociation: free sodium ($Na^+$) and chloride ($Cl^-$) ions conducting electrical current." },
      { id: 69, title: "Working 3-Color Traffic Light with Selector Switch", time: "35 min", age: "6-10 yrs", mats: "Red, Yellow, Green LEDs, 220-ohm resistors, rotating wiper switch", how: "Turn the dial to illuminate one street signal at a time.", sci: "Multi-throw rotary selector switch controlling isolated parallel branches." },
      { id: 70, title: "Electromechanical Doorbell Chime", time: "40 min", age: "8-12 yrs", mats: "DIY coil, spring-steel striker, metal tin lid gong", how: "Tapping the doorbell switch draws the iron striker against the lid with a clear 'DING'.", sci: "Electromechanical solenoid relay with automatic circuit interruption." },
      { id: 71, title: "Vibrating Table-Cleaner Sweeper Bot", time: "30 min", age: "6-10 yrs", mats: "Rectangular kitchen sponge, top-mounted vibrating motor, googly eyes", how: "Vibrates across the dining table sweeping crumbs and eraser dust into its path.", sci: "Random walk motion through directional surface vibration vectors." },
      { id: 72, title: "Working Morse Code Telegraph Station", time: "35 min", age: "7-12 yrs", mats: "Wood block base, spring-steel tapper key, piezo buzzer", how: "Tap the key to send short dots and long dashes to decode secret messages.", sci: "Early analog telecommunications and binary Morse code encryption." },
      { id: 73, title: "Motorized Carnival Carousel", time: "45 min", age: "7-11 yrs", mats: "Cardboard disc, geared reduction motor, paper passenger figurines", how: "Spins gracefully like a real theme park ride at the flip of a power switch.", sci: "Gear reduction maintaining high rotational inertia at low safe RPM." },
      { id: 74, title: "Pencil Graphite Dimmer Switch Lamp", time: "30 min", age: "8-12 yrs", mats: "6B soft graphite pencil track, sliding wire wiper, bright white LED", how: "Slide the wiper along the pencil line to smoothly dim and brighten the light.", sci: "Ohmic variable resistance directly proportional to conductive path length ($R = \\rho L / A$)." },
      { id: 75, title: "Bump-and-Reverse Obstacle Robot", time: "50 min", age: "8-12 yrs", mats: "Twin limit switches or tactile wire feelers on front bumper", how: "When the bumper taps a wall, motor polarity reverses and the robot backs away.", sci: "Simplified H-bridge electrical motor polarity reversal via physical sensors." },
      { id: 76, title: "Illuminated Fiber-Optic Starlight Globe", time: "35 min", age: "6-10 yrs", mats: "Clear nylon fishing line bundle, high-intensity base LED", how: "Light enters the base and bends along the curved fibers to sparkle brilliantly at the tips.", sci: "Total Internal Reflection (TIR) inside optical waveguides (fiber optics)." },
      { id: 77, title: "Tripwire Secret Drawer Intruder Alarm", time: "30 min", age: "7-11 yrs", mats: "Spring clothespin with foil contacts, insulator pull-card", how: "Opening the drawer jerks the card free, closing the contacts to trigger a loud siren.", sci: "Normally-closed intrusion sensor triggered by pulling a mechanical insulator." },
      { id: 78, title: "Galvanic Coin & Vinegar Power Cell", time: "25 min", age: "7-12 yrs", mats: "5 copper pennies, 5 zinc washers, vinegar-soaked paper towel discs", how: "Stack in alternating layers to light a red LED with zero commercial batteries!", sci: "Voltaic pile: electrochemical oxidation-reduction (redox) reactions across acid electrolytes." },
      { id: 79, title: "Light-Seeking Photovolt Rover", time: "55 min", age: "9-12 yrs", mats: "Two LDR photoresistors, two BC548 transistors, twin vibrating motors", how: "Shine a flashlight in front of the robot and it actively steers toward the beam.", sci: "Analog proportional control via balanced phototransistor bridges without microcontrollers." },
      { id: 80, title: "Multi-Stage Gauss Magnetic Cannon", time: "35 min", age: "8-12 yrs", mats: "Grooved ruler rail, 3 strong neodymium magnets, 6 steel ball bearings", how: "Rolling one ball slowly into the back triggers the front ball to shoot out at high speed.", sci: "Cascading kinetic energy acceleration via magnetic potential wells." }
    ]
  },
  {
    name: "Module 5: Hydraulics & Pneumatics with Syringes",
    desc: "The immense lifting and gripping power of pressurized water and confined air.",
    color: "#06B6D4",
    projects: [
      { id: 81, title: "2-Axis Hydraulic Robotic Arm", time: "45 min", age: "7-12 yrs", mats: "4 10ml syringes, vinyl tubing, colored water, cardboard joints", how: "Plunging the master control syringes lifts and curls the mechanical arm from across the desk.", sci: "Pascal's Principle: pressure applied to a confined fluid transmits equally in all directions." },
      { id: 82, title: "Synchronized Dual Bascule Bridge", time: "40 min", age: "6-11 yrs", mats: "Twin base syringes under cardboard spans connected via T-connector", how: "Pressing a single master syringe lifts both bridge spans simultaneously.", sci: "Parallel fluid flow dividing equally while maintaining balanced hydraulic pressure." },
      { id: 83, title: "Heavy-Duty Scissor Lift Platform", time: "50 min", age: "8-12 yrs", mats: "Popsicle stick pantograph actuated horizontally by syringe cylinder", how: "Horizontal piston stroke of 1.5 inches expands the platform 6 inches vertically.", sci: "Kinematic geometric stroke conversion with incompressible fluid lock." },
      { id: 84, title: "High-Pressure Hydraulic Precision Claw", time: "40 min", age: "7-12 yrs", mats: "Central fluid cylinder pulling rubber-padded pincer jaws", how: "Grippes and hoists heavy mugs and toy blocks securely with zero batteries.", sci: "Incompressible fluid force transfer without the mechanical backlash of gear trains." },
      { id: 85, title: "Full 3-Movement Sandpit Excavator", time: "60 min", age: "9-12 yrs", mats: "6 color-coded syringes on a joystick control console", how: "Operates just like a full-scale hydraulic construction excavator in sand or dirt.", sci: "Multi-axis closed-loop hydraulic emulation of commercial heavy machinery." },
      { id: 86, title: "Impact-Driven Pneumatic Rocket Launcher", time: "25 min", age: "6-10 yrs", mats: "60ml large syringe connected to long straw launch barrel", how: "Smack the syringe plunger with an open palm to blast a foam dart 35 feet.", sci: "Rapid adiabatic compression creating an instantaneous pneumatic pressure spike." },
      { id: 87, title: "Can-Crushing Hydraulic Multiplier Press", time: "45 min", age: "8-12 yrs", mats: "Small 5ml input syringe linked to massive 50ml output syringe, wood frame", how: "Gentle finger pressure on the thin syringe generates crushing force on soda cans.", sci: "Hydraulic mechanical advantage: Force multiplied by ratio of piston areas ($F_2 = F_1 \\cdot A_2 / A_1$)." },
      { id: 88, title: "Automated Overhead Garage Door", time: "35 min", age: "6-10 yrs", mats: "Cardboard door with swing arm pinned to fluid cylinder", how: "Pulling the dashboard syringe smoothly retracts the door up into the ceiling.", sci: "Four-bar linkage kinematics driven by angular linear actuators." },
      { id: 89, title: "Piston-Tipping Dump Truck Bed", time: "40 min", age: "6-10 yrs", mats: "Truck chassis with cardboard dump bed hinged over bottom cylinder", how: "Tips gravel, marbles, and Lego bricks out the tailgate at a 45-degree angle.", sci: "Actuator anchor points and mechanical torque leverage optimization." },
      { id: 90, title: "Pneumatic Sumo-Bot with Spring Bumper", time: "35 min", age: "7-11 yrs", mats: "Twin air syringes in rapid-response pneumatic loop", how: "Sudden plunger punch fires an extending punch that shoves opponent bots off the ring.", sci: "Fast pneumatics: gas compressibility producing explosive instantaneous acceleration." },
      { id: 91, title: "Cartesian Submarine in a Water Bottle", time: "20 min", age: "5-9 yrs", mats: "Clear 2L bottle of water, pen cap with clay ballast inside", how: "Squeeze the bottle sides to sink the sub; release your grip to make it rise.", sci: "Hydrostatic buoyancy variation caused by compressing the internal air pocket." },
      { id: 92, title: "Miniature Hydraulic Disc Brake Caliper", time: "35 min", age: "8-12 yrs", mats: "Spinning plastic disc on axle, twin pads clamped by syringe piston", how: "Squeeze the brake pedal syringe to instantly clamp the disc and halt spinning.", sci: "Automotive hydraulic disc braking: Pascal pressure driving friction calipers." },
      { id: 93, title: "Aimable High-Pressure Water Cannon", time: "30 min", age: "6-10 yrs", mats: "Syringe with fine plastic nozzle mounted on 360° swivel turret", how: "Shoots pinpoint jets of water 15 feet to extinguish candles and knock over cups.", sci: "Bernoulli's continuity equation: nozzle diameter constriction accelerates exit velocity." },
      { id: 94, title: "Hydrostatic Column Manometer Scale", time: "35 min", age: "7-11 yrs", mats: "Fluid bladder connected to vertical graduated millimeter column", how: "Placing toys on the weighing pad forces the colored fluid up the scale proportionally.", sci: "Hydrostatic manometry: measuring physical mass through fluid column head pressure." },
      { id: 95, title: "4-Post Automotive Service Lift", time: "50 min", age: "8-12 yrs", mats: "4 synchronized corner syringes manifolded to one master cylinder", how: "Lifts model cars into the air with all 4 corners rising at the exact same level.", sci: "Hydrostatic equilibrium in interconnected communicating vessels." },
      { id: 96, title: "Inflatable Offshore Oil Spill Containment Boom", time: "30 min", age: "6-10 yrs", mats: "Flexible plastic tube inflated by air syringe in water basin", how: "Pumping air inflates a buoyant barrier that blocks cooking oil from spreading.", sci: "Environmental marine engineering: positive buoyancy surface barriers." },
      { id: 97, title: "Double-Valve Manual Lift & Force Pump", time: "40 min", age: "8-12 yrs", mats: "Large syringe with two glass marble check-valves", how: "Pumping up pulls water from one container; pumping down shoots it into another.", sci: "One-way check-valves converting reciprocating motion into continuous unidirectional flow." },
      { id: 98, title: "Playdough Precision Hydraulic Guillotine", time: "35 min", age: "6-10 yrs", mats: "Blunt plastic blade guided by twin towers and top cylinder", how: "Slices cleanly through modeling clay with millimeter precision and zero muscle strain.", sci: "Constant-force shear cutting controlled by hydraulic fluid displacement." },
      { id: 99, title: "Soft-Robotics Fluidic Tendon Finger", time: "50 min", age: "8-12 yrs", mats: "5 flexible mini water tubes attached to soft silicone/rubber joints", how: "Fluid pressure expands inner channels to curl fingers with natural organic gentleness.", sci: "Emerging field of Soft Robotics for fragile object manipulation." },
      { id: 100, title: "Dual-Piston Earthquake Simulator Shake Table", time: "45 min", age: "7-12 yrs", mats: "Spring-suspended platform driven by twin perpendicular syringes", how: "Pump the syringes at varying tempos to test whether cardboard skyscrapers collapse.", sci: "Earthquake structural engineering: P & S seismic waves and building resonance." }
    ]
  },
  {
    name: "Module 6: Physics Tricks & Science Fair Wonders",
    desc: "Mesmerizing visual experiments that amaze friends, family, and teachers.",
    color: "#8B5CF6",
    projects: [
      { id: 101, title: "Color-Shifting Effervescent Volcano", time: "20 min", age: "5-9 yrs", mats: "Baking soda, dish soap, vinegar, food coloring", how: "Pour vinegar over the crater cone to erupt dense cascading rainbow foam.", sci: "Acid-base chemical reaction producing rapid carbon dioxide ($CO_2$) gas expansion." },
      { id: 102, title: "Electricity-Free Bubble Lava Lamp", time: "15 min", age: "5-10 yrs", mats: "Clear bottle, vegetable oil, colored water, effervescent tablet", how: "Vibrant color blobs rise and sink in a hypnotic, continuous floating dance.", sci: "Liquid immiscibility, density gradients, and gas bubble buoyancy." },
      { id: 103, title: "Infinity Triangle Mirror Kaleidoscope", time: "25 min", age: "6-10 yrs", mats: "3 mirrored strips folded in a triangle, translucent bead chamber", how: "Look through the eyepiece and spin to reveal infinite symmetrical geometric mandalas.", sci: "Multiple internal optical reflections across mirror surfaces angled at 60 degrees." },
      { id: 104, title: "Dual-Bottle Vortex Tornado Maker", time: "15 min", age: "5-9 yrs", mats: "Two soda bottles joined mouth-to-mouth with central washer", how: "Swirl the top bottle in a circle to unleash a realistic roaring water vortex funnel.", sci: "Conservation of angular momentum and centripetal drain vortex mechanics." },
      { id: 105, title: "Animation Thaumatrope Optical Illusion", time: "15 min", age: "5-8 yrs", mats: "Paper disc (bird on front, cage on back), twin rubber bands", how: "Twirl the rubber bands to spin the disc and watch the bird appear trapped inside the cage.", sci: "Visual persistence: the brain fuses images viewed within 1/10th of a second." },
      { id: 106, title: "5-Layer Liquid Rainbow Density Column", time: "25 min", age: "6-11 yrs", mats: "Honey, dish soap, colored water, vegetable oil, rubbing alcohol", how: "Gently pour into a tall glass to create 5 distinct, unmixable floating color stripes.", sci: "Specific gravity gradients and surface tension between polar and non-polar fluids." },
      { id: 107, title: "Harmonic Sand-Drawing Lissajous Pendulum", time: "30 min", age: "7-12 yrs", mats: "Sand funnel suspended by Y-shaped dual-string harness", how: "Swing the funnel in a circle to trace intricate geometric mathematical patterns in sand.", sci: "Damped harmonic motion across two perpendicular orthogonal axes (Lissajous curves)." },
      { id: 108, title: "Citrus Fruit Battery Powering an LCD Clock", time: "30 min", age: "7-12 yrs", mats: "4 fresh lemons, copper strips, galvanized zinc nails, wires", how: "Wiring lemons in series produces 3 Volts to power a digital clock without any outlets.", sci: "Galvanic electrochemical cell using citric acid as a depolarizing electrolyte." },
      { id: 109, title: "Beak-Balancing Gravity-Defying Bird", time: "20 min", age: "5-8 yrs", mats: "Cardboard eagle cutout with heavy pennies taped into wingtips", how: "Balances steadily by the very tip of its beak on your fingertip without falling.", sci: "Lowering the Center of Gravity below the physical pivot point of support." },
      { id: 110, title: "Tuned Drinking Straw Pan Flute", time: "20 min", age: "6-10 yrs", mats: "8 straws cut to graduated lengths and taped side-by-side", how: "Blow gently across the tops to play clear, sweet musical scales from C to C.", sci: "Acoustic resonance frequency of standing air columns in semi-open pipes." },
      { id: 111, title: "Psychedelic Color-Burst Magic Milk", time: "15 min", age: "5-8 yrs", mats: "Shallow plate of whole milk, food coloring drops, soapy cotton swab", how: "Touch the soapy swab to the center and watch colors explode outward in swirling waves.", sci: "Rapid surface tension rupture and micellar dissolution of milk fats by surfactants." },
      { id: 112, title: "Precision Octagonal Rescue Parachute", time: "25 min", age: "5-9 yrs", mats: "Light plastic grocery bag, 8 equal suspension lines, action figure", how: "Hurl into the air to watch the canopy pop open and descend with slow, gentle stability.", sci: "Aerodynamic drag force canceling gravity weight at constant terminal velocity." },
      { id: 113, title: "Taut-String Stereo Acoustic Telephone", time: "15 min", age: "5-8 yrs", mats: "Two paper cups, 30 feet of taut cotton string without knots", how: "Whisper softly into one cup and hear crystal-clear audio in the next room.", sci: "Mechanical transmission of longitudinal sound waves through tensioned solids." },
      { id: 114, title: "Floating Needle Pocket Compass", time: "15 min", age: "6-10 yrs", mats: "Sewing needle stroked on a magnet, cork slice, bowl of water", how: "The floating needle swings automatically to align directly with Earth's Magnetic North.", sci: "Magnetic dipole alignment with planetary geomagnetic field lines." },
      { id: 115, title: "Tensegrity Floating Table Illusion", time: "40 min", age: "8-12 yrs", mats: "Two hooked cardboard brackets held together solely by 3 nylon threads", how: "The top table floats in midair and can support weight with zero solid pillars!", sci: "Tensegrity engineering: static structural stability maintained purely by continuous tension." },
      { id: 116, title: "Constellation Star Projector for Ceilings", time: "25 min", age: "5-9 yrs", mats: "Dark cylinder box with pin-pricked star maps, central flashlight", how: "In a dark bedroom, casts realistic glowing constellations and planets across the ceiling.", sci: "Rectilinear light propagation and point-source optical shadow projection." },
      { id: 117, title: "Air-Cannon Smoke Vortex Ring Blaster", time: "30 min", age: "7-11 yrs", mats: "Plastic jug with cut bottom covered by rubber balloon, round nozzle", how: "Snap the balloon membrane to launch invisible air rings that snuff out candles 10 feet away.", sci: "Toroidal vortex rings and Helmholtz fluid circulation conservation." },
      { id: 118, title: "Infinite 3D Light Tunnel Mirror", time: "45 min", age: "8-12 yrs", mats: "Shallow box, rear mirror, perimeter LED strip, one-way mirror face", how: "Turn on the LEDs to look into an endless illuminated corridor receding deep into the wall.", sci: "Successive attenuated optical reflections between a total mirror and a beam-splitter." },
      { id: 119, title: "3D Smartphone Floating Hologram Pyramid", time: "20 min", age: "7-12 yrs", mats: "Clear acetate plastic sheet folded into a 4-sided inverted pyramid", how: "Set on your smartphone screen to watch glowing 3D animated robots float inside the glass.", sci: "Pepper's Ghost optical projection via 45-degree partial reflection." },
      { id: 120, title: "Official Young Inventor Trophy & Wax-Sealed Diploma", time: "25 min", age: "5-12 yrs", mats: "Heavy cardstock diploma, foldable gold cardboard trophy template", how: "Formally signed by parents and child upon completing all 120 workshop challenges.", sci: "Psychological reward reinforcement, self-efficacy, and pride in authentic creativity." }
    ]
  }
];

function generateHtml() {
  let projectsHtml = '';

  for (const mod of modulesEn) {
    projectsHtml += `
      <div style="page-break-before: always; margin-top: 20px;">
        <div style="background: ${mod.color}; color: white; padding: 18px 24px; border-radius: 16px; margin-bottom: 24px;">
          <h2 style="margin: 0; font-size: 22px; font-weight: 900;">${mod.name}</h2>
          <p style="margin: 6px 0 0 0; font-size: 13px; opacity: 0.9;">${mod.desc}</p>
        </div>
    `;

    for (const p of mod.projects) {
      projectsHtml += `
        <div class="card-project">
          <div class="proj-header">
            <span class="proj-num">#${p.id.toString().padStart(3, '0')}</span>
            <div class="proj-title">${p.title}</div>
          </div>
          <div class="proj-meta">
            <span class="meta-tag">⏱️ ${p.time}</span>
            <span class="meta-tag">👶 ${p.age}</span>
            <span class="meta-tag">📦 ${p.mats}</span>
          </div>
          <div class="step-box">
            <strong>How to Build & Play:</strong> ${p.how}
          </div>
          <div class="science-explain">
            <strong>🔬 Science in Action:</strong> ${p.sci}
          </div>
        </div>
      `;
    }

    projectsHtml += `</div>`;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>The Young Inventor's Mega Pack | 120 Official Hands-On Challenges</title>
  <style>
    @page { size: A4; margin: 1.2cm; }
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; line-height: 1.45; font-size: 12px; }
    .cover-page {
      page-break-after: always;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      min-height: 85vh;
      border: 8px solid #2563EB;
      border-radius: 28px;
      padding: 40px;
      background: linear-gradient(135deg, #f8fafc 0%, #eff6ff 100%);
      box-sizing: border-box;
    }
    .badge {
      display: inline-block;
      background-color: #2563EB;
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
      max-width: 520px;
      line-height: 1.6;
      margin-bottom: 30px;
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
    <div class="badge">OFFICIAL COMPLETE WORKSHOP COMPENDIUM</div>
    <div class="cover-title">The Young Inventor's Mega Pack</div>
    <div class="cover-sub">
      120 Illustrated Hands-On Robotics, Mechanics, Hydraulics & Physics Challenges Using Everyday Cardboard and Recyclables
    </div>
    <div style="display: flex; gap: 20px; font-weight: 700; color: #1e293b; font-size: 13px;">
      <span>📦 120 Projects</span>
      <span>•</span>
      <span>🧩 6 Engineering Modules</span>
      <span>•</span>
      <span>🌱 Zero Expensive Kits</span>
    </div>
    <p style="margin-top: 40px; font-size: 11px; color: #64748b; font-weight: 600;">
      Young Inventor's Workshop™ · Official 2026 Edition · Verified Hands-On STEM
    </p>
  </div>
  ${projectsHtml}
</body>
</html>
  `;
}

async function compile120() {
  console.log("Compiling: The Young Inventor's Mega Pack (120 Projects)...");
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();

  const fullHtml = generateHtml();
  await page.setContent(fullHtml, { waitUntil: 'domcontentloaded' });

  for (const d of outDirs) {
    const p = path.join(d, 'mega_pack_120_projects_en.pdf');
    await page.pdf({ path: p, format: 'A4', printBackground: true });
    console.log(`✓ Saved 120 projects to: ${p}`);
  }

  await browser.close();
  console.log("🎉 MEGA PACK 120 PROJECTS COMPILED SUCCESSFULLY IN ENGLISH!");
}

compile120().catch(console.error);
