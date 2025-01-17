import jBinary from "jbinary";

export const cksum = (buffer: DataView, idx: number) => {
  const result = new Uint32Array(4).fill(0);

  for (let i = idx; i < idx + 0xc20; i += 8) {
    result[0] += buffer.getUint8(i) + buffer.getUint8(i + 4);
    result[1] += buffer.getUint8(i + 1) + buffer.getUint8(i + 5);
    result[2] += buffer.getUint8(i + 2) + buffer.getUint8(i + 6);
    result[3] += buffer.getUint8(i + 3) + buffer.getUint8(i + 7);
  }

  result[0] += result[2];
  result[1] += result[3];

  return result[0] + result[1];
};

export const savefile = {
  "jBinary.all": "GAMEDATA",
  "jBinary.littleEndian": true,

  GAMEDATA: {
    unk: ["skip", 0x8160],
    "Slot 1": "Savefile",
    "Slot 2": "Savefile",
    "Slot 3": "Savefile",
    unk2: ["skip", 0x24980],
  },

  Savefile: {
    Corruptness: "uint32",
    Map: ["string0", 32],
    Spawn: "uint32",
    Character: "uint32",
    Name: ["string0", 32],
    Health: "int32",
    "Health Kaine": "int32",
    "Health Emil": "int32",
    Magic: "float32",
    "Magic Kaine": "float32",
    "Magic Emil": "float32",
    Level: "int32",
    unk3: ["skip", 8],
    XP: "int32",
    unk4: ["skip", 12],
    "Order Kaine": "uint32",
    "Order Emil": "uint32",
    "Active Weapon": "uint32",
    "Selected One Handed Sword": "uint32",
    "Selected Two Handed Sword": "uint32",
    "Selected Spear": "uint32",
    unk5: ["skip", 8],
    "Left Bumper": "uint32",
    "Right Bumper": "uint32",
    "Left Trigger": "uint32",
    "Right Trigger": "uint32",
    unk6: ["skip", 12],
    Money: "int32",
    Recovery: "Recovery",
    unk7: ["skip", 7],
    Cultivation: "Cultivation",
    unk8: ["skip", 10],
    Fishing: "Fishing",
    unk9: ["skip", 5],
    "Raw Materials": "Raw Materials",
    "Key Items": "Key Items",
    unk10: ["skip", 176],
    Documents: "Documents",
    unk11: ["skip", 168],
    Maps: "Maps",
    unk12: ["skip", 264],
    "Total Play Time": "double",
    unk13: ["skip", 4],
    Weapons: "Weapons",
    unk14: ["skip", 225],
    Quests: ["array", "uint32", 16],
    unk15: ["skip", 312],
    Words: ["array", "uint32", 4],
    unk16: ["skip", 168],
    Tutorials: ["array", "uint32", 3],
    unk17: ["skip", 1104],
    Quest: "uint32",
    unk18: ["skip", 0x8600],
    Checksum: "uint32",
    unk19: ["skip", 0xc],
  },

  Recovery: {
    "Medicinal Herb": "uint8",
    "Health Salve": "uint8",
    "Recovery Potion": "uint8",
    unk: ["skip", 18],
    "Strength Drop": "uint8",
    "Strength Capsule": "uint8",
    "Magic Drop": "uint8",
    "Magic Capsule": "uint8",
    "Defense Drop": "uint8",
    "Defense Capsule": "uint8",
    "Spirit Drop": "uint8",
    "Spirit Capsule": "uint8",
    unk1: ["skip", 2],
    "Antidotal Weed": "uint8",
    unk2: ["skip", 1],
    "Smelling Salts": "uint8",
  },

  Cultivation: {
    "Speed Fertilizer": "uint8",
    "Flowering Fertilizer": "uint8",
    "Bounty Fertilizer": "uint8",
    unk: ["skip", 2],
    "Pumpkin Seed": "uint8",
    "Watermelon Seed": "uint8",
    "Melon Seed": "uint8",
    "Gourd Seed": "uint8",
    "Tomato Seed": "uint8",
    "Eggplant Seed": "uint8",
    "Bell Pepper Seed": "uint8",
    "Bean Seed": "uint8",
    "Wheat Seedling": "uint8",
    "Rice Plant Seedling": "uint8",
    "Dahlia Bulb": "uint8",
    "Tulip Bulb": "uint8",
    "Freesia Bulb": "uint8",
    "Red Moonflower Seed": "uint8",
    "Gold Moonflower Seed": "uint8",
    "Peach Moonflower Seed": "uint8",
    "Pink Moonflower Seed": "uint8",
    "Blue Moonflower Seed": "uint8",
    "Indigo Moonflower Seed": "uint8",
    "White Moonflower Seed": "uint8",
    unk1: ["skip", 5],
    Pumpkin: "uint8",
    Watermelon: "uint8",
    Melon: "uint8",
    Gourd: "uint8",
    Tomato: "uint8",
    Eggplant: "uint8",
    "Bell Pepper": "uint8",
    Beans: "uint8",
    Wheat: "uint8",
    Rice: "uint8",
    Dahlia: "uint8",
    Tulip: "uint8",
    Freesia: "uint8",
    "Red Moonflower": "uint8",
    "Gold Moonflower": "uint8",
    "Peach Moonflower": "uint8",
    "Pink Moonflower": "uint8",
    "Blue Moonflower": "uint8",
    "Indigo Moonflower": "uint8",
    "White Moonflower": "uint8",
  },

  Fishing: {
    Lugworm: "uint8",
    Earthworm: "uint8",
    Lure: "uint8",
    unk: ["skip", 7],
    Sardine: "uint8",
    Carp: "uint8",
    Blowfish: "uint8",
    Bream: "uint8",
    Shark: "uint8",
    "Blue Marlin": "uint8",
    Dunkleosteus: "uint8",
    "Rainbow Trout": "uint8",
    "Black Bass": "uint8",
    "Giant Catfish": "uint8",
    "Royal Fish": "uint8",
    Hyneria: "uint8",
    Sandfish: "uint8",
    Rhizodont: "uint8",
    "Shaman Fish": "uint8",
  },

  "Raw Materials": {
    "Aquatic Plant": "uint8",
    Deadwood: "uint8",
    "Rusty Bucket": "uint8",
    "Empty Can": "uint8",
    unk: ["skip", 3],
    "Gold Ore": "uint8",
    "Silver Ore": "uint8",
    "Copper Ore": "uint8",
    "Iron Ore": "uint8",
    Crystal: "uint8",
    Pyrite: "uint8",
    Moldavite: "uint8",
    Meteorite: "uint8",
    Amber: "uint8",
    Fluorite: "uint8",
    Clay: "uint8",
    unk1: ["skip", 4],
    Berries: "uint8",
    "Royal Fern": "uint8",
    "Tree Branch": "uint8",
    Log: "uint8",
    "Natural Rubber": "uint8",
    Ivy: "uint8",
    Lichen: "uint8",
    Mushroom: "uint8",
    Sap: "uint8",
    unk2: ["skip", 5],
    Mutton: "uint8",
    "Boar Meat": "uint8",
    Wool: "uint8",
    "Boar Hide": "uint8",
    "Wolf Hide": "uint8",
    "Wolf Fang": "uint8",
    "Giant Spider Silk": "uint8",
    "Bat Fang": "uint8",
    "Bat Wing": "uint8",
    "Goat Meat": "uint8",
    "Goat Hide": "uint8",
    Venison: "uint8",
    "Rainbow Spider Silk": "uint8",
    "Boar Liver": "uint8",
    "Scorpion Claw": "uint8",
    "Scorpion Tail": "uint8",
    "Dented Metal Board": "uint8",
    "Stripped Bolt": "uint8",
    "Broken Lens": "uint8",
    "Severed Cable": "uint8",
    "Broken Arm": "uint8",
    "Broken Antenna": "uint8",
    "Broken Motor": "uint8",
    "Broken Battery": "uint8",
    "Mysterious Switch": "uint8",
    "Large Gear": "uint8",
    "Titanium Alloy": "uint8",
    "Memory Alloy": "uint8",
    "Rusted Clump": "uint8",
    "Machine Oil": "uint8",
    unk3: ["skip", 4],
    "Forlorn Necklace": "uint8",
    "Twisted Ring": "uint8",
    "Broken Earring": "uint8",
    "Pretty Choker": "uint8",
    "Metal Piercing": "uint8",
    "Subdued Bracelet": "uint8",
    "Technical Guide": "uint8",
    "Grubby Book": "uint8",
    "Thick Dictionary": "uint8",
    "Closed Book": "uint8",
    "Used Coloring Book": "uint8",
    "Old Schoolbook": "uint8",
    "Dirty Bag": "uint8",
    "Flashy Hat": "uint8",
    "Leather Gloves": "uint8",
    "Silk Handkerchief": "uint8",
    "Leather Boots": "uint8",
    "Complex Machine": "uint8",
    "Elaborate Machine": "uint8",
    "Simple Machine": "uint8",
    "Stopped Clock": "uint8",
    "Broken Wristwatch": "uint8",
    "Rusty Kitchen Knife": "uint8",
    "Broken Saw": "uint8",
    "Dented Metal Bat": "uint8",
    unk4: ["skip", 1],
    Shell: "uint8",
    Gastropod: "uint8",
    Bivalve: "uint8",
    Seaweed: "uint8",
    "Empty Bottle": "uint8",
    Driftwood: "uint8",
    Pearl: "uint8",
    "Black Pearl": "uint8",
    Crab: "uint8",
    Starfish: "uint8",
    unk5: ["skip", 5],
    "Sea Turtle Egg": "uint8",
    "Broken Pottery": "uint8",
    "Desert Rose": "uint8",
    "Giant Egg": "uint8",
    "Damascus Steel": "uint8",
    "Eagle Egg": "uint8",
    "Chicken Egg": "uint8",
    unk6: ["skip", 1],
    "Mouse Tail": "uint8",
    "Lizard Tail": "uint8",
    unk7: ["skip", 3],
    "Deer Antler": "uint8",
  },

  "Key Items": {
    "Moon Key": "uint8",
    "Star Key": "uint8",
    "Light Key": "uint8",
    "Darkness Key": "uint8",
    "Fine Flour": "uint8",
    "Coarse Flour": "uint8",
    "Perfume Bottle": "uint8",
    "Postman's Parcel": "uint8",
    "Lover's Letter": "uint8",
    "Water Filter": "uint8",
    "Royal Compass": "uint8",
    "Vapor Moss": "uint8",
    "Valley Spider Silk": "uint8",
    "Animal Guidebook": "uint8",
    "Ore Guidebook": "uint8",
    "Plant Guidebook": "uint8",
    "Red Book": "uint8",
    "Blue Book": "uint8",
    "Old Lady's Elixir": "uint8",
    "Old Lady's Elixir+": "uint8",
    "Parcel for The Aerie": "uint8",
    "Parcel for Seafront": "uint8",
    Cookbook: "uint8",
    "Parcel for Facade": "uint8",
    "Max's Herbs": "uint8",
    "Drifting Cargo": "uint8",
    "Drifting Cargo 2": "uint8",
    "Drifting Cargo 3": "uint8",
    "Drifting Cargo 4": "uint8",
    "Old Package": "uint8",
    "Mermaid Tear": "uint8",
    "Mandrake Leaf": "uint8",
    Energizer: "uint8",
    "Toad Oil": "uint8",
    "Sleep-B-Gone": "uint8",
    Antidote: "uint8",
    "Gold Bracelet": "uint8",
    "Elite Kitchen Knife": "uint8",
    "Elevator Parts": "uint8",
    "Dirty Treasure Map": "uint8",
    "Restored Treasure Map": "uint8",
    "Jade Hair Ornament": "uint8",
    "Employee List": "uint8",
    "Small Safe": "uint8",
    "Safe Key": "uint8",
    "Great Tree Root": "uint8",
    "Eye of Power": "uint8",
    Ribbon: "uint8",
    "Yonah's Ribbon": "uint8",
    "Bronze Key": "uint8",
    "Brass Key": "uint8",
    "Boar Tusk": "uint8",
    "Pressed Freesia": "uint8",
    "Potted Freesia": "uint8",
    "Freesia (Delivery)": "uint8",
    "Pile of Junk": "uint8",
    "Old Gold Coin": "uint8",
    "Marked Map": "uint8",
    "AA Keycard": "uint8",
    "KA Keycard": "uint8",
    "SA Keycard": "uint8",
    "TA Keycard": "uint8",
    "NA Keycard": "uint8",
    "HA Keycard": "uint8",
    "MA Keycard": "uint8",
    "YA Keycard": "uint8",
    "RA Keycard": "uint8",
    "WA Keycard": "uint8",
    "Cultivator's Handbook": "uint8",
    "Red Bag": "uint8",
    Lantern: "uint8",
    "Empty Lantern": "uint8",
    "Hold Key": "uint8",
    "Passageway Key": "uint8",
    "Goat Key": "uint8",
    "Lizard Key": "uint8",
    "Unlocking Procedure Memo": "uint8",
    "Red Jewel?": "uint8",
    "Red Flowers": "uint8",
    Apples: "uint8",
  },

  Documents: {
    "Look at the Sky": "uint8",
    "Don't try so hard": "uint8",
    "My Birthday!": "uint8",
    "Love Letter 2/12/3340": "uint8",
    "Love Letter 3/28/3340": "uint8",
    "Love Letter 5/1/3340": "uint8",
    "Letter from the Mayor": "uint8",
    "The Postman's Request": "uint8",
    "The Postman's Thanks": "uint8",
    "Invitation from a Stranger": "uint8",
    "Grand Re-Opening Notice": "uint8",
    "Wedding Invitation": "uint8",
    "Letter from the King": "uint8",
    "Underground Research Record 1": "uint8",
    "Underground Research Record 2": "uint8",
    "Underground Research Record 3": "uint8",
    "Underground Research Record 4": "uint8",
    "Letter to the Chief": "uint8",
    "Letter to two Brothers Weaponry": "uint8",
    "Letter to Popola": "uint8",
    "Letter to a Faraway Lover": "uint8",
    "Letter from Emil": "uint8",
    "Weapon Upgrade Notice": "uint8",
    "Letter from the Chief of The Aerie": "uint8",
  },

  Maps: {
    "World Map": "uint8",
    unk: ["skip", 2],
    "Central Village Map": "uint8",
    "Lost Shrine Area Map": "uint8",
    "Lost Shrine Map": "uint8",
    "The Aerie Map": "uint8",
    "Seafront Map": "uint8",
    "Desert Map": "uint8",
    "Facade Map": "uint8",
    "Barren Temple Map": "uint8",
    "Junk Heap Area Map": "uint8",
    "Junk Heap Map": "uint8",
    "Manor Map": "uint8",
    "Forest of Myth Map": "uint8",
    "Underground Facility Map": "uint8",
    unk1: ["skip", 1],
    "Shadowlord's Castle Map": "uint8",
    unk2: ["skip", 1],
    "Northern Plains Map": "uint8",
    "Southern Plains Map": "uint8",
    "Eastern Road Map": "uint8",
    "Beneath the Forest of Myth Map": "uint8",
    "Toyko Map": "uint8",
  },

  Weapons: {
    "Nameless Blade": "uint8",
    "Phoenix Dagger": "uint8",
    Beastbain: "uint8",
    "Labyrinth's Whisper": "uint8",
    "Fool's Embrace": "uint8",
    "Ancient Overlord": "uint8",
    Rebirth: "uint8",
    "Earth Wyrm's Claw": "uint8",
    "Nirvana Dagger": "uint8",
    Moonrise: "uint8",
    "Blade of Treachery": "uint8",
    "Lily-Leaf Sword": "uint8",
    Faith: "uint8",
    "Iron Pipe": "uint8",
    "Kainé's Sword": "uint8",
    "Virtuous Contract": "uint8",
    "Cruel Oath": "uint8",
    unk: ["skip", 3],
    Kusanagi: "uint8",
    "Phoenix Sword": "uint8",
    Beastlord: "uint8",
    "Labyrinth's Song": "uint8",
    "Fool's Lament": "uint8",
    "Fang of the Twins": "uint8",
    "Axe of Beheading": "uint8",
    "Vile Axe": "uint8",
    "Iron Will": "uint8",
    "Virtuous Treaty": "uint8",
    unk1: ["skip", 10],
    Transience: "uint8",
    "Phoenix Spear": "uint8",
    Beastcurse: "uint8",
    "Labyrinth's Shout": "uint8",
    "Fool's Accord": "uint8",
    "The Devil Queen": "uint8",
    Sunrise: "uint8",
    "Spear of the Usurper": "uint8",
    "Dragoon Lance": "uint8",
    "Captain's Holy Spear": "uint8",
    "Virtuous Dignity": "uint8",
  },
};

export class Gamedata {
  binary: any;
  gamedata: any;

  slots = ["Slot 1", "Slot 2", "Slot 3"];

  constructor(buffer: ArrayBuffer) {
    //@ts-ignore
    this.binary = new jBinary(buffer, savefile);
    this.gamedata = this.binary.readAll();
    if (
      this.gamedata["Slot 1"].Corruptness !== 200 ||
      this.gamedata["Slot 2"].Corruptness !== 200 ||
      this.gamedata["Slot 3"].Corruptness !== 200
    )
      throw new Error("At least one slot did not pass the corruptness check");
  }
}

export const maps: string[] = [
  "NO_IMAGE_AREA_00",
  "B_CASTLE_FIELD_01",
  "B_CASTLE_FIELD_011_D",
  "B_CASTLE_FIELD_02",
  "B_CASTLE_FIELD_021_D",
  "B_CASTLE_FIELD_03",
  "B_CASTLE_FIELD_04",
  "B_CASTLE_FIELD_041_D",
  "B_CASTLE_FIELD_10",
  "B_CENTER_LIBRARY_01",
  "B_CENTER_LIBRARY_011_D",
  "A_CENTER_VILLAGE_01",
  "B_CENTER_VILLAGE_01",
  "A_CENTER_VILLAGE_21",
  "A_CLIFF_VILLAGE_01",
  "B_CLIFF_VILLAGE_01",
  "E_CLIFF_VILLAGE_01",
  "B_CLIFF_VILLAGE_02",
  "B_CLIFF_VILLAGE_21",
  "A_DESERT_FIELD_01",
  "B_DESERT_FIELD_01",
  "A_DESERT_FIELD_02",
  "B_DESERT_FIELD_02",
  "A_DESERT_TEMPLE_01",
  "B_DESERT_TEMPLE_01",
  "B_DESERT_TEMPLE_011_D",
  "B_DESERT_TEMPLE_012_D",
  "B_DESERT_TEMPLE_013_D",
  "B_DESERT_TEMPLE_014_D",
  "A_DESERT_TEMPLE_02",
  "B_DESERT_TEMPLE_02",
  "A_DESERT_TOWN_01",
  "B_DESERT_TOWN_01",
  "B_DESERT_TOWN_011_D",
  "A_EAST_FIELD_01",
  "B_EAST_FIELD_01",
  "A_FOREST_FIELD_01",
  "B_FOREST_FIELD_01",
  "C_FOREST_FIELD_01",
  "D_FOREST_FIELD_01",
  "E_FOREST_FIELD_01",
  "E_FOREST_FIELD_02",
  "E_FOREST_FIELD_03",
  "E_FOREST_FIELD_04",
  "B_MERMAID_FIELD_01",
  "B_MERMAID_FIELD_02",
  "B_MERMAID_FIELD_03",
  "A_MOUNT_FIELD_01",
  "B_MOUNT_FIELD_01",
  "A_MOUNT_ROBOT_01",
  "B_MOUNT_ROBOT_01",
  "A_MOUNT_ROBOT_01_1",
  "A_MOUNT_ROBOT_01_2",
  "A_MOUNT_ROBOT_02",
  "B_MOUNT_ROBOT_02",
  "A_MOUNT_ROBOT_03",
  "B_MOUNT_ROBOT_03",
  "A_MOUNT_ROBOT_04",
  "B_MOUNT_ROBOT_04",
  "B_MOUNT_ROBOT_041_D",
  "A_MOUNT_ROBOT_10",
  "B_MOUNT_ROBOT_10",
  "B_MOUNT_ROBOT_101_D",
  "A_MOUNT_ROBOT_10_1",
  "A_MOUNT_ROBOT_10_2",
  "A_MOUNT_ROBOT_10_3",
  "A_NORTH_FIELD_01",
  "B_NORTH_FIELD_01",
  "E_NORTH_FIELD_01",
  "A_NORTH_FIELD_21",
  "A_SEASIDE_TOWN_01",
  "B_SEASIDE_TOWN_01",
  "B_SEASIDE_TOWN_011_D",
  "A_SOUTH_FIELD_01",
  "B_SOUTH_FIELD_01",
  "B_SOUTH_FIELD_011_D",
  "A_SOUTH_FIELD_21",
  "A_SOUTH_MANSION_01",
  "B_SOUTH_MANSION_01",
  "A_SOUTH_MANSION_02",
  "B_SOUTH_MANSION_02",
  "B_SOUTH_MANSION_021_D",
  "B_SOUTH_UNDERGROUND_01",
  "B_SOUTH_UNDERGROUND_01_1",
  "B_SOUTH_UNDERGROUND_01_2",
  "B_SOUTH_UNDERGROUND_01_3",
  "B_SOUTH_UNDERGROUND_02",
  "B_SOUTH_UNDERGROUND_021_D",
  "A_STONE_FIELD_01",
  "B_STONE_FIELD_01",
  "A_STONE_FIELD_01_1",
  "A_STONE_FIELD_01_2",
  "A_STONE_FIELD_02",
  "B_STONE_FIELD_02",
  "B_STONE_FIELD_021_D",
  "A_STONE_TEMPLE_01",
  "B_STONE_TEMPLE_01",
  "A_STONE_TEMPLE_01_1",
  "A_STONE_TEMPLE_01_2",
  "A_STONE_TEMPLE_01_3",
  "C_TOKYO_FIELD_01",
];

export const buttons: string[] = [
  "Left Bumper",
  "Right Bumper",
  "Left Trigger",
  "Right Trigger",
];

export const abilities: string[] = [
  "None",
  "Defend",
  "Evade",
  "Dark Blast",
  "Dark Phantasm",
  "Dark Hand",
  "Dark Lance",
  "Dark Whirlwind",
  "Dark Gluttony",
  "Dark Wall",
  "Dark Execution",
];

export const oneHandedSwords: string[] = [
  "Nameless Blade",
  "Phoenix Dagger",
  "Beastbain",
  "Labyrinth's Whisper",
  "Fool's Embrace",
  "Ancient Overlord",
  "Rebirth",
  "Earth Wyrms Claw",
  "Nirvana Dagger",
  "Moonrise",
  "Blade of Treachery",
  "Lily Leaf Sword",
  "Faith",
  "Iron Pipe",
  "Kainé's Sword",
  "Virtuous Contract",
  "Cruel Oath",
];

export const twoHandedSwords: string[] = [
  "Kusanagi",
  "Phoenix Sword",
  "Beastlord",
  "Labyrinth's Song",
  "Fool's Lament",
  "Fang of the Twins",
  "Axe of Beheading",
  "Vile Axe",
  "Iron Will",
  "Virtuous Treaty",
];

export const spears: string[] = [
  "Transience",
  "Phoenix Spear",
  "Beastcurse",
  "Labyrinth's Shout",
  "Fool's Accord",
  "The Devil Queen",
  "Sunrise",
  "Spear of the Usurper",
  "Dragoon Lance",
  "Captain's Holy Spear",
  "Virtuous Dignity",
];

export const tutorials: string[] = [
  "Controls",
  "Combos",
  "Dark Blast",
  "Dark Phantasm",
  "Dark Hand",
  "Dark Lance",
  "Dark Whirlwind",
  "Dark Gluttony",
  "Dark Wall",
  "Dark Execution",
  "Maps",
  "Interactions",
  "Attack Gauges",
  "Saving",
  "Quests",
  "Weapon Types",
  "Cultivating Plants",
  "Forging Weapons",
  "Shops",
  "Mine Carts",
  "Switching Magic and Abilities",
  "",
  "Viewing Letters",
  "Changing Weapons",
  "Moving Boxes",
  "",
  "Charging",
  "",
  "Skull Cracker",
  "Deflecting",
  "",
  "",
  "",
  "Sidestepping",
  "Sidestep Attacks",
  "Combo and Magic Charging",
  "Magic Resistance",
  "Cancels",
  "",
  "",
  "Guard Breaks",
  "Heavy Attack Guard Breaks",
  "Earning Money",
  "Fishing Tip",
  "Fishing Tip 2",
  "Fishing Tip 3",
  "Fishing Tip 4",
  "Fishing Tip 5",
  "Armored Enemies",
  "Controlling Boars",
  "Bombs",
  "Breakable Boxes",
  "Breakable Barriers",
  "Gathering Items",
  "Hidden Items",
  "Words",
  "Ordering Allies",
  "Ordering Animals",
  "Item and Equipment Shortcuts",
  "Wall Kicks",
  "Combo Basics",
  "Deflecting Enemy Magic",
  "Fighting Magic Resistant Enemies",
  "Fighting Wolves",
  "Stronger Dark Blasts",
  "Harvests",
  "Rare Items",
  "",
  "Collecting Materials",
  "Absorbing Blood",
  "Magical Collisions",
  "Ending B",
  "Ending C",
  "Ending D",
  "Evading",
  "Double Jump",
  "",
  "Weapon Quick Switching",
  "Finishing Blow",
  "Magic or Ability Quick Switching",
  "Lock On",
  "",
  "",
  "Poison",
];

export const words: string[] = [
  "Pah",
  "Paha",
  "Pahi",
  "Paho",
  "Pahu",
  "Pahal",
  "Pahil",
  "Pahol",
  "Pahul",
  "Pahuloth",
  "Var",
  "Vara",
  "Vari",
  "Varo",
  "Varu",
  "Varal",
  "Varil",
  "Varol",
  "Varul",
  "Varuloth",
  "Geb",
  "Geba",
  "Gebi",
  "Gebo",
  "Gebu",
  "Gebal",
  "Gebil",
  "Gebol",
  "Gebul",
  "Gebuloth",
  "Ul",
  "Ula",
  "Uli",
  "Ulo",
  "Ulu",
  "Ulal",
  "Ulil",
  "Ulol",
  "Ulul",
  "Ululoth",
  "Hod",
  "Hoda",
  "Hodi",
  "Hodo",
  "Hodu",
  "Hodal",
  "Hodil",
  "Hodol",
  "Hodul",
  "Hoduloth",
  "Bes",
  "Besa",
  "Besi",
  "Beso",
  "Besu",
  "Besal",
  "Besil",
  "Besol",
  "Besul",
  "Besuloth",
  "",
  "",
  "",
  "",
  "Lug",
  "Lugir",
  "Luges",
  "Lugka",
  "Lugza",
  "Lugira",
  "Lugesra",
  "Lugkarr",
  "Lugzarr",
  "Lugzarken",
  "Ot",
  "Otir",
  "Otes",
  "Otka",
  "Otza",
  "Otira",
  "Otesra",
  "Otkarr",
  "Otzarr",
  "Otzarken",
  "Mah",
  "Mahir",
  "Mahes",
  "Mahka",
  "Mahza",
  "Mahira",
  "Mahesra",
  "Mahkarr",
  "Mahzarr",
  "Mahzarken",
  "Ashur",
  "Ashurir",
  "Ashures",
  "Ashurka",
  "Ashurza",
  "Ashurira",
  "Ashuresra",
  "Ashurkarr",
  "Ashurzarr",
  "Ashurzarken",
  "Kon",
  "Konir",
  "Kones",
  "Konka",
  "Konza",
  "Konira",
  "Konesra",
  "Konkarr",
  "Konzarr",
  "Konzarken",
  "Sol",
  "Solir",
  "Soles",
  "Solka",
  "Solza",
  "Solira",
  "Solesra",
  "Solkarr",
  "Solzarr",
  "Solzarken",
  "Ashurfarra",
];

export const quests: object[] = [
  {
    28: "Herbal Remedies",
    31: "The Gatekeeper's Errand",
    35: "The Lost Eggs",
    41: "Old-Fashioned Home Cooking",
    45: "Shopping List",
    49: "Book Smarts",
    55: "The Tavern Keeper's Grandmother",
    60: "A Return to Shopping",
    64: "Yonah's Cooking",
    67: "Boar Hunt!",
    72: "On the Wings of Eagles",
    78: "Fragile Delivery",
    84: "Fragile Delivery 2",
    90: "The Fisherman's Gambit",
    93: "The Fisherman's Gambit, Part 2",
    96: "The Fisherman's Gambit, Part 3",
    99: "The Fisherman's Gambit, Part 4",
    102: "The Fisherman's Gambit, Part 5",
    105: "The Ballad of the Twins",
    112: "A Dog Astray",
    117: "The New Merchant in Town",
    132: "Yonah's Gift",
    141: "Letter to a Lover",
    146: "A Signature Dish",
    150: "Bon Appetit!",
    156: "Fragile Delivery 3",
    162: "The Tangled Message",
    172: "Item Unknown",
    176: "The Runaway Son",
    188: "Apology from a Fool",
    198: "The Pride of a Lover",
    202: "The Littlest Hero",
    207: "The Missing Girl",
    214: "A Shade Entombed",
    219: "The Masterless Lighthouse",
    222: "The Scattered Cargo",
    236: "The Strange Fate of the Jewel",
    260: "Thieves in Training",
    270: "Learning a Trade",
    281: "A Bridge in Peril",
    286: "Master of the Southern Plains",
    291: "The Fisherman's Gambit, Part 6",
    294: "The Fisherman's Gambit, Part 7",
    297: "The Fisherman's Gambit, Part 8",
    300: "The Fisherman's Final Gambit",
    303: "Staying Afloat",
    307: "Contract for a Contractor",
    311: "The Creaky Waterwheel",
    317: "The Faded Fountain",
    323: "Bon Appetit! 2",
    327: "Life in the Sands",
    331: "The King's Mask",
    334: "A Child's Final Chance",
    345: "The Damaged Map",
    360: "Research Project",
    367: "A Tale of the Study",
    372: "The Great Tree",
    377: "The Despicable Man",
    385: "A Memorable Knife",
    391: "The Shade Army",
    399: "A City Reborn",
    402: "Nightmares and Dust",
    407: "Disturbing the Sleep of Kings",
    412: "Shadows of the Desert",
    418: "Search for the Shade",
    429: "Freesia",
    436: "The Magical",
    473: "The Postman's Request",
    477: "The Lighthouse Lady's Wrath",
    489: "Closure",
  },
  {
    29: "Herbal Remedies",
    33: "The Gatekeeper's Errand",
    39: "The Lost Eggs",
    43: "Old-Fashioned Home Cooking",
    47: "Shopping List",
    53: "Book Smarts",
    58: "The Tavern Keeper's Grandmother",
    62: "A Return to Shopping",
    65: "Yonah's Cooking",
    70: "Boar Hunt!",
    76: "On the Wings of Eagles",
    82: "Fragile Delivery",
    88: "Fragile Delivery 2",
    91: "The Fisherman's Gambit",
    94: "The Fisherman's Gambit, Part 2",
    97: "The Fisherman's Gambit, Part 3",
    100: "The Fisherman's Gambit, Part 4",
    103: "The Fisherman's Gambit, Part 5",
    110: "The Ballad of the Twins",
    115: "A Dog Astray",
    121: "The New Merchant in Town",
    139: "Yonah's Gift",
    144: "Letter to a Lover",
    148: "A Signature Dish",
    154: "Bon Appetit!",
    160: "Fragile Delivery 3",
    167: "The Tangled Message",
    174: "Item Unknown",
    186: "The Runaway Son",
    192: "Apology from a Fool",
    200: "The Pride of a Lover",
    205: "The Littlest Hero",
    211: "The Missing Girl",
    217: "A Shade Entombed",
    220: "The Masterless Lighthouse",
    233: "The Scattered Cargo",
    244: "The Strange Fate of the Jewel",
    505: "Thieves in Training",
    278: "Learning a Trade",
    284: "A Bridge in Peril",
    289: "Master of the Southern Plains",
    292: "The Fisherman's Gambit, Part 6",
    295: "The Fisherman's Gambit, Part 7",
    298: "The Fisherman's Gambit, Part 8",
    301: "The Fisherman's Final Gambit",
    305: "Staying Afloat",
    309: "Contract for a Contractor",
    315: "The Creaky Waterwheel",
    321: "The Faded Fountain",
    325: "Bon Appetit! 2",
    329: "Life in the Sands",
    333: "The King's Mask",
    343: "A Child's Final Chance",
    358: "The Damaged Map",
    365: "Research Project",
    370: "A Tale of the Study",
    375: "The Great Tree",
    383: "The Despicable Man",
    388: "A Memorable Knife",
    397: "The Shade Army",
    400: "A City Reborn",
    405: "Nightmares and Dust",
    410: "Disturbing the Sleep of Kings",
    416: "Shadows of the Desert",
    427: "Search for the Shade",
    433: "Freesia",
    441: "The Magical",
    474: "The Postman's Request",
    487: "The Lighthouse Lady's Wrath",
    490: "Closure",
  },
];

export const quest: [string, number, number] = ["The Promised Gift", 3, 9];

export const levelToXP = [
  0, 30, 240, 850, 2060, 4070, 7080, 11290, 16900, 24110, 33120, 44130, 57340,
  72950, 91160, 112170, 136180, 163390, 194000, 228210, 266220, 308230, 354440,
  405050, 460260, 520270, 585280, 655490, 731100, 812310, 899320, 987380,
  1076525, 1166790, 1258210, 1350820, 1444655, 1539750, 1636140, 1733860,
  1832945, 1933430, 2035350, 2138740, 2243635, 2350070, 2458080, 2567700,
  2678965, 2791910, 2906570, 3022980, 3141175, 3261190, 3383060, 3506820,
  3632505, 3760150, 3889790, 4021460, 4155195, 4289596, 4424674, 4560440,
  4696906, 4834082, 4971979, 5110609, 5249983, 5390112, 5531006, 5672677,
  5815137, 5958395, 6102464, 6247355, 6393078, 6539644, 6687065, 6835352,
  6984516, 7134568, 7285518, 7437380, 7590162, 7743877, 7898535, 8054148,
  8210726, 8368281, 8526824, 8686367, 8846919, 9008492, 9171098, 9334747,
  9499451, 9665220, 9832066,
];
