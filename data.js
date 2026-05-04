const APP_DATA = {
  cars: {
    sedan: {
      key: "sedan",
      name: "5座轿车",
      images: ["images/sedan-1.jpg"],
      suggestedSeatsText: "2-3人",
      suggestedLuggageText: "3件",
      luggageSizeText: "20-26寸",
      scenes: ["机场接送", "市区接送", "轻装出行"],
      warningRules: { yellow: 4, red: 5 }
    },
    suv7: {
      key: "suv7",
      name: "7座SUV",
      images: ["images/suv7-1.jpg"],
      suggestedSeatsText: "2-5人",
      suggestedLuggageText: "4件",
      luggageSizeText: "20-26寸",
      scenes: ["家庭出游", "中件行李", "近郊出行"],
      warningRules: { yellow: 6, red: 7 }
    },
    v8: {
      key: "v8",
      name: "V8面包车",
      images: ["images/van8-1.jpg"],
      suggestedSeatsText: "4-8人",
      suggestedLuggageText: "8件",
      luggageSizeText: "20-28寸",
      scenes: ["多人出行", "多行李出行", "包车使用"],
      warningRules: { yellow: 9, red: 10 }
    },
    v9: {
      key: "v9",
      name: "V9面包车",
      images: ["images/van9-1.jpg"],
      suggestedSeatsText: "4-9人",
      suggestedLuggageText: "9件",
      luggageSizeText: "20-28寸",
      scenes: ["团队出行", "家庭出游", "长途包车"],
      warningRules: { yellow: 10, red: 11 }
    },
    alphard: {
      key: "alphard",
      name: "阿尔法",
      images: ["images/alphard-1.jpg"],
      suggestedSeatsText: "1-5人",
      suggestedLuggageText: "5件",
      luggageSizeText: "20-26寸",
      scenes: ["高端接送", "商务出行", "舒适包车"],
      warningRules: { yellow: 6, red: 7 }
    }
  },

  driverTypes: [
    { value: "thai", label: "泰文司机" },
    { value: "chinese", label: "中文司机" }
  ],

  serviceTypes: [
    { value: "charter", label: "包车" },
    { value: "single", label: "单趟" }
  ],

  locations: [
    { value: "bangkok", label: "曼谷" },
    { value: "pattaya", label: "芭提雅" },
    { value: "rayong", label: "罗勇" },
    { value: "huahin", label: "华欣" },
    { value: "kanchanaburi", label: "北碧" },
    { value: "ayutthaya", label: "大城" },
    { value: "khaoyai", label: "考艾" }
  ],

  charterBasePrice: {
    thai: {
      sedan: { bangkok: 2500, pattaya: 3100, huahin: 3450, khaoyai: 3500, ayutthaya: 2900, rayong: 3800, kanchanaburi: 3500 },
      suv7: { bangkok: 2700, pattaya: 3500, huahin: 3850, khaoyai: 3800, ayutthaya: 3200, rayong: 3900, kanchanaburi: 3700 },
      v9: { bangkok: 3300, pattaya: 4100, huahin: 4975, khaoyai: 4300, ayutthaya: 4100, rayong: 4800, kanchanaburi: 4500 },
      v8: { bangkok: 3800, pattaya: 4400, huahin: 5300, khaoyai: 4800, ayutthaya: 4600, rayong: 5300, kanchanaburi: 5000 },
      alphard: { bangkok: 7300, pattaya: 7800, huahin: 8300, khaoyai: 8500, ayutthaya: 7800, rayong: 8500, kanchanaburi: 8500 }
    },
    chinese: {
      sedan: { bangkok: 3300, pattaya: 3800, huahin: 4300, khaoyai: 4300, ayutthaya: 3800, rayong: 4300, kanchanaburi: 4300 },
      suv7: { bangkok: 3800, pattaya: 4300, huahin: 4800, khaoyai: 4800, ayutthaya: 4300, rayong: 4800, kanchanaburi: 4800 },
      v9: { bangkok: 4300, pattaya: 4800, huahin: 5300, khaoyai: 5300, ayutthaya: 4800, rayong: 5300, kanchanaburi: 5300 },
      v8: { bangkok: 4800, pattaya: 5300, huahin: 5800, khaoyai: 5800, ayutthaya: 5300, rayong: 5800, kanchanaburi: 5800 },
      alphard: { bangkok: 7800, pattaya: 8300, huahin: 8800, khaoyai: 9000, ayutthaya: 8300, rayong: 9000, kanchanaburi: 9000 }
    }
  },

  returnFees: {
    pattaya: 500,
    khaoyai: 500,
    huahin: 1000,
    kanchanaburi: 1000,
    rayong: 1000
  },

  holidaySingleFees: {
    noCross: { sedan: 100, suv7: 100, v8: 150, v9: 150, alphard: 300 },
    cross: { sedan: 150, suv7: 150, v8: 200, v9: 200, alphard: 400 }
  },

  singleRoutePrices: {
    chinese: {
      bangkok_city: { sedan: 1000, suv7: 1000, v9: 1500, v8: 2000, alphard: 3500 },
      bangkok_pattaya: { sedan: 2000, suv7: 2000, v9: 2500, v8: 3000, alphard: null }
    },
    thai: {
      airport_bangkok: { sedan: 550, suv7: 680, v8: 1050, v9: 950, alphard: 3500 },
      airport_pattaya_bkk: { sedan: 1150, suv7: 1250, v8: 2400, v9: 1900, alphard: 6000 },
      airport_pattaya_dmk: { sedan: 1450, suv7: 1550, v8: 2850, v9: 2250, alphard: 6500 },
      airport_huahin_bkk: { sedan: 1950, suv7: 2050, v8: 3450, v9: 2800, alphard: null },
      airport_huahin_dmk: { sedan: 1950, suv7: 2100, v8: 3450, v9: 2850, alphard: null },
      airport_ayutthaya_bkk: { sedan: 1150, suv7: 1250, v8: 2500, v9: 2050, alphard: null },
      airport_ayutthaya_dmk: { sedan: 950, suv7: 1050, v8: 2450, v9: 1800, alphard: null },
      airport_rayong_bkk: { sedan: 1700, suv7: 1800, v8: 2900, v9: 2450, alphard: null },
      airport_rayong_dmk: { sedan: 1900, suv7: 2000, v8: 3450, v9: 2850, alphard: null },
      bangkok_kanchanaburi: { sedan: 1950, suv7: 2180, v8: 3500, v9: 3050, alphard: null }
    }
  },

  extras: {
    single: {
      multiHotel: { label: "接送多个酒店 +200", price: 200, note: "" },
      stop1030: { label: "中途停10-30分钟 +200", price: 200, note: "顺路停靠，不绕路。" }
    },
    charter: {
      overnight: {
        label: "外宿费 +500",
        price: 500,
        note: "外宿费说明：司机当天抵达曼谷以外目的地，且第二天仍需在曼谷以外地区继续包车时，需加外宿费。"
      },
      overtimeSedanSuv: {
        label: "超时费（5座/7座 300泰铢/小时）",
        price: 300,
        note: "超时超过30分钟按1小时计算。"
      },
      overtimeVan: {
        label: "超时费（V8/V9 500泰铢/小时）",
        price: 500,
        note: "超时超过30分钟按1小时计算。"
      },
      overtimeAlphard: {
        label: "超时费（阿尔法 250泰铢/半小时）",
        price: 250,
        note: "阿尔法按半小时累计计算。"
      },
      siam: {
        label: "暹罗古城 +300",
        price: 300,
        note: "需要司机开车进入暹罗古城，不开车进入不用勾选。"
      },
      zoo: {
        label: "野生动物园开车进入费用 +300",
        price: 300,
        note: "需司机开车带客人进入陆地园区游玩，不开车进入不用勾选。"
      },
      fotong: {
        label: "佛统超区费 +300",
        price: 300,
        note: "曼谷前往佛统 Bubble in the forest Café 等佛统片区景点，需勾选。"
      },
      danuen: {
        label: "丹嫩美攻包车去佛统其他景点 +300",
        price: 300,
        note: "丹嫩沙多游玩结束需前往佛统 Bubble in the forest Café 等景点需勾选。"
      },
      lion: {
        label: "大城包车去狮子园 +500",
        price: 500,
        note: "大城正常市区景点不需要勾选，去大城动物园需勾选。"
      },
      airportChinese: {
        label: "中文司机包车接送机 +500/趟",
        price: 500,
        note: "如接送机不需要绕路则不需要勾选，如芭提雅市区游玩-曼谷机场送机，不去曼谷市区则无需勾选。"
      }
    }
  },

  ticketGroups: {
    grand_palace: {
      label: "大皇宫",
      items: {
        grand_palace_ticket: {
          label: "门票",
          adultPrice: 500,
          childPrice: 0,
          infantPrice: 0,
          description: "儿童不满120cm免票。",
          note: "门票价格仅供参考，请以实际出票价格为准。"
        },
        grand_palace_guide_cn: {
          label: "中文讲解",
          adultPrice: 1000,
          childPrice: 0,
          infantPrice: 0,
          description: "按团计价时请自行调整数量/单价。",
          note: "如需讲解，请按实际人数或团队情况确认。"
        }
      }
    },

    wat_arun: {
      label: "郑王庙",
      items: {
        wat_arun_ticket: {
          label: "门票",
          adultPrice: 200,
          childPrice: 0,
          infantPrice: 0,
          description: "儿童不满120cm免票。",
          note: "过河船票、泰服等项目需单独计价。"
        },
        wat_arun_costume: {
          label: "泰服租赁",
          adultPrice: 300,
          childPrice: 300,
          infantPrice: 0,
          description: "请按实际选购数量填写。",
          note: "门票不含泰服。"
        },
        wat_arun_makeup: {
          label: "泰服妆造",
          adultPrice: 500,
          childPrice: 500,
          infantPrice: 0,
          description: "请按实际选购数量填写。",
          note: "价格仅供参考。"
        }
      }
    },
    
wat_pho: {
  label: "卧佛寺",
  items: {
    wat_pho_ticket: {
      label: "门票",
      adultPrice: 300,
      childPrice: 0,
      infantPrice: 0,
      description: "儿童不满120cm免票。",
      note: "卧佛寺不能停车，如附近可停车司机代买，如附近无法停车则司机给钱客人，客人购买门票。"
    }
  }
},
    bangkok_national_museum: {
  label: "曼谷国家博物馆",
  items: {
    bangkok_national_museum_ticket: {
      label: "门票",
      adultPrice: 250,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: ""
    },
    bangkok_national_museum_cn_guide: {
      label: "中文讲解",
      adultPrice: 1500,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "1团10人以内价格（旺季上涨500）"
    }
  }
},

wat_paknam_boat: {
  label: "水门寺游船",
  items: {
    wat_paknam_boat_under_10: {
      label: "10人以下",
      adultPrice: 1500,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "价格为一艘船的价格，30分钟"
    },
    wat_paknam_boat_10_25: {
      label: "10-25人",
      adultPrice: 3000,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "价格为一艘船的价格，30分钟"
    }
  }
},

    safari_world: {
      label: "曼谷亚洲野生动物园",
      items: {
        safari_world_ticket: {
          label: "野生动物园",
          adultPrice: 620,
          childPrice: 620,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
        },
        marine_park_ticket: {
          label: "海洋乐园",
          adultPrice: 740,
          childPrice: 740,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
         },
        safari_marine_combo: {
          label: "野生动物园+海洋乐园",
          adultPrice: 790,
          childPrice: 790,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
         },
        marine_lunch_combo: {
          label: "海洋乐园+自助中餐",
          adultPrice: 820,
          childPrice: 820,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
         },
        safari_marine_lunch_combo: {
          label: "野生动物园+海洋乐园+自助中餐",
          adultPrice: 920,
          childPrice: 920,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
         },
        boat_combo: {
          label: "乘船观光",
          adultPrice: 250,
          childPrice: 250,
          infantPrice: 0,
          description: "100cm以下免费。",
          note: "仅含首道门票，不含园内其他消费。"
        }
      }
    },

    damuen_saduak_boat: {
  label: "丹嫩沙多游船",
  items: {
    damuen_saduak_row_boat_15: {
      label: "手摇船15分钟",
      adultPrice: 400,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "价格为一艘船的价格，6人一艘船，超人数请2艘船"
    }
  }
},

night_chao_phraya_cruise: {
  label: "夜游湄南河",
  items: {
    white_orchid_sunset: {
      label: "白玉兰夕阳游",
      adultPrice: 610,
      childPrice: 450,
      infantPrice: 0,
      description: "不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    white_orchid_night: {
      label: "白玉兰夜游",
      adultPrice: 800,
      childPrice: 560,
      infantPrice: 0,
      description: "不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    royal_princess_night: {
      label: "皇家公主夜游",
      adultPrice: 850,
      childPrice: 640,
      infantPrice: 0,
      description: "不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    grand_pearl_night: {
      label: "大珍珠夜游",
      adultPrice: 950,
      childPrice: 700,
      infantPrice: 0,
      description: "不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    carnival_night: {
      label: "嘉年华夜游",
      adultPrice: 950,
      childPrice: 720,
      infantPrice: 0,
      description: "男模互动，不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    sawasdee_night: {
      label: "萨瓦迪夜游",
      adultPrice: 1000,
      childPrice: 900,
      infantPrice: 0,
      description: "新船，不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    luxury_white_orchid_night: {
      label: "奢华白玉兰夜游",
      adultPrice: 1030,
      childPrice: 850,
      infantPrice: 0,
      description: "含免费啤酒，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    },
    royal_galaxy_night: {
      label: "皇家银河夜游",
      adultPrice: 1120,
      childPrice: 900,
      infantPrice: 0,
      description: "不含酒水，情人节/元旦价格另寻",
      note: "儿童：4-10岁（含）；婴儿：4岁以下且身高不超过90CM免费。"
    }
  }
},
    ancient_city: {
  label: "暹罗古城",
  items: {
    ancient_city_ticket: {
      label: "暹罗古城",
      adultPrice: 300,
      childPrice: 240,
      infantPrice: 0,
      description: "古城可开车进入，+300泰铢的司机油费",
      note: "儿童：6-14岁（含）"
    },
    ancient_city_buffet: {
      label: "暹罗古城+自助餐",
      adultPrice: 460,
      childPrice: 380,
      infantPrice: 150,
      description: "含餐",
      note: "儿童：6-14岁（含）；婴儿：2-4岁"
    },
    erawan_ancient_city: {
      label: "三头神象+暹罗古城",
      adultPrice: 450,
      childPrice: 320,
      infantPrice: 0,
      description: "",
      note: "儿童：6-14岁（含）"
    },
    erawan_ancient_city_buffet: {
      label: "三头神象+暹罗古城+自助餐",
      adultPrice: 610,
      childPrice: 450,
      infantPrice: 150,
      description: "",
      note: "儿童：6-14岁（含）；婴儿：2-4岁"
    }
  }
},

    sanctuary_of_truth: {
  label: "真理寺",
  items: {
    sanctuary_of_truth_ticket: {
      label: "门票",
      adultPrice: 400,
      childPrice: 200,
      infantPrice: 0,
      description: "",
      note: "儿童：身高110cm-140cm（含）；婴儿：身高110cm以下"
    }
  }
},

bangkok_elephant_camp: {
  label: "曼谷大象保护营",
  items: {
    elephant_camp_halfday_transfer: {
      label: "半日游上/下半场",
      adultPrice: 1550,
      childPrice: 1350,
      infantPrice: 0,
      description: "含接送，上午7-8点开始接，下午11-12点开始接",
      note: "儿童：4-9岁（含）；婴儿：3岁以下免费"
    },
    elephant_camp_halfday_no_transfer: {
      label: "不含接送 半日游上/下半场",
      adultPrice: 1350,
      childPrice: 1050,
      infantPrice: 0,
      description: "不含接送，自行前往，上午场9点赶到，下午场13点赶到",
      note: "儿童：4-9岁（含）；婴儿：3岁以下免费"
    }
  }
},

colosseum_show: {
  label: "金东尼人妖秀",
  items: {
    colosseum_regular: {
      label: "普通座",
      adultPrice: 345,
      childPrice: 185,
      infantPrice: 0,
      description: "时间表：17:00-18:00 / 20:00-21:00",
      note: "儿童：4-12岁（含）；婴儿：3岁以下免费"
    },
    colosseum_vip: {
      label: "VIP座",
      adultPrice: 450,
      childPrice: 235,
      infantPrice: 0,
      description: "时间表：17:00-18:00 / 20:00-21:00",
      note: "儿童：4-12岁（含）；婴儿：3岁以下免费"
    }
  }
},

pattaya_night_show: {
  label: "芭提雅夜秀",
  items: {
    pattaya_night_show_69_79_89_99: {
      label: "69/79/89/99",
      adultPrice: 650,
      childPrice: 0,
      infantPrice: 0,
      description: "19:00-22:00（循环场次）",
      note: "18岁以下禁止观看"
    }
  }
},

tiffany_show: {
  label: "蒂芙尼人妖秀",
  items: {
    tiffany_regular: {
      label: "普通座",
      adultPrice: 950,
      childPrice: 0,
      infantPrice: 0,
      description: "每天 17:00 - 23:00",
      note: "大小同价，身高未满100公分且不占位的孩童免费入场"
    },
    tiffany_silver: {
      label: "白银座",
      adultPrice: 1250,
      childPrice: 0,
      infantPrice: 0,
      description: "每天 17:00 - 23:00",
      note: "大小同价，身高未满100公分且不占位的孩童免费入场"
    },
    tiffany_gold: {
      label: "黄金座",
      adultPrice: 1550,
      childPrice: 0,
      infantPrice: 0,
      description: "每天 17:00 - 23:00",
      note: "大小同价，身高未满100公分且不占位的孩童免费入场"
    },
    tiffany_diamond: {
      label: "钻石座",
      adultPrice: 1850,
      childPrice: 0,
      infantPrice: 0,
      description: "每天 17:00 - 23:00",
      note: "大小同价，身高未满100公分且不占位的孩童免费入场"
    }
  }
},

mxa_muay_thai: {
  label: "MXA泰拳",
  items: {
    mxa_vip: {
      label: "VIP票",
      adultPrice: 650,
      childPrice: 0,
      infantPrice: 0,
      description: "每天 19:30 - 20:30（可客人自取）",
      note: "大小同价，身高未满120公分且不占位的孩童免费入场"
    }
  }
},

sea_banquet_carnival: {
  label: "海天盛筵嘉年华",
  items: {
    sea_banquet_regular: {
      label: "普通座",
      adultPrice: 1080,
      childPrice: 730,
      infantPrice: 0,
      description: "每天18:00 / 19:30两场（可客人自取）",
      note: "年龄4岁以下且身高不超过90CM与父母同座免费"
    },
    sea_banquet_vip: {
      label: "VIP",
      adultPrice: 1800,
      childPrice: 0,
      infantPrice: 0,
      description: "每天18:00 / 19:30两场（可客人自取）",
      note: "年龄4岁以下且身高不超过90CM与父母同座免费"
    }
  }
},
floating_market: {
  label: "四方水上市场",
  items: {
    floating_market_ticket: {
      label: "门票",
      adultPrice: 100,
      childPrice: 40,
      infantPrice: 0,
      description: "",
      note: "身高不超过90cm免费"
    },
    floating_market_ticket_boat: {
      label: "门票+手划船",
      adultPrice: 150,
      childPrice: 90,
      infantPrice: 0,
      description: "",
      note: "身高不超过90cm免费"
    }
  }
},

elephant_cafe: {
  label: "大象咖啡馆",
  items: {
    elephant_cafe_drink_show: {
      label: "咖啡或饮料+表演",
      adultPrice: 320,
      childPrice: 260,
      infantPrice: 0,
      description: "",
      note: "2岁以下婴儿免费，儿童3-12岁"
    },
    elephant_cafe_two_person_10_15: {
      label: "2人骑大象10-15分钟",
      adultPrice: 320,
      childPrice: 265,
      infantPrice: 0,
      description: "1象载2人，不含表演；2人一组，一定一组才能预订；不含门票",
      note: "2岁以下婴儿免费，儿童3-12岁"
    },
    elephant_cafe_two_person_25_30: {
      label: "2人骑大象25-30分钟",
      adultPrice: 630,
      childPrice: 530,
      infantPrice: 0,
      description: "1象载2人，含表演+饮料；2人一组，一定要够一组才能预订",
      note: "2岁以下婴儿免费，儿童3-12岁"
    },
    elephant_cafe_two_person_40_45: {
      label: "2人骑大象40-45分钟",
      adultPrice: 800,
      childPrice: 580,
      infantPrice: 0,
      description: "1象载2人，含表演+饮料；2人一组，一定要够一组才能预订",
      note: "2岁以下婴儿免费，儿童3-12岁"
    },
    elephant_cafe_one_person_10_15: {
      label: "1人骑大象10-15分钟",
      adultPrice: 430,
      childPrice: 0,
      infantPrice: 0,
      description: "1象载1人，不含表演；不含门票/饮料/表演",
      note: "大小同价"
    },
    elephant_cafe_one_person_25_30: {
      label: "1人骑大象25-30分钟",
      adultPrice: 830,
      childPrice: 0,
      infantPrice: 0,
      description: "1象载1人，不含表演；含门票/饮料/表演",
      note: "大小同价"
    },
    elephant_cafe_one_person_40_45: {
      label: "1人骑大象40-45分钟",
      adultPrice: 1080,
      childPrice: 0,
      infantPrice: 0,
      description: "1象载1人，不含表演；含门票/饮料/表演",
      note: "大小同价"
    }
  }
},

pattaya_elephant_village_safari: {
  label: "芭提雅大象村Safari",
  items: {
    elephant_two_person_30: {
      label: "2人骑大象30分钟",
      adultPrice: 350,
      childPrice: 250,
      infantPrice: 0,
      description: "",
      note: "110cm以下算儿童价，以上算成人价，2人一头大象"
    },
    elephant_two_person_60: {
      label: "2人骑大象60分钟",
      adultPrice: 650,
      childPrice: 350,
      infantPrice: 0,
      description: "",
      note: "110cm以下算儿童价，以上算成人价，2人一头大象"
    },
    elephant_one_person_30: {
      label: "1人骑大象30分钟",
      adultPrice: 750,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价，1人骑行"
    },
    elephant_one_person_60: {
      label: "1人骑大象60分钟",
      adultPrice: 1450,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价，1人骑行"
    },
    horse_30: {
      label: "骑马30分钟",
      adultPrice: 750,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    horse_60: {
      label: "骑马60分钟",
      adultPrice: 1450,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    atv_30: {
      label: "ATV 30分钟",
      adultPrice: 750,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    atv_60: {
      label: "ATV 60分钟",
      adultPrice: 1450,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    small_buggy_30: {
      label: "小型 Buggy越野车 30分钟",
      adultPrice: 950,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    small_buggy_60: {
      label: "小型 Buggy越野车 60分钟",
      adultPrice: 1850,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    large_buggy_30: {
      label: "大型 Buggy越野车 30分钟",
      adultPrice: 1550,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    large_buggy_60: {
      label: "大型 Buggy越野车 60分钟",
      adultPrice: 3050,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    kart_10: {
      label: "卡丁车 10 分钟",
      adultPrice: 950,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    bungee_jump: {
      label: "丛林蹦极",
      adultPrice: 1850,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    flyboard_10: {
      label: "水上飞人 10分钟",
      adultPrice: 1250,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    flyboard_15: {
      label: "水上飞人 15分钟",
      adultPrice: 1550,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    flyboard_20: {
      label: "水上飞人 20分钟",
      adultPrice: 2250,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    zipline_15: {
      label: "丛林飞跃15站",
      adultPrice: 850,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    zipline_26: {
      label: "丛林飞跃26站",
      adultPrice: 1050,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    zipline_32: {
      label: "丛林飞跃32站",
      adultPrice: 1350,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    },
    zipline_58: {
      label: "丛林飞跃58站",
      adultPrice: 2050,
      childPrice: 0,
      infantPrice: 0,
      description: "",
      note: "大小同价"
    }
  }
}
}
};


