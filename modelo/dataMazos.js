export const data = {
  seleccion: ["l213"],
  mazos: {
    101: palabras(1, 12),
    102: palabras(13, 36),
    103: palabras(37, 57),
    104: palabras(58, 76),
    105: palabras(77, 103),
    106: palabras(104, 131),
    107: palabras(133, 148),
    108: palabras(149, 170),
    109: palabras(171, 191),
    110: palabras(192, 213),
    111: palabras(214, 234),
    112: palabras(235, 261),
    113: palabras(262, 282),
    114: palabras(283, 304),
    115: palabras(305, 327),
    116: palabras(328, 364),
    117: palabras(365, 395),
    118: palabras(396, 421),
    119: palabras(422, 449),
    120: palabras(450, 471),
    121: palabras(472, 493),
    122: palabras(494, 516),
    123: palabras(517, 538),
    124: palabras(539, 567),
    125: palabras(568, 587),

    l201: palabras(801, 825),
    l202: palabras(826, 858),
    l203: palabras(859, 888),
    l204: palabras(889, 915),
    l205: palabras(916, 944),
    l206: palabras(945, 965),
    l207: palabras(966, 998),
    l208: palabras(999, 1035),
    l209: palabras(1036, 1066),
    l209: palabras(1036, 1058),
    l210: palabras(1067, 1099),
    l211: palabras(1100, 1138),
    l212: palabras(1139, 1177),

    l213: palabras(1178, 1208),
    l214: palabras(1209, 1235),
    l215: palabras(1236, 1265),
    l216: palabras(1266, 1290),
    l217: palabras(1291, 1327),
    l218: palabras(1328, 1347),
    l219: palabras(1348, 1370),
    l220: palabras(1371, 1403),
    l221: palabras(1404, 1425),
    l222: palabras(1426, 1456),

    l223: palabras(1457, 1479),
    l224: palabras(1480, 1507),
    l225: palabras(1508, 1529),
  },
};

function palabras(inicial, final) {
  const array = [];
  for (let i = 0; i < final - inicial + 1; i++) {
    let s = sufijo(i + inicial);
    array[i] = "hz" + s;
  }

  return array;
}

function sufijo(i) {
  if (i <= 9) {
    return "00000" + i;
  } else if (i <= 99) {
    return "0000" + i;
  }
  if (i <= 999) {
    return "000" + i;
  }
  if (i <= 9999) {
    return "00" + i;
  }
  return i;
}
