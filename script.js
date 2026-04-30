const STORAGE_KEY = "ruixing_thailand_quote_state_v3";

function clampNonNegativeInt(value, fallback = 0) {
  const n = Number(value);
  if (Number.isNaN(n) || n < 0) return fallback;
  return Math.floor(n);
}

function clampPositiveInt(value, fallback = 1) {
  const n = Number(value);
  if (Number.isNaN(n) || n <= 0) return fallback;
  return Math.floor(n);
}

function showPickerSafe(input) {
  if (typeof input.showPicker === "function") {
    try {
      input.showPicker();
    } catch (e) {}
  }
}

function bindDatePickerOpen(container = document) {
  container.querySelectorAll(".date-picker, .trip-date, .ticket-date").forEach(input => {
    input.addEventListener("click", () => showPickerSafe(input));
    input.addEventListener("focus", () => showPickerSafe(input));
  });
}

function getCarKeys() {
  return Object.keys(APP_DATA.cars);
}

function getLocationLabel(value) {
  const found = APP_DATA.locations.find(item => item.value === value);
  return found ? found.label : value;
}

function getCarData() {
  return APP_DATA.cars[document.getElementById("carType").value];
}

function getPassengerWarning(car, passengerCount) {
  if (!passengerCount || passengerCount <= 0) {
    return { type: "red", text: "请输入正确人数。" };
  }
  if (passengerCount >= car.warningRules.red) {
    return { type: "red", text: "该人数使用此车型可能会拥挤或无法承载，请重新选择。" };
  }
  if (passengerCount >= car.warningRules.yellow) {
    return { type: "yellow", text: "该人数使用此车型可能会比较拥挤，请谨慎确认。" };
  }
  return { type: "green", text: "当前人数在该车型可承载范围内，乘坐舒适度较佳。" };
}

function setMainVehicleImage(src) {
  const main = document.getElementById("vehicleMainImage");
  const overview = document.getElementById("overviewImage");
  const download = document.getElementById("downloadVehicleImage");
  main.src = src;
  overview.src = src;
  download.href = src;
}

function updateVehiclePanel() {
  const car = getCarData();
  const passengerCount = clampPositiveInt(document.getElementById("passengerCount").value, 1);
  document.getElementById("passengerCount").value = passengerCount;
  const dateValue = document.getElementById("globalDate").value || "未选择";

  document.getElementById("vehicleTitle").textContent = car.name;
  document.getElementById("vehicleSeatAdvice").textContent = car.suggestedSeatsText;
  document.getElementById("vehicleLuggageAdvice").textContent = car.suggestedLuggageText;
  document.getElementById("vehicleLuggageSize").textContent = `行李参考：${car.luggageSizeText}`;
  document.getElementById("overviewCar").textContent = car.name;
  document.getElementById("overviewPassengers").textContent = `${passengerCount}人`;
  document.getElementById("overviewDate").textContent = dateValue;
  document.getElementById("overviewSeatAdvice").textContent = car.suggestedSeatsText;
  document.getElementById("overviewLuggageAdvice").textContent = car.suggestedLuggageText;
  document.getElementById("overviewLuggageSize").textContent = car.luggageSizeText;

  setMainVehicleImage(car.images[0]);

  const sceneList = document.getElementById("vehicleScenes");
  sceneList.innerHTML = car.scenes.map(x => `<li>${x}</li>`).join("");

  const warning = getPassengerWarning(car, passengerCount);
  const warningBox = document.getElementById("vehicleWarningBox");
  warningBox.className = `warning-box ${warning.type}`;
  warningBox.textContent = warning.text;

  const overviewStatusBox = document.getElementById("overviewStatusBox");
  overviewStatusBox.className = `status-box ${warning.type}`;
  overviewStatusBox.textContent = warning.text;
}

function initBaseSelectors() {
  const carSelect = document.getElementById("carType");
  carSelect.innerHTML = getCarKeys()
    .map(key => `<option value="${key}">${APP_DATA.cars[key].name}</option>`)
    .join("");
}

function bindBaseEvents() {
  document.getElementById("carType").addEventListener("change", () => {
    updateVehiclePanel();
    updateAllResults();
    saveState();
  });
  document.getElementById("passengerCount").addEventListener("input", () => {
    updateVehiclePanel();
    saveState();
  });
  document.getElementById("globalDate").addEventListener("change", () => {
    updateVehiclePanel();
    updateAllResults();
    saveState();
  });
}

function createLocationOptions(selected = "bangkok") {
  return APP_DATA.locations
    .map(item => `<option value="${item.value}" ${item.value === selected ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function createDriverTypeOptions(selected = "thai") {
  return APP_DATA.driverTypes
    .map(item => `<option value="${item.value}" ${item.value === selected ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function createServiceTypeOptions(selected = "charter") {
  return APP_DATA.serviceTypes
    .map(item => `<option value="${item.value}" ${item.value === selected ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function buildDestinationRow(value = "bangkok") {
  const row = document.createElement("div");
  row.className = "destination-row";
  row.style.marginTop = "10px";
  row.innerHTML = `
    <div class="trip-grid-2" style="grid-template-columns: 1fr auto;">
      <div>
        <label>附加目的地</label>
        <select class="trip-extra-stop">
          ${createLocationOptions(value)}
        </select>
      </div>
      <button type="button" class="delete-btn remove-destination-btn">删除</button>
    </div>
  `;
  row.querySelector(".remove-destination-btn").addEventListener("click", () => {
    row.remove();
    updateAllResults();
    saveState();
  });
  row.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", onAnyFieldChange);
    el.addEventListener("input", onAnyFieldChange);
  });
  return row;
}

function createTripCard(index, data = null) {
  const card = document.createElement("div");
  card.className = "trip-card";
  card.dataset.index = index;

  const trip = Object.assign({
    date: "",
    driverType: "thai",
    serviceType: "charter",
    start: "bangkok",
    end: "bangkok",
    holiday: "no",
    hours: "10",
    sameDayReturn: "no",
    singleType: "airport_pickup",
    airport: "none",
    extraStops: [],
    extras: {}
  }, data || {});

  card.innerHTML = `
    <div class="trip-title">第 ${index + 1} 段行程</div>

    <div class="trip-grid">
      <div>
        <label>日期 <span class="red-text">（选填）</span></label>
        <input class="trip-date date-picker" type="date" value="${trip.date || ""}" />
        <div class="field-note">节假日用车必选</div>
      </div>

      <div>
        <label>司机类型</label>
        <select class="trip-driver-type">${createDriverTypeOptions(trip.driverType)}</select>
      </div>

      <div>
        <label>用车方式</label>
        <select class="trip-service-type">${createServiceTypeOptions(trip.serviceType)}</select>
      </div>

      <div>
        <label>出发地</label>
        <select class="trip-start">${createLocationOptions(trip.start)}</select>
      </div>

      <div>
        <label>目的地</label>
        <select class="trip-end">${createLocationOptions(trip.end)}</select>
      </div>

      <div>
        <label>节假日用车</label>
        <select class="trip-holiday">
          <option value="no" ${trip.holiday === "no" ? "selected" : ""}>否</option>
          <option value="yes" ${trip.holiday === "yes" ? "selected" : ""}>是</option>
        </select>
      </div>
    </div>

    <div class="trip-grid-2 trip-charter-only">
      <div>
        <label>用车时长</label>
        <select class="trip-hours"></select>
      </div>

      <div>
        <label>当天返回出发地</label>
        <select class="trip-return">
          <option value="no" ${trip.sameDayReturn === "no" ? "selected" : ""}>否</option>
          <option value="yes" ${trip.sameDayReturn === "yes" ? "selected" : ""}>是</option>
        </select>
        <div class="field-note">芭提雅/考艾 +500；华欣/北碧/罗勇 +1000</div>
      </div>

      <div>
        <button type="button" class="add-btn add-destination-btn">+ 添加目的地</button>
      </div>
    </div>

    <div class="extra-destination-list trip-charter-only"></div>

    <div class="trip-grid-2 trip-single-only">
      <div>
        <label>单趟类型</label>
        <select class="trip-single-type">
          <option value="airport_pickup" ${trip.singleType === "airport_pickup" ? "selected" : ""}>接机/送机</option>
          <option value="normal_single" ${trip.singleType === "normal_single" ? "selected" : ""}>普通单趟</option>
        </select>
      </div>
      <div>
        <label>机场</label>
        <select class="trip-airport">
          <option value="none" ${trip.airport === "none" ? "selected" : ""}>不涉及机场</option>
          <option value="bkk" ${trip.airport === "bkk" ? "selected" : ""}>素万那普机场</option>
          <option value="dmk" ${trip.airport === "dmk" ? "selected" : ""}>廊曼机场</option>
        </select>
      </div>
    </div>

    <details class="fold-box trip-charter-only">
      <summary>包车附加项</summary>
      <div class="fold-body">
        ${renderCharterExtras(trip)}
      </div>
    </details>

    <details class="fold-box trip-single-only">
      <summary>单趟附加项</summary>
      <div class="fold-body">
        ${renderSingleExtras(trip)}
      </div>
    </details>

    <div style="margin-top:12px;">
      <button type="button" class="delete-btn trip-delete-btn">删除行程</button>
    </div>
  `;

  const extraList = card.querySelector(".extra-destination-list");
  trip.extraStops.forEach(stop => extraList.appendChild(buildDestinationRow(stop)));

  card.querySelector(".add-destination-btn").addEventListener("click", () => {
    extraList.appendChild(buildDestinationRow());
    updateAllResults();
    saveState();
  });

  bindTripCardEvents(card);
  refreshTripCardFields(card);
  bindDatePickerOpen(card);
  return card;
}

function renderCharterExtras(trip) {
  const extras = trip.extras || {};
  return `
    ${charterExtraHtml("overnight", APP_DATA.extras.charter.overnight, extras.overnight)}
    ${charterExtraHtml("overtime", getOvertimeMeta(), extras.overtime)}
    ${charterExtraHtml("siam", APP_DATA.extras.charter.siam, extras.siam)}
    ${charterExtraHtml("zoo", APP_DATA.extras.charter.zoo, extras.zoo)}
    ${charterExtraHtml("fotong", APP_DATA.extras.charter.fotong, extras.fotong)}
    ${charterExtraHtml("danuen", APP_DATA.extras.charter.danuen, extras.danuen)}
    ${charterExtraHtml("lion", APP_DATA.extras.charter.lion, extras.lion)}
    ${charterExtraHtml("airportChinese", APP_DATA.extras.charter.airportChinese, extras.airportChinese, true)}
  `;
}

function charterExtraHtml(key, meta, state = {}, chineseOnly = false) {
  return `
    <div class="extra-item ${chineseOnly ? "extra-chinese-only" : ""}" data-extra-key="${key}">
      <div class="trip-extra-grid">
        <div class="extra-label">
          <label>
            <input type="checkbox" class="extra-check" ${state.checked ? "checked" : ""}>
            ${meta.label}
          </label>
        </div>
        <input class="extra-qty" type="number" min="1" placeholder="数量" value="${state.qty || ""}" />
      </div>
      <div class="field-note">${meta.note || ""}</div>
    </div>
  `;
}

function renderSingleExtras(trip) {
  const extras = trip.extras || {};
  return `
    ${singleExtraHtml("multiHotel", APP_DATA.extras.single.multiHotel, extras.multiHotel)}
    ${singleExtraHtml("stop1030", APP_DATA.extras.single.stop1030, extras.stop1030)}
  `;
}

function singleExtraHtml(key, meta, state = {}) {
  return `
    <div class="extra-item" data-single-extra-key="${key}">
      <div class="trip-extra-grid">
        <div class="extra-label">
          <label>
            <input type="checkbox" class="single-extra-check" ${state.checked ? "checked" : ""}>
            ${meta.label}
          </label>
        </div>
        <input class="single-extra-qty" type="number" min="1" placeholder="数量" value="${state.qty || ""}" />
      </div>
      <div class="field-note">${meta.note || ""}</div>
    </div>
  `;
}

function bindTripCardEvents(card) {
  card.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", onAnyFieldChange);
    el.addEventListener("input", onAnyFieldChange);
  });

  card.querySelector(".trip-delete-btn").addEventListener("click", () => {
    card.remove();
    refreshTripTitles();
    updateAllResults();
    saveState();
  });
}

function onAnyFieldChange(e) {
  sanitizeInput(e.target);
  const tripCard = e.target.closest(".trip-card");
  if (tripCard) refreshTripCardFields(tripCard);
  updateVehiclePanel();
  updateAllResults();
  saveState();
}

function sanitizeInput(el) {
  if (el.type === "number") {
    const min = el.min !== "" ? Number(el.min) : null;
    const val = Number(el.value);
    if (el.value === "") return;
    if (Number.isNaN(val)) {
      el.value = min !== null ? min : 0;
      return;
    }
    if (min !== null && val < min) {
      el.value = min;
    }
  }
}

function refreshTripTitles() {
  document.querySelectorAll(".trip-card").forEach((card, idx) => {
    card.dataset.index = idx;
    card.querySelector(".trip-title").textContent = `第 ${idx + 1} 段行程`;
  });
}

function getOvertimeMeta() {
  const carKey = document.getElementById("carType").value;
  if (carKey === "sedan" || carKey === "suv7") return APP_DATA.extras.charter.overtimeSedanSuv;
  if (carKey === "v8" || carKey === "v9") return APP_DATA.extras.charter.overtimeVan;
  return APP_DATA.extras.charter.overtimeAlphard;
}

function refreshTripCardFields(card) {
  const driverType = card.querySelector(".trip-driver-type").value;
  const serviceType = card.querySelector(".trip-service-type").value;

  card.querySelectorAll(".trip-charter-only").forEach(el => el.classList.toggle("hidden", serviceType !== "charter"));
  card.querySelectorAll(".trip-single-only").forEach(el => el.classList.toggle("hidden", serviceType !== "single"));

  const hourSelect = card.querySelector(".trip-hours");
  const currentVal = hourSelect.value || "10";
  if (driverType === "thai") {
    hourSelect.innerHTML = `
      <option value="6">6小时</option>
      <option value="8">8小时</option>
      <option value="10">10小时</option>
    `;
  } else {
    hourSelect.innerHTML = `
      <option value="8">8小时</option>
      <option value="10">10小时</option>
    `;
  }
  if ([...hourSelect.options].some(o => o.value === currentVal)) {
    hourSelect.value = currentVal;
  } else {
    hourSelect.value = "10";
  }

  const overtimeItem = card.querySelector('[data-extra-key="overtime"]');
  if (overtimeItem) {
    overtimeItem.querySelector(".extra-label").innerHTML = `
      <label>
        <input type="checkbox" class="extra-check" ${overtimeItem.querySelector(".extra-check")?.checked ? "checked" : ""}>
        ${getOvertimeMeta().label}
      </label>
    `;
    overtimeItem.querySelector(".field-note").textContent = getOvertimeMeta().note;
  }

  card.querySelectorAll(".extra-chinese-only").forEach(el => {
    el.classList.toggle("hidden", driverType !== "chinese");
    if (driverType !== "chinese") {
      const check = el.querySelector(".extra-check");
      const qty = el.querySelector(".extra-qty");
      if (check) check.checked = false;
      if (qty) qty.value = "";
    }
  });
}

function getQtyValue(checked, inputEl) {
  if (!checked) return 0;
  const raw = inputEl.value.trim();
  if (!raw) return 1;
  return clampPositiveInt(raw, 1);
}

function getCharterBasePrice(driverType, carKey, start, firstStop) {
  const table = APP_DATA.charterBasePrice[driverType][carKey];
  if (firstStop === start) return table.bangkok;
  if (start === "bangkok") return table[firstStop] ?? null;
  if (firstStop === "bangkok") return table[start] ?? null;
  return table[firstStop] ?? null;
}

function getExtraCrossCount(start, stops) {
  const cleanStops = stops.filter(Boolean);
  if (!cleanStops.length) return 0;
  let extra = 0;
  let prev = cleanStops[0];
  for (let i = 1; i < cleanStops.length; i++) {
    if (cleanStops[i] !== prev) extra += 1;
    prev = cleanStops[i];
  }
  return extra;
}

function getChineseSinglePrice(carKey, start, end) {
  if (start === "bangkok" && end === "bangkok") {
    return APP_DATA.singleRoutePrices.chinese.bangkok_city[carKey];
  }
  if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
    return APP_DATA.singleRoutePrices.chinese.bangkok_pattaya[carKey];
  }
  return null;
}

function getThaiSinglePrice(carKey, singleType, start, end, airport) {
  const table = APP_DATA.singleRoutePrices.thai;
  if (singleType === "airport_pickup") {
    if (start === "bangkok" && end === "bangkok") return table.airport_bangkok[carKey];
    if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
      return airport === "dmk" ? table.airport_pattaya_dmk[carKey] : table.airport_pattaya_bkk[carKey];
    }
    if ((start === "bangkok" && end === "huahin") || (start === "huahin" && end === "bangkok")) {
      return airport === "dmk" ? table.airport_huahin_dmk[carKey] : table.airport_huahin_bkk[carKey];
    }
    if ((start === "bangkok" && end === "ayutthaya") || (start === "ayutthaya" && end === "bangkok")) {
      return airport === "dmk" ? table.airport_ayutthaya_dmk[carKey] : table.airport_ayutthaya_bkk[carKey];
    }
    if ((start === "bangkok" && end === "rayong") || (start === "rayong" && end === "bangkok")) {
      return airport === "dmk" ? table.airport_rayong_dmk[carKey] : table.airport_rayong_bkk[carKey];
    }
  }
  if (singleType === "normal_single") {
    if ((start === "bangkok" && end === "pattaya") || (start === "pattaya" && end === "bangkok")) {
      return table.airport_pattaya_dmk[carKey];
    }
    if ((start === "bangkok" && end === "kanchanaburi") || (start === "kanchanaburi" && end === "bangkok")) {
      return table.bangkok_kanchanaburi[carKey];
    }
    if ((start === "bangkok" && end === "rayong") || (start === "rayong" && end === "bangkok")) {
      return table.airport_rayong_dmk[carKey];
    }
    if ((start === "bangkok" && end === "huahin") || (start === "huahin" && end === "bangkok")) {
      return table.airport_huahin_dmk[carKey];
    }
    if ((start === "bangkok" && end === "ayutthaya") || (start === "ayutthaya" && end === "bangkok")) {
      return table.airport_ayutthaya_bkk[carKey];
    }
  }
  return null;
}

function getOvertimeFee(card, carKey) {
  const overtimeItem = card.querySelector('[data-extra-key="overtime"]');
  const checked = overtimeItem.querySelector(".extra-check").checked;
  const qty = getQtyValue(checked, overtimeItem.querySelector(".extra-qty"));
  if (!qty) return 0;

  if (carKey === "alphard") return qty * APP_DATA.extras.charter.overtimeAlphard.price;
  if (carKey === "sedan" || carKey === "suv7") return Math.ceil(qty) * APP_DATA.extras.charter.overtimeSedanSuv.price;
  return Math.ceil(qty) * APP_DATA.extras.charter.overtimeVan.price;
}

function calculateTripLine(card, index) {
  const serviceType = card.querySelector(".trip-service-type").value;
  const driverType = card.querySelector(".trip-driver-type").value;
  const start = card.querySelector(".trip-start").value;
  const end = card.querySelector(".trip-end").value;
  const holidayFlag = card.querySelector(".trip-holiday").value === "yes";
  const carKey = document.getElementById("carType").value;
  const tripDate = card.querySelector(".trip-date").value;

  let total = 0;
  let details = [];
  let manualConfirm = false;

  if (serviceType === "charter") {
    const extraStops = [...card.querySelectorAll(".trip-extra-stop")].map(el => el.value);
    const allStops = [end, ...extraStops];
    const firstStop = allStops[0] || start;
    const basePrice = getCharterBasePrice(driverType, carKey, start, firstStop);

    if (basePrice == null) {
      return {
        total: 0,
        html: `<div class="result-block"><strong>第 ${index + 1} 段行程：当前线路未录入价格</strong><div class="muted">${getLocationLabel(start)} → ${allStops.map(getLocationLabel).join(" → ")}</div></div>`,
        hasNoDate: !tripDate,
        manualConfirm: true,
        summary: `第${index + 1}段：当前线路未录入价格`
      };
    }

    total += basePrice;
    details.push(`包车基础价：${basePrice} THB`);

    const extraCrossCount = getExtraCrossCount(start, allStops);
    if (extraCrossCount > 0) {
      const crossFee = extraCrossCount * 500;
      total += crossFee;
      details.push(`额外跨区费：${extraCrossCount} 次 × 500 = ${crossFee} THB`);
    }

    if (card.querySelector(".trip-return").value === "yes") {
      const returnFee = APP_DATA.returnFees[allStops[allStops.length - 1]] || 0;
      if (returnFee > 0) {
        total += returnFee;
        details.push(`当天返回出发地：${returnFee} THB`);
      }
    }

    if (holidayFlag) {
      total += 500;
      details.push("节假日附加：500 THB");
    }

    card.querySelectorAll('[data-extra-key]').forEach(item => {
      const key = item.dataset.extraKey;
      if (key === "overtime") return;
      if (key === "airportChinese" && driverType !== "chinese") return;
      const meta = APP_DATA.extras.charter[key];
      const fee = getQtyValue(item.querySelector(".extra-check").checked, item.querySelector(".extra-qty")) * meta.price;
      if (fee > 0) {
        total += fee;
        details.push(`${meta.label.replace(/\s*\+.*/, "")}：${fee} THB`);
      }
    });

    const overtime = getOvertimeFee(card, carKey);
    if (overtime > 0) {
      total += overtime;
      details.push(`超时费：${overtime} THB`);
    }

    const routeText = [start, ...allStops].map(getLocationLabel).join(" → ");
    return {
      total,
      html: `
        <div class="result-block">
          <strong>第 ${index + 1} 段行程：${total} THB</strong>
          <div class="muted">包车 ｜ ${routeText}</div>
          ${details.map(x => `<div class="muted">${x}</div>`).join("")}
        </div>
      `,
      hasNoDate: !tripDate,
      manualConfirm,
      summary: `第${index + 1}段：包车｜${routeText}｜${total} THB`
    };
  }

  const singleType = card.querySelector(".trip-single-type").value;
  const airport = card.querySelector(".trip-airport").value;
  let basePrice = null;

  if (driverType === "chinese") {
    basePrice = getChineseSinglePrice(carKey, start, end);
    if (carKey === "alphard") manualConfirm = true;
  } else {
    basePrice = getThaiSinglePrice(carKey, singleType, start, end, airport);
    if (carKey === "alphard" && basePrice == null) manualConfirm = true;
  }

  if (manualConfirm) {
    return {
      total: 0,
      html: `<div class="result-block"><strong>第 ${index + 1} 段行程：价格浮动，需单独确认</strong><div class="muted">${getLocationLabel(start)} → ${getLocationLabel(end)}</div></div>`,
      hasNoDate: !tripDate,
      manualConfirm: true,
      summary: `第${index + 1}段：单趟｜需单独确认`
    };
  }

  if (basePrice == null) {
    return {
      total: 0,
      html: `<div class="result-block"><strong>第 ${index + 1} 段行程：当前线路未录入价格</strong><div class="muted">${getLocationLabel(start)} → ${getLocationLabel(end)}</div></div>`,
      hasNoDate: !tripDate,
      manualConfirm: true,
      summary: `第${index + 1}段：单趟｜当前线路未录入`
    };
  }

  total += basePrice;
  details.push(`单趟基础价：${basePrice} THB`);

  if (holidayFlag) {
    const cross = start !== end;
    const holidayFee = cross ? APP_DATA.holidaySingleFees.cross[carKey] : APP_DATA.holidaySingleFees.noCross[carKey];
    total += holidayFee;
    details.push(`节假日附加：${holidayFee} THB`);
  }

  card.querySelectorAll('[data-single-extra-key]').forEach(item => {
    const key = item.dataset.singleExtraKey;
    const meta = APP_DATA.extras.single[key];
    const fee = getQtyValue(item.querySelector(".single-extra-check").checked, item.querySelector(".single-extra-qty")) * meta.price;
    if (fee > 0) {
      total += fee;
      details.push(`${meta.label.replace(/\s*\+.*/, "")}：${fee} THB`);
    }
  });

  const routeText = `${getLocationLabel(start)} → ${getLocationLabel(end)}`;
  return {
    total,
    html: `
      <div class="result-block">
        <strong>第 ${index + 1} 段行程：${total} THB</strong>
        <div class="muted">单趟 ｜ ${routeText}</div>
        ${details.map(x => `<div class="muted">${x}</div>`).join("")}
      </div>
    `,
    hasNoDate: !tripDate,
    manualConfirm,
    summary: `第${index + 1}段：单趟｜${routeText}｜${total} THB`
  };
}

function createTicketGroupOptions(selected = "") {
  return Object.entries(APP_DATA.ticketGroups)
    .map(([key, group]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${group.label}</option>`)
    .join("");
}

function createTicketItemOptions(groupKey, selected = "") {
  const group = APP_DATA.ticketGroups[groupKey];
  if (!group) return "";
  return Object.entries(group.items)
    .map(([key, item]) => `<option value="${key}" ${selected === key ? "selected" : ""}>${item.label}</option>`)
    .join("");
}

function createTicketCard(index, data = null) {
  const firstGroupKey = Object.keys(APP_DATA.ticketGroups)[0];
  const firstItemKey = Object.keys(APP_DATA.ticketGroups[firstGroupKey].items)[0];
  const ticket = Object.assign({
    groupKey: firstGroupKey,
    itemKey: firstItemKey,
    date: "",
    adultCount: 1,
    childCount: 0,
    infantCount: 0
  }, data || {});

  const card = document.createElement("div");
  card.className = "ticket-card";
  card.dataset.index = index;

  card.innerHTML = `
    <div class="ticket-title">第 ${index + 1} 个门票</div>

    <div class="ticket-grid">
      <div>
        <label>景点</label>
        <select class="ticket-group-key">
          ${createTicketGroupOptions(ticket.groupKey)}
        </select>
      </div>

      <div>
        <label>项目</label>
        <select class="ticket-item-key">
          ${createTicketItemOptions(ticket.groupKey, ticket.itemKey)}
        </select>
      </div>

      <div>
        <label>日期（选填）</label>
        <input class="ticket-date date-picker" type="date" value="${ticket.date || ""}" />
      </div>

      <div>
        <label>成人数量</label>
        <input class="ticket-adult-count" type="number" min="0" value="${ticket.adultCount}" />
      </div>

      <div>
        <label>成人单价</label>
        <input class="ticket-adult-price" type="number" min="0" />
      </div>

      <div>
        <label>儿童数量</label>
        <input class="ticket-child-count" type="number" min="0" value="${ticket.childCount}" />
      </div>

      <div>
        <label>儿童单价</label>
        <input class="ticket-child-price" type="number" min="0" />
      </div>

      <div>
        <label>婴儿数量</label>
        <input class="ticket-infant-count" type="number" min="0" value="${ticket.infantCount}" />
      </div>

      <div>
        <label>婴儿单价</label>
        <input class="ticket-infant-price" type="number" min="0" />
      </div>

      <div>
        <button type="button" class="delete-btn ticket-delete-btn">删除</button>
      </div>
    </div>

    <div class="ticket-note-box">
      <div class="ticket-note-title">门票说明</div>
      <div class="ticket-note-text ticket-description"></div>
      <div class="ticket-note-text ticket-note"></div>
    </div>
  `;

  bindTicketCardEvents(card);
  applyTicketItemData(card);
  bindDatePickerOpen(card);
  return card;
}

function bindTicketCardEvents(card) {
  const groupSelect = card.querySelector(".ticket-group-key");
  const itemSelect = card.querySelector(".ticket-item-key");

  groupSelect.addEventListener("change", () => {
    itemSelect.innerHTML = createTicketItemOptions(groupSelect.value);
    applyTicketItemData(card);
    saveState();
  });

  itemSelect.addEventListener("change", () => {
    applyTicketItemData(card);
    saveState();
  });

  card.querySelectorAll("input").forEach(el => {
    el.addEventListener("change", onAnyFieldChange);
    el.addEventListener("input", onAnyFieldChange);
  });

  card.querySelector(".ticket-delete-btn").addEventListener("click", () => {
    card.remove();
    refreshTicketTitles();
    updateAllResults();
    saveState();
  });
}

function applyTicketItemData(card) {
  const groupKey = card.querySelector(".ticket-group-key").value;
  const itemKey = card.querySelector(".ticket-item-key").value;
  const item = APP_DATA.ticketGroups[groupKey].items[itemKey];

  card.querySelector(".ticket-adult-price").value = item.adultPrice;
  card.querySelector(".ticket-child-price").value = item.childPrice;
  card.querySelector(".ticket-infant-price").value = item.infantPrice;
  card.querySelector(".ticket-description").textContent = item.description ? `说明：${item.description}` : "";
  card.querySelector(".ticket-note").textContent = item.note ? `备注：${item.note}` : "";
  updateAllResults();
}

function refreshTicketTitles() {
  document.querySelectorAll(".ticket-card").forEach((card, idx) => {
    card.dataset.index = idx;
    card.querySelector(".ticket-title").textContent = `第 ${idx + 1} 个门票`;
  });
}

function addTrip(data = null) {
  const list = document.getElementById("tripList");
  const index = list.querySelectorAll(".trip-card").length;
  list.appendChild(createTripCard(index, data));
  updateAllResults();
}

function addTicket(data = null) {
  const list = document.getElementById("ticketList");
  const index = list.querySelectorAll(".ticket-card").length;
  list.appendChild(createTicketCard(index, data));
  updateAllResults();
}

function renderTripResults() {
  const box = document.getElementById("tripResultDetail");
  const summaryBox = document.getElementById("overviewTripSummary");
  const cards = document.querySelectorAll(".trip-card");

  let total = 0;
  let hasNoDate = false;
  let hasManualConfirm = false;
  const summaries = [];

  box.innerHTML = cards.length ? "" : `<div class="result-block muted">请先添加行程信息。</div>`;
  summaryBox.innerHTML = cards.length ? "" : `<div>暂无行程</div>`;

  cards.forEach((card, idx) => {
    const result = calculateTripLine(card, idx);
    total += result.total;
    if (result.hasNoDate) hasNoDate = true;
    if (result.manualConfirm) hasManualConfirm = true;
    box.insertAdjacentHTML("beforeend", result.html);
    summaries.push(result.summary);
  });

  summaries.forEach(x => summaryBox.insertAdjacentHTML("beforeend", `<div>${x}</div>`));
  document.getElementById("tripSubtotal").textContent = `${total} THB`;
  return { total, hasNoDate, hasManualConfirm };
}

function getTicketLineTotal(card) {
  const adultCount = clampNonNegativeInt(card.querySelector(".ticket-adult-count").value, 0);
  const adultPrice = clampNonNegativeInt(card.querySelector(".ticket-adult-price").value, 0);
  const childCount = clampNonNegativeInt(card.querySelector(".ticket-child-count").value, 0);
  const childPrice = clampNonNegativeInt(card.querySelector(".ticket-child-price").value, 0);
  const infantCount = clampNonNegativeInt(card.querySelector(".ticket-infant-count").value, 0);
  const infantPrice = clampNonNegativeInt(card.querySelector(".ticket-infant-price").value, 0);

  card.querySelector(".ticket-adult-count").value = adultCount;
  card.querySelector(".ticket-adult-price").value = adultPrice;
  card.querySelector(".ticket-child-count").value = childCount;
  card.querySelector(".ticket-child-price").value = childPrice;
  card.querySelector(".ticket-infant-count").value = infantCount;
  card.querySelector(".ticket-infant-price").value = infantPrice;

  return (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);
}

function renderTicketResults() {
  const box = document.getElementById("ticketResultDetail");
  const summaryBox = document.getElementById("overviewTicketSummary");
  const cards = document.querySelectorAll(".ticket-card");

  let total = 0;
  box.innerHTML = cards.length ? "" : `<div class="result-block muted">请先添加门票信息。</div>`;
  summaryBox.innerHTML = cards.length ? "" : `<div>暂无门票</div>`;

  cards.forEach((card, idx) => {
    const groupKey = card.querySelector(".ticket-group-key").value;
    const itemKey = card.querySelector(".ticket-item-key").value;
    const group = APP_DATA.ticketGroups[groupKey];
    const item = group.items[itemKey];
    const lineTotal = getTicketLineTotal(card);
    total += lineTotal;

    box.insertAdjacentHTML("beforeend", `
      <div class="result-block">
        <strong>第 ${idx + 1} 个门票：${lineTotal} THB</strong>
        <div class="muted">${group.label} - ${item.label}</div>
      </div>
    `);

    summaryBox.insertAdjacentHTML("beforeend", `<div>${group.label} - ${item.label}｜${lineTotal} THB</div>`);
  });

  document.getElementById("ticketSubtotal").textContent = `${total} THB`;
  return total;
}

function renderFinalNotice(hasNoDate, hasManualConfirm) {
  const noticeBox = document.getElementById("finalNoticeBox");
  const parts = [];
  if (hasNoDate) parts.push("• 未选日期的行程，未计入节假日浮动。");
  if (hasManualConfirm) parts.push("• 部分线路或车型价格浮动，需单独确认。");
  parts.push("• 门票价格仅供参考，请以实际出票价格为准。");
  parts.push("• 儿童/婴儿标准请以备注说明为准。");
  noticeBox.innerHTML = parts.map(x => `<div>${x}</div>`).join("");
}

function updateAllResults() {
  const tripResult = renderTripResults();
  const ticketTotal = renderTicketResults();
  const total = tripResult.total + ticketTotal;
  document.getElementById("grandTotal").textContent = `${total} THB`;
  renderFinalNotice(tripResult.hasNoDate, tripResult.hasManualConfirm);
}

function gatherState() {
  const trips = [...document.querySelectorAll(".trip-card")].map(card => {
    const extras = {};
    card.querySelectorAll('[data-extra-key]').forEach(item => {
      extras[item.dataset.extraKey] = {
        checked: item.querySelector(".extra-check")?.checked || false,
        qty: item.querySelector(".extra-qty")?.value || ""
      };
    });
    card.querySelectorAll('[data-single-extra-key]').forEach(item => {
      extras[item.dataset.singleExtraKey] = {
        checked: item.querySelector(".single-extra-check")?.checked || false,
        qty: item.querySelector(".single-extra-qty")?.value || ""
      };
    });

    return {
      date: card.querySelector(".trip-date").value,
      driverType: card.querySelector(".trip-driver-type").value,
      serviceType: card.querySelector(".trip-service-type").value,
      start: card.querySelector(".trip-start").value,
      end: card.querySelector(".trip-end").value,
      holiday: card.querySelector(".trip-holiday").value,
      hours: card.querySelector(".trip-hours").value,
      sameDayReturn: card.querySelector(".trip-return").value,
      singleType: card.querySelector(".trip-single-type").value,
      airport: card.querySelector(".trip-airport").value,
      extraStops: [...card.querySelectorAll(".trip-extra-stop")].map(el => el.value),
      extras
    };
  });

  const tickets = [...document.querySelectorAll(".ticket-card")].map(card => ({
    groupKey: card.querySelector(".ticket-group-key").value,
    itemKey: card.querySelector(".ticket-item-key").value,
    date: card.querySelector(".ticket-date").value,
    adultCount: card.querySelector(".ticket-adult-count").value,
    childCount: card.querySelector(".ticket-child-count").value,
    infantCount: card.querySelector(".ticket-infant-count").value
  }));

  return {
    carType: document.getElementById("carType").value,
    passengerCount: document.getElementById("passengerCount").value,
    globalDate: document.getElementById("globalDate").value,
    trips,
    tickets
  };
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gatherState()));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function copyQuoteAsImage() {
  const area = document.getElementById("quoteCaptureArea");
  const canvas = await html2canvas(area, { scale: 2, backgroundColor: "#ffffff" });

  canvas.toBlob(async blob => {
    if (!blob) return;

    try {
      if (navigator.clipboard && window.ClipboardItem) {
        await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
        alert("报价图片已复制到剪贴板。");
        return;
      }
    } catch (e) {}

    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "quote-result.png";
    a.click();
    URL.revokeObjectURL(a.href);
    alert("当前环境不支持直接复制，已改为下载图片。");
  });
}

function init() {
  initBaseSelectors();
  bindBaseEvents();

  document.getElementById("addTripBtn").addEventListener("click", () => {
    addTrip();
    saveState();
  });

  document.getElementById("addTicketBtn").addEventListener("click", () => {
    addTicket();
    saveState();
  });

  document.getElementById("copyQuoteBtn").addEventListener("click", copyQuoteAsImage);

  bindDatePickerOpen(document);

  const state = loadState();
  if (state) {
    document.getElementById("carType").value = state.carType || "sedan";
    document.getElementById("passengerCount").value = state.passengerCount || "2";
    document.getElementById("globalDate").value = state.globalDate || "";

    updateVehiclePanel();

    if (state.trips?.length) {
      state.trips.forEach(t => addTrip(t));
    } else {
      addTrip();
    }

    if (state.tickets?.length) {
      state.tickets.forEach(t => addTicket(t));
    } else {
      addTicket();
    }
  } else {
    updateVehiclePanel();
    addTrip();
    addTicket();
  }

  updateAllResults();
}

init();
