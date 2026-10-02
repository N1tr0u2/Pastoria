// priority: -1000
/** @type {Special.Item[]|{item: Special.Item, reason: string}[]} */
const globalItemRemovals = [
  'megacells:mega_interface',
  'megacells:cable_mega_interface',
  'megacells:mega_pattern_provider',
  'megacells:cable_mega_pattern_provider',
  'megacells:mega_crafting_accelerator',
  'bigger_ae2:advanced_item_cell_housing',
  'bigger_ae2:quantum_item_storage_cell',
  'bigger_ae2:digital_singularity_item_storage_cell',
  'bigger_ae2:quantum_flux_storage_cell',
  'ae2:spatial_anchor',
  'mekanism:upgrade_anchor',
  'mekanism:dimensional_stabilizer',
  'pneumaticcraft:chunkloader_upgrade',
  'industrialforegoing:infinity_nuke',
  'utilitarian:tiny_coal',
  'utilitarian:tiny_charcoal',
  'pylons:infusion_pylon',
  'pylons:potion_filter',
  'xycraft_world:raw_aluminum',
  'xycraft_world:raw_aluminum_block',
  'xycraft_world:aluminum_ore_stone',
  'xycraft_world:aluminum_ore_deepslate',
  'xycraft_world:aluminum_ore_kivi',
  'xycraft_machines:aluminum_dirty_dust',
  'xycraft_machines:aluminum_shard',
  'xycraft_machines:aluminum_crystal',
  'xycraft_machines:aluminum_clump',
  'create:crushed_raw_aluminum',
  'create:crushed_raw_platinum',
  'actuallyadditions:wooden_aiot',
  'actuallyadditions:stone_aiot',
  'actuallyadditions:iron_aiot',
  'actuallyadditions:gold_aiot',
  'actuallyadditions:diamond_aiot',
  'actuallyadditions:netherite_aiot',
  'malum:charcoal_fragment',
  'malum:coal_fragment',
  'mekmm:fluid_replicator',
  'mekmm:chemical_replicator',
  'mekmm:replicator',
  /mekmm:.*_replicating_factory/,
  /mekanism_extras:.*_replicating_factory/,
  /^extendedae_plus:\d+x_crafting_accelerator$/,
  'sfm:xp_shard',
  'sfm:xp_goop',
];

/** @type {[{id: Special.Item, alt?: string, altId?: Special.Item}]} */
const disabledItems = [
  // { id: 'bigger_ae2:4_core_crafting_accelerator', altId: 'expandedae:exp_crafting_accelerator_4' },
  // { id: 'bigger_ae2:16_core_crafting_accelerator', altId: 'expandedae:exp_crafting_accelerator_16' },
  // { id: 'bigger_ae2:64_core_crafting_accelerator', altId: 'expandedae:exp_crafting_accelerator_64' },
  // { id: 'bigger_ae2:256_core_crafting_accelerator', altId: 'expandedae:exp_crafting_accelerator_256' },
  // { id: 'bigger_ae2:1024_core_crafting_accelerator', altId: 'expandedae:exp_crafting_accelerator_1k' },
];

ServerEvents.recipes(event => {
  /** @type {Special.RecipeId[]} */
  const id = [
    'appflux:inscriber/crush_diamond',
    'appflux:inscriber/crush_emerald',
    'modern_industrialization:electric_age/machine/assembler/replicator',
    'industrialforegoing:laser_drill_ore/raw_materials/iridium',
    'modern_industrialization:materials/uranium/blast_furnace/dust',
    'mekanism:sawing/torch',
    'ars_elemental:soulbound_1',
    'industrialforegoing:laser_drill_ore/raw_materials/aluminum',
    'occultism:miner/ores/aluminum_ore',
    'occultism:miner/eldritch/raw_aluminum',
    'occultism:miner/master/stellarite',
    'create:crushing/platinum_ore',
    'create:crushing/raw_platinum',
    'create:crushing/raw_platinum_block',
    'xycraft_machines:compat/mek/compressor/aluminum_sheet_temp',
    'minecraft:blaze_rod_from_smelting_bronze_rod',
    /mekanism:processing\/.*\/ore\/deepslate_from_raw/,
    /mekanism:processing\/.*\/ore\/from_raw/,
    /mekanism:processing\/.*\/to_(deepslate_)?ore/,
    'mekanism_extras:processing/naquadah/ore/end_from_raw',
    'mekanism:processing/gold/ore/nether_from_raw',
  ];

  /** @type {Special.Item[]} */
  const inputRemovals = [
    'xycraft_world:raw_aluminum',
    'xycraft_world:raw_aluminum_block',
    'xycraft_world:aluminum_ore_stone',
    'xycraft_world:aluminum_ore_deepslate',
    'xycraft_world:aluminum_ore_kivi',
  ];

  id.forEach(id => {
    event.remove({ id: id });
  });

  inputRemovals.forEach(input => {
    event.remove({ input: input });
  });

  globalItemRemovals.forEach(output => {
    event.remove({ output: output });
  });

  disabledItems.forEach(item => {
    if (item.altId) {
      event.shapeless(item.altId, [item.id]);
      event.replaceInput({ input: item.id }, item.id, item.altId);
      event.remove({ output: item.id });
    } else event.remove({ output: item.id });
  });
});

/**
 * Disable item for better alternatives. Works nearly the same way as globalItemRemovals, but allows for item replacement.
 * @param {Special.Item} item - Item to disable.
 * @param {string} [altText] - [OPTIONAL] Preferred alternative item name.
 * @param {Special.Item} [altId] - [OPTIONAL] Alternative itemid.
 */
const disableItem = (item, altText, altId) => {
  if (disabledItems.some(disabled => disabled.id === item)) {
    logInfo(`Item ${item} is already disabled.`);
    return;
  }
  disabledItems.push({ id: item, alt: altText, altId: altId });
};

ServerEvents.generateData('after_mods', event => {

  /** @type {string[]} */
  const miscYeets = [
    'apotheosis:affixes/armor/attribute/unbound',
    'xycraft_world:worldgen/configured_feature/ore_aluminum',
    'xycraft_world:worldgen/placed_feature/ore_aluminum',
    'xycraft_world:neoforge/biome_modifier/ore_aluminum',
  ];

  /** @type {Special.LootTable[]} */
  const lootTablesToYeet = [
    // Erroring loot tables, removed to prevent log spam (authors don't check for existance of the items/mods...)
    'mekanism_extras:blocks/forcefield_generator',
    'animal_pen:grant_book_on_first_join',
    'mekanism_extras:blocks/block_naquadah',
    'irons_spellbooks:test/ring_gen_break_me',
    'mekanism_extras:blocks/lead_coated_glass',
    'mekanism_extras:blocks/block_raw_naquadah',
    'mekanism_extras:blocks/naquadah_reactor_casing',
    'mekanism_extras:blocks/naquadah_reactor_logic_adapter',
    'mekanism_extras:blocks/naquadah_reactor_port',
    'mekanism_extras:blocks/naquadah_reactor_controller',
  ];

  /** @type {Special.RecipeId[]} */
  const recipesToYeet = [
    // Erroring recipes, removed to prevent log spam (authors don't check for existance of the items/mods... and some of these are just in the wrong namespace too...)
    'create:crushing/gloomslate_coal_ore',
    'create:cutting/echo_wood',
    'create:crushing/gloomslate_iron_ore',
    'create:cutting/stripped_echo_wood',
    'create:crushing/gloomslate_gold_ore',
    'create:crushing/gloomslate_emerald_ore',
    'create:cutting/echo_log',
    'cataclysm_spellbooks:abyss_spell_book_old',
    'create:crushing/sculk_stone_iron_ore',
    'create:crushing/sculk_stone_emerald_ore',
    'create:crushing/sculk_stone_gold_ore',
    'create:crushing/sculk_stone_copper_ore',
    'moderately:vanishing',
    'create:crushing/gloomslate_redstone_ore',
    'create:crushing/gloomslate_diamond_ore',
    'create:crushing/sculk_stone_diamond_ore',
    'twilightforest:jeed/poison',
    'create:crushing/sculk_stone_lapis_ore',
    'create:crushing/gloomslate_copper_ore',
    'create:crushing/sculk_stone_redstone_ore',
    'create:crushing/gloomslate_lapis_ore',
    'create:crushing/sculk_stone_coal_ore',
    'create:cutting/stripped_echo_log',
    'mekaweapons:module_arrowvelocity_unit',
    'mechtrowel:wand_upgrade',
    // Recipes removed for balancing / unification
    'sfm:enchanted_book_copy',
  ];

  /** @type {string[]} */
  const advancementsToYeet = [
    // Erroring advancements, removed to prevent log spam
    'dungeons_arise:find_thornborn_towers',
    'dungeons_arise:find_fishing_hut',
  ];

  /**
   * @param {string} path - The path to the data.
   * @param {string} [type] - The type of data to be removed. If not provided, the path will be used as is.
   */
  const Yeet = (path, type) => event.json(`${ID.namespace(path)}:${type ? `${type}/` : ''}${ID.path(path)}`, { 'neoforge:conditions': [{ type: 'neoforge:false' }] });

  lootTablesToYeet.forEach(id => Yeet(id, 'loot_table'));
  recipesToYeet.forEach(id => Yeet(id, 'recipe'));
  advancementsToYeet.forEach(id => Yeet(id, 'advancement'));
  miscYeets.forEach(id => Yeet(id));
});
