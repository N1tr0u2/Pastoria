// priority: 997
{
  /** @type {Special.Mod[]} */
  let modWhitelist = [
    'farmersdelight',
    'moredelight',
    'arsdelight',
    'twilightdelight',
    'ends_delight',
    'pastel',
    'occultism',
  ];
  /** @type {Special.Item[]} */
  let itemWhitelist = [
   ];

   ServerEvents.tags('item', e => {
    e.add('c:tools/knife', Ingredient.of('#c:tools/knives').except('minecraft:barrier').itemIds);
    let knifeIds = Ingredient.of('#c:tools/knife').itemIds.toArray().filter(id => id === 'minecraft:barrier');
    e.add('c:tools/knives', knifeIds);

    let hiddenKnives = [];
    Ingredient.of('#c:tools/knife').stacks.forEach(item => {
      if (modWhitelist.includes(item.mod) || itemWhitelist.includes(item.id) || item.id === 'minecraft:barrier') return;
      hiddenKnives.push(item.id);
    });
    e.add('almostunified:hide', hiddenKnives);

    [
      'refurbished_furniture:items',
      'refurbished_furniture:kitchen',
      'refurbished_furniture:outdoors',
      'refurbished_furniture:tools/knives',
    ].forEach(tag => {
      e.add(tag, Ingredient.of('#c:tools/knife').itemIds);
    });
  });
}
