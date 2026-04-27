const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const TOKEN = process.env.LINE_TOKEN;
const MENU_PAGE1 = process.env.MENU_PAGE1;
const MENU_PAGE2 = process.env.MENU_PAGE2;

app.post('/webhook', async (req, res) => {
  res.sendStatus(200);
  
  const events = req.body.events;
  if (!events || events.length === 0) return;

  for (const event of events) {
    const userId = event.source.userId;

    // 處理 postback 事件
    if (event.type === 'postback') {
      const data = event.postback.data;
      if (data === 'action=next_page') {
        await switchMenu(userId, MENU_PAGE2);
      } else if (data === 'action=prev_page') {
        await switchMenu(userId, MENU_PAGE1);
      }
    }

    // 保留舊的文字訊息方式（備用）
    if (event.type === 'message' && event.message.type === 'text') {
      const text = event.message.text;
      if (text === '下一頁') {
        await switchMenu(userId, MENU_PAGE2);
      } else if (text === '回主選單') {
        await switchMenu(userId, MENU_PAGE1);
      }
    }
  }
});

async function switchMenu(userId, menuId) {
  try {
    await axios.post(
      `https://api.line.me/v2/bot/user/${userId}/richmenu/${menuId}`,
      {},
      { headers: { Authorization: `Bearer ${TOKEN}` } }
    );
  } catch (err) {
    console.error('切換選單失敗:', err.response?.data);
  }
}

app.get('/', (req, res) => res.send('LINE Webhook is running!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
