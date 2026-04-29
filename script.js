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
    return {
      type: "red",
      text: "该人数使用此车型可能会拥挤或无法承载，请重新选择。"
    };
  }

  if (passengerCount >= car.warningRules.yellow) {
    return {
      type: "yellow",
      text: "该人数使用此车型可能会比较拥挤，请谨慎确认。"
    };
  }

  return {
    type: "green",
    text: "当前人数在该车型可承载范围内，乘坐舒适度较佳。"
  };
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
        <label>用车时长</label>
        <select class="trip-hours">
          <option value="8">8小时</option>
          <option value="10" selected>10小时</option>
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

    <div style="margin-top:12px;">
      <button type="button" class="delete-btn trip-delete-btn">删除行程</button>
    </div>
  `;

  card.querySelectorAll("input, select").forEach(el => {
    el.addEventListener("change", updateAllResults);
    el.addEventListener("input", updateAllResults);
  });

  card.querySelector(".trip-delete-btn").addEventListener("click", () => {
    card.remove();
    refreshTripTitles();
    updateAllResults();
  });

  return card;
}

function refreshTripTitles() {
  document.querySelectorAll(".trip-card").forEach((card, idx) => {
    card.dataset.index = idx;
    card.querySelector(".trip-title").textContent = `第 ${idx + 1} 段行程`;
  });
}

function addTrip() {
  const list = document.getElementById("tripList");
  const index = list.querySelectorAll(".trip-card").length;
  list.appendChild(createTripCard(index));
  updateAllResults();
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

function addTicket() {
  const list = document.getElementById("ticketList");
  const index = list.querySelectorAll(".ticket-card").length;
  list.appendChild(createTicketCard(index));
  updateAllResults();
}

function getTripPrice(card) {
  const serviceType = card.querySelector(".trip-service-type").value;
  const isHoliday = card.querySelector(".trip-holiday").value === "yes";

  let base = serviceType === "charter"
    ? APP_DATA.tripDemoPrice.charterBase
    : APP_DATA.tripDemoPrice.singleBase;

  if (isHoliday) {
    base += 500;
  }

  return base;
}

function renderTripResults() {
  const box = document.getElementById("tripResultDetail");
  const cards = document.querySelectorAll(".trip-card");

  let total = 0;

  box.innerHTML = cards.length
    ? ""
    : `<div class="result-block muted">请先添加行程信息。</div>`;

  cards.forEach((card, idx) => {
    const start = card.querySelector(".trip-start").value;
    const end = card.querySelector(".trip-end").value;
    const serviceType = card.querySelector(".trip-service-type").value;
    const price = getTripPrice(card);

    total += price;

    const div = document.createElement("div");
    div.className = "result-block";
    div.innerHTML = `
      <strong>第 ${idx + 1} 段行程：${price} THB</strong>
      <div class="muted">${serviceType === "charter" ? "包车" : "单趟"} ｜ ${getLocationLabel(start)} → ${getLocationLabel(end)}</div>
    `;
    box.appendChild(div);
  });

  document.getElementById("tripSubtotal").textContent = `${total} THB`;
  return total;
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

  box.innerHTML = cards.length
    ? ""
    : `<div class="result-block muted">请先添加门票信息。</div>`;

  cards.forEach((card, idx) => {
    const ticketKey = card.querySelector(".ticket-key").value;
    const item = APP_DATA.tickets[ticketKey];
    const lineTotal = getTicketLineTotal(card);

    total += lineTotal;

    const div = document.createElement("div");
    div.className = "result-block";
    div.innerHTML = `
      <strong>第 ${idx + 1} 个门票：${lineTotal} THB</strong>
      <div class="muted">${item.spotName} - ${item.itemName}</div>
    `;
    box.appendChild(div);
  });

  document.getElementById("ticketSubtotal").textContent = `${total} THB`;
  return total;
}

function renderFinalNotice() {
  const noticeBox = document.getElementById("finalNoticeBox");
  noticeBox.innerHTML = `
    <div>• 未选日期的行程，未计入节假日浮动。</div>
    <div>• 部分线路或车型价格浮动，需单独确认。</div>
    <div>• 门票价格仅供参考，请以实际出票价格为准。</div>
    <div>• 儿童/婴儿标准请以备注说明为准。</div>
  `;
}

function updateAllResults() {
  const tripTotal = renderTripResults();
  const ticketTotal = renderTicketResults();
  const total = tripTotal + ticketTotal;

  document.getElementById("grandTotal").textContent = `${total} THB`;
  renderFinalNotice();
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
