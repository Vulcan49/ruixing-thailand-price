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
    
new_spot_key: {
  label: "卧佛寺",
  items: {
    new_spot_item_key: {
      label: "卧佛寺门票",
      adultPrice: 300,
      childPrice: 300,
      infantPrice: 0,
      description: "儿童不满120cm免票。",
      note: "卧佛寺门口无法停车，如有停车位司机会代买，如没有则会给客人钱，客人购买"
    }
  }
}
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
    }
  }
};
