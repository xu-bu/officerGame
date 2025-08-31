"use strict";
const common_vendor = require("../../common/vendor.js");
const totalCardSize = 204;
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const cardsDefinition = {
      apple: { value: 2, loss: 2, count: 48, name: "apple" },
      cheese: { value: 3, loss: 2, count: 36, name: "cheese" },
      bread: { value: 3, loss: 2, count: 36, name: "bread" },
      chicken: { value: 4, loss: 2, count: 24, name: "chicken" },
      contraband: { value: 8, loss: 4, count: 60, name: "contraband" }
    };
    const deck = Object.entries(cardsDefinition).map(([name, value]) => Array(value.count).fill({ ...value })).flat();
    const cards = common_vendor.ref([]);
    const selectedCards = common_vendor.ref([]);
    const money = common_vendor.ref(50);
    const counts = common_vendor.ref({
      bread: 0,
      apple: 0,
      chicken: 0,
      cheese: 0,
      contraband: 0
    });
    function getRandomCard() {
      let r = Math.floor(Math.random() * totalCardSize);
      return deck[r];
    }
    function dealCards() {
      cards.value = Array.from({ length: 6 }, () => getRandomCard());
      selectedCards.value = [];
    }
    function toggleCard(index) {
      if (selectedCards.value.includes(index)) {
        selectedCards.value = selectedCards.value.filter((i) => i !== index);
      } else {
        selectedCards.value.push(index);
      }
    }
    function changeCards() {
      selectedCards.value.forEach((idx) => {
        cards.value[idx] = getRandomCard();
      });
      selectedCards.value = [];
    }
    function clearCards() {
      cards.value = [];
      selectedCards.value = [];
    }
    function claim() {
      let total = 0;
      selectedCards.value.forEach((idx) => {
        const card = cards.value[idx];
        total += card.value;
        if (counts.value[card.name] !== void 0) {
          counts.value[card.name]++;
        }
      });
      money.value += total;
      cards.value = cards.value.filter(
        (_, idx) => !selectedCards.value.includes(idx)
      );
      selectedCards.value = [];
      cards.value = [];
    }
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(cards.value, (card, index, i0) => {
          return {
            a: common_vendor.t(card.name),
            b: common_vendor.t(card.value),
            c: common_vendor.t(card.loss),
            d: index,
            e: selectedCards.value.includes(index) ? 1 : "",
            f: common_vendor.o(($event) => toggleCard(index), index)
          };
        }),
        b: money.value,
        c: common_vendor.o(($event) => money.value = $event.detail.value),
        d: common_vendor.t(counts.value.bread),
        e: common_vendor.t(counts.value.apple),
        f: common_vendor.t(counts.value.chicken),
        g: common_vendor.t(counts.value.cheese),
        h: common_vendor.o(dealCards),
        i: common_vendor.o(changeCards),
        j: common_vendor.o(clearCards),
        k: common_vendor.o(claim)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
