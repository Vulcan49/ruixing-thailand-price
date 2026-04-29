function getCarKeys() {
  return Object.keys(APP_DATA.cars);
}

function getTicketKeys() {
  return Object.keys(APP_DATA.tickets);
}

function createOptionHtml(list, valueKey = "value", labelKey = "label") {
  return list.map(item => `<option value="${item[valueKey]}">${item[labelKey]}</option>`).join("");
}

function getLocationLabel(value) {
  const found = APP_DATA.locations.find(item => item.value === value);
  return found ? found.label : value;
}

function getCarData() {
  const key = document.getElementById("carType").value;
  return APP_DATA.cars[key];
}

function setMainVehicleImage(src) {
  const main = document.getElementById("vehicleMainImage");
  const overview = document.getElementById("overviewImage");
  const download = document.getElementById("downloadVehicleImage");

  main.src = src;
  overview.src = src;
  download.href = src;
}

function renderVehicleThumbs(images) {
  const row = document.getElementById("vehicleThumbRow");
  row.innerHTML = "";

  images.forEach((src, index) => {
    const img = document.createElement("img");
    img.src = src;
    if (index === 0) img.classList.add("active");

    img.addEventListener("click", () => {
      setMainVehicleImage(src);
      row.querySelectorAll("img").forEach(el => el.classList.remove("active"));
      img.classList.add("active");
    });

    row.appendChild(img);
  });
}

function getPassengerWarning(car, passengerCount) {
  if (!passengerCount || passengerCount <= 0) {
    return { type: "green", text: "请填写人数后查看承载建议。" };
  }

  if (passengerCount >= car.warningRules.red) {
    return { type: "red", text: "该人数使用此车型可能会拥挤或无法承载，请重新选择。" };
  }

  if (passengerCount >= car.warningRules.yellow) {
    return { type: "yellow", text: "该人数使用此车型可能会比较拥挤，请谨慎确认。" };
  }

  return { type: "green", text: "当前人数在该车型可承载范围内，乘坐舒适度较佳。" };
}

function updateVehiclePanel() {
  const car = getCarData();
  const passengerCount = Number(document.getElementById("passengerCount").value || 0);
  const dateValue = document.getElementById("globalDate").value || "未选择";

  document.getElementById("vehicleTitle").textContent = car.name;
  document.getElementById("vehicleSeatAdvice").textContent = car.suggestedSeatsText;
  document.getElementById("vehicleLuggageAdvice").textContent = car.suggestedLuggageText;
  document.getElementById("vehicleLuggageSize").textContent = `行李参考：${car.luggageSizeText}`;

  const sceneList = document.getElementById("vehicleScenes");
  sceneList.innerHTML = car.scenes.map(text => `<li>${text}</li>`).join("");

  setMainVehicleImage(car.images[0]);
  renderVehicleThumbs(car.images);

  document.getElementById("overviewCar").textContent = car.name;
  document.getElementById("overviewPassengers").textContent = passengerCount ? `${passengerCount}人` : "-";
  document.getElementById("overviewDate").textContent = dateValue;
  document.getElementById("overviewSeatAdvice").textContent = car.suggestedSeatsText;
  document.getElementById("overviewLuggageAdvice").textContent = car.suggestedLuggageText;
  document.getElementById("overviewLuggageSize").textContent = car.luggageSizeText;

  const warning = getPassengerWarning(car, passengerCount);

  const warningBox = document.getElementById("vehicleWarningBox");
  warningBox.className = `warning-box ${warning.type}`;
  warningBox.textContent = warning.text;

  const overviewStatusBox = document.getElementById("overviewStatusBox");
  overviewStatusBox.className = `status-box ${warning.type}`;
  overviewStatusBox.textContent = warning.text;
}

function bindBaseEvents() {
  document.getElementById("carType").addEventListener("change", () => {
    updateVehiclePanel();
    updateAllResults();
  });

  document.getElementById("passengerCount").addEventListener("input", () => {
    updateVehiclePanel();
  });

  document.getElementById("globalDate").addEventListener("change", () => {
    updateVehiclePanel();
  });
}

function createTripCard(index) {
  const card = document.createElement("div");
  card.className = "trip-card";
  card.dataset.index = index;

  card.innerHTML = `
    <div class="trip-title">第 ${index + 1} 段行程</div>

    <div class="trip-grid">
      <div>
        <label>日期 <span class="red-text">（选填）</span></label>
        <input class="trip-date" type="date" />
        <div class="field-note">节假日用车必选</div>
      </div>

      <div>
        <label>司机类型</label>
        <select class="trip-driver-type">
          ${createOptionHtml(APP_DATA.driverTypes)}
        </select>
      </div>

      <div>
        <label>用车方式</label>
        <select class="trip-service-type">
          ${createOptionHtml(APP_DATA.serviceTypes)}
        </select>
      </div>

      <div>
        <label>出发地</label>
        <select class="trip-start">
          ${createOptionHtml(APP_DATA.locations)}
        </select>
      </div>

      <div>
        <label>目的地</label>
        <select class="trip-end">
          ${createOptionHtml(APP_DATA.locations)}
        </select>
      </div>

      <div>
        <label>节假日用车</label>
        <select class="trip-holiday">
          <option value="no">否</option>
          <option value="yes">是</option>
        </select>
      </div>
    </div>

    <div class="trip-grid" style="margin-top:12px;">
      <div class="trip-charter-only">
        <label>用车时长</label>
        <select class="trip-hours"></select>
      </div>

      <div class="trip-charter-only">
        <label>当天返回出发地</label>
        <select class="trip-return">
          <option value="no">否</option>
          <option value="yes">是</option>
        </select>
        <div class="field-note">芭提雅/考艾 +500；华欣/北碧/罗勇 +1000</div>
      </div>

      <div class="trip-single-only">
        <label>单趟类型</label>
        <select class="trip-single-type">
          <option value="airport_pickup">接机/送机</option>
          <option value="normal_single">普通单趟</option>
        </select>
      </div>

      <div class="trip-single-only">
        <label>机场</label>
        <select class="trip-airport">
          <option value="none">不涉及机场</option>
          <option value="bkk">素万那普机场</option>
          <option value="dmk">廊曼机场</option>
        </select>
      </div>
    </div>

    <div class="trip-charter-only">
      <div class="ticket-note-box" style="margin-top:14px;">
        <div class="ticket-note-title">包车附加项</div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-overnight-check"> ${APP_DATA.extras.charter.overnight.label}</label></div>
            <input class="extra-overnight-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.overnight.note}</div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-overtime-check"> <span class="extra-overtime-label"></span></label></div>
            <input class="extra-overtime-qty" type="number" min="1" step="0.5" placeholder="数量" />
          </div>
          <div class="field-note extra-overtime-note"></div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-siam-check"> ${APP_DATA.extras.charter.siam.label}</label></div>
            <input class="extra-siam-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.siam.note}</div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-zoo-check"> ${APP_DATA.extras.charter.zoo.label}</label></div>
            <input class="extra-zoo-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.zoo.note}</div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-fotong-check"> ${APP_DATA.extras.charter.fotong.label}</label></div>
            <input class="extra-fotong-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.fotong.note}</div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-danuen-check"> ${APP_DATA.extras.charter.danuen.label}</label></div>
            <input class="extra-danuen-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.danuen.note}</div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-lion-check"> ${APP_DATA.extras.charter.lion.label}</label></div>
            <input class="extra-lion-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.lion.note}</div>
        </div>

        <div class="extra-item chinese-only-extra">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="extra-airport-check"> ${APP_DATA.extras.charter.airportChinese.label}</label></div>
            <input class="extra-airport-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.charter.airportChinese.note}</div>
        </div>
      </div>
    </div>

    <div class="trip-single-only">
      <div class="ticket-note-box" style="margin-top:14px;">
        <div class="ticket-note-title">单趟附加项</div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="single-multi-hotel-check"> ${APP_DATA.extras.single.multiHotel.label}</label></div>
            <input class="single-multi-hotel-qty" type="number" min="1" placeholder="数量" />
          </div>
        </div>

        <div class="extra-item">
          <div class="trip-extra-grid">
            <div class="extra-label"><label><input type="checkbox" class="single-stop-check"> ${APP_DATA.extras.single.stop1030.label}</label></div>
            <input class="single-stop-qty" type="number" min="1" placeholder="数量" />
          </div>
          <div class="field-note">${APP_DATA.extras.single.stop1030.note}</div>
        </div>
      </div>
    </div>

    <div style="margin-top:12px;">
      <button type="button" class="delete-btn trip-delete-btn">删除行程</button>
    </div>
  `;

  bindTripCardEvents(card);
  refreshTripCardFields(card);
  return card;
}

function bindTripCardEvents(card) {
  card.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", () => {
      refreshTripCardFields(card);
      updateAllResults();
    });
    el.addEventListener("input", () => {
      refreshTripCardFields(card);
      updateAllResults();
    });
  });

  card.querySelector(".trip-delete-btn").addEventListener("click", () => {
    card.remove();
    refreshTripTitles();
    updateAllResults();
  });
}

function refreshTripTitles() {
  document.querySelectorAll(".trip-card").forEach((card, idx) => {
    card.dataset.index = idx;
    card.querySelector(".trip-title").textContent = `第 ${idx + 1} 段行程`;
  });
}

function refreshTripCardFields(card) {
  const driverType = card.querySelector(".trip-driver-type").value;
  const serviceType = card.querySelector(".trip-service-type").value;
  const carKey = document.getElementById("carType").value;

  const charterOnlyEls = card.querySelectorAll(".trip-charter-only");
  const singleOnlyEls = card.querySelectorAll(".trip-single-only");

  charterOnlyEls.forEach(el => el.classList.toggle("hidden", serviceType !== "charter"));
  singleOnlyEls.forEach(el => el.classList.toggle("hidden", serviceType !== "single"));

  const hourSelect = card.querySelector(".trip-hours");
  if (driverType === "thai") {
    hourSelect.innerHTML = `
      <option value="6">6小时</option>
      <option value="8">8小时</option>
      <option value="10" selected>10小时</option>
    `;
  } else {
    hourSelect.innerHTML = `
      <option value="8">8小时</option>
      <option value="10" selected>10小时</option>
    `;
  }

  const overtimeLabelEl = card.querySelector(".extra-overtime-label");
  const overtimeNoteEl = card.querySelector(".extra-overtime-note");

  if (carKey === "sedan" || carKey === "suv7") {
    overtimeLabelEl.textContent = APP_DATA.extras.charter.overtimeSedanSuv.label;
    overtimeNoteEl.textContent = APP_DATA.extras.charter.overtimeSedanSuv.note;
  } else if (carKey === "v8" || carKey === "v9") {
    overtimeLabelEl.textContent = APP_DATA.extras.charter.overtimeVan.label;
    overtimeNoteEl.textContent = APP_DATA.extras.charter.overtimeVan.note;
  } else {
    overtimeLabelEl.textContent = APP_DATA.extras.charter.overtimeAlphard.label;
    overtimeNoteEl.textContent = APP_DATA.extras.charter.overtimeAlphard.note;
  }

  const chineseExtra = card.querySelector(".chinese-only-extra");
  if (driverType === "chinese") {
    chineseExtra.classList.remove("hidden");
  } else {
    chineseExtra.classList.add("hidden");
  }
}

function getQtyValue(checked, inputEl) {
  if (!checked) return 0;
  const raw = inputEl.value.trim();
  if (!raw) return 1;
  return Number(raw);
}

function calculateExtraLine(checked, qtyInput, price) {
  const qty = getQtyValue(checked, qtyInput);
  return qty * price;
}

function getCharterBasePrice(driverType, carKey, start, firstStop) {
  const table = APP_DATA.charterBasePrice[driverType][carKey];

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
    if (stops[i] !== prev) extra += 1;
    prev = stops[i];
  }
  return extra;
}

function getChineseSinglePrice(carKey, start, end) {
  if (start === "bangkok" && end === "bangkok") {
    return APP_DATA.singleRoutePrices.chinese.bangkok_city[carKey];
  }

  if (
    (start === "bangkok" && end === "pattaya") ||
    (start === "pattaya" && end === "bangkok")
  ) {
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
  const checked = card.querySelector(".extra-overtime-check").checked;
  const qty = getQtyValue(checked, card.querySelector(".extra-overtime-qty"));
  if (!qty) return 0;

  if (carKey === "alphard") {
    return qty * APP_DATA.extras.charter.overtimeAlphard.price;
  }

  if (carKey === "sedan" || carKey === "suv7") {
    return Math.ceil(qty) * APP_DATA.extras.charter.overtimeSedanSuv.price;
  }

  return Math.ceil(qty) * APP_DATA.extras.charter.overtimeVan.price;
}

function calculateTripLine(card, index) {
  const serviceType = card.querySelector(".trip-service-type").value;
  const driverType = card.querySelector(".trip-driver-type").value;
  const start = card.querySelector(".trip-start").value;
  const end = card.querySelector(".trip-end").value;
  const holidayFlag = card.querySelector(".trip-holiday").value === "yes";
  const carKey = document.getElementById("carType").value;

  let total = 0;
  let details = [];
  let manualConfirm = false;

  if (serviceType === "charter") {
    const firstStop = end;
    const basePrice = getCharterBasePrice(driverType, carKey, start, firstStop);

    if (basePrice == null) {
      manualConfirm = true;
      return {
        total: 0,
        html: `
          <div class="result-block">
            <strong>第 ${index + 1} 段行程：当前线路未录入价格</strong>
            <div class="muted">${getLocationLabel(start)} → ${getLocationLabel(end)}</div>
          </div>
        `,
        hasNoDate: !card.querySelector(".trip-date").value,
        manualConfirm
      };
    }

    total += basePrice;
    details.push(`包车基础价：${basePrice} THB`);

    if (start !== end) {
      const extraCross = getExtraCrossCount(start, [end]);
      if (extraCross > 0) {
        // 单一终点不额外加，首个跨区已包含在线路价里
      }
    }

    if (card.querySelector(".trip-return").value === "yes") {
      const returnFee = APP_DATA.returnFees[end] || 0;
      if (returnFee > 0) {
        total += returnFee;
        details.push(`当天返回出发地：${returnFee} THB`);
      }
    }

    if (holidayFlag) {
      total += 500;
      details.push("节假日附加：500 THB");
    }

    const overnight = calculateExtraLine(
      card.querySelector(".extra-overnight-check").checked,
      card.querySelector(".extra-overnight-qty"),
      APP_DATA.extras.charter.overnight.price
    );
    if (overnight > 0) {
      total += overnight;
      details.push(`外宿费：${overnight} THB`);
    }

    const overtime = getOvertimeFee(card, carKey);
    if (overtime > 0) {
      total += overtime;
      details.push(`超时费：${overtime} THB`);
    }

    const siam = calculateExtraLine(card.querySelector(".extra-siam-check").checked, card.querySelector(".extra-siam-qty"), APP_DATA.extras.charter.siam.price);
    if (siam > 0) {
      total += siam;
      details.push(`暹罗古城：${siam} THB`);
    }

    const zoo = calculateExtraLine(card.querySelector(".extra-zoo-check").checked, card.querySelector(".extra-zoo-qty"), APP_DATA.extras.charter.zoo.price);
    if (zoo > 0) {
      total += zoo;
      details.push(`野生动物园开车进入费用：${zoo} THB`);
    }

    const fotong = calculateExtraLine(card.querySelector(".extra-fotong-check").checked, card.querySelector(".extra-fotong-qty"), APP_DATA.extras.charter.fotong.price);
    if (fotong > 0) {
      total += fotong;
      details.push(`佛统超区费：${fotong} THB`);
    }

    const danuen = calculateExtraLine(card.querySelector(".extra-danuen-check").checked, card.querySelector(".extra-danuen-qty"), APP_DATA.extras.charter.danuen.price);
    if (danuen > 0) {
      total += danuen;
      details.push(`丹嫩美攻包车去佛统其他景点：${danuen} THB`);
    }

    const lion = calculateExtraLine(card.querySelector(".extra-lion-check").checked, card.querySelector(".extra-lion-qty"), APP_DATA.extras.charter.lion.price);
    if (lion > 0) {
      total += lion;
      details.push(`大城包车去狮子园：${lion} THB`);
    }

    if (driverType === "chinese") {
      const airport = calculateExtraLine(card.querySelector(".extra-airport-check").checked, card.querySelector(".extra-airport-qty"), APP_DATA.extras.charter.airportChinese.price);
      if (airport > 0) {
        total += airport;
        details.push(`中文司机包车接送机：${airport} THB`);
      }
    }
  } else {
    const singleType = card.querySelector(".trip-single-type").value;
    const airport = card.querySelector(".trip-airport").value;

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
        total: 0,
        html: `
          <div class="result-block">
            <strong>第 ${index + 1} 段行程：价格浮动，需单独确认</strong>
            <div class="muted">${getLocationLabel(start)} → ${getLocationLabel(end)}</div>
          </div>
        `,
        hasNoDate: !card.querySelector(".trip-date").value,
        manualConfirm
      };
    }

    if (basePrice == null) {
      return {
        total: 0,
        html: `
          <div class="result-block">
            <strong>第 ${index + 1} 段行程：当前线路未录入价格</strong>
            <div class="muted">${getLocationLabel(start)} → ${getLocationLabel(end)}</div>
          </div>
        `,
        hasNoDate: !card.querySelector(".trip-date").value,
        manualConfirm: true
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

    const multiHotel = calculateExtraLine(
      card.querySelector(".single-multi-hotel-check").checked,
      card.querySelector(".single-multi-hotel-qty"),
      APP_DATA.extras.single.multiHotel.price
    );
    if (multiHotel > 0) {
      total += multiHotel;
      details.push(`接送多个酒店：${multiHotel} THB`);
    }

    const stop = calculateExtraLine(
      card.querySelector(".single-stop-check").checked,
      card.querySelector(".single-stop-qty"),
      APP_DATA.extras.single.stop1030.price
    );
    if (stop > 0) {
      total += stop;
      details.push(`中途停10-30分钟：${stop} THB`);
    }
  }

  return {
    total,
    html: `
      <div class="result-block">
        <strong>第 ${index + 1} 段行程：${total} THB</strong>
        <div class="muted">${serviceType === "charter" ? "包车" : "单趟"} ｜ ${getLocationLabel(start)} → ${getLocationLabel(end)}</div>
        ${details.map(item => `<div class="muted">${item}</div>`).join("")}
      </div>
    `,
    hasNoDate: !card.querySelector(".trip-date").value,
    manualConfirm
  };
}

function createTicketCard(index) {
  const card = document.createElement("div");
  card.className = "ticket-card";
  card.dataset.index = index;

  card.innerHTML = `
    <div class="ticket-title">第 ${index + 1} 个门票</div>

    <div class="ticket-grid">
      <div>
        <label>景点 / 项目</label>
        <select class="ticket-key">
          ${getTicketKeys().map(key => {
            const item = APP_DATA.tickets[key];
            return `<option value="${item.key}">${item.spotName} - ${item.itemName}</option>`;
          }).join("")}
        </select>
      </div>

      <div>
        <label>日期（选填）</label>
        <input class="ticket-date" type="date" />
      </div>

      <div>
        <label>成人数量</label>
        <input class="ticket-adult-count" type="number" min="0" value="1" />
      </div>

      <div>
        <label>成人单价</label>
        <input class="ticket-adult-price" type="number" min="0" />
      </div>

      <div>
        <label>儿童数量</label>
        <input class="ticket-child-count" type="number" min="0" value="0" />
      </div>

      <div>
        <label>儿童单价</label>
        <input class="ticket-child-price" type="number" min="0" />
      </div>

      <div>
        <label>婴儿数量</label>
        <input class="ticket-infant-count" type="number" min="0" value="0" />
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

  const ticketKeySelect = card.querySelector(".ticket-key");
  const adultPriceInput = card.querySelector(".ticket-adult-price");
  const childPriceInput = card.querySelector(".ticket-child-price");
  const infantPriceInput = card.querySelector(".ticket-infant-price");
  const descEl = card.querySelector(".ticket-description");
  const noteEl = card.querySelector(".ticket-note");

  function applyTicketData() {
    const item = APP_DATA.tickets[ticketKeySelect.value];
    adultPriceInput.value = item.adultPrice;
    childPriceInput.value = item.childPrice;
    infantPriceInput.value = item.infantPrice;
    descEl.textContent = item.description ? `说明：${item.description}` : "";
    noteEl.textContent = item.note ? `备注：${item.note}` : "";
    updateAllResults();
  }

  ticketKeySelect.addEventListener("change", applyTicketData);

  card.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", updateAllResults);
    el.addEventListener("input", updateAllResults);
  });

  card.querySelector(".ticket-delete-btn").addEventListener("click", () => {
    card.remove();
    refreshTicketTitles();
    updateAllResults();
  });

  applyTicketData();
  return card;
}

function refreshTicketTitles() {
  document.querySelectorAll(".ticket-card").forEach((card, idx) => {
    card.dataset.index = idx;
    card.querySelector(".ticket-title").textContent = `第 ${idx + 1} 个门票`;
  });
}

function addTrip() {
  const list = document.getElementById("tripList");
  const index = list.querySelectorAll(".trip-card").length;
  list.appendChild(createTripCard(index));
  updateAllResults();
}

function addTicket() {
  const list = document.getElementById("ticketList");
  const index = list.querySelectorAll(".ticket-card").length;
  list.appendChild(createTicketCard(index));
  updateAllResults();
}

function renderTripResults() {
  const box = document.getElementById("tripResultDetail");
  const cards = document.querySelectorAll(".trip-card");
  let total = 0;
  let hasNoDate = false;
  let hasManualConfirm = false;

  box.innerHTML = cards.length ? "" : `<div class="result-block muted">请先添加行程信息。</div>`;

  cards.forEach((card, idx) => {
    const result = calculateTripLine(card, idx);
    total += result.total;
    if (result.hasNoDate) hasNoDate = true;
    if (result.manualConfirm) hasManualConfirm = true;
    box.insertAdjacentHTML("beforeend", result.html);
  });

  document.getElementById("tripSubtotal").textContent = `${total} THB`;
  return { total, hasNoDate, hasManualConfirm };
}

function getTicketLineTotal(card) {
  const adultCount = Number(card.querySelector(".ticket-adult-count").value || 0);
  const adultPrice = Number(card.querySelector(".ticket-adult-price").value || 0);
  const childCount = Number(card.querySelector(".ticket-child-count").value || 0);
  const childPrice = Number(card.querySelector(".ticket-child-price").value || 0);
  const infantCount = Number(card.querySelector(".ticket-infant-count").value || 0);
  const infantPrice = Number(card.querySelector(".ticket-infant-price").value || 0);

  return (adultCount * adultPrice) + (childCount * childPrice) + (infantCount * infantPrice);
}

function renderTicketResults() {
  const box = document.getElementById("ticketResultDetail");
  const cards = document.querySelectorAll(".ticket-card");
  let total = 0;

  box.innerHTML = cards.length ? "" : `<div class="result-block muted">请先添加门票信息。</div>`;

  cards.forEach((card, idx) => {
    const ticketKey = card.querySelector(".ticket-key").value;
    const item = APP_DATA.tickets[ticketKey];
    const lineTotal = getTicketLineTotal(card);
    total += lineTotal;

    box.insertAdjacentHTML("beforeend", `
      <div class="result-block">
        <strong>第 ${idx + 1} 个门票：${lineTotal} THB</strong>
        <div class="muted">${item.spotName} - ${item.itemName}</div>
      </div>
    `);
  });

  document.getElementById("ticketSubtotal").textContent = `${total} THB`;
  return total;
}

function renderFinalNotice(hasNoDate, hasManualConfirm) {
  const noticeBox = document.getElementById("finalNoticeBox");
  let parts = [
    "• 门票价格仅供参考，请以实际出票价格为准。",
    "• 儿童/婴儿标准请以备注说明为准。"
  ];

  if (hasNoDate) {
    parts.unshift("• 未选日期的行程，未计入节假日浮动。");
  }
  if (hasManualConfirm) {
    parts.unshift("• 部分线路或车型价格浮动，需单独确认。");
  }

  noticeBox.innerHTML = parts.map(x => `<div>${x}</div>`).join("");
}

function updateAllResults() {
  const tripResult = renderTripResults();
  const ticketTotal = renderTicketResults();
  const total = tripResult.total + ticketTotal;

  document.getElementById("grandTotal").textContent = `${total} THB`;
  renderFinalNotice(tripResult.hasNoDate, tripResult.hasManualConfirm);
}

function initBaseSelectors() {
  const carSelect = document.getElementById("carType");
  carSelect.innerHTML = getCarKeys().map(key => {
    const car = APP_DATA.cars[key];
    return `<option value="${car.key}">${car.name}</option>`;
  }).join("");
}

function init() {
  initBaseSelectors();
  bindBaseEvents();
  updateVehiclePanel();

  document.getElementById("addTripBtn").addEventListener("click", addTrip);
  document.getElementById("addTicketBtn").addEventListener("click", addTicket);

  addTrip();
  addTicket();
}

init();
