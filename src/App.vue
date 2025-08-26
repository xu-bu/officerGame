<template>
  <div id="app">
    <!-- Upper box -->
    <div class="box top">
      <div class="cards">
        <button
          v-for="(card, index) in cards"
          :key="index"
          class="card-btn"
          :class="{ selected: selectedCards.includes(index) }"
          @click="toggleCard(index)"
        >
          {{ card.type }} {{ card.value }}$
        </button>
      </div>
    </div>

    <!-- Action buttons -->
    <div class="btn-wrap">
      <button @click="dealCards">deal cards</button>
      <button @click="changeCards">change cards</button>
      <button @click="clearCards">clear</button>
      <button @click="claim">claim</button>
    </div>

    <!-- Bottom box -->
    <div class="box bottom">
      <label>
        Money:
        <input v-model="money" type="number" />
      </label>

      <!-- Labels -->
      <div class="labels">
        <div>Bread {{ counts.bread }}</div>
        <div>Apple {{ counts.apple }}</div>
        <div>Chicken {{ counts.chicken }}</div>
        <div>Butter {{ counts.butter }}</div>
        <div>Contraband {{ counts.contraband }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cardValues = {
  bread: 5,
  apple: 3,
  chicken: 10,
  butter: 7,
  contraband: 20,
};
const items = Object.keys(cardValues);
const cards = ref([]);
const selectedCards = ref([]);
const money = ref(50);
const counts = ref({
  bread: 0,
  apple: 0,
  chicken: 0,
  butter: 0,
  contraband: 0,
});

function randomCard() {
  const type = items[Math.floor(Math.random() * items.length)];
  return {
    type,
    value: cardValues[type], // 这里初始化固定 value
  };
}

function dealCards() {
  cards.value = Array.from({ length: 6 }, () => randomCard());
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
    const type = items[Math.floor(Math.random() * items.length)];
    cards.value[idx] = {
      type,
      value: cardValues[type], // 初始化固定 value
    };
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
    total += card.value; // 累加 money
    if (counts.value[card.type] !== undefined) {
      counts.value[card.type]++; // 记录每种类型的数量
    }
  });

  money.value += total;

  // 删除已选的卡牌
  cards.value = cards.value.filter(
    (_, idx) => !selectedCards.value.includes(idx)
  );

  selectedCards.value = [];
}
</script>

<style>
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  min-height: 100vh; /* 整个页面占满屏幕高度 */
  padding: 10px;
}

.box {
  width: 80%;
  border: 1px solid #333;
  padding: 20px;
  border-radius: 8px;
}

.box.top {
  width: 90%; /* 手机屏幕适配 */
  max-width: 400px; /* 最大宽度防止过大 */
  height: 200px; /* 固定高度 */
  border: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
}

.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3列 */
  grid-template-rows: repeat(2, 1fr); /* 2行 */
  gap: 8px;
  width: 100%;
  height: 100%;
}

.card-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  width: 100%; /* 填满格子宽度 */
  height: 100%; /* 填满格子高度 */
  box-sizing: border-box;
  white-space: nowrap; /* 防止换行拉伸按钮 */
  overflow: hidden; /* 避免文字溢出 */
  text-overflow: ellipsis;
}

.card-btn.selected {
  border: 3px solid blue;
}

.btn-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
  width: 80%;
}

.btn-wrap button {
  padding: 15px 0;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background: #eee;
  cursor: pointer;
}

.labels {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}
</style>
