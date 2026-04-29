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
      warningRules: {
        yellow: 4,
        red: 5
      }
    },
    suv7: {
      key: "suv7",
      name: "7座SUV",
      images: ["images/suv7-1.jpg"],
      suggestedSeatsText: "2-5人",
      suggestedLuggageText: "4件",
      luggageSizeText: "20-26寸",
      scenes: ["家庭出游", "中件行李", "近郊出行"],
      warningRules: {
        yellow: 6,
        red: 7
      }
    },
    v8: {
      key: "v8",
      name: "V8面包车",
      images: ["images/van8-1.jpg"],
      suggestedSeatsText: "4-8人",
      suggestedLuggageText: "8件",
      luggageSizeText: "20-28寸",
      scenes: ["多人出行", "多行李出行", "包车使用"],
      warningRules: {
        yellow: 9,
        red: 10
      }
    },
    v9: {
      key: "v9",
      name: "V9面包车",
      images: ["images/van9-1.jpg"],
      suggestedSeatsText: "4-9人",
      suggestedLuggageText: "9件",
      luggageSizeText: "20-28寸",
      scenes: ["团队出行", "家庭出游", "长途包车"],
      warningRules: {
        yellow: 10,
        red: 11
      }
    },
    alphard: {
      key: "alphard",
      name: "阿尔法",
      images: ["images/alphard-1.jpg"],
      suggestedSeatsText: "1-5人",
      suggestedLuggageText: "5件",
      luggageSizeText: "20-26寸",
      scenes: ["高端接送", "商务出行", "舒适包车"],
      warningRules: {
        yellow: 6,
        red: 7
      }
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

  tripDemoPrice: {
    charterBase: 3500,
    singleBase: 1200
  },

  tickets: {
    grand_palace_ticket: {
      key: "grand_palace_ticket",
      category: "曼谷",
      spotName: "大皇宫",
      itemName: "门票",
      adultPrice: 500,
      childPrice: 0,
      infantPrice: 0,
      unit: "人",
      description: "儿童不满120cm免票。",
      note: "门票价格仅供参考，请以实际出票价格为准。"
    },

    wat_arun_ticket: {
      key: "wat_arun_ticket",
      category: "曼谷",
      spotName: "郑王庙",
      itemName: "门票",
      adultPrice: 200,
      childPrice: 0,
      infantPrice: 0,
      unit: "人",
      description: "儿童不满120cm免票。",
      note: "过河船票、泰服等项目需单独计价。"
    },

    safari_world_ticket: {
      key: "safari_world_ticket",
      category: "曼谷",
      spotName: "曼谷亚洲野生动物园",
      itemName: "野生动物园",
      adultPrice: 620,
      childPrice: 620,
      infantPrice: 0,
      unit: "人",
      description: "100cm以下免费。",
      note: "门票价格仅供参考，不含园内其他消费。"
    }

    // 后面新增门票，直接复制上面任意一段，改 key、名字、价格、说明即可
  }
};
