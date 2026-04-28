let tripIndex = 0;

const carData = {
  sedan: {
    name: "5座轿车",
    image: "images/sedan-1.jpg",
    rule: "建议 2-3人 + 3件行李",
    luggage: "行李参考：20-26寸",
    yellowLimit: 4,
    redLimit: 5
  },
  suv7: {
    name: "7座SUV",
    image: "images/suv7-1.jpg",
    rule: "建议 2-5人 + 4件行李",
    luggage: "行李参考：20-26寸",
    yellowLimit: 5,
    redLimit: 6
  },
  v9: {
    name: "V9面包车",
    image: "images/van9-1.jpg",
    rule: "建议 4-9人 + 9件行李",
    luggage: "行李参考：20-28寸",
    yellowLimit: 9,
    redLimit: 10
  },
  v8: {
    name: "V8面包车",
    image: "images/van8-1.jpg",
    rule: "建议 4-8人 + 8件行李",
    luggage: "行李参考：20-28寸",
    yellowLimit: 8,
    redLimit: 9
  },
  alphard: {
    name: "阿尔法",
    image: "images/alphard-1.jpg",
    rule: "建议 1-5人 + 5件行李",
    luggage: "行李参考：20-26寸",
    yellowLimit: 5,
    redLimit: 6
  }
};

const charterBasePrice = {
  thai: {
    sedan: { bangkok: 2500, pattaya: 3100, huahin: 3450, khaoyai: 3500, ayutthaya: 2900, rayong: 3800, kanchanaburi: 3500, prachinburi: 3900, chanthaburi: 4400, mae_klong: 3000 },
    suv7: { bangkok: 2700, pattaya: 3500, huahin: 3850, khaoyai: 3800, ayutthaya: 3200, rayong: 3900, kanchanaburi: 3700, prachinburi: 4200, chanthaburi: 4800, mae_klong: 3400 },
    v9: { bangkok: 3300, pattaya: 4100, huahin: 4975, khaoyai: 4300, ayutthaya: 4100, rayong: 4800, kanchanaburi: 4500, prachinburi: 4800, chanthaburi: 5400, mae_klong: 4000 },
    v8: { bangkok: 3800, pattaya: 4400, huahin: 5300, khaoyai: 4800, ayutthaya: 4600, rayong: 5300, kanchanaburi: 5000, prachinburi: 5300, chanthaburi: 5900, mae_klong: 4300 },
    alphard: { bangkok: 7300, pattaya: 7800, huahin: 8300, khaoyai: 8500, ayutthaya: 7800, rayong: 8500, kanchanaburi: 8500, prachinburi: 8800, chanthaburi: 9300, mae_klong: 7800 }
  },
  chinese: {
    sedan: { bangkok: 3300, pattaya: 3800, huahin: 4300, khaoyai: 4300, ayutthaya: 3800, rayong: 4300, kanchanaburi: 4300, prachinburi: 4800, chanthaburi: 5300, mae_klong: 3800 },
    suv7: { bangkok: 3800, pattaya: 4300, huahin: 4800, khaoyai: 4800, ayutthaya: 4300, rayong: 4800, kanchanaburi: 4800, prachinburi: 5300, chanthaburi: 5800, mae_klong: 4300 },
    v9: { bangkok: 4300, pattaya: 4800, huahin: 5300, khaoyai: 5300, ayutthaya: 4800, rayong: 5300, kanchanaburi: 5300, prachinburi: 5800, chanthaburi: 6300, mae_klong: 4800 },
    v8: { bangkok: 4800, pattaya: 5300, huahin: 5800, khaoyai: 5800, ayutthaya: 5300, rayong: 5800, kanchanaburi: 5800, prachinburi: 6300, chanthaburi: 6800, mae_klong: 5300 },
    alphard: { bangkok: 7800, pattaya: 8300, huahin: 8800, khaoyai: 9000, ayutthaya: 8300, rayong: 9000, kanchanaburi: 9000, prachinburi: 9300, chanthaburi: 9800, mae_klong: 8300 }
  }
};

const holidaySingleFees = {
  noCross: { sedan: 100, suv7: 100, v8: 150, v9: 150, alphard: 300 },
  cross: { sedan: 150, suv7: 150, v8: 200, v9: 200, alphard: 400 }
};

const returnFees = {
  pattaya: 500,
  khaoyai: 500,
  huahin: 1000,
  kanchanaburi: 1000,
  rayong: 1000
};

const locationOptions = [
  { value: "bangkok", label: "曼谷" },
  { value: "pattaya", label: "芭提雅" },
  { value: "rayong", label: "罗勇" },
  { value: "huahin", label: "华欣" },
  { value: "kanchanaburi", label: "北碧" },
  { value: "ayutthaya", label: "大城" },
  { value: "khaoyai", label: "考艾" },
  { value: "mae_klong", label: "美攻/水上市场" }
];

const airportOptions = [
  { value: "none", label: "不涉及机场" },
  { value: "bkk", label: "素万那普机场" },
  { value: "dmk", label: "廊曼机场" }
];

const singleRoutePrices = {
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
    airport_transfer: { sedan: 700, suv7: 860, v8: 1350, v9: 1260, alphard: null },
    bangkok_kanchanaburi: { sedan: 1950, suv7: 2180, v8: 3500, v9: 3050, alphard: null },
    bangkok_banphe: { sedan: 1900, suv7: 2000, v8: 3450, v9: 2850, alphard: null },
    bangkok_kohchang_pier: { sedan: 3500, suv7: 3800, v8: 5200, v9: 4800, alphard: null }
  }
};

function bindAutoCalculate(container) {
  container.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", calculatePrice);
    el.addEventListener("input", calculatePrice);
  });
}

function updateCarInfo() {
  const carKey = document.getElementById("carType").value;
  const passengerCount = Number(document.getElementById("passengerCount").value || 0);
  const car = carData[carKey];

  document.getElementById("carPreview").src = car.image;
  document.getElementById("carTitle").innerText = car.name;
  document.getElementById("carRule").innerText = car.rule;
  document.getElementById("carLuggage").innerText = car.luggage;
  document.getElementById("downloadImage").href = car.image;

  const warning = document.getElementById("carWarning");
  warning.className = "warning-text";

  if (passengerCount >= car.redLimit) {
    warning.innerText = "该人数使用此车型可能会拥挤或无法承载，请重新选择。";
    warning.classList.add("warning-red");
  } else if (passengerCount === car.yellowLimit) {
    warning.innerText = "该人数使用此车型可能会较拥挤，请谨慎确认。";
    warning.classList.add("warning-yellow");
  } else {
    warning.innerText = "";
  }
}

function addTrip() {
  tripIndex++;

  const tripHtml = `
    <div class="trip-item" id="trip-${tripIndex}">
      <div class="trip-title">第 ${tripIndex} 段行程</div>

      <div class="trip-grid">
        <div>
          <label>日期 <span class="red-small">（选填）</span></label>
          <input type="date" class="trip-date" />
          <div class="red-tip">节假日用车必选</div>
        </div>

        <div>
          <label>司机类型</label>
          <select class="driver-type" onchange="refreshTripFields(${tripIndex}); calculatePrice();">
            <option value="thai">泰文司机</option>
            <option value="chinese">中文司机</option>
          </select>
        </div>

        <div>
          <label>用车方式</label>
          <select class="service-type" onchange="refreshTripFields(${tripIndex}); calculatePrice();">
            <option value="charter">包车</option>
            <option value="single">单趟</option>
          </select>
        </div>

        <div>
          <label>节假日用车</label>
          <select class="holiday-flag">
            <option value="no">否</option>
            <option value="yes">是</option>
          </select>
        </div>
      </div>

      <div class="charter-section" id="charter-section-${tripIndex}">
        <div class="section-title">包车路线</div>

        <div>
          <label>出发地</label>
          <select class="charter-start"></select>
        </div>

        <div class="route-list" id="route-list-${tripIndex}"></div>
        <button type="button" onclick="addRouteStop(${tripIndex})">+ 添加目的地</button>

        <div class="trip-grid-2">
          <div>
            <label>用车时长</label>
            <select class="hours"></select>
          </div>

          <div>
            <label>当天返回出发地</label>
            <select class="same-day-return-select">
              <option value="no">否</option>
              <option value="yes">是</option>
            </select>
            <div class="red-helper">芭提雅/考艾 +500；华欣/北碧/罗勇 +1000</div>
          </div>
        </div>

        <div class="section-title">包车附加项</div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-overnight" /> 外宿费 +500</label>
            <input type="number" class="extra-overnight-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">外宿费说明：司机当天抵达曼谷以外目的地，且第二天仍需在曼谷以外地区继续包车时，需加外宿费。</div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label class="extra-overtime-label"><input type="checkbox" class="extra-overtime" /> 超时费</label>
            <input type="number" class="extra-overtime-qty" min="1" step="0.5" placeholder="超时数量" />
          </div>
          <div class="red-helper extra-overtime-text"></div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-siam" /> 暹罗古城 +300</label>
            <input type="number" class="extra-siam-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">需要司机开车进入暹罗古城，不开车进入不用勾选。</div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-zoo" /> 野生动物园开车进入费用 +300</label>
            <input type="number" class="extra-zoo-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">需司机开车带客人进入陆地园区游玩，不开车进入不用勾选。</div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-fotong" /> 佛统超区费 +300</label>
            <input type="number" class="extra-fotong-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">曼谷前往佛统 Bubble in the forest Café 等佛统片区景点，需勾选。</div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-danuen" /> 丹嫩美攻包车去佛统其他景点 +300</label>
            <input type="number" class="extra-danuen-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">丹嫩沙多游玩结束需前往佛统 Bubble in the forest Café 等景点需勾选。</div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-lion" /> 大城包车去狮子园 +500</label>
            <input type="number" class="extra-lion-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">大城正常市区景点不需要勾选，去大城动物园需勾选。</div>
        </div>

        <div class="extra-item chinese-airport-extra-wrap">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-airport-trip" /> 中文司机包车接送机 +500/趟</label>
            <input type="number" class="extra-airport-trip-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">如接送机不需要绕路则不需要勾选，如芭提雅市区游玩-曼谷机场送机，不去曼谷市区则无需勾选。</div>
        </div>
      </div>

      <div class="single-section" id="single-section-${tripIndex}" style="display:none;">
        <div class="trip-grid">
          <div>
            <label>单趟类型</label>
            <select class="single-type">
              <option value="airport_pickup">接机/送机</option>
              <option value="normal_single">普通单趟</option>
            </select>
          </div>

          <div>
            <label>出发地区</label>
            <select class="single-start"></select>
          </div>

          <div>
            <label>目的地区</label>
            <select class="single-end"></select>
          </div>

          <div>
            <label>机场</label>
            <select class="airport-type"></select>
          </div>
        </div>

        <div class="info-box">
          泰文司机普通单趟按接送机逻辑取同线路最高价；阿尔法单趟部分区域价格浮动，需单独确认。
        </div>

        <div class="section-title">单趟附加项</div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-hotel" /> 接送多个酒店 +200</label>
            <input type="number" class="extra-hotel-qty" min="1" placeholder="数量" />
          </div>
        </div>

        <div class="extra-item">
          <div class="extra-inline">
            <label><input type="checkbox" class="extra-stop" /> 中途停10-30分钟 +200</label>
            <input type="number" class="extra-stop-qty" min="1" placeholder="数量" />
          </div>
          <div class="red-helper">顺路停靠，不绕路。</div>
        </div>
      </div>

      <div class="trip-actions">
        <button type="button" class="remove-btn" onclick="removeTrip(${tripIndex})">删除</button>
      </div>
    </div>
  `;

  document.getElementById("tripList").insertAdjacentHTML("beforeend", tripHtml);
  initTrip(tripIndex);
  calculatePrice();
}

function initTrip(id) {
  const trip = document.getElementById(`trip-${id}`);
  fillSelect(trip.querySelector(".charter-start"), locationOptions, "bangkok");
  fillSelect(trip.querySelector(".single-start"), locationOptions, "bangkok");
  fillSelect(trip.querySelector(".single-end"), locationOptions, "bangkok");
  fillSelect(trip.querySelector(".airport-type"), airportOptions, "none");
  addRouteStop(id);
  refreshTripFields(id);
  bindAutoCalculate(trip);
}

function fillSelect(selectEl, options, defaultValue = "") {
  selectEl.innerHTML = options
    .map(opt => `<option value="${opt.value}" ${opt.value === defaultValue ? "selected" : ""}>${opt.label}</option>`)
    .join("");
}

function addRouteStop(tripId) {
  const routeList = document.getElementById(`route-list-${tripId}`);
  const stopCount = routeList.querySelectorAll(".route-item").length + 1;

  const routeHtml = `
    <div class="route-item">
      <div>
        <label>目的地 ${stopCount}</label>
        <select class="charter-stop">
          ${locationOptions.map(opt => `<option value="${opt.value}">${opt.label}</option>`).join("")}
        </select>
      </div>
      <button type="button" class="route-remove" onclick="removeRouteStop(this)">删除</button>
    </div>
  `;

  routeList.insertAdjacentHTML("beforeend", routeHtml);
  bindAutoCalculate(routeList.lastElementChild);
  calculatePrice();
}

function removeRouteStop(btn) {
  const routeList = btn.closest(".route-list");
  btn.closest(".route-item").remove();

  const labels = routeList.querySelectorAll(".route-item label");
  labels.forEach((label, index) => {
    label.innerText = `目的地 ${index + 1}`;
  });
  calculatePrice();
}

function removeTrip(id) {
  const item = document.getElementById(`trip-${id}`);
  if (item) item.remove();
  calculatePrice();
}

function refreshAllTripFields() {
  const trips = document.querySelectorAll(".trip-item");
  trips.forEach(trip => {
    const id = Number(trip.id.replace("trip-", ""));
    refreshTripFields(id);
  });
}

function refreshTripFields(id) {
  const trip = document.getElementById(`trip-${id}`);
  if (!trip) return;

  const serviceType = trip.querySelector(".service-type").value;
  const driverType = trip.querySelector(".driver-type").value;
  const carKey = document.getElementById("carType").value;

  const charterSection = document.getElementById(`charter-section-${id}`);
  const singleSection = document.getElementById(`single-section-${id}`);
  const hoursSelect = trip.querySelector(".hours");
  const chineseAirportExtraWrap = trip.querySelector(".chinese-airport-extra-wrap");

  if (serviceType === "charter") {
    charterSection.style.display = "block";
    singleSection.style.display = "none";
  } else {
    charterSection.style.display = "none";
    singleSection.style.display = "block";
  }

  let hourOptions = [];
  if (driverType === "thai") {
    hourOptions = [
      { value: "6", label: "6小时" },
      { value: "8", label: "8小时" },
      { value: "10", label: "10小时" }
    ];
  } else {
    hourOptions = [
      { value: "8", label: "8小时" },
      { value: "10", label: "10小时" }
    ];
  }

  hoursSelect.innerHTML = hourOptions.map(opt => {
    const selected = opt.value === "10" ? "selected" : "";
    return `<option value="${opt.value}" ${selected}>${opt.label}</option>`;
  }).join("");

  const overtimeLabel = trip.querySelector(".extra-overtime-label");
  const overtimeText = trip.querySelector(".extra-overtime-text");

  if (carKey === "sedan" || carKey === "suv7") {
    overtimeLabel.innerHTML = `<input type="checkbox" class="extra-overtime" /> 超时费（300泰铢/小时）`;
    overtimeText.innerText = "超时超过30分钟按1小时计算。";
  } else if (carKey === "v8" || carKey === "v9") {
    overtimeLabel.innerHTML = `<input type="checkbox" class="extra-overtime" /> 超时费（500泰铢/小时）`;
    overtimeText.innerText = "超时超过30分钟按1小时计算。";
  } else {
    overtimeLabel.innerHTML = `<input type="checkbox" class="extra-overtime" /> 超时费（250泰铢/半小时）`;
    overtimeText.innerText = "阿尔法按半小时累计计算。";
  }

  if (driverType === "chinese") {
    chineseAirportExtraWrap.style.display = "block";
  } else {
    chineseAirportExtraWrap.style.display = "none";
    trip.querySelector(".extra-airport-trip").checked = false;
    trip.querySelector(".extra-airport-trip-qty").value = "";
  }

  bindAutoCalculate(trip);
}

function getQtyValue(checked, inputEl) {
  if (!checked) return 0;
  const raw = inputEl.value.trim();
  if (!raw) return 1;
  return Number(raw);
}

function calculateExtra(checked, qtyInput, unitPrice) {
  const qty = getQtyValue(checked, qtyInput);
  return qty * unitPrice;
}

function getOvertimePrice(carKey, rawQty) {
  const qty = Number(rawQty || 0);
  if (qty <= 0) return 0;

  if (carKey === "alphard") {
    return qty * 250;
  }

  const roundedQty = Math.ceil(qty);
  if (carKey === "sedan" || carKey === "suv7") {
    return roundedQty * 300;
  }

  return roundedQty * 500;
}

function isHoliday(trip) {
  return trip.querySelector(".holiday-flag").value === "yes";
}

function getLocationLabel(value) {
  const map = Object.fromEntries(locationOptions.map(x => [x.value, x.label]));
  return map[value] || value;
}

function getCharterBasePrice(driverType, carKey, start, firstStop) {
  const table = charterBasePrice[driverType][carKey];

  if (firstStop === start) {
    return table.bangkok;
  }

  if (start === "bangkok") {
    return table[firstStop] ?? null;
  }

  if (firstStop === "bangkok") {
    return table[start] ?? null;
  }

  return table[firstStop] ?? null;
}

function getExtraCrossCount(start, stops) {
  if (stops.length <= 1) return 0;

  let extra = 0;
  let prev = stops[0];

  for (let i = 1; i < stops.length; i++) {
    if (stops[i] !== prev) {
      extra += 1;
    }
    prev = stops[i];
  }

  return extra;
}

function calculateCharterTrip(trip, carKey, index) {
  const driverType = trip.querySelector(".driver-type").value;
  const start = trip.querySelector(".charter-start").value;
  const stops = Array.from(trip.querySelectorAll(".charter-stop")).map(s => s.value);
  const sameDayReturn = trip.querySelector(".same-day-return-select").value === "yes";

  let tripTotal = 0;
  const tripDetails = [];
  const firstStop = stops[0] || start;

  const basePrice = getCharterBasePrice(driverType, carKey, start, firstStop);

  if (basePrice == null) {
    return {
      tripTotal: 0,
      html: `
        <div class="result-block">
          <strong>第 ${index + 1} 段行程：当前线路未录入价格</strong>
          <p>${[start, ...stops].map(getLocationLabel).join(" → ")}</p>
        </div>
      `,
      hasNoDate: !trip.querySelector(".trip-date").value
    };
  }

  tripTotal += basePrice;
  tripDetails.push(`包车基础价：${basePrice} THB`);

  const extraCrossCount = getExtraCrossCount(start, stops);
  if (extraCrossCount > 0) {
    const crossFee = extraCrossCount * 500;
    tripTotal += crossFee;
    tripDetails.push(`额外跨区费：${extraCrossCount} 次 × 500 = ${crossFee} THB`);
  }

  if (sameDayReturn) {
    const lastStop = stops[stops.length - 1] || start;
    const returnFee = returnFees[lastStop] || 0;
    if (returnFee > 0) {
      tripTotal += returnFee;
      tripDetails.push(`当天返回出发地：${returnFee} THB`);
    } else {
      tripDetails.push("当天返回出发地：当前地区未设置往返价，未加收");
    }
  }

  if (isHoliday(trip)) {
    tripTotal += 500;
    tripDetails.push("节假日附加：500 THB");
  }

  const overnightFee = calculateExtra(trip.querySelector(".extra-overnight").checked, trip.querySelector(".extra-overnight-qty"), 500);
  if (overnightFee > 0) {
    tripTotal += overnightFee;
    tripDetails.push(`外宿费：${overnightFee} THB`);
  }

  const overtimeChecked = trip.querySelector(".extra-overtime").checked;
  const overtimeQty = getQtyValue(overtimeChecked, trip.querySelector(".extra-overtime-qty"));
  const overtimeFee = getOvertimePrice(carKey, overtimeQty);
  if (overtimeFee > 0) {
    tripTotal += overtimeFee;
    if (carKey === "alphard") {
      tripDetails.push(`超时费：${overtimeQty} × 250 = ${overtimeFee} THB`);
    } else {
      tripDetails.push(`超时费：按规则计算 = ${overtimeFee} THB`);
    }
  }

  const siamFee = calculateExtra(trip.querySelector(".extra-siam").checked, trip.querySelector(".extra-siam-qty"), 300);
  if (siamFee > 0) {
    tripTotal += siamFee;
    tripDetails.push(`暹罗古城：${siamFee} THB`);
  }

  const zooFee = calculateExtra(trip.querySelector(".extra-zoo").checked, trip.querySelector(".extra-zoo-qty"), 300);
  if (zooFee > 0) {
    tripTotal += zooFee;
    tripDetails.push(`野生动物园开车进入费用：${zooFee} THB`);
  }

  const fotongFee = calculateExtra(trip.querySelector(".extra-fotong").checked, trip.querySelector(".extra-fotong-qty"), 300);
  if (fotongFee > 0) {
    tripTotal += fotongFee;
    tripDetails.push(`佛统超区费：${fotongFee} THB`);
  }

  const danuenFee = calculateExtra(trip.querySelector(".extra-danuen").checked, trip.querySelector(".extra-danuen-qty"), 300);
  if (danuenFee > 0) {
    tripTotal += danuenFee;
    tripDetails.push(`丹嫩美攻包车去佛统其他景点：${danuenFee} THB`);
  }

  const lionFee = calculateExtra(trip.querySelector(".extra-lion").checked, trip.querySelector(".extra-lion-qty"), 500);
  if (lionFee > 0) {
    tripTotal += lionFee;
    tripDetails.push(`大城包车去狮子园：${lionFee} THB`);
  }

  if (driverType === "chinese") {
    const airportTripFee = calculateExtra(trip.querySelector(".extra-airport-trip").checked, trip.querySelector(".extra-airport-trip-qty"), 500);
    if (airportTripFee > 0) {
      tripTotal += airportTripFee;
      tripDetails.push(`中文司机包车接送机：${airportTripFee} THB`);
    }
  }

  const routeText = [start, ...stops].map(getLocationLabel).join(" → ");

  return {
    tripTotal,
    html: `
      <div class="result-block">
        <strong>第 ${index + 1} 段行程：${tripTotal} THB</strong>
        <p class="price-note">${routeText}</p>
        ${tripDetails.map(item => `<p>${item}</p>`).join("")}
      </div>
    `,
    hasNoDate: !trip.querySelector(".trip-date").value
  };
}

function getChineseSinglePrice(carKey, start, end) {
  if (start === "bangkok" && end === "bangkok") {
    return singleRoutePrices.chinese.bangkok_city[carKey];
  }

  if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
    return singleRoutePrices.chinese.bangkok_pattaya[carKey];
  }

  return null;
}

function getThaiSinglePrice(carKey, singleType, start, end, airport) {
  if (singleType === "airport_pickup") {
    if (start === "bangkok" && end === "bangkok") {
      return singleRoutePrices.thai.airport_bangkok[carKey];
    }

    if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
      return airport === "dmk" ? singleRoutePrices.thai.airport_pattaya_dmk[carKey] : singleRoutePrices.thai.airport_pattaya_bkk[carKey];
    }

    if ((start === "bangkok" && end === "huahin") || (start === "huahin" && end === "bangkok")) {
      return airport === "dmk" ? singleRoutePrices.thai.airport_huahin_dmk[carKey] : singleRoutePrices.thai.airport_huahin_bkk[carKey];
    }

    if ((start === "bangkok" && end === "ayutthaya") || (start === "ayutthaya" && end === "bangkok")) {
      return airport === "dmk" ? singleRoutePrices.thai.airport_ayutthaya_dmk[carKey] : singleRoutePrices.thai.airport_ayutthaya_bkk[carKey];
    }

    if ((start === "bangkok" && end === "rayong") || (start === "rayong" && end === "bangkok")) {
      return airport === "dmk" ? singleRoutePrices.thai.airport_rayong_dmk[carKey] : singleRoutePrices.thai.airport_rayong_bkk[carKey];
    }
  }

  if (singleType === "normal_single") {
    if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
      return singleRoutePrices.thai.airport_pattaya_dmk[carKey];
    }

    if ((start === "bangkok" && end === "kanchanaburi") || (start === "kanchanaburi" && end === "bangkok")) {
      return singleRoutePrices.thai.bangkok_kanchanaburi[carKey];
    }

    if ((start === "bangkok" && end === "rayong") || (start === "rayong" && end === "bangkok")) {
      return singleRoutePrices.thai.airport_rayong_dmk[carKey];
    }

    if ((start === "bangkok" && end === "huahin") || (start === "huahin" && end === "bangkok")) {
      return singleRoutePrices.thai.airport_huahin_dmk[carKey];
    }

    if ((start === "bangkok" && end === "ayutthaya") || (start === "ayutthaya" && end === "bangkok")) {
      return singleRoutePrices.thai.airport_ayutthaya_bkk[carKey];
    }
  }

  return null;
}

function calculateSingleTrip(trip, carKey, index) {
  const driverType = trip.querySelector(".driver-type").value;
  const singleType = trip.querySelector(".single-type").value;
  const start = trip.querySelector(".single-start").value;
  const end = trip.querySelector(".single-end").value;
  const airport = trip.querySelector(".airport-type").value;

  let tripTotal = 0;
  const tripDetails = [];
  let manualConfirm = false;

  let basePrice = null;

  if (driverType === "chinese") {
    basePrice = getChineseSinglePrice(carKey, start, end);
    if (carKey === "alphard") {
      manualConfirm = true;
    }
  } else {
    basePrice = getThaiSinglePrice(carKey, singleType, start, end, airport);
    if (carKey === "alphard" && basePrice == null) {
      manualConfirm = true;
    }
  }

  if (manualConfirm) {
    return {
      tripTotal: 0,
      html: `
        <div class="result-block">
          <strong>第 ${index + 1} 段行程：价格浮动，需单独确认</strong>
          <p>${getLocationLabel(start)} → ${getLocationLabel(end)}</p>
        </div>
      `,
      hasNoDate: !trip.querySelector(".trip-date").value,
      manualConfirm: true
    };
  }

  if (basePrice == null) {
    return {
      tripTotal: 0,
      html: `
        <div class="result-block">
          <strong>第 ${index + 1} 段行程：当前线路未录入价格</strong>
          <p>${getLocationLabel(start)} → ${getLocationLabel(end)}</p>
        </div>
      `,
      hasNoDate: !trip.querySelector(".trip-date").value,
      manualConfirm: true
    };
  }

  tripTotal += basePrice;
  tripDetails.push(`单趟基础价：${basePrice} THB`);

  const crossArea = start !== end;
  if (isHoliday(trip)) {
    const holidayFee = crossArea ? holidaySingleFees.cross[carKey] : holidaySingleFees.noCross[carKey];
    tripTotal += holidayFee;
    tripDetails.push(`节假日附加：${holidayFee} THB`);
  }

  const hotelFee = calculateExtra(trip.querySelector(".extra-hotel").checked, trip.querySelector(".extra-hotel-qty"), 200);
  if (hotelFee > 0) {
    tripTotal += hotelFee;
    tripDetails.push(`接送多个酒店：${hotelFee} THB`);
  }

  const stopFee = calculateExtra(trip.querySelector(".extra-stop").checked, trip.querySelector(".extra-stop-qty"), 200);
  if (stopFee > 0) {
    tripTotal += stopFee;
    tripDetails.push(`中途停10-30分钟：${stopFee} THB`);
  }

  return {
    tripTotal,
    html: `
      <div class="result-block">
        <strong>第 ${index + 1} 段行程：${tripTotal} THB</strong>
        <p class="price-note">${getLocationLabel(start)} → ${getLocationLabel(end)}</p>
        ${tripDetails.map(item => `<p>${item}</p>`).join("")}
      </div>
    `,
    hasNoDate: !trip.querySelector(".trip-date").value,
    manualConfirm: false
  };
}

function calculatePrice() {
  const trips = document.querySelectorAll(".trip-item");
  const resultDetail = document.getElementById("resultDetail");
  const totalPriceEl = document.getElementById("totalPrice");
  const finalNoticeEl = document.getElementById("finalNotice");

  if (trips.length === 0) {
    resultDetail.innerHTML = "<p>请先添加行程</p>";
    totalPriceEl.innerText = "总价：0 THB";
    finalNoticeEl.innerText = "";
    return;
  }

  const carKey = document.getElementById("carType").value;

  let total = 0;
  let htmlList = [];
  let hasNoDate = false;
  let hasManualConfirm = false;

  trips.forEach((trip, index) => {
    const serviceType = trip.querySelector(".service-type").value;
    const result = serviceType === "charter"
      ? calculateCharterTrip(trip, carKey, index)
      : calculateSingleTrip(trip, carKey, index);

    total += result.tripTotal;
    htmlList.push(result.html);

    if (result.hasNoDate) hasNoDate = true;
    if (result.manualConfirm) hasManualConfirm = true;
  });

  resultDetail.innerHTML = htmlList.join("");

  if (hasManualConfirm) {
    totalPriceEl.innerText = `总价：${total} THB（部分线路需单独确认）`;
  } else {
    totalPriceEl.innerText = `总价：${total} THB`;
  }

  let notices = [];
  if (hasNoDate) notices.push("未选日期的行程，未计入节假日浮动。");
  if (hasManualConfirm) notices.push("部分线路或车型价格浮动，需单独确认。");
  finalNoticeEl.innerText = notices.join(" ");
}

addTrip();
updateCarInfo();
bindAutoCalculate(document);
calculatePrice();
