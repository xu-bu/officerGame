<template>
  <div id="app">
    <!-- 上面的 cards -->
    <div class="box top">
      <div class="cards">
        <button
          v-for="(card, index) in cards"
          :key="index"
          class="card-btn"
          :class="{ selected: selectedCards.includes(index) }"
          @click="toggleCard(index)"
        >
          <text>{{ card.name }}</text>
          <text>{{ card.value }}$ / -{{ card.loss }}$</text>
        </button>
      </div>
    </div>

    <!-- 下面左右布局 -->
    <div class="bottom">
      <!-- 左边 labels -->
      <div class="labels">
        <label>
          Money:
          <input v-model="money" type="number" />
        </label>
        <div>Bread: {{ counts.bread }}</div>
        <div>Apple: {{ counts.apple }}</div>
        <div>Chicken: {{ counts.chicken }}</div>
        <div>Cheese: {{ counts.cheese }}</div>
      </div>

      <!-- 右边按钮 -->
      <div class="btn-wrap">
        <button @click="dealCards">deal</button>
        <button @click="changeCards">change</button>
        <button @click="clearCards">clear</button>
        <button @click="claim">claim</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const cardsDefinition = {
  apple: { value: 2, loss: 2, count: 48, name: "apple" },
  cheese: { value: 3, loss: 2, count: 36, name: "cheese" },
  bread: { value: 3, loss: 2, count: 36, name: "bread" },
  chicken: { value: 4, loss: 2, count: 24, name: "chicken" },
  contraband: { value: 8, loss: 4, count: 60, name: "contraband" },
};
const deck = Object.entries(cardsDefinition)
  .map(([name, value]) => Array(value.count).fill({ ...value }))
  .flat();
const totalCardSize = 204;
const items = Object.keys(cardsDefinition);
const cards = ref([]);
const selectedCards = ref([]);
const money = ref(50);
const counts = ref({
  bread: 0,
  apple: 0,
  chicken: 0,
  cheese: 0,
  contraband: 0,
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
    total += card.value; // 累加 money
    if (counts.value[card.name] !== undefined) {
      counts.value[card.name]++;
    }
  });

  money.value += total;

  // 删除已选的卡牌
  cards.value = cards.value.filter(
    (_, idx) => !selectedCards.value.includes(idx)
  );

  selectedCards.value = [];
  cards.value = [];
}
</script>

<style scoped>
/* 整体垂直：上（cards）/下（bottom） */
.page {
  display: grid;
  gap: 16px;
  padding: 10px;
}

/* 上方 cards 容器 */
.top {
  width: 100%;
  margin: 0 auto;
  border: 1px solid #ccc;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh; /* 固定高度 */
}

/* cards 网格 */
.cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 8px;
  width: 100%;
  height: 100%;
}

.card-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-direction: column; /* 竖排排列 */
}
.card-btn.selected {
  border: 3px solid blue;
}

/* 下方左右两栏：左 labels | 右 btn-wrap */
.bottom {
  display: grid;
  grid-template-columns: 220px 1fr; /* 左列固定/右列自适应 */
  gap: 20px;
  width: 100%;
  max-width: 900px; /* 可按需调整 */
  margin: 0 auto;
  align-items: start;
  height: 50vh;
}

/* 竖排 labels（提高特异性覆盖旧样式） */
.bottom .labels {
  display: flex !important;
  flex-direction: column !important;
  gap: 10px;
  border: 1px solid #ccc;
  padding: 10px;
  height: 50vh;
}

.btn-wrap {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 四列均分 */
  gap: 15px;
}

.btn-wrap button {
  width: 100%; /* 填满格子 */
  height: 60px; /* 固定高度，可按需调整 */
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  background: #eee;
  cursor: pointer;
  display: flex; /* 居中内容 */
  align-items: center;
  justify-content: center;
}

/* 小屏自适应：按钮改两列 */
@media (max-width: 560px) {
  .bottom {
    grid-template-columns: 160px 1fr;
  }
  .btn-wrap {
    grid-template-columns: repeat(2, 1fr);
  }
}

input {
  width: auto;
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input:focus {
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
}
</style>
