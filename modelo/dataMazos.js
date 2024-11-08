export const data = {
  seleccion: ["l213"],
  mazos: {
    l101: palabras(1, 12),
    l102: palabras(13, 36),
    l103: palabras(37, 57),
    l104: palabras(58, 76),
    l105: palabras(77, 103),
    l106: palabras(104, 131),
    l107: palabras(133, 148),
    l108: palabras(149, 170),
    l109: palabras(171, 191),
    l110: palabras(192, 213),
    l111: palabras(214, 234),
    l112: palabras(235, 261),
    l113: palabras(262, 282),
    l114: palabras(283, 304),
    l115: palabras(305, 327),
    l116: palabras(328, 364),
    l117: palabras(365, 395),
    l118: palabras(396, 421),
    l119: palabras(422, 449),
    l120: palabras(450, 471),
    l121: palabras(472, 493),
    l122: palabras(494, 516),
    l123: palabras(517, 538),
    l124: palabras(539, 567),
    l125: palabras(568, 587),

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

    l216: palabras(1266, 1295),

    l217: palabras(1296, 1326),
    l218: palabras(1327, 1436),
    l219: palabras(1347, 1369),
    l220: palabras(1370, 1402),
    l221: palabras(1403, 1424),
    l222: palabras(1425, 1455),
    l223: palabras(1456, 1478),
    l224: palabras(1479, 1506),
    l225: palabras(1507, 1529),
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
